import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/site/ui";
import { formControlClassName } from "@/components/site/form-styles";
import { supabase } from "@/integrations/supabase/client";
import { claimAdmin } from "@/lib/admin.functions";
import { getConexaoMeiReport } from "@/lib/conexao-mei-report.functions";
import { printConexaoMeiCertificate, printConexaoMeiLabel } from "@/lib/conexao-mei-print";
import type {
  ConexaoMeiDocumentoRow,
  ConexaoMeiEtapaRow,
  ConexaoMeiEventoRow,
  ConexaoMeiExpositorRow,
  ConexaoMeiInscricaoRow,
  ConexaoMeiParceiroRow,
} from "@/integrations/supabase/types";
import { ConexaoMeiAdmin } from "./ConexaoMeiAdmin";
import { ConexaoMeiAssetsAdmin } from "./ConexaoMeiAssetsAdmin";

export type WorkspaceData = {
  evento: ConexaoMeiEventoRow;
  etapas: ConexaoMeiEtapaRow[];
  inscricoes: Pick<
    ConexaoMeiInscricaoRow,
    | "id"
    | "etapa_slug"
    | "nome"
    | "whatsapp"
    | "consentimento_em"
    | "presenca_confirmada"
    | "created_at"
    | "updated_at"
  >[];
  documentos: ConexaoMeiDocumentoRow[];
  parceiros: ConexaoMeiParceiroRow[];
  expositores: ConexaoMeiExpositorRow[];
};

type Tab =
  | "resumo"
  | "etapas"
  | "inscricoes"
  | "documentos"
  | "parceiros"
  | "expositores"
  | "comunicacao"
  | "configuracoes";
const tabs: Array<[Tab, string]> = [
  ["resumo", "Visão geral"],
  ["etapas", "Etapas"],
  ["inscricoes", "Inscritos e presença"],
  ["documentos", "Documentos"],
  ["parceiros", "Parceiros"],
  ["expositores", "Expositores"],
  ["comunicacao", "Comunicação"],
  ["configuracoes", "Configurações"],
];
const primaryButton =
  "min-h-11 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50";

