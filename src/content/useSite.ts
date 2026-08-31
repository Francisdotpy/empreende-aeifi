import { useQuery } from "@tanstack/react-query";
import { tryGetSupabase } from "@/integrations/supabase/client";
import {
  TBD,
  depoimentos as depoimentosBase,
  diretoria as diretoriaBase,
  documentos as documentosBase,
  impacto as impactoBase,
  iniciativas as iniciativasBase,
  org as orgBase,
} from "@/content/site";

export type Overrides = Record<string, string>;

export const WHATSAPP_CONTACTS_KEY = "whatsapp.contatos";

export type WhatsAppContact = {
  nome: string;
  funcao: string;
  numero: string;
};

export function parseWhatsAppContacts(value: string): WhatsAppContact[] {
  if (!value.trim()) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((entry) => {
      if (!entry || typeof entry !== "object") return [];
      const contact = entry as Partial<WhatsAppContact>;
      const nome = typeof contact.nome === "string" ? contact.nome.trim() : "";
      const funcao = typeof contact.funcao === "string" ? contact.funcao.trim() : "";
      const numero = typeof contact.numero === "string" ? contact.numero.replace(/\D/g, "") : "";
      if (!nome || !funcao || numero.length < 10 || numero.length > 15) return [];
      return [{ nome, funcao, numero }];
    });
  } catch {
    return [];
  }
}

export const siteContentQuery = {
  queryKey: ["site_content"],
  queryFn: async (): Promise<Overrides> => {
    let data: { key: string; value: string | null }[] | null = null;
    try {
      const client = tryGetSupabase();
      if (!client) return {};
      const result = await client.from("site_content").select("key,value");
      if (result.error) throw result.error;
      data = result.data;
    } catch (error) {
      console.error("[Supabase] Could not load public site content.", error);
      return {};
    }
    const map: Overrides = {};
    for (const row of data ?? []) {
      if (row.value && row.value.trim()) map[row.key] = row.value.trim();
    }
    return map;
  },
  staleTime: 60_000,
};

export type FieldKind = "text" | "multiline" | "file" | "image";

export type EditableField = {
  group: string;
  key: string;
  label: string;
  multiline?: boolean;
  kind?: FieldKind;
};

const orgDefaults = orgBase ?? {
  razaoSocial: TBD,
  cnpj: TBD,
  fundacao: TBD,
  sede: TBD,
  telefone: TBD,
  whatsapp: TBD,
  email: TBD,
  horario: TBD,
  redes: [],
};
const impactoItems = Array.isArray(impactoBase) ? impactoBase : [];
const diretoriaItems = Array.isArray(diretoriaBase) ? diretoriaBase : [];
const documentosItems = Array.isArray(documentosBase) ? documentosBase : [];
const depoimentosItems = Array.isArray(depoimentosBase) ? depoimentosBase : [];
const iniciativasItems = Array.isArray(iniciativasBase) ? iniciativasBase : [];

