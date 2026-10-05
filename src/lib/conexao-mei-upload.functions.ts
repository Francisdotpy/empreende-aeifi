import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const uploadSchema = z.object({
  kind: z.enum(["documentos", "parceiros", "expositores"]),
  name: z.string().min(1).max(180),
  contentType: z.string().min(1),
  dataBase64: z.string().min(1),
});

export const uploadConexaoMeiAsset = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) => uploadSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { data: admin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!admin) throw new Error("Sem permissão para enviar arquivos.");
    const bytes = Buffer.from(data.dataBase64, "base64");
    const extension = data.name.split(".").pop()?.toLowerCase();
    if (data.kind === "documentos") {
      if (
        extension !== "pdf" ||
        data.contentType !== "application/pdf" ||
        bytes.subarray(0, 5).toString() !== "%PDF-" ||
        bytes.length > 10 * 1024 * 1024
      ) {
        throw new Error("Envie um PDF válido de até 10 MB.");
      }
    } else {
      const mime = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp" }[
        extension ?? ""
      ];
      const jpg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
      const png = bytes
        .subarray(0, 8)
        .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
      const webp =
        bytes.subarray(0, 4).toString() === "RIFF" && bytes.subarray(8, 12).toString() === "WEBP";
      const signatureMatches =
        (mime === "image/jpeg" && jpg) ||
        (mime === "image/png" && png) ||
        (mime === "image/webp" && webp);
      if (!mime || mime !== data.contentType || !signatureMatches || bytes.length > 2_500_000) {
        throw new Error("Envie uma imagem JPG, PNG ou WEBP válida de até 2,5 MB.");
      }
    }
    const safeName = data.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .slice(-80);
    const path = `conexao-mei/${data.kind}/${crypto.randomUUID()}-${safeName}`;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage
      .from("arquivos")
      .upload(path, bytes, { contentType: data.contentType, upsert: false });
    if (error) throw new Error("Não foi possível guardar o arquivo.");
    return { path };
  });

export const deleteConexaoMeiAsset = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) =>
    z.object({ path: z.string().startsWith("conexao-mei/") }).parse(input),
  )
  .handler(async ({ context, data }) => {
    const { data: admin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!admin) throw new Error("Sem permissão para excluir arquivos.");
    if (
      data.path.includes("..") ||
      !/^conexao-mei\/(documentos|parceiros|expositores)\/[^/]+$/.test(data.path)
    ) {
      throw new Error("Caminho inválido.");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage.from("arquivos").remove([data.path]);
    if (error) throw new Error("Não foi possível excluir o arquivo.");
    return { ok: true };
  });
