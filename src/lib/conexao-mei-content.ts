import { supabase } from "@/integrations/supabase/client";
import type {
  ConexaoMeiDocumentoRow,
  ConexaoMeiEtapaRow,
  ConexaoMeiEventoRow,
  ConexaoMeiExpositorRow,
  ConexaoMeiParceiroRow,
} from "@/integrations/supabase/types";

export type ConexaoMeiPublicData = {
  evento: ConexaoMeiEventoRow;
  etapas: ConexaoMeiEtapaRow[];
  documentos: ConexaoMeiDocumentoRow[];
  parceiros: ConexaoMeiParceiroRow[];
  expositores: ConexaoMeiExpositorRow[];
};

export function conexaoMeiModules(evento?: ConexaoMeiEventoRow | null) {
  const raw = evento?.modulos;
  const value = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  return {
    documentos: value["documentos"] !== false,
    parceiros: value["parceiros"] !== false,
    expositores: value["expositores"] !== false,
    interesse: value["interesse"] !== false,
  };
}

export async function getConexaoMeiPublicData(): Promise<ConexaoMeiPublicData> {
  const [evento, etapas, documentos, parceiros, expositores] = await Promise.all([
    supabase.from("conexao_mei_evento").select("*").eq("id", true).single(),
    supabase.from("conexao_mei_etapas").select("*").order("ordem"),
    supabase
      .from("conexao_mei_documentos")
      .select("*")
      .eq("visivel", true)
      .order("created_at", { ascending: false }),
    supabase.from("conexao_mei_parceiros").select("*").eq("visivel", true).order("created_at"),
    supabase
      .from("conexao_mei_expositores")
      .select("*")
      .eq("status", "Confirmado")
      .order("created_at"),
  ]);
  // Core settings must load; optional modules must not replace configured stages with fallbacks.
  const coreError = evento.error ?? etapas.error;
  if (coreError || !evento.data) throw coreError ?? new Error("Dados do evento indisponíveis.");
  for (const [module, error] of [
    ["documentos", documentos.error],
    ["parceiros", parceiros.error],
    ["expositores", expositores.error],
  ] as const) {
    if (error) console.error(`[Conexão MEI] Não foi possível carregar ${module}.`, error);
  }
  return {
    evento: evento.data,
    etapas: etapas.data ?? [],
    documentos: documentos.error ? [] : (documentos.data ?? []),
    parceiros: parceiros.error ? [] : (parceiros.data ?? []),
    expositores: expositores.error ? [] : (expositores.data ?? []),
  };
}

export function conexaoMeiFileUrl(path: string) {
  return `/api/public/arquivo/${path.split("/").map(encodeURIComponent).join("/")}`;
}
