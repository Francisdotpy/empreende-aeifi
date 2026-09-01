import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, FileText, Pencil, Plus, Trash2, X } from "lucide-react";
import { Card } from "@/components/site/ui";
import { formControlClassName } from "@/components/site/form-styles";
import { responsiveImageProps } from "@/lib/responsive-images";
import { supabase } from "@/integrations/supabase/client";
import { deleteEditalFiles, uploadEditalFile } from "@/lib/uploads.functions";
import {
  editaisAdminQuery,
  formatarDataPublicacao,
  type Edital,
  type EditalStatus,
} from "@/lib/editais";

type FormState = {
  titulo: string;
  dataPublicacao: string;
  status: EditalStatus;
  imageFile: File | null;
  pdfFile: File | null;
  imagePreview: string;
};

const inputClass = formControlClassName;

function today() {
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function initialForm(edital?: Edital): FormState {
  return {
    titulo: edital?.titulo ?? "",
    dataPublicacao: edital?.data_publicacao ?? today(),
    status: edital?.status ?? "rascunho",
    imageFile: null,
    pdfFile: null,
    imagePreview: edital?.imagem_url ?? "",
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

export function EditaisAdmin() {
  const queryClient = useQueryClient();
  const { data: editais = [], isLoading, isError } = useQuery(editaisAdminQuery);
  const [editing, setEditing] = useState<Edital | null>(null);
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

  function openEdit(edital: Edital) {
    setEditing(edital);
    setForm(initialForm(edital));
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
        imagePreview: editing?.imagem_url ?? "",
      }));
      setMessage({ type: "error", text: "A imagem deve estar em JPG, JPEG, PNG ou WEBP." });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setForm((current) => ({
        ...current,
        imageFile: null,
        imagePreview: editing?.imagem_url ?? "",
      }));
      setMessage({ type: "error", text: "A imagem deve ter no máximo 5 MB." });
      return;
    }
    setMessage(null);
    setForm((current) => ({
      ...current,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));
  }

  function choosePdf(file: File | undefined) {
    if (!file) return;
    if (file.type !== "application/pdf" || file.name.split(".").pop()?.toLowerCase() !== "pdf") {
      setForm((current) => ({ ...current, pdfFile: null }));
      setMessage({ type: "error", text: "O arquivo do edital deve ser um PDF." });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setForm((current) => ({ ...current, pdfFile: null }));
      setMessage({ type: "error", text: "O PDF deve ter no máximo 10 MB." });
      return;
    }
    setMessage(null);
    setForm((current) => ({ ...current, pdfFile: file }));
  }

  async function upload(file: File, kind: "image" | "pdf") {
    return uploadEditalFile({
      data: {
        name: file.name,
        contentType: file.type,
        dataBase64: await fileToBase64(file),
        kind,
      },
    });
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    if (!form.titulo.trim() || !form.dataPublicacao) {
      setMessage({ type: "error", text: "Preencha o título e a data de publicação." });
      return;
    }
    if (!editing && (!form.imageFile || !form.pdfFile)) {
      setMessage({ type: "error", text: "Selecione a imagem de destaque e o PDF do edital." });
      return;
    }

    setBusy(true);
    setMessage(null);
    const uploaded: string[] = [];
    try {
      let imagemUrl = editing?.imagem_url ?? "";
      let pdfUrl = editing?.pdf_url ?? "";
      if (form.imageFile) {
        imagemUrl = (await upload(form.imageFile, "image")).url;
        uploaded.push(imagemUrl);
      }
      if (form.pdfFile) {
        pdfUrl = (await upload(form.pdfFile, "pdf")).url;
        uploaded.push(pdfUrl);
      }

      const payload = {
        titulo: form.titulo.trim(),
        imagem_url: imagemUrl,
        pdf_url: pdfUrl,
        data_publicacao: form.dataPublicacao,
        status: form.status,
      };
      if (editing) {
        const { error } = await supabase
          .from("downloads_editais")
          .update(payload)
          .eq("id", editing.id)
          .select("id")
          .single();
        if (error) throw error;
      } else {
        const { error } = await supabase.from("downloads_editais").insert(payload);
        if (error) throw error;
      }

      const replaced = editing
        ? [form.imageFile ? editing.imagem_url : "", form.pdfFile ? editing.pdf_url : ""].filter(
            Boolean,
          )
        : [];
      if (replaced.length)
        void deleteEditalFiles({ data: { urls: replaced } }).catch(() => undefined);

      await queryClient.invalidateQueries({ queryKey: ["editais"] });
      setFormOpen(false);
      setEditing(null);
      setForm(initialForm());
      setMessage({
        type: "success",
        text: editing ? "Edital atualizado com sucesso." : "Edital cadastrado com sucesso.",
      });
    } catch (error) {
      if (uploaded.length)
        void deleteEditalFiles({ data: { urls: uploaded } }).catch(() => undefined);
      setMessage({ type: "error", text: readableError(error) });
    } finally {
      setBusy(false);
    }
  }

  async function remove(edital: Edital) {
    const confirmed = window.confirm(
      `Excluir o edital “${edital.titulo}”? Esta ação não pode ser desfeita.`,
    );
    if (!confirmed) return;
    setDeletingId(edital.id);
    setMessage(null);
    const { error } = await supabase
      .from("downloads_editais")
      .delete()
      .eq("id", edital.id)
      .select("id")
      .single();
    if (error) {
      setMessage({ type: "error", text: "Não foi possível excluir o edital." });
      setDeletingId(null);
      return;
    }
    await queryClient.invalidateQueries({ queryKey: ["editais"] });
    try {
      await deleteEditalFiles({ data: { urls: [edital.imagem_url, edital.pdf_url] } });
      setMessage({ type: "success", text: "Edital e arquivos excluídos com sucesso." });
    } catch {
      setMessage({
        type: "success",
        text: "Edital excluído. A limpeza dos arquivos armazenados não pôde ser confirmada.",
      });
    }
    setDeletingId(null);
  }

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-semibold text-primary">Editais</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Cadastre os editais exibidos na página pública de credenciamento.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          disabled={busy || formOpen}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground shadow-sm transition-all hover:bg-secondary/90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" /> Adicionar edital
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
              {editing ? "Editar edital" : "Novo edital"}
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
            <label className="grid gap-1.5 text-sm font-medium text-primary">
              Data de publicação
              <input
                required
                type="date"
                value={form.dataPublicacao}
                onChange={(event) =>
                  setForm((current) => ({ ...current, dataPublicacao: event.target.value }))
                }
                className={inputClass}
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-primary">
              Status
              <select
                value={form.status}
                onChange={(event) =>
                  setForm((current) => ({ ...current, status: event.target.value as EditalStatus }))
                }
                className={inputClass}
              >
                <option value="publicado">Publicado</option>
                <option value="rascunho">Rascunho</option>
              </select>
            </label>
            <div className="grid gap-2 text-sm font-medium text-primary">
              <span>Imagem de destaque {editing ? "(opcional)" : ""}</span>
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
                  alt="Preview da imagem de destaque"
                  className="mt-1 aspect-[4/3] w-full max-w-xs border border-border object-cover"
                />
              ) : null}
            </div>
            <div className="grid content-start gap-2 text-sm font-medium text-primary">
              <span>Arquivo PDF {editing ? "(opcional)" : ""}</span>
              <input
                type="file"
                accept=".pdf,application/pdf"
                required={!editing}
                disabled={busy}
                onChange={(event) => choosePdf(event.target.files?.[0])}
                className={inputClass}
              />
              <span className="text-xs font-normal text-muted-foreground">PDF, até 10 MB.</span>
              {form.pdfFile ? (
                <span className="text-xs font-normal text-secondary">
                  Selecionado: {form.pdfFile.name}
                </span>
              ) : editing ? (
                <a
                  href={editing.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-normal text-secondary underline"
                >
                  Visualizar PDF atual
                </a>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "Enviando e salvando…" : editing ? "Salvar alterações" : "Cadastrar edital"}
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
          <p className="text-sm text-muted-foreground">Carregando editais…</p>
        ) : isError ? (
          <p className="text-sm text-destructive">
            Não foi possível carregar a listagem. Verifique seu acesso de administrador.
          </p>
        ) : editais.length === 0 ? (
          <p className="border border-dashed border-border bg-muted/30 px-4 py-5 text-sm text-muted-foreground">
            Nenhum edital cadastrado.
          </p>
        ) : (
          <ul className="grid gap-3">
            {editais.map((edital) => (
              <li
                key={edital.id}
                className="grid min-w-0 gap-4 border border-border bg-card p-4 shadow-sm sm:grid-cols-[5rem_minmax(0,1fr)] sm:items-center lg:grid-cols-[5rem_minmax(0,1fr)_auto]"
              >
                <img
                  {...responsiveImageProps(edital.imagem_url, "80px")}
                  alt=""
                  className="aspect-[4/3] w-20 border border-border object-cover"
                />
                <div className="min-w-0">
                  <h3 className="break-words font-semibold text-primary">{edital.titulo}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatarDataPublicacao(edital.data_publicacao)}</span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={`font-semibold ${edital.status === "publicado" ? "text-green-700" : "text-amber-700"}`}
                    >
                      {edital.status === "publicado" ? "Publicado" : "Rascunho"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:col-span-2 lg:col-span-1 lg:justify-end">
                  <button
                    type="button"
                    onClick={() => openEdit(edital)}
                    disabled={busy || deletingId !== null}
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-semibold text-primary hover:bg-muted disabled:opacity-50 sm:flex-none"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Editar
                  </button>
                  <a
                    href={edital.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-semibold text-secondary hover:bg-muted sm:flex-none"
                  >
                    <FileText className="h-3.5 w-3.5" /> PDF <ExternalLink className="h-3 w-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() => void remove(edital)}
                    disabled={busy || deletingId !== null}
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-md border border-destructive/30 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 disabled:opacity-50 sm:flex-none"
                  >
                    <Trash2 className="h-3.5 w-3.5" />{" "}
                    {deletingId === edital.id ? "Excluindo…" : "Excluir"}
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
