import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import {
  getEditableFields,
  parseWhatsAppContacts,
  siteContentQuery,
  WHATSAPP_CONTACTS_KEY,
} from "@/content/useSite";
import type { EditableField, WhatsAppContact } from "@/content/useSite";
import { uploadSiteFile } from "@/lib/uploads.functions";
import { claimAdmin } from "@/lib/admin.functions";
import { Card, PageHero, Section } from "@/components/site/ui";
import { formControlClassName } from "@/components/site/form-styles";
import { EditaisAdmin } from "@/components/admin/EditaisAdmin";
import { NoticiasAdmin } from "@/components/admin/NoticiasAdmin";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Área administrativa — AEIFI" },
      {
        name: "description",
        content:
          "Área restrita da AEIFI para atualização das informações institucionais publicadas no site.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Área administrativa — AEIFI" },
      { property: "og:description", content: "Acesso restrito à equipe da AEIFI." },
    ],
  }),
  component: AdminPage,
});

const ADMIN_EMAIL = "aeififoz@gmail.com";

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Área restrita"
        title="Área administrativa"
        lead="Atualize aqui as informações institucionais que aparecem no site. O que for preenchido substitui automaticamente os marcadores de informação pendente."
      />
      <Section>
        {!ready ? (
          <p className="text-sm text-muted-foreground">Carregando…</p>
        ) : session ? (
          <Editor onSignOut={() => supabase.auth.signOut()} />
        ) : (
          <LoginForm />
        )}
      </Section>
    </>
  );
}

function LoginForm() {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    let { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError && signInError.message.toLowerCase().includes("invalid login")) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (!signUpError) {
        ({ error: signInError } = await supabase.auth.signInWithPassword({ email, password }));
      } else {
        signInError = signUpError;
      }
    }
    if (signInError) setError("Não foi possível entrar. Verifique o e-mail e a senha.");
    else await claimAdmin().catch(() => undefined);
    setLoading(false);
  }

  return (
    <Card className="mx-auto max-w-md">
      <h2 className="font-display text-xl font-semibold text-primary">Entrar</h2>
      <form className="mt-5 grid gap-4" onSubmit={submit}>
        <label className="grid gap-1.5 text-sm font-medium text-primary">
          E-mail
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={formControlClassName}
          />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-primary">
          Senha
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={formControlClassName}
          />
        </label>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </Card>
  );
}

function Editor({ onSignOut }: { onSignOut: () => void }) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(siteContentQuery);
  const editableFields = useMemo(() => getEditableFields(), []);
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setValues(data);
  }, [data]);

  useEffect(() => {
    claimAdmin()
      .then(() =>
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ["editais"] }),
          queryClient.invalidateQueries({ queryKey: ["noticias"] }),
        ]),
      )
      .catch(() => undefined);
  }, [queryClient]);

  const groups = useMemo(() => {
    const map = new Map<string, EditableField[]>();
    for (const field of editableFields) {
      const list = map.get(field.group) ?? [];
      list.push(field);
      map.set(field.group, list);
    }
    return [...map.entries()];
  }, [editableFields]);

  async function save() {
    setSaving(true);
    setStatus(null);
    const rows = editableFields.map((f) => ({ key: f.key, value: values[f.key] ?? "" }));
    const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
    setSaving(false);
    if (error) {
      setStatus("Não foi possível salvar. Verifique se você está com acesso de administrador.");
      return;
    }
    setStatus("Informações salvas e publicadas no site.");
    queryClient.invalidateQueries({ queryKey: ["site_content"] });
  }

  if (isLoading) return <p className="text-sm text-muted-foreground">Carregando informações…</p>;

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Campos deixados em branco continuam exibindo o marcador de informação pendente.
        </p>
        <button
          onClick={onSignOut}
          className="min-h-11 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-colors hover:border-primary/25 hover:bg-muted"
        >
          Sair
        </button>
      </div>

      <Card>
        <h2 className="font-display text-lg font-semibold text-primary">Textos das páginas</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Para reescrever qualquer texto do site, navegue até a página desejada com o seu login
          ativo e clique em <strong>“Editar textos da página”</strong>, no canto inferior esquerdo.
          Depois é só clicar sobre o trecho e digitar. Abaixo ficam registradas as alterações já
          feitas.
        </p>
        <CustomTexts data={data ?? {}} />
      </Card>

      <WhatsAppContactsEditor
        value={values[WHATSAPP_CONTACTS_KEY] ?? ""}
        onChange={(next) => setValues((current) => ({ ...current, [WHATSAPP_CONTACTS_KEY]: next }))}
      />

      <NoticiasAdmin />

      <EditaisAdmin />

      {groups.map(([group, fields]) => (
        <Card key={group}>
          <h2 className="font-display text-lg font-semibold text-primary">{group}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <FieldEditor
                key={field.key}
                field={field}
                value={values[field.key] ?? ""}
                onChange={(next) => setValues((v) => ({ ...v, [field.key]: next }))}
              />
            ))}
          </div>
        </Card>
      ))}

      <div className="sticky bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-lift">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground shadow-sm transition-all hover:bg-secondary/90 hover:shadow-md active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {saving ? "Salvando…" : "Salvar e publicar"}
        </button>
        {status ? <span className="text-sm text-muted-foreground">{status}</span> : null}
      </div>
    </div>
  );
}

function WhatsAppContactsEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const queryClient = useQueryClient();
  const contacts = parseWhatsAppContacts(value);
  const [draft, setDraft] = useState<WhatsAppContact>({ nome: "", funcao: "", numero: "" });
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function publish(next: WhatsAppContact[], operation: string) {
    setBusy(operation);
    setMessage(null);
    const encoded = JSON.stringify(next);
    const { error } = await supabase
      .from("site_content")
      .upsert([{ key: WHATSAPP_CONTACTS_KEY, value: encoded }], { onConflict: "key" });

    if (error) {
      setMessage({
        type: "error",
        text: "Não foi possível atualizar os contatos. Verifique seu acesso e tente novamente.",
      });
      setBusy(null);
      return false;
    }

    onChange(encoded);
    await queryClient.invalidateQueries({ queryKey: ["site_content"] });
    setBusy(null);
    return true;
  }

  async function addContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const contact = {
      nome: draft.nome.trim(),
      funcao: draft.funcao.trim(),
      numero: draft.numero.replace(/\D/g, ""),
    };

    if (
      !contact.nome ||
      !contact.funcao ||
      contact.numero.length < 10 ||
      contact.numero.length > 15
    ) {
      setMessage({
        type: "error",
        text: "Preencha nome, função e um número internacional válido com 10 a 15 dígitos.",
      });
      return;
    }
    if (contacts.some((item) => item.numero === contact.numero)) {
      setMessage({ type: "error", text: "Este número já está cadastrado." });
      return;
    }

    if (await publish([...contacts, contact], "add")) {
      setDraft({ nome: "", funcao: "", numero: "" });
      setMessage({
        type: "success",
        text: "Contato adicionado e publicado no WhatsApp flutuante.",
      });
    }
  }

  async function removeContact(index: number) {
    if (
      await publish(
        contacts.filter((_, current) => current !== index),
        `remove-${index}`,
      )
    ) {
      setMessage({ type: "success", text: "Contato removido do WhatsApp flutuante." });
    }
  }

  const inputClassName = formControlClassName;

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-primary">WhatsApp flutuante</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Cadastre os contatos que serão exibidos no botão flutuante. Use o número com DDI e DDD.
      </p>

      <form
        onSubmit={addContact}
        className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end"
      >
        <label className="grid gap-1.5 text-sm font-medium text-primary">
          Nome
          <input
            required
            value={draft.nome}
            onChange={(event) => setDraft((current) => ({ ...current, nome: event.target.value }))}
            className={inputClassName}
          />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-primary">
          Função
          <input
            required
            value={draft.funcao}
            onChange={(event) =>
              setDraft((current) => ({ ...current, funcao: event.target.value }))
            }
            className={inputClassName}
          />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-primary">
          Número
          <input
            required
            type="tel"
            inputMode="numeric"
            placeholder="5545999999999"
            value={draft.numero}
            onChange={(event) =>
              setDraft((current) => ({ ...current, numero: event.target.value }))
            }
            className={inputClassName}
          />
        </label>
        <button
          type="submit"
          disabled={busy !== null}
          className="min-h-11 rounded-lg bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground shadow-sm transition-all hover:bg-secondary/90 hover:shadow-md active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {busy === "add" ? "Adicionando…" : "Adicionar"}
        </button>
      </form>

      {message ? (
        <p
          className={`mt-3 text-sm font-medium ${
            message.type === "error" ? "text-destructive" : "text-green-700"
          }`}
          aria-live="polite"
        >
          {message.text}
        </p>
      ) : null}

      {contacts.length ? (
        <ul className="mt-5 grid gap-2">
          {contacts.map((contact, index) => (
            <li
              key={`${contact.numero}-${index}`}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-muted/35 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="font-semibold text-primary">{contact.nome}</p>
                <p className="text-sm text-muted-foreground">
                  {contact.funcao} · +{contact.numero}
                </p>
              </div>
              <button
                type="button"
                disabled={busy !== null}
                onClick={() => void removeContact(index)}
                className="min-h-11 rounded-lg border border-destructive/30 bg-card px-3 py-2 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy === `remove-${index}` ? "Removendo…" : "Remover"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          Nenhum contato cadastrado.
        </p>
      )}
    </Card>
  );
}

function FieldEditor({
  field,
  value,
  onChange,
}: {
  field: EditableField;
  value: string;
  onChange: (value: string) => void;
}) {
  const isUpload = field.kind === "file" || field.kind === "image";
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setUploadError(null);
    try {
      const buffer = await file.arrayBuffer();
      let binary = "";
      const bytes = new Uint8Array(buffer);
      for (let i = 0; i < bytes.length; i += 8192) {
        binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
      }
      const result = await uploadSiteFile({
        data: {
          name: file.name,
          contentType: file.type || "application/octet-stream",
          dataBase64: btoa(binary),
        },
      });
      onChange(result.url);
    } catch {
      setUploadError("Não foi possível enviar o arquivo. Tente um arquivo menor que 8 MB.");
    }
    setUploading(false);
  }

  if (isUpload) {
    return (
      <div className="grid gap-1.5 text-sm font-medium text-primary">
        <span>{field.label}</span>
        <input
          type="file"
          accept={field.kind === "image" ? "image/*" : "application/pdf,image/*"}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
          }}
          className={formControlClassName}
        />
        {uploading ? <span className="text-xs text-muted-foreground">Enviando…</span> : null}
        {uploadError ? <span className="text-xs text-destructive">{uploadError}</span> : null}
        {value ? (
          <span className="flex flex-wrap items-center gap-2 text-xs font-normal">
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-secondary underline"
            >
              Ver arquivo atual
            </a>
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex min-h-11 items-center text-destructive underline"
            >
              Remover
            </button>
          </span>
        ) : (
          <span className="text-xs font-normal text-muted-foreground">Nenhum arquivo enviado.</span>
        )}
      </div>
    );
  }

  return (
    <label className="grid gap-1.5 text-sm font-medium text-primary">
      {field.label}
      {field.multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={formControlClassName}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={formControlClassName}
        />
      )}
    </label>
  );
}

