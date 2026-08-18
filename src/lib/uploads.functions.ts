import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type UploadInput = { name: string; contentType: string; dataBase64: string };

export const uploadSiteFile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: UploadInput) => {
    if (!data?.name || !data?.dataBase64) throw new Error("Arquivo inválido");
    return data;
  })
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError || !isAdmin) throw new Error("Sem permissão para enviar arquivos.");

    const bytes = Buffer.from(data.dataBase64, "base64");
    if (bytes.byteLength > 8 * 1024 * 1024) throw new Error("Arquivo maior que 8 MB.");

    const safeName = data.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9._-]/g, "-")
      .slice(-80);
    const path = `${Date.now()}-${safeName}`;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage
      .from("arquivos")
      .upload(path, bytes, { contentType: data.contentType || "application/octet-stream", upsert: true });
    if (error) throw new Error(error.message);

    return { url: `/api/public/arquivo/${path}` };
  });
