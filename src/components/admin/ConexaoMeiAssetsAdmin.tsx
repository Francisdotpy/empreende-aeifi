import { useState } from "react";
import { Card } from "@/components/site/ui";
import { formControlClassName } from "@/components/site/form-styles";
import { supabase } from "@/integrations/supabase/client";
import { conexaoMeiFileUrl } from "@/lib/conexao-mei-content";
import { deleteConexaoMeiAsset, uploadConexaoMeiAsset } from "@/lib/conexao-mei-upload.functions";
import type { WorkspaceData } from "./ConexaoMeiWorkspaceAdmin";

type AssetTab = "documentos" | "parceiros" | "expositores";
type Props = { tab: AssetTab; data: WorkspaceData; onSaved: () => Promise<void> };
const button =
  "min-h-11 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50";

async function base64(file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = "";
  for (let i = 0; i < bytes.length; i += 8192)
    binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return btoa(binary);
}

async function upload(file: File, kind: AssetTab) {
  const result = await uploadConexaoMeiAsset({
    data: { kind, name: file.name, contentType: file.type, dataBase64: await base64(file) },
  });
  return result.path;
}

export function ConexaoMeiAssetsAdmin({ tab, data, onSaved }: Props) {
  if (tab === "documentos") return <DocumentsAdmin data={data} onSaved={onSaved} />;
  if (tab === "parceiros") return <PartnersAdmin data={data} onSaved={onSaved} />;
  return <ExhibitorsAdmin data={data} onSaved={onSaved} />;
}