export function ConexaoMeiWorkspaceAdmin() {
  const [tab, setTab] = useState<Tab>("resumo");
  const [data, setData] = useState<WorkspaceData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const reload = useCallback(async () => {
    const [evento, etapas, inscricoes, documentos, parceiros, expositores] = await Promise.all([
      supabase.from("conexao_mei_evento").select("*").eq("id", true).single(),
      supabase.from("conexao_mei_etapas").select("*").order("ordem"),
      supabase
        .from("conexao_mei_inscricoes")
        .select(
          "id,etapa_slug,nome,whatsapp,consentimento_em,presenca_confirmada,created_at,updated_at",
        )
        .order("created_at", { ascending: false })
        .limit(1000),
      supabase.from("conexao_mei_documentos").select("*").order("created_at", { ascending: false }),
      supabase.from("conexao_mei_parceiros").select("*").order("created_at"),
      supabase.from("conexao_mei_expositores").select("*").order("created_at"),
    ]);
    const failed =
      evento.error ??
      etapas.error ??
      inscricoes.error ??
      documentos.error ??
      parceiros.error ??
      expositores.error;
    if (failed || !evento.data) throw failed ?? new Error("Dados do evento indisponíveis.");
    setData({
      evento: evento.data,
      etapas: etapas.data ?? [],
      inscricoes: inscricoes.data ?? [],
      documentos: documentos.data ?? [],
      parceiros: parceiros.data ?? [],
      expositores: expositores.data ?? [],
    });
    setError("");
    void queryClient.invalidateQueries({ queryKey: ["conexao-mei", "publico"] });
  }, [queryClient]);

  useEffect(() => {
    let active = true;
    claimAdmin()
      .then(({ admin }) => {
        if (!admin) throw new Error("Acesso administrativo não autorizado.");
        return reload();
      })
      .catch(() => {
        if (active)
          setError(
            "Não foi possível carregar a gestão do Conexão MEI. Confirme a migration e o acesso administrativo.",
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [reload]);

  async function refresh() {
    try {
      await reload();
    } catch {
      setError("Não foi possível atualizar os dados do evento.");
    }
  }

  return (
    <div className="grid gap-6">
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-primary">
              Gestão do Conexão MEI 2027
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Conteúdo, etapas, inscrições, presença e comunicação em um único espaço.
            </p>
          </div>
          <Link
            to="/conexaomei"
            target="_blank"
            className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-primary"
          >
            Ver página pública ↗
          </Link>
        </div>
        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Seções do Conexão MEI">
          {tabs.map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              aria-current={tab === key ? "page" : undefined}
              className={`min-h-10 rounded-lg px-3 py-2 text-sm font-semibold ${tab === key ? "bg-primary text-primary-foreground" : "border border-border text-primary hover:bg-muted"}`}
            >
              {label}
            </button>
          ))}
        </nav>
      </Card>
      {loading ? <Card>Carregando gestão do evento…</Card> : null}
      {error ? (
        <Card>
          <p role="alert" className="text-destructive">
            {error}
          </p>
          <button type="button" onClick={refresh} className={`${primaryButton} mt-4`}>
            Tentar novamente
          </button>
        </Card>
      ) : null}
      {data && tab === "resumo" ? <Summary data={data} /> : null}
      {data && tab === "etapas" ? <StagesEditor stages={data.etapas} onSaved={refresh} /> : null}
      {data && tab === "inscricoes" ? <RegistrationsEditor data={data} onSaved={refresh} /> : null}
      {data && ["documentos", "parceiros", "expositores"].includes(tab) ? (
        <ConexaoMeiAssetsAdmin
          tab={tab as "documentos" | "parceiros" | "expositores"}
          data={data}
          onSaved={refresh}
        />
      ) : null}
      {tab === "comunicacao" ? <ConexaoMeiAdmin /> : null}
      {data && tab === "configuracoes" ? (
        <EventSettingsEditor evento={data.evento} onSaved={refresh} />
      ) : null}
    </div>
  );
}

function Summary({ data }: { data: WorkspaceData }) {
  const boxes = [
    ["Etapas", data.etapas.length],
    ["Inscrições", data.inscricoes.length],
    ["Presenças confirmadas", data.inscricoes.filter((item) => item.presenca_confirmada).length],
    ["Documentos publicados", data.documentos.filter((item) => item.visivel).length],
    ["Parceiros publicados", data.parceiros.filter((item) => item.visivel).length],
    [
      "Expositores confirmados",
      data.expositores.filter((item) => item.status === "Confirmado").length,
    ],
  ] as const;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {boxes.map(([label, value]) => (
        <Card key={label}>
          <strong className="block text-3xl text-primary">{value}</strong>
          <span className="text-sm text-muted-foreground">{label}</span>
        </Card>
      ))}
    </div>
  );
}

function StagesEditor({
  stages,
  onSaved,
}: {
  stages: ConexaoMeiEtapaRow[];
  onSaved: () => Promise<void>;
}) {
  const [slug, setSlug] = useState(stages[0]?.slug ?? "");
  const [draft, setDraft] = useState<ConexaoMeiEtapaRow | null>(stages[0] ?? null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  useEffect(() => {
    setDraft(stages.find((item) => item.slug === slug) ?? stages[0] ?? null);
  }, [stages, slug]);
  if (!draft) return <Card>Nenhuma etapa cadastrada.</Card>;
  const update = (fields: Partial<ConexaoMeiEtapaRow>) =>
    setDraft((current) => (current ? { ...current, ...fields } : current));
  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setStatus("");
    const { error } = await supabase
      .from("conexao_mei_etapas")
      .update({
        data: draft!.data,
        local_nome: draft!.local_nome,
        endereco: draft!.endereco,
        programacao: draft!.programacao,
        inscricoes_abertas: draft!.inscricoes_abertas,
        certificados_liberados: draft!.certificados_liberados,
        carga_horaria: draft!.carga_horaria,
      })
      .eq("slug", draft!.slug);
    setStatus(error ? "Não foi possível salvar a etapa." : "Etapa salva e publicada.");
    if (!error) await onSaved();
    setSaving(false);
  }
  return (
    <Card>
      <h3 className="font-display text-xl font-bold text-primary">Etapas, locais e programação</h3>
      <form onSubmit={save} className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold">
          Etapa
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className={formControlClassName}
          >
            {stages.map((stage) => (
              <option key={stage.slug} value={stage.slug}>
                {stage.cidade}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Data
          <input
            type="date"
            value={draft.data}
            onChange={(e) => update({ data: e.target.value })}
            className={formControlClassName}
            required
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Nome do local
          <input
            value={draft.local_nome}
            onChange={(e) => update({ local_nome: e.target.value })}
            className={formControlClassName}
            placeholder="Local a definir"
            maxLength={180}
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Endereço
          <input
            value={draft.endereco}
            onChange={(e) => update({ endereco: e.target.value })}
            className={formControlClassName}
            maxLength={300}
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold md:col-span-2">
          Programação (uma atividade por linha; opcional: horário | atividade)
          <textarea
            rows={6}
            value={draft.programacao}
            onChange={(e) => update({ programacao: e.target.value })}
            className={formControlClassName}
            maxLength={6000}
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Carga horária do certificado
          <input
            value={draft.carga_horaria}
            onChange={(e) => update({ carga_horaria: e.target.value })}
            className={formControlClassName}
            maxLength={60}
          />
        </label>
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={draft.inscricoes_abertas}
              onChange={(e) => update({ inscricoes_abertas: e.target.checked })}
            />{" "}
            Inscrições abertas
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={draft.certificados_liberados}
              onChange={(e) => update({ certificados_liberados: e.target.checked })}
            />{" "}
            Liberar certificados
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:col-span-2">
          <button type="submit" disabled={saving} className={primaryButton}>
            {saving ? "Salvando…" : "Salvar etapa"}
          </button>
          <a
            href={`/conexaomei?etapa=${encodeURIComponent(draft.slug)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-primary"
          >
            Ver página da etapa ↗
          </a>
          {status ? (
            <span role="status" className="text-sm">
              {status}
            </span>
          ) : null}
        </div>
      </form>
    </Card>
  );
}

function RegistrationsEditor({
  data,
  onSaved,
}: {
  data: WorkspaceData;
  onSaved: () => Promise<void>;
}) {
  const [stage, setStage] = useState(data.etapas[0]?.slug ?? "");
  const [filter, setFilter] = useState<"todos" | "presentes" | "pendentes">("todos");
  const [exporting, setExporting] = useState(false);
  const [status, setStatus] = useState("");
  const registrations = data.inscricoes.filter((item) => item.etapa_slug === stage);
  const selectedStage = data.etapas.find((item) => item.slug === stage);
  function labelFor(item: WorkspaceData["inscricoes"][number]) {
    if (!selectedStage) return null;
    return {
      id: item.id,
      nome: item.nome,
      cidade: selectedStage.cidade,
      rotulo: selectedStage.rotulo,
      data: selectedStage.data,
    };
  }
  async function mark(id: string, value: boolean) {
    const { error } = await supabase
      .from("conexao_mei_inscricoes")
      .update({ presenca_confirmada: value })
      .eq("id", id);
    setStatus(error ? "Não foi possível atualizar a presença." : "Presença atualizada.");
    if (!error) await onSaved();
  }
  async function remove(id: string) {
    if (!window.confirm("Excluir esta inscrição? Esta ação não poderá ser desfeita.")) return;
    const { error } = await supabase.from("conexao_mei_inscricoes").delete().eq("id", id);
    setStatus(error ? "Não foi possível excluir a inscrição." : "Inscrição excluída.");
    if (!error) await onSaved();
  }
  const escapeHtml = (value: string) =>
    value.replace(
      /[&<>"']/g,
      (char) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char,
    );
  const escapeXml = (value: string) => escapeHtml(value).replace(/&#39;/g, "&apos;");
  async function exportReport(format: "pdf" | "excel") {
    const popup = format === "pdf" ? window.open("", "_blank", "width=1100,height=800") : null;
    if (popup) {
      popup.opener = null;
      popup.document.write("<p>Preparando relatório…</p>");
    }
    setExporting(true);
    setStatus("");
    try {
      const result = await getConexaoMeiReport({ data: { etapa: stage, filtro: filter } });
      const date = result.stage.data.split("-").reverse().join("/");
      if (format === "pdf") {
        if (!popup) throw new Error("O navegador bloqueou a janela de impressão.");
        const rows = result.rows
          .map(
            (row, index) =>
              `<tr><td>${index + 1}</td><td>${escapeHtml(row.nome)}</td><td>${escapeHtml(row.cpf)}</td><td>${escapeHtml(row.whatsapp)}</td><td>${new Date(row.createdAt).toLocaleDateString("pt-BR")}</td><td>${row.presente ? "Confirmada" : "Pendente"}</td><td>${escapeHtml(row.id)}</td></tr>`,
          )
          .join("");
        const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Relatório Conexão MEI</title><style>@page{size:A4 landscape;margin:12mm}body{font-family:Arial,sans-serif;color:#1e293b}h1{color:#063f78}table{width:100%;border-collapse:collapse;font-size:10px}th{background:#063f78;color:white;text-align:left}th,td{padding:7px;border-bottom:1px solid #dbe5ee}@media print{button{display:none}}</style></head><body><button onclick="window.print()">IMPRIMIR / SALVAR EM PDF</button><h1>Participantes — ${escapeHtml(result.stage.cidade)}</h1><p>${escapeHtml(date)} • ${escapeHtml(filter)} • ${result.rows.length} participantes</p><table><thead><tr><th>#</th><th>Nome</th><th>CPF</th><th>WhatsApp</th><th>Inscrição</th><th>Presença</th><th>Código</th></tr></thead><tbody>${rows}</tbody></table></body></html>`;
        popup.document.open();
        popup.document.write(html);
        popup.document.close();
        popup.focus();
        setTimeout(() => popup.print(), 500);
      } else {
        const header = [
          "Nº",
          "Nome",
          "CPF",
          "WhatsApp",
          "Data da inscrição",
          "Presença",
          "Código da inscrição",
          "Etapa",
          "Data do evento",
        ];
        const values = result.rows.map((row, index) => [
          String(index + 1),
          row.nome,
          row.cpf,
          row.whatsapp,
          new Date(row.createdAt).toLocaleDateString("pt-BR"),
          row.presente ? "Confirmada" : "Pendente",
          row.id,
          result.stage.cidade,
          date,
        ]);
        const rowXml = (cells: string[]) =>
          `<Row>${cells.map((cell) => `<Cell><Data ss:Type="String">${escapeXml(cell)}</Data></Cell>`).join("")}</Row>`;
        const xml = `<?xml version="1.0" encoding="UTF-8"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Worksheet ss:Name="Participantes"><Table>${rowXml(header)}${values.map(rowXml).join("")}</Table></Worksheet></Workbook>`;
        const url = URL.createObjectURL(
          new Blob([xml], { type: "application/vnd.ms-excel;charset=utf-8" }),
        );
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `conexao-mei-${stage}-${filter}.xls`;
        anchor.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
      setStatus("Relatório preparado.");
    } catch (error) {
      popup?.close();
      setStatus(error instanceof Error ? error.message : "Não foi possível gerar o relatório.");
    }
    setExporting(false);
  }
  return (
    <Card>
      <h3 className="font-display text-xl font-bold text-primary">Inscritos e presença</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        A lista não carrega CPFs; eles são disponibilizados somente nos relatórios administrativos
        solicitados sob demanda.
      </p>
      <label className="mt-5 grid max-w-sm gap-1 text-sm font-semibold">
        Etapa
        <select
          value={stage}
          onChange={(e) => setStage(e.target.value)}
          className={formControlClassName}
        >
          {data.etapas.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.cidade}
            </option>
          ))}
        </select>
      </label>
      {status ? (
        <p role="status" className="mt-3 text-sm">
          {status}
        </p>
      ) : null}
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="p-2">Nome</th>
              <th className="p-2">WhatsApp</th>
              <th className="p-2">Inscrição</th>
              <th className="p-2">Presença</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((item) => (
              <tr key={item.id} className="border-b border-border">
                <td className="p-2 font-semibold">{item.nome}</td>
                <td className="p-2">{item.whatsapp}</td>
                <td className="p-2">{new Date(item.created_at).toLocaleDateString("pt-BR")}</td>
                <td className="p-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.presenca_confirmada}
                      onChange={(e) => void mark(item.id, e.target.checked)}
                    />{" "}
                    Confirmada
                  </label>
                </td>
                <td className="p-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const label = labelFor(item);
                        if (label) void printConexaoMeiLabel(label);
                      }}
                      className="text-primary underline"
                    >
                      Etiqueta
                    </button>
                    <button
                      type="button"
                      disabled={!selectedStage?.certificados_liberados || !item.presenca_confirmada}
                      onClick={() => {
                        const label = labelFor(item);
                        if (!label || !selectedStage) return;
                        printConexaoMeiCertificate(label, {
                          horas: selectedStage.carga_horaria,
                          assinanteNome: data.evento.assinante_nome,
                          assinanteCargo: data.evento.assinante_cargo,
                          coordenadorNome: data.evento.coordenador_nome,
                          coordenadorCargo: data.evento.coordenador_cargo,
                        });
                      }}
                      className="text-primary underline disabled:opacity-40"
                    >
                      Certificado
                    </button>
                    <button
                      type="button"
                      onClick={() => void remove(item.id)}
                      className="text-destructive underline"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!registrations.length ? (
          <p className="p-4 text-sm text-muted-foreground">Nenhuma inscrição nesta etapa.</p>
        ) : null}
      </div>
      <div className="mt-7 border-t border-border pt-5">
        <h4 className="font-display text-lg font-semibold text-primary">
          Relatórios de participantes
        </h4>
        <div className="mt-3 flex flex-wrap items-end gap-3">
          <label className="grid gap-1 text-sm font-semibold">
            Filtro
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className={formControlClassName}
            >
              <option value="todos">Todos os inscritos</option>
              <option value="presentes">Presença confirmada</option>
              <option value="pendentes">Presença pendente</option>
            </select>
          </label>
          <button
            type="button"
            disabled={exporting}
            onClick={() => void exportReport("pdf")}
            className={primaryButton}
          >
            Gerar PDF
          </button>
          <button
            type="button"
            disabled={exporting}
            onClick={() => void exportReport("excel")}
            className={primaryButton}
          >
            Baixar Excel
          </button>
        </div>
      </div>
    </Card>
  );
}