/** Lista de campos editáveis na área administrativa. */
export const editableFields: EditableField[] = [
  {
    group: "Página inicial",
    key: "home.imagemPrincipal",
    label: "Imagem do destaque inicial",
    kind: "image",
  },
  { group: "Identificação", key: "org.razaoSocial", label: "Razão social" },
  { group: "Identificação", key: "org.cnpj", label: "CNPJ" },
  { group: "Identificação", key: "org.fundacao", label: "Data de fundação" },
  {
    group: "Identificação",
    key: "org.historia",
    label: "História, marcos e conquistas",
    multiline: true,
  },
  { group: "Contato", key: "org.sede", label: "Endereço da sede" },
  { group: "Contato", key: "org.telefone", label: "Telefone" },
  { group: "Contato", key: "org.whatsapp", label: "WhatsApp" },
  { group: "Contato", key: "org.email", label: "E-mail" },
  { group: "Contato", key: "org.horario", label: "Horário de atendimento" },
  { group: "Redes sociais", key: "org.redes.0", label: "Instagram (URL)" },
  { group: "Redes sociais", key: "org.redes.1", label: "Facebook (URL)" },
  ...impactoItems.map((i, idx) => ({
    group: "Números de impacto",
    key: `impacto.${idx}`,
    label: i.rotulo,
  })),
  ...diretoriaItems.map((d) => ({ group: "Diretoria", key: `diretoria.${d.id}`, label: d.cargo })),

  ...documentosItems.map((d, idx) => ({
    group: "Transparência (situação dos documentos)",
    key: `documentos.${idx}`,
    label: d.nome,
  })),
  ...documentosItems.map((d, idx) => ({
    group: "Transparência (arquivos)",
    key: `documentos.${idx}.arquivo`,
    label: `${d.nome} — arquivo (PDF/imagem)`,
    kind: "file" as const,
  })),
  {
    group: "Transparência (arquivos)",
    key: "relatorios.atividades.arquivo",
    label: "Relatório anual de atividades — arquivo",
    kind: "file",
  },
  {
    group: "Transparência (arquivos)",
    key: "relatorios.contas.arquivo",
    label: "Prestação de contas — arquivo",
    kind: "file",
  },
  {
    group: "Depoimentos",
    key: "depoimentos.0.texto",
    label: "Depoimento 1 — texto",
    multiline: true,
  },
  { group: "Depoimentos", key: "depoimentos.0.autor", label: "Depoimento 1 — autor" },
  { group: "Depoimentos", key: "depoimentos.0.negocio", label: "Depoimento 1 — negócio" },
  {
    group: "Depoimentos",
    key: "depoimentos.1.texto",
    label: "Depoimento 2 — texto",
    multiline: true,
  },
  { group: "Depoimentos", key: "depoimentos.1.autor", label: "Depoimento 2 — autor" },
  { group: "Depoimentos", key: "depoimentos.1.negocio", label: "Depoimento 2 — negócio" },
  ...iniciativasItems.flatMap((i) => [
    {
      group: "Iniciativas",
      key: `iniciativas.${i.slug}.resultados`,
      label: `${i.titulo} — resultados`,
      multiline: true,
    },
    {
      group: "Iniciativas",
      key: `iniciativas.${i.slug}.parceiros`,
      label: `${i.titulo} — parceiros envolvidos`,
      multiline: true,
    },
    {
      group: "Iniciativas",
      key: `iniciativas.${i.slug}.foto`,
      label: `${i.titulo} — foto`,
      kind: "image" as const,
    },
  ]),
  {
    group: "BuscaMEI",
    key: "buscamei.regras",
    label: "Regras de participação e documentos exigidos",
    multiline: true,
  },
  { group: "BuscaMEI", key: "buscamei.cadastrados", label: "Empreendedores cadastrados" },
  { group: "BuscaMEI", key: "buscamei.categorias", label: "Categorias de atividade" },
  { group: "BuscaMEI", key: "buscamei.buscas", label: "Buscas realizadas" },
  {
    group: "Parceiros",
    key: "parceiros.lista",
    label: "Relação de parceiros e escopo das parcerias",
    multiline: true,
  },
  {
    group: "Associe-se",
    key: "associe.contribuicao",
    label: "Contribuição associativa (valores e condições)",
    multiline: true,
  },
];

function pick(map: Overrides, key: string, fallback: string) {
  return map[key] ?? fallback;
}

export function buildSite(map: Overrides) {
  return {
    org: {
      ...orgDefaults,
      razaoSocial: pick(map, "org.razaoSocial", orgDefaults.razaoSocial),
      cnpj: pick(map, "org.cnpj", orgDefaults.cnpj),
      fundacao: pick(map, "org.fundacao", orgDefaults.fundacao),
      sede: pick(map, "org.sede", orgDefaults.sede),
      telefone: pick(map, "org.telefone", orgDefaults.telefone),
      whatsapp: pick(map, "org.whatsapp", orgDefaults.whatsapp),
      email: pick(map, "org.email", orgDefaults.email),
      horario: pick(map, "org.horario", orgDefaults.horario),
      redes: orgDefaults.redes.map((r, idx) => ({ ...r, url: pick(map, `org.redes.${idx}`, r.url) })),
    },
    impacto: impactoItems.map((i, idx) => ({ ...i, valor: pick(map, `impacto.${idx}`, i.valor) })),
    diretoria: diretoriaItems.map((d) => ({ ...d, nome: pick(map, `diretoria.${d.id}`, d.nome) })),
    documentos: documentosItems.map((d, idx) => ({
      ...d,
      situacao: pick(map, `documentos.${idx}`, d.situacao),
    })),
    depoimentos: depoimentosItems.map((d, idx) => ({
      texto: pick(map, `depoimentos.${idx}.texto`, d.texto),
      autor: pick(map, `depoimentos.${idx}.autor`, d.autor),
      negocio: pick(map, `depoimentos.${idx}.negocio`, d.negocio),
    })),
    /** Valor bruto de qualquer chave editável (string vazia quando não preenchida). */
    get: (key: string) => map[key] ?? "",
  };
}

export function isPending(value: string) {
  return value === TBD;
}

export function useSite() {
  const { data } = useQuery(siteContentQuery);
  return buildSite(data ?? {});
}
