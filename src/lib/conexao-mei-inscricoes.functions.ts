import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const registerSchema = z.object({
  etapa: z.string().regex(/^[a-z0-9-]{2,40}$/),
  nome: z.string().trim().min(3).max(160),
  cpf: z.string().max(14),
  whatsapp: z.string().trim().min(10).max(30),
  consentimento: z.literal(true),
  website: z.string().max(200).default(""),
});
const lookupSchema = z.object({
  etapa: z.string().regex(/^[a-z0-9-]{2,40}$/),
  cpf: z.string().max(14),
  finalidade: z.enum(["etiqueta", "certificado"]),
});

function digits(value: string) {
  return value.replace(/\D/g, "");
}
function validCpf(value: string) {
  const cpf = digits(value);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  for (let size = 9; size <= 10; size++) {
    const sum = [...cpf.slice(0, size)].reduce(
      (total, digit, index) => total + Number(digit) * (size + 1 - index),
      0,
    );
    const check = ((sum * 10) % 11) % 10;
    if (check !== Number(cpf[size])) return false;
  }
  return true;
}

function secretBytes() {
  const value = process.env["CONEXAO_MEI_CPF_KEY"] ?? "";
  const bytes = new Uint8Array(Buffer.from(value, "base64"));
  if (bytes.byteLength !== 32)
    throw new Error("CONEXAO_MEI_CPF_KEY deve conter 32 bytes em base64.");
  return bytes;
}

async function deriveKey(
  info: string,
  algorithm: HmacKeyGenParams | AesKeyGenParams,
  usages: KeyUsage[],
) {
  const material = await crypto.subtle.importKey("raw", secretBytes(), "HKDF", false, [
    "deriveKey",
  ]);
  return crypto.subtle.deriveKey(
    {
      name: "HKDF",
      hash: "SHA-256",
      salt: new TextEncoder().encode("AEIFI Conexao MEI 2027"),
      info: new TextEncoder().encode(info),
    },
    material,
    algorithm,
    false,
    usages,
  );
}

async function hash(value: string) {
  const key = await deriveKey("cpf-lookup", { name: "HMAC", hash: "SHA-256", length: 256 }, [
    "sign",
  ]);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Buffer.from(signature).toString("hex");
}

async function encryptCpf(cpf: string) {
  const key = await deriveKey("cpf-encryption", { name: "AES-GCM", length: 256 }, ["encrypt"]);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(cpf),
  );
  return Buffer.concat([Buffer.from(iv), Buffer.from(encrypted)]).toString("base64");
}

export async function decryptConexaoMeiCpf(ciphertext: string) {
  const bytes = Buffer.from(ciphertext, "base64");
  const key = await deriveKey("cpf-encryption", { name: "AES-GCM", length: 256 }, ["decrypt"]);
  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: bytes.subarray(0, 12) },
    key,
    bytes.subarray(12),
  );
  return new TextDecoder().decode(plain);
}

async function allowed(scope: string, cpfHash: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.rpc("conexao_mei_allow_attempt", {
    p_scope: scope,
    p_subject_hash: cpfHash,
    p_limit: 5,
  });
  if (error || data !== true) return false;
  const { getRequest } = await import("@tanstack/react-start/server");
  const headers = getRequest().headers;
  const ip = (headers.get("cf-connecting-ip") || headers.get("x-vercel-forwarded-for") || "")
    .split(",")[0]
    ?.trim();
  if (!ip) return true;
  const ipHash = await hash(`ip:${ip}`);
  const ipCheck = await supabaseAdmin.rpc("conexao_mei_allow_attempt", {
    p_scope: `${scope}-origem`,
    p_subject_hash: ipHash,
    p_limit: 30,
  });
  return !ipCheck.error && ipCheck.data === true;
}

function registrationAvailable() {
  if (!process.env["SUPABASE_SERVICE_ROLE_KEY"]) return false;
  try {
    secretBytes();
    return true;
  } catch {
    return false;
  }
}

export const getConexaoMeiRegistrationAvailability = createServerFn({ method: "GET" }).handler(
  () => ({ available: registrationAvailable() }),
);

