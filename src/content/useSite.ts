import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  TBD,
  depoimentos as depoimentosBase,
  diretoria as diretoriaBase,
  documentos as documentosBase,
  impacto as impactoBase,
  noticias as noticiasBase,
  org as orgBase,
} from "@/content/site";

export type Overrides = Record<string, string>;

export const siteContentQuery = {
  queryKey: ["site_content"],
  queryFn: async (): Promise<Overrides> => {
    const { data, error } = await supabase.from("site_content").select("key,value");
    if (error) throw error;
    const map: Overrides = {};
    for (const row of data ?? []) {
      if (row.value && row.value.trim()) map[row.key] = row.value.trim();
    }
    return map;
  },
  staleTime: 60_000,
};

/** Lista de campos editáveis na área administrativa. */
export const editableFields: { group: string; key: string; label: string; multiline?: boolean }[] = [
  { group: "Identificação", key: "org.razaoSocial", label: "Razão social" },
  { group: "Identificação", key: "org.cnpj", label: "CNPJ" },
  { group: "Identificação", key: "org.fundacao", label: "Data de fundação" },
  { group: "Contato", key: "org.sede", label: "Endereço da sede" },
  { group: "Contato", key: "org.telefone", label: "Telefone" },
  { group: "Contato", key: "org.whatsapp", label: "WhatsApp" },
  { group: "Contato", key: "org.email", label: "E-mail" },
  { group: "Contato", key: "org.horario", label: "Horário de atendimento" },
  { group: "Redes sociais", key: "org.redes.0", label: "Instagram (URL)" },
  { group: "Redes sociais", key: "org.redes.1", label: "Facebook (URL)" },
  { group: "Redes sociais", key: "org.redes.2", label: "LinkedIn (URL)" },
  ...impactoBase.map((i, idx) => ({ group: "Números de impacto", key: `impacto.${idx}`, label: i.rotulo })),
  ...diretoriaBase.map((d, idx) => ({ group: "Diretoria", key: `diretoria.${idx}`, label: d.cargo })),
  ...documentosBase.map((d, idx) => ({
    group: "Transparência (situação dos documentos)",
    key: `documentos.${idx}`,
    label: d.nome,
  })),
  { group: "Depoimentos", key: "depoimentos.0.texto", label: "Depoimento 1 — texto", multiline: true },
  { group: "Depoimentos", key: "depoimentos.0.autor", label: "Depoimento 1 — autor" },
  { group: "Depoimentos", key: "depoimentos.0.negocio", label: "Depoimento 1 — negócio" },
  { group: "Depoimentos", key: "depoimentos.1.texto", label: "Depoimento 2 — texto", multiline: true },
  { group: "Depoimentos", key: "depoimentos.1.autor", label: "Depoimento 2 — autor" },
  { group: "Depoimentos", key: "depoimentos.1.negocio", label: "Depoimento 2 — negócio" },
  ...noticiasBase.map((n, idx) => ({
    group: "Notícias (datas)",
    key: `noticias.${idx}.data`,
    label: n.titulo,
  })),
];

function pick(map: Overrides, key: string, fallback: string) {
  return map[key] ?? fallback;
}

export function buildSite(map: Overrides) {
  return {
    org: {
      ...orgBase,
      razaoSocial: pick(map, "org.razaoSocial", orgBase.razaoSocial),
      cnpj: pick(map, "org.cnpj", orgBase.cnpj),
      fundacao: pick(map, "org.fundacao", orgBase.fundacao),
      sede: pick(map, "org.sede", orgBase.sede),
      telefone: pick(map, "org.telefone", orgBase.telefone),
      whatsapp: pick(map, "org.whatsapp", orgBase.whatsapp),
      email: pick(map, "org.email", orgBase.email),
      horario: pick(map, "org.horario", orgBase.horario),
      redes: orgBase.redes.map((r, idx) => ({ ...r, url: pick(map, `org.redes.${idx}`, r.url) })),
    },
    impacto: impactoBase.map((i, idx) => ({ ...i, valor: pick(map, `impacto.${idx}`, i.valor) })),
    diretoria: diretoriaBase.map((d, idx) => ({ ...d, nome: pick(map, `diretoria.${idx}`, d.nome) })),
    documentos: documentosBase.map((d, idx) => ({
      ...d,
      situacao: pick(map, `documentos.${idx}`, d.situacao),
    })),
    depoimentos: depoimentosBase.map((d, idx) => ({
      texto: pick(map, `depoimentos.${idx}.texto`, d.texto),
      autor: pick(map, `depoimentos.${idx}.autor`, d.autor),
      negocio: pick(map, `depoimentos.${idx}.negocio`, d.negocio),
    })),
    noticias: noticiasBase.map((n, idx) => ({ ...n, data: pick(map, `noticias.${idx}.data`, n.data) })),
  };
}

export function isPending(value: string) {
  return value === TBD;
}

export function useSite() {
  const { data } = useQuery(siteContentQuery);
  return buildSite(data ?? {});
}
