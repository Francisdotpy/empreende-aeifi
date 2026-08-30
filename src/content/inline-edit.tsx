import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { siteContentQuery, type Overrides } from "@/content/useSite";

/** Hash estável (FNV-1a) usado como parte da chave do texto. */
export function textHash(input: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

function currentPath() {
  if (typeof window === "undefined") return "/";
  const path = window.location.pathname.replace(/\/+$/, "");
  return path || "/";
}

/** Chave única por página + trecho + ocorrência (evita que um texto altere outros). */
export function textKey(original: string, occurrence = 0, path = currentPath()) {
  return `txt.${textHash(path)}.${textHash(normalize(original))}.${occurrence}`;
}

export function sourceKey(original: string, occurrence = 0, path = currentPath()) {
  return `src.${textHash(path)}.${textHash(normalize(original))}.${occurrence}`;
}

function normalize(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "INPUT", "SVG", "PATH"]);
const originals = new WeakMap<Text, string>();
const nodeKeys = new WeakMap<Text, { original: string; occurrence: number }>();

function eligible(node: Text) {
  const parent = node.parentElement;
  if (!parent) return false;
  if (SKIP_TAGS.has(parent.tagName)) return false;
  if (parent.closest("[data-inline-edit-ui]")) return false;
  const original = originals.get(node) ?? node.nodeValue ?? "";
  return normalize(original).length > 1;
}

function walk(root: HTMLElement, fn: (node: Text) => void) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    nodes.push(current as Text);
    current = walker.nextNode();
  }
  nodes.forEach(fn);
}

/** Aplica os textos personalizados sobre o conteúdo já renderizado. */
export function applyOverrides(map: Overrides) {
  if (typeof document === "undefined") return;
  const seen = new Map<string, number>();
  walk(document.body, (node) => {
    if (!eligible(node)) return;
    const original = originals.get(node) ?? node.nodeValue ?? "";
    originals.set(node, original);
    const id = normalize(original);
    const occurrence = seen.get(id) ?? 0;
    seen.set(id, occurrence + 1);
    nodeKeys.set(node, { original, occurrence });
    const override = map[textKey(original, occurrence)];
    const next = override && override.trim() ? override : original;
    if (node.nodeValue !== next) node.nodeValue = next;
  });
}


export function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    let active = true;
    async function check() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        if (active) setIsAdmin(false);
        return;
      }
      const { data: role } = await supabase.rpc("has_role", {
        _user_id: data.session.user.id,
        _role: "admin",
      });
      if (active) setIsAdmin(Boolean(role));
    }
    void check();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") void check();
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);
  return isAdmin;
}

export function InlineTextEditor() {
  const isAdmin = useIsAdmin();
  const queryClient = useQueryClient();
  const { data } = useQuery(siteContentQuery);
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const mapRef = useRef<Overrides>({});
  const editingRef = useRef(false);

  mapRef.current = data ?? {};
  editingRef.current = editing;

  /* Reaplica os textos personalizados sempre que o React renderiza algo novo. */
  useEffect(() => {
    let frame = 0;
    const run = () => {
      observer.disconnect();
      applyOverrides(mapRef.current);
      observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    };
    const observer = new MutationObserver(() => {
      if (editingRef.current) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(run);
    });
    run();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [data]);

  /* Modo de edição: clicar em qualquer texto do site permite reescrevê-lo. */
  useEffect(() => {
    if (!editing) return;
    document.body.classList.add("inline-edit-on");

    async function save(original: string, occurrence: number, value: string) {
      const key = textKey(original, occurrence);
      const nextValue = normalize(value) === normalize(original) ? "" : value.trim();
      const rows = [
        { key, value: nextValue },
        { key: sourceKey(original, occurrence), value: normalize(original) },
      ];
      const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
      if (error) {
        setStatus("Não foi possível salvar este texto.");
        return;
      }
      setStatus("Texto salvo e publicado.");
      mapRef.current = { ...mapRef.current, [key]: nextValue };
      await queryClient.invalidateQueries({ queryKey: ["site_content"] });
    }

    function startEdit(node: Text) {
      const parent = node.parentNode;
      if (!parent) return;
      const info = nodeKeys.get(node) ?? {
        original: originals.get(node) ?? node.nodeValue ?? "",
        occurrence: 0,
      };
      const span = document.createElement("span");
      span.setAttribute("data-inline-editing", "true");
      span.contentEditable = "true";
      span.textContent = node.nodeValue ?? "";
      parent.replaceChild(span, node);
      span.focus();
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(span);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      const finish = () => {
        span.removeEventListener("blur", finish);
        span.removeEventListener("keydown", onKey);
        const value = span.textContent ?? "";
        node.nodeValue = value;
        span.replaceWith(node);
        originals.set(node, info.original);
        nodeKeys.set(node, info);
        void save(info.original, info.occurrence, value);
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          span.textContent = mapRef.current[textKey(info.original, info.occurrence)] || info.original;
          span.blur();
        }
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          span.blur();
        }
      };
      span.addEventListener("blur", finish);
      span.addEventListener("keydown", onKey);
    }

    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target || target.closest("[data-inline-edit-ui]")) return;
      if (target.closest("[data-inline-editing]")) return;
      if (SKIP_TAGS.has(target.tagName)) return;

      let node: Text | null = null;
      const caret = (
        document as Document & {
          caretRangeFromPoint?: (x: number, y: number) => Range | null;
        }
      ).caretRangeFromPoint?.(event.clientX, event.clientY);
      if (caret && caret.startContainer.nodeType === Node.TEXT_NODE) {
        node = caret.startContainer as Text;
      }
      if (!node || node.parentElement !== target) {
        node =
          ([...target.childNodes].find(
            (n): n is Text =>
              n.nodeType === Node.TEXT_NODE && normalize(n.nodeValue ?? "").length > 1,
          ) as Text | undefined) ?? node;
      }
      if (!node || normalize(node.nodeValue ?? "").length <= 1) {
        setStatus("Clique diretamente sobre o trecho de texto que deseja editar.");
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      if (!originals.has(node)) originals.set(node, node.nodeValue ?? "");
      startEdit(node);
    }


    document.addEventListener("click", onClick, true);
    return () => {
      document.body.classList.remove("inline-edit-on");
      document.removeEventListener("click", onClick, true);
    };
  }, [editing, queryClient]);

  if (!isAdmin) return null;

  return (
    <div
      data-inline-edit-ui
      className="fixed bottom-24 left-4 z-50 flex max-h-[calc(100dvh-7rem)] max-w-[min(92vw,26rem)] flex-wrap items-center gap-3 overflow-y-auto rounded-2xl border border-border bg-card px-4 py-3 shadow-lift sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))]"
    >
      <button
        onClick={() => {
          setStatus(null);
          setEditing((v) => !v);
        }}
        className={`min-h-11 rounded-lg px-4 py-2 text-sm font-semibold ${
          editing
            ? "bg-secondary text-secondary-foreground"
            : "border border-border bg-background text-primary"
        }`}
      >
        {editing ? "Concluir edição" : "Editar textos da página"}
      </button>
      <span className="text-xs text-muted-foreground">
        {status ?? (editing ? "Clique em qualquer texto para reescrever." : "Modo administrador")}
      </span>
    </div>
  );
}