function DocumentsAdmin({ data, onSaved }: Omit<Props, "tab">) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Projeto do Evento");
  const [date, setDate] = useState("");
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!file || !title.trim()) return;
    setBusy(true);
    setStatus("");
    let path = "";
    try {
      path = await upload(file, "documentos");
      const { error } = await supabase.from("conexao_mei_documentos").insert({
        titulo: title.trim(),
        tipo: type,
        data_publicacao: date || null,
        arquivo_path: path,
        arquivo_nome: file.name,
        visivel: visible,
      });
      if (error) throw error;
      setTitle("");
      setDate("");
      setVisible(false);
      setFile(null);
      setStatus("Documento cadastrado.");
      await onSaved();
    } catch {
      if (path) await deleteConexaoMeiAsset({ data: { path } }).catch(() => undefined);
      setStatus("Não foi possível cadastrar o documento.");
    }
    setBusy(false);
  }
  async function toggle(id: string, value: boolean) {
    const { error } = await supabase
      .from("conexao_mei_documentos")
      .update({ visivel: value })
      .eq("id", id);
    setStatus(error ? "Não foi possível alterar a publicação." : "Publicação atualizada.");
    if (!error) await onSaved();
  }
  async function remove(id: string, path: string) {
    if (!window.confirm("Excluir este documento?")) return;
    const { error } = await supabase.from("conexao_mei_documentos").delete().eq("id", id);
    if (error) {
      setStatus("Não foi possível excluir o documento.");
      return;
    }
    await deleteConexaoMeiAsset({ data: { path } }).catch(() => undefined);
    setStatus("Documento excluído.");
    await onSaved();
  }
  return (
    <Card>
      <h3 className="font-display text-xl font-bold text-primary">
        Documentos do evento e expositores
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Projeto do Evento aparece no destaque; Edital aparece na área do expositor. Os demais tipos
        ficam catalogados no painel até definirmos sua posição pública.
      </p>
      <form onSubmit={submit} className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold">
          Título
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={formControlClassName}
            maxLength={180}
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Tipo
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={formControlClassName}
          >
            {[
              "Projeto do Evento",
              "Edital",
              "Regulamento",
              "Anexo",
              "Retificação",
              "Comunicado",
              "Lista de habilitados",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Data de publicação
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={formControlClassName}
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Arquivo PDF
          <input
            type="file"
            accept="application/pdf,.pdf"
            required
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className={formControlClassName}
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} />{" "}
          Publicar na página
        </label>
        <div>
          <button type="submit" disabled={busy} className={button}>
            {busy ? "Enviando…" : "Adicionar documento"}
          </button>
        </div>
      </form>
      {status ? (
        <p role="status" className="mt-3 text-sm">
          {status}
        </p>
      ) : null}
      <div className="mt-6 grid gap-2">
        {data.documentos.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-3 text-sm"
          >
            <div>
              <b>{item.titulo}</b>
              <span className="ml-2 text-muted-foreground">{item.tipo}</span>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={item.visivel}
                  onChange={(e) => void toggle(item.id, e.target.checked)}
                />{" "}
                Público
              </label>
              {item.visivel ? (
                <a
                  href={conexaoMeiFileUrl(item.arquivo_path)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Abrir
                </a>
              ) : null}
              <button
                type="button"
                onClick={() => void remove(item.id, item.arquivo_path)}
                className="text-destructive underline"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
        {!data.documentos.length ? (
          <p className="text-sm text-muted-foreground">Nenhum documento cadastrado.</p>
        ) : null}
      </div>
    </Card>
  );
}

function PartnersAdmin({ data, onSaved }: Omit<Props, "tab">) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<"realizacao" | "parceiro" | "apoio">("parceiro");
  const [link, setLink] = useState("");
  const [stage, setStage] = useState("");
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!file || !name.trim()) return;
    setBusy(true);
    setStatus("");
    let path = "";
    try {
      path = await upload(file, "parceiros");
      const { error } = await supabase.from("conexao_mei_parceiros").insert({
        nome: name.trim(),
        categoria: category,
        link: link.trim(),
        etapa_slug: stage || null,
        visivel: visible,
        logo_path: path,
      });
      if (error) throw error;
      setName("");
      setLink("");
      setStage("");
      setVisible(false);
      setFile(null);
      setStatus("Parceiro cadastrado.");
      await onSaved();
    } catch {
      if (path) await deleteConexaoMeiAsset({ data: { path } }).catch(() => undefined);
      setStatus("Não foi possível cadastrar o parceiro.");
    }
    setBusy(false);
  }
  async function toggle(id: string, value: boolean) {
    const { error } = await supabase
      .from("conexao_mei_parceiros")
      .update({ visivel: value })
      .eq("id", id);
    setStatus(error ? "Não foi possível alterar a visibilidade." : "Visibilidade atualizada.");
    if (!error) await onSaved();
  }
  async function remove(id: string, path: string) {
    if (!window.confirm("Excluir este parceiro?")) return;
    const { error } = await supabase.from("conexao_mei_parceiros").delete().eq("id", id);
    if (error) {
      setStatus("Não foi possível excluir o parceiro.");
      return;
    }
    await deleteConexaoMeiAsset({ data: { path } }).catch(() => undefined);
    setStatus("Parceiro excluído.");
    await onSaved();
  }
  return (
    <Card>
      <h3 className="font-display text-xl font-bold text-primary">Realização, parceiros e apoio</h3>
      <form onSubmit={submit} className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold">
          Instituição
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={formControlClassName}
            maxLength={160}
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Categoria
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof category)}
            className={formControlClassName}
          >
            <option value="realizacao">Realização</option>
            <option value="parceiro">Parceiro</option>
            <option value="apoio">Apoio</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Site ou link
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className={formControlClassName}
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Etapa (opcional)
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className={formControlClassName}
          >
            <option value="">Rede geral</option>
            {data.etapas.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.cidade}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Logo
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className={formControlClassName}
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} />{" "}
          Exibir na página
        </label>
        <div className="md:col-span-2">
          <button type="submit" disabled={busy} className={button}>
            {busy ? "Enviando…" : "Adicionar parceiro"}
          </button>
        </div>
      </form>
      {status ? (
        <p role="status" className="mt-3 text-sm">
          {status}
        </p>
      ) : null}
      <div className="mt-6 grid gap-2">
        {data.parceiros.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-3 text-sm"
          >
            <div>
              <b>{item.nome}</b>
              <span className="ml-2 text-muted-foreground">
                {item.categoria}
                {item.etapa_slug
                  ? ` • ${data.etapas.find((stageItem) => stageItem.slug === item.etapa_slug)?.cidade ?? item.etapa_slug}`
                  : " • rede geral"}
              </span>
            </div>
            <div className="flex gap-3">
              <label>
                <input
                  type="checkbox"
                  checked={item.visivel}
                  onChange={(e) => void toggle(item.id, e.target.checked)}
                />{" "}
                Público
              </label>
              <button
                type="button"
                onClick={() => void remove(item.id, item.logo_path)}
                className="text-destructive underline"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
        {!data.parceiros.length ? (
          <p className="text-sm text-muted-foreground">Nenhum parceiro cadastrado.</p>
        ) : null}
      </div>
    </Card>
  );
}

