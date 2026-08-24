import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const associationRequestSchema = z.object({
  nome: z.string().trim().min(1).max(160),
  cnpj: z.string().trim().min(1).max(30),
  telefone: z.string().trim().min(1).max(40),
});

const RECIPIENT = "aeififoz@gmail.com";

export const sendAssociationRequest = createServerFn({ method: "POST" })
  .validator(associationRequestSchema)
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    const from = process.env["RESEND_FROM_EMAIL"];

    if (!apiKey || !from) {
      console.error("[Association] Missing RESEND_API_KEY or RESEND_FROM_EMAIL.");
      throw new Error("O envio de solicitações ainda não está configurado.");
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [RECIPIENT],
        subject: "Nova solicitação de associação",
        text: [
          "Nova solicitação de associação recebida pelo site da AEIFI.",
          "",
          `Nome: ${data.nome}`,
          `CNPJ: ${data.cnpj}`,
          `Telefone/WhatsApp: ${data.telefone}`,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      console.error(`[Association] Resend returned status ${response.status}.`);
      throw new Error("Não foi possível enviar a solicitação. Tente novamente.");
    }

    return { success: true };
  });
