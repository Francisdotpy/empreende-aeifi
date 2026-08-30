import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Pencil, Plus, Trash2, X } from "lucide-react";
import { Card } from "@/components/site/ui";
import { formControlClassName } from "@/components/site/form-styles";
import { responsiveImageProps } from "@/lib/responsive-images";
import { supabase } from "@/integrations/supabase/client";
import {
  formatarDataNoticia,
  noticiasAdminQuery,
  parseFonteLinks,
  slugifyNoticia,
  type NoticiaPublicada,
  type NoticiaStatus,
} from "@/lib/noticias";
import { deleteNoticiaImages, uploadNoticiaImage } from "@/lib/uploads.functions";

type FormState = {
  titulo: string;
  subtitulo: string;
  texto: string;
  fontes: string;
  dataNoticia: string;
  categoria: string;
  status: NoticiaStatus;
  imageFile: File | null;
  imagePreview: string;
};

const inputClass = formControlClassName;

function today() {
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function initialForm(noticia?: NoticiaPublicada): FormState {
  return {
    titulo: noticia?.titulo ?? "",
    subtitulo: noticia?.subtitulo ?? "",
    texto: noticia?.texto ?? "",
    fontes: noticia?.fontes.join("\n") ?? "",
    dataNoticia: noticia?.data_noticia ?? today(),
    categoria: noticia?.categoria ?? "",
    status: noticia?.status ?? "rascunho",
    imageFile: null,
    imagePreview: noticia?.capa_url ?? "",
  };
}

async function fileToBase64(file: File) {
  const buffer = await file.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let index = 0; index < bytes.length; index += 8192) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 8192));
  }
  return btoa(binary);
}

function readableError(error: unknown) {
  if (error instanceof Error && error.message) return error.message;
  return "Não foi possível concluir a operação. Verifique sua conexão e tente novamente.";
}

async function createUniqueSlug(title: string) {
  const base = slugifyNoticia(title) || "noticia";
  for (let suffix = 1; suffix <= 50; suffix += 1) {
    const slug = suffix === 1 ? base : `${base}-${suffix}`;
    const { data, error } = await supabase
      .from("noticias")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw error;
    if (!data) return slug;
  }
  return `${base}-${crypto.randomUUID().slice(0, 8)}`;
}