function ExhibitorsAdmin({ data, onSaved }: Omit<Props, "tab">) {
  const [name, setName] = useState("");
  const [segment, setSegment] = useState("");
  const [city, setCity] = useState("");
  const [link, setLink] = useState("");
  const [statusValue, setStatusValue] = useState<"Confirmado" | "Pendente" | "Oculto">("Pendente");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!file || !name.trim() || !segment.trim()) return;
    setBusy(true);
    setStatus("");
    let path = "";
    try {
      path = await upload(file, "expositores");
      const { error } = await supabase.from("conexao_mei_expositores").insert({
        nome: name.trim(),
        segmento: segment.trim(),
        cidade: city.trim(),
        link: link.trim(),
        logo_path: path,
        status: statusValue,
      });
      if (error) throw error;
      setName("");
      setSegment("");
      setCity("");
      setLink("");
      setFile(null);
      setStatus("Expositor cadastrado.");
      await onSaved();
    } catch {
      if (path) await deleteConexaoMeiAsset({ data: { path } }).catch(() => undefined);
      setStatus("Não foi possível cadastrar o expositor.");
    }
    setBusy(false);
  }
  async function changeStatus(id: string, next: typeof statusValue) {
    const { error } = await supabase
      .from("conexao_mei_expositores")
      .update({ status: next })
      .eq("id", id);
    setStatus(error ? "Não foi possível alterar o status." : "Status atualizado.");
    if (!error) await onSaved();
  }
  async function remove(id: string, path: string) {
    if (!window.confirm("Excluir este expositor?")) return;
    const { error } = await supabase.from("conexao_mei_expositores").delete().eq("id", id);
    if (error) {
      setStatus("Não foi possível excluir o expositor.");
      return;
    }
    await deleteConexaoMeiAsset({ data: { path } }).catch(() => undefined);
    setStatus("Expositor excluído.");
    await onSaved();
  }
  return (
    <Card>
      <h3 className="font-display text-xl font-bold text-primary">Expositores</h3>
      <form onSubmit={submit} className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold">
          Empresa
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={formControlClassName}
            maxLength={160}
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Segmento
          <input
            required
            value={segment}
            onChange={(e) => setSegment(e.target.value)}
            className={formControlClassName}
            maxLength={160}
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Cidade
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={formControlClassName}
            maxLength={120}
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Site, Instagram ou WhatsApp
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className={formControlClassName}
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Logo
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className={formControlClassName}
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Status
          <select
            value={statusValue}
            onChange={(e) => setStatusValue(e.target.value as typeof statusValue)}
            className={formControlClassName}
          >
            <option>Confirmado</option>
            <option>Pendente</option>
            <option>Oculto</option>
          </select>
        </label>
        <div className="md:col-span-2">
          <button type="submit" disabled={busy} className={button}>
            {busy ? "Enviando…" : "Adicionar expositor"}
          </button>
        </div>
      </form>
      {status ? (
        <p role="status" className="mt-3 text-sm">
          {status}
        </p>
      ) : null}
      <div className="mt-6 grid gap-2">
        {data.expositores.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border p-3 text-sm"
          >
            <div>
              <b>{item.nome}</b>
              <span className="ml-2 text-muted-foreground">
                {item.segmento} • {item.cidade}
              </span>
            </div>
            <div className="flex gap-3">
              <select
                aria-label={`Status de ${item.nome}`}
                value={item.status}
                onChange={(e) => void changeStatus(item.id, e.target.value as typeof statusValue)}
                className={formControlClassName}
              >
                <option>Confirmado</option>
                <option>Pendente</option>
                <option>Oculto</option>
              </select>
              <button
                type="button"
                onClick={() => void remove(item.id, item.logo_path)}
                className="text-destructive underline"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
        {!data.expositores.length ? (
          <p className="text-sm text-muted-foreground">Nenhum expositor cadastrado.</p>
        ) : null}
      </div>
    </Card>
  );
}
