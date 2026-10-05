import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const CONEXAO_MEI_MODALIDADES = [
  "Participante",
  "Expositor",
  "Parceiro institucional",
  "Conteúdo / palestra",
  "Oferecer benefício aos MEIs",
  "Circuito de Oportunidades",
] as const;

const submissionSchema = z.object({
  id: z.string().uuid(),
  nome: z.string().trim().min(2).max(160),
  empresa: z.string().trim().max(160),
  telefone: z
    .string()
    .trim()
    .min(10)
    .max(30)
    .refine((value) => {
      const count = value.replace(/\D/g, "").length;
      return count >= 10 && count <= 15;
    }),
  email: z.string().trim().email().max(254),
  cidadeUf: z.string().trim().max(120),
  modalidade: z.enum(CONEXAO_MEI_MODALIDADES),
  mensagem: z.string().trim().max(3000),
  website: z.string().max(200).default(""),
});

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character] ?? character;
  });
}

export const getConexaoMeiAvailability = createServerFn({ method: "GET" }).handler(() => ({
  available: Boolean(
    process.env["RESEND_API_KEY"] &&
    process.env["CONEXAO_MEI_FROM_EMAIL"] &&
    process.env["SUPABASE_SERVICE_ROLE_KEY"],
  ),
}));

export const enviarManifestacaoConexaoMei = createServerFn({ method: "POST" })
  .validator((input: unknown) => submissionSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    const from = process.env["CONEXAO_MEI_FROM_EMAIL"];
    if (!apiKey || !from || !process.env["SUPABASE_SERVICE_ROLE_KEY"]) {
      return {
        ok: false,
        message: "O envio ainda está em configuração. Tente novamente mais tarde.",
      };
    }
    if (data.website) return { ok: false, message: "Não foi possível enviar. Tente novamente." };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: config, error: configError } = await supabaseAdmin
      .from("conexao_mei_config")
      .select("destinatario")
      .eq("id", true)
      .single();
    if (configError || !config?.destinatario) {
      console.error("[Conexão MEI] Destinatário não configurado.", configError);
      return {
        ok: false,
        message: "O envio está indisponível no momento. Tente novamente mais tarde.",
      };
    }

    const record = {
      id: data.id,
      nome: data.nome,
      empresa: data.empresa,
      telefone: data.telefone,
      email: data.email,
      cidade_uf: data.cidadeUf,
      modalidade: data.modalidade,
      mensagem: data.mensagem,
      destinatario: config.destinatario,
    };
    const { error: insertError } = await supabaseAdmin
      .from("conexao_mei_manifestacoes")
      .insert(record);
    let recipient = config.destinatario;
    if (insertError) {
      if (insertError.code === "23505") {
        const { data: existing } = await supabaseAdmin
          .from("conexao_mei_manifestacoes")
          .select("status,destinatario")
          .eq("id", data.id)
          .single();
        if (existing?.status === "enviado")
          return { ok: true, message: "Manifestação enviada com sucesso." };
        if (!existing) return { ok: false, message: "Não foi possível enviar. Tente novamente." };
        recipient = existing.destinatario;
      } else {
        console.error("[Conexão MEI] Falha ao registrar manifestação.", insertError);
        return { ok: false, message: "Não foi possível enviar. Tente novamente." };
      }
    }

    const fields: Array<[string, string]> = [
      ["Nome / responsável", data.nome],
      ["Empresa / instituição", data.empresa || "-"],
      ["Telefone / WhatsApp", data.telefone],
      ["E-mail", data.email],
      ["Cidade / UF", data.cidadeUf || "-"],
      ["Participação", data.modalidade],
      ["Como gostaria de participar?", data.mensagem || "-"],
    ];
    const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n\n");
    const html = `<h1>Nova manifestação de interesse — Conexão MEI</h1>${fields
      .map(
        ([label, value]) =>
          `<p><strong>${escapeHtml(label)}</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`,
      )
      .join("")}`;

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `conexao-mei/${data.id}`,
        },
        body: JSON.stringify({
          from,
          to: [recipient],
          reply_to: data.email,
          subject: "Nova manifestação de interesse — Conexão MEI",
          text,
          html,
        }),
      });
      if (!response.ok) {
        console.error("[Conexão MEI] Resend recusou o envio.", response.status);
        throw new Error("Resend error");
      }
      const result = (await response.json().catch(() => ({}))) as { id?: string };
      const { error: updateError } = await supabaseAdmin
        .from("conexao_mei_manifestacoes")
        .update({ status: "enviado", resend_id: result.id ?? null })
        .eq("id", data.id);
      if (updateError)
        console.error("[Conexão MEI] E-mail aceito, mas status não atualizado.", updateError);
      return { ok: true, message: "Manifestação enviada com sucesso." };
    } catch (error) {
      console.error("[Conexão MEI] Falha no envio.", error);
      await supabaseAdmin
        .from("conexao_mei_manifestacoes")
        .update({ status: "falhou" })
        .eq("id", data.id);
      return { ok: false, message: "Não foi possível enviar agora. Tente novamente." };
    }
  });