function EventSettingsEditor({
  evento,
  onSaved,
}: {
  evento: ConexaoMeiEventoRow;
  onSaved: () => Promise<void>;
}) {
  const [draft, setDraft] = useState(evento);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  useEffect(() => setDraft(evento), [evento]);
  const update = (fields: Partial<ConexaoMeiEventoRow>) =>
    setDraft((current) => ({ ...current, ...fields }));
  const modules =
    draft.modulos && typeof draft.modulos === "object" && !Array.isArray(draft.modulos)
      ? draft.modulos
      : {};
  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setStatus("");
    const { error } = await supabase
      .from("conexao_mei_evento")
      .update({
        data_destaque: draft.data_destaque,
        cidade_destaque: draft.cidade_destaque,
        ano_destaque: draft.ano_destaque,
        local_nome: draft.local_nome,
        local_endereco: draft.local_endereco,
        local_complemento: draft.local_complemento,
        exibir_local: draft.exibir_local,
        whatsapp_numero: draft.whatsapp_numero,
        whatsapp_mensagem: draft.whatsapp_mensagem,
        whatsapp_ativo: draft.whatsapp_ativo,
        modulos: draft.modulos,
        assinante_nome: draft.assinante_nome,
        assinante_cargo: draft.assinante_cargo,
        coordenador_nome: draft.coordenador_nome,
        coordenador_cargo: draft.coordenador_cargo,
      })
      .eq("id", true);
    setStatus(error ? "Não foi possível salvar as configurações." : "Configurações salvas.");
    if (!error) await onSaved();
    setSaving(false);
  }
  return (
    <Card>
      <h3 className="font-display text-xl font-bold text-primary">Configurações do evento</h3>
      <form onSubmit={save} className="mt-5 grid gap-4 md:grid-cols-2">
        {(
          [
            ["data_destaque", "Data no destaque"],
            ["cidade_destaque", "Cidade no destaque"],
            ["ano_destaque", "Ano no destaque"],
            ["local_nome", "Local do encontro regional"],
            ["local_endereco", "Endereço"],
            ["local_complemento", "Complemento"],
            ["whatsapp_numero", "WhatsApp do evento"],
            ["whatsapp_mensagem", "Mensagem inicial do WhatsApp"],
            ["assinante_nome", "Nome do assinante do certificado"],
            ["assinante_cargo", "Cargo do assinante"],
            ["coordenador_nome", "Nome da coordenação"],
            ["coordenador_cargo", "Cargo da coordenação"],
          ] as Array<[keyof ConexaoMeiEventoRow, string]>
        ).map(([key, label]) => (
          <label key={key} className="grid gap-1 text-sm font-semibold">
            {label}
            <input
              value={String(draft[key] ?? "")}
              onChange={(e) => update({ [key]: e.target.value })}
              className={formControlClassName}
              maxLength={300}
            />
          </label>
        ))}
        <div className="grid gap-3 md:col-span-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={draft.exibir_local}
              onChange={(e) => update({ exibir_local: e.target.checked })}
            />{" "}
            Exibir local no destaque
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={draft.whatsapp_ativo}
              onChange={(e) => update({ whatsapp_ativo: e.target.checked })}
            />{" "}
            Exibir WhatsApp do evento
          </label>
        </div>
        <fieldset className="rounded-xl border border-border p-4 md:col-span-2">
          <legend className="px-2 font-semibold text-primary">Módulos da página</legend>
          <div className="flex flex-wrap gap-4">
            {(
              [
                ["documentos", "Documentos"],
                ["parceiros", "Parceiros"],
                ["expositores", "Expositores"],
                ["interesse", "Manifestação de interesse"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={modules[key] !== false}
                  onChange={(e) => update({ modulos: { ...modules, [key]: e.target.checked } })}
                />{" "}
                {label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="flex items-center gap-3 md:col-span-2">
          <button type="submit" disabled={saving} className={primaryButton}>
            {saving ? "Salvando…" : "Salvar configurações"}
          </button>
          {status ? (
            <span role="status" className="text-sm">
              {status}
            </span>
          ) : null}
        </div>
      </form>
    </Card>
  );
}