export const registerConexaoMeiStage = createServerFn({ method: "POST" })
  .validator((input: unknown) => registerSchema.parse(input))
  .handler(async ({ data }) => {
    if (!registrationAvailable() || data.website)
      return { ok: false as const, message: "Inscrições indisponíveis no momento." };
    const cpf = digits(data.cpf),
      phone = digits(data.whatsapp);
    if (!validCpf(cpf) || phone.length < 10 || phone.length > 15)
      return { ok: false as const, message: "Confira o CPF e o WhatsApp informados." };
    const cpfHash = await hash(cpf);
    if (!(await allowed("inscricao", cpfHash)))
      return { ok: false as const, message: "Muitas tentativas. Aguarde um minuto." };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: stage, error: stageError } = await supabaseAdmin
      .from("conexao_mei_etapas")
      .select("slug,cidade,rotulo,data,inscricoes_abertas")
      .eq("slug", data.etapa)
      .maybeSingle();
    if (stageError || !stage?.inscricoes_abertas)
      return { ok: false as const, message: "As inscrições desta etapa estão encerradas." };
    const { data: existing } = await supabaseAdmin
      .from("conexao_mei_inscricoes")
      .select("id,nome")
      .eq("etapa_slug", data.etapa)
      .eq("cpf_hash", cpfHash)
      .maybeSingle();
    if (existing)
      return {
        ok: true as const,
        message: "Inscrição já localizada. Você pode imprimir a etiqueta.",
        label: {
          id: existing.id,
          nome: existing.nome,
          cidade: stage.cidade,
          rotulo: stage.rotulo,
          data: stage.data,
        },
      };
    const encryptedCpf = await encryptCpf(cpf);
    const { data: registration, error } = await supabaseAdmin
      .from("conexao_mei_inscricoes")
      .insert({
        etapa_slug: data.etapa,
        nome: data.nome,
        cpf_hash: cpfHash,
        cpf_cifrado: encryptedCpf,
        whatsapp: data.whatsapp,
        consentimento_em: new Date().toISOString(),
      })
      .select("id,nome")
      .single();
    if (error || !registration)
      return {
        ok: false as const,
        message: "Não foi possível concluir a inscrição. Tente novamente.",
      };
    return {
      ok: true as const,
      message: "Inscrição confirmada. Você pode imprimir a etiqueta.",
      label: {
        id: registration.id,
        nome: registration.nome,
        cidade: stage.cidade,
        rotulo: stage.rotulo,
        data: stage.data,
      },
    };
  });

export const lookupConexaoMeiRegistration = createServerFn({ method: "POST" })
  .validator((input: unknown) => lookupSchema.parse(input))
  .handler(async ({ data }) => {
    if (!registrationAvailable())
      return { ok: false as const, message: "Consulta indisponível no momento." };
    const cpf = digits(data.cpf);
    if (!validCpf(cpf)) return { ok: false as const, message: "Informe um CPF válido." };
    const cpfHash = await hash(cpf);
    if (!(await allowed("consulta", cpfHash)))
      return { ok: false as const, message: "Muitas tentativas. Aguarde um minuto." };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [stageResult, registrationResult, eventResult] = await Promise.all([
      supabaseAdmin
        .from("conexao_mei_etapas")
        .select("slug,cidade,rotulo,data,certificados_liberados,carga_horaria")
        .eq("slug", data.etapa)
        .maybeSingle(),
      supabaseAdmin
        .from("conexao_mei_inscricoes")
        .select("id,nome,presenca_confirmada")
        .eq("etapa_slug", data.etapa)
        .eq("cpf_hash", cpfHash)
        .maybeSingle(),
      supabaseAdmin
        .from("conexao_mei_evento")
        .select("assinante_nome,assinante_cargo,coordenador_nome,coordenador_cargo")
        .eq("id", true)
        .maybeSingle(),
    ]);
    const stage = stageResult.data,
      registration = registrationResult.data;
    if (!stage || !registration)
      return { ok: false as const, message: "Não encontramos inscrição com este CPF nesta etapa." };
    if (
      data.finalidade === "certificado" &&
      (!stage.certificados_liberados || !registration.presenca_confirmada)
    ) {
      return {
        ok: false as const,
        message: !stage.certificados_liberados
          ? "Certificados ainda não liberados para esta etapa."
          : "Presença ainda não confirmada pela organização.",
      };
    }
    return {
      ok: true as const,
      message: "Inscrição localizada.",
      label: {
        id: registration.id,
        nome: registration.nome,
        cidade: stage.cidade,
        rotulo: stage.rotulo,
        data: stage.data,
      },
      certificate:
        data.finalidade === "certificado"
          ? {
              horas: stage.carga_horaria,
              assinanteNome: eventResult.data?.assinante_nome ?? "",
              assinanteCargo: eventResult.data?.assinante_cargo ?? "",
              coordenadorNome: eventResult.data?.coordenador_nome ?? "",
              coordenadorCargo: eventResult.data?.coordenador_cargo ?? "",
            }
          : null,
    };
  });