export function NoticiasAdmin() {
  const queryClient = useQueryClient();
  const { data: noticias = [], isLoading, isError } = useQuery(noticiasAdminQuery);
  const [editing, setEditing] = useState<NoticiaPublicada | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>(() => initialForm());
  const [busy, setBusy] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    return () => {
      if (form.imagePreview.startsWith("blob:")) URL.revokeObjectURL(form.imagePreview);
    };
  }, [form.imagePreview]);

  function openCreate() {
    setEditing(null);
    setForm(initialForm());
    setMessage(null);
    setFormOpen(true);
  }

  function openEdit(noticia: NoticiaPublicada) {
    setEditing(noticia);
    setForm(initialForm(noticia));
    setMessage(null);
    setFormOpen(true);
  }

  function closeForm() {
    if (busy) return;
    setFormOpen(false);
    setEditing(null);
    setForm(initialForm());
  }

  function chooseImage(file: File | undefined) {
    if (!file) return;
    const extensions = ["jpg", "jpeg", "png", "webp"];
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (
      !extension ||
      !extensions.includes(extension) ||
      !["image/jpeg", "image/png", "image/webp"].includes(file.type)
    ) {
      setForm((current) => ({
        ...current,
        imageFile: null,
        imagePreview: editing?.capa_url ?? "",
      }));
      setMessage({ type: "error", text: "A capa deve estar em JPG, JPEG, PNG ou WEBP." });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setForm((current) => ({
        ...current,
        imageFile: null,
        imagePreview: editing?.capa_url ?? "",
      }));
      setMessage({ type: "error", text: "A capa deve ter no máximo 5 MB." });
      return;
    }
    setMessage(null);
    setForm((current) => ({
      ...current,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    const required = [form.titulo, form.subtitulo, form.texto, form.dataNoticia, form.categoria];
    if (required.some((value) => !value.trim())) {
      setMessage({ type: "error", text: "Preencha todos os campos obrigatórios da notícia." });
      return;
    }
    if (!editing && !form.imageFile) {
      setMessage({ type: "error", text: "Selecione uma imagem de capa para a notícia." });
      return;
    }

    let fontes: string[];
    try {
      fontes = parseFonteLinks(form.fontes);
    } catch (error) {
      setMessage({ type: "error", text: readableError(error) });
      return;
    }

    setBusy(true);
    setMessage(null);
    let uploadedUrl = "";
    const wasEditing = Boolean(editing);
    try {
      let capaUrl = editing?.capa_url ?? "";
      if (form.imageFile) {
        const uploaded = await uploadNoticiaImage({
          data: {
            name: form.imageFile.name,
            contentType: form.imageFile.type,
            dataBase64: await fileToBase64(form.imageFile),
          },
        });
        capaUrl = uploaded.url;
        uploadedUrl = uploaded.url;
      }

      const payload = {
        titulo: form.titulo.trim(),
        subtitulo: form.subtitulo.trim(),
        texto: form.texto.trim(),
        fontes,
        capa_url: capaUrl,
        data_noticia: form.dataNoticia,
        categoria: form.categoria.trim(),
        status: form.status,
      };

      if (editing) {
        const { error } = await supabase
          .from("noticias")
          .update(payload)
          .eq("id", editing.id)
          .select("id")
          .single();
        if (error) throw error;
      } else {
        const slug = await createUniqueSlug(form.titulo);
        const { error } = await supabase.from("noticias").insert({ ...payload, slug });
        if (error) throw error;
      }

      if (editing && form.imageFile) {
        void deleteNoticiaImages({ data: { urls: [editing.capa_url] } }).catch(() => undefined);
      }

      await queryClient.invalidateQueries({ queryKey: ["noticias"] });
      setFormOpen(false);
      setEditing(null);
      setForm(initialForm());
      setMessage({
        type: "success",
        text: wasEditing ? "Notícia atualizada com sucesso." : "Notícia cadastrada com sucesso.",
      });
    } catch (error) {
      if (uploadedUrl) {
        void deleteNoticiaImages({ data: { urls: [uploadedUrl] } }).catch(() => undefined);
      }
      setMessage({ type: "error", text: readableError(error) });
    } finally {
      setBusy(false);
    }
  }

  async function remove(noticia: NoticiaPublicada) {
    const confirmed = window.confirm(
      `Excluir a notícia “${noticia.titulo}”? Esta ação não pode ser desfeita.`,
    );
    if (!confirmed) return;

    setDeletingId(noticia.id);
    setMessage(null);
    const { error } = await supabase
      .from("noticias")
      .delete()
      .eq("id", noticia.id)
      .select("id")
      .single();
    if (error) {
      setMessage({ type: "error", text: "Não foi possível excluir a notícia." });
      setDeletingId(null);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: ["noticias"] });
    try {
      await deleteNoticiaImages({ data: { urls: [noticia.capa_url] } });
      setMessage({ type: "success", text: "Notícia e imagem de capa excluídas com sucesso." });
    } catch {
      setMessage({
        type: "success",
        text: "Notícia excluída. A limpeza da imagem armazenada não pôde ser confirmada.",
      });
    }
    setDeletingId(null);
  }

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-semibold text-primary">Notícias</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Cadastre e publique as notícias exibidas na página pública da AEIFI.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          disabled={busy || formOpen}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground shadow-sm transition-all hover:bg-secondary/90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" /> Adicionar notícia
        </button>
      </div>

      {message ? (
        <p
          className={`mt-4 text-sm font-medium ${message.type === "error" ? "text-destructive" : "text-green-700"}`}
          aria-live="polite"
        >
          {message.text}
        </p>
      ) : null}

      {formOpen ? (
        <form onSubmit={submit} className="mt-6 grid min-w-0 gap-5 border border-border bg-muted/30 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-lg font-semibold text-primary">
              {editing ? "Editar notícia" : "Nova notícia"}
            </h3>
            <button
              type="button"
              onClick={closeForm}
              disabled={busy}
              aria-label="Fechar formulário"
              className="inline-flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-primary disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium text-primary md:col-span-2">
              Título
              <input
                required
                maxLength={180}
                value={form.titulo}
                onChange={(event) =>
                  setForm((current) => ({ ...current, titulo: event.target.value }))
                }
                className={inputClass}
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-primary md:col-span-2">
              Subtítulo
              <textarea
                required
                rows={2}
                maxLength={320}
                value={form.subtitulo}
                onChange={(event) =>
                  setForm((current) => ({ ...current, subtitulo: event.target.value }))
                }
                className={inputClass}
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-primary">
              Data da notícia
              <input
                required
                type="date"
                value={form.dataNoticia}
                onChange={(event) =>
                  setForm((current) => ({ ...current, dataNoticia: event.target.value }))
                }
                className={inputClass}
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-primary">
              Categoria
              <input
                required
                maxLength={80}
                list="noticia-categorias"
                value={form.categoria}
                onChange={(event) =>
                  setForm((current) => ({ ...current, categoria: event.target.value }))
                }
                className={inputClass}
              />
              <datalist id="noticia-categorias">
                <option value="Projetos" />
                <option value="Capacitação" />
                <option value="Parcerias" />
                <option value="Eventos" />
                <option value="Institucional" />
              </datalist>
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-primary">
              Status
              <select
                value={form.status}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    status: event.target.value as NoticiaStatus,
                  }))
                }
                className={inputClass}
              >
                <option value="publicado">Publicado</option>
                <option value="rascunho">Rascunho</option>
              </select>
            </label>
            <div className="grid gap-2 text-sm font-medium text-primary">
              <span>Capa {editing ? "(opcional para substituir)" : ""}</span>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                required={!editing}
                disabled={busy}
                onChange={(event) => chooseImage(event.target.files?.[0])}
                className={inputClass}
              />
              <span className="text-xs font-normal text-muted-foreground">
                JPG, JPEG, PNG ou WEBP, até 5 MB.
              </span>
              {form.imagePreview ? (
                <img
                  src={form.imagePreview}
                  alt="Preview da capa da notícia"
                  className="mt-1 aspect-[16/9] w-full max-w-sm border border-border object-cover"
                />
              ) : null}
            </div>
            <label className="grid gap-1.5 text-sm font-medium text-primary md:col-span-2">
              Texto
              <textarea
                required
                rows={12}
                maxLength={50000}
                value={form.texto}
                onChange={(event) =>
                  setForm((current) => ({ ...current, texto: event.target.value }))
                }
                className={inputClass}
                placeholder="Separe os parágrafos com uma linha em branco."
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-primary md:col-span-2">
              Links das fontes
              <textarea
                rows={4}
                value={form.fontes}
                onChange={(event) =>
                  setForm((current) => ({ ...current, fontes: event.target.value }))
                }
                className={inputClass}
                placeholder={"https://exemplo.com/fonte-1\nhttps://exemplo.com/fonte-2"}
              />
              <span className="text-xs font-normal text-muted-foreground">
                Opcional. Informe um link completo por linha; eles aparecerão ao fim da notícia.
              </span>
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "Enviando e salvando…" : editing ? "Salvar alterações" : "Cadastrar notícia"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              disabled={busy}
              className="rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-primary shadow-sm hover:bg-muted disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : null}

      <div className="mt-6">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Carregando notícias…</p>
        ) : isError ? (
          <p className="text-sm text-destructive">
            Não foi possível carregar a listagem. Verifique seu acesso de administrador.
          </p>
        ) : noticias.length === 0 ? (
          <p className="border border-dashed border-border bg-muted/30 px-4 py-5 text-sm text-muted-foreground">
            Nenhuma notícia administrável cadastrada.
          </p>
        ) : (
          <ul className="grid gap-3">
            {noticias.map((noticia) => (
              <li
                key={noticia.id}
                className="grid min-w-0 gap-4 border border-border bg-card p-4 shadow-sm sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-center lg:grid-cols-[7rem_minmax(0,1fr)_auto]"
              >
                <img
                  {...responsiveImageProps(noticia.capa_url, "112px")}
                  alt=""
                  className="aspect-[16/9] w-28 border border-border object-cover"
                />
                <div className="min-w-0">
                  <h3 className="break-words font-semibold text-primary">{noticia.titulo}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {noticia.subtitulo}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatarDataNoticia(noticia.data_noticia)}</span>
                    <span aria-hidden="true">·</span>
                    <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                      {noticia.categoria}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={`font-semibold ${noticia.status === "publicado" ? "text-green-700" : "text-amber-700"}`}
                    >
                      {noticia.status === "publicado" ? "Publicado" : "Rascunho"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:col-span-2 lg:col-span-1 lg:justify-end">
                  <button
                    type="button"
                    onClick={() => openEdit(noticia)}
                    disabled={busy || deletingId !== null}
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-semibold text-primary hover:bg-muted disabled:opacity-50 sm:flex-none"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Editar
                  </button>
                  {noticia.status === "publicado" ? (
                    <a
                      href={`/noticias/${noticia.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-semibold text-secondary hover:bg-muted sm:flex-none"
                    >
                      Ver <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => void remove(noticia)}
                    disabled={busy || deletingId !== null}
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-md border border-destructive/30 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 disabled:opacity-50 sm:flex-none"
                  >
                    <Trash2 className="h-3.5 w-3.5" />{" "}
                    {deletingId === noticia.id ? "Excluindo…" : "Excluir"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