function CustomTexts({ data }: { data: Record<string, string> }) {
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState<string | null>(null);

  const items = Object.entries(data)
    .filter(([key, value]) => key.startsWith("txt.") && value.trim())
    .map(([key, value]) => ({
      key,
      value,
      original: data[`src.${key.slice(4)}`] ?? "",
    }));

  async function reset(key: string) {
    setBusy(key);
    await supabase.from("site_content").upsert([{ key, value: "" }], { onConflict: "key" });
    await queryClient.invalidateQueries({ queryKey: ["site_content"] });
    setBusy(null);
  }

  if (items.length === 0) {
    return (
      <p className="mt-4 text-sm text-muted-foreground">
        Nenhum texto personalizado ainda. As alterações feitas na navegação aparecerão aqui.
      </p>
    );
  }

  return (
    <ul className="mt-4 grid gap-3">
      {items.map((item) => (
        <li key={item.key} className="rounded-xl border border-border bg-card p-4 shadow-sm">
          {item.original ? (
            <p className="text-xs text-muted-foreground line-through">{item.original}</p>
          ) : null}
          <p className="mt-1 text-sm text-foreground">{item.value}</p>
          <button
            type="button"
            disabled={busy === item.key}
            onClick={() => void reset(item.key)}
          className="mt-2 inline-flex min-h-11 items-center text-xs font-semibold text-destructive underline disabled:opacity-60"
          >
            {busy === item.key ? "Restaurando…" : "Restaurar texto original"}
          </button>
        </li>
      ))}
    </ul>
  );
}
