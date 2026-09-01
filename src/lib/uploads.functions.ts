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
    const { error } = await supabaseAdmin.storage.from("arquivos").upload(path, bytes, {
      contentType: data.contentType || "application/octet-stream",
      upsert: true,
    });
    if (error) throw new Error(error.message);

    return { url: `/api/public/arquivo/${path}` };
  });

type PublicacaoUploadInput = UploadInput & { kind: "image" | "pdf" };

function safeFileName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .slice(-80);
}

function validateImage(name: string, contentType: string, bytes: Buffer) {
  const extension = name.split(".").pop()?.toLowerCase() ?? "";
  const imageTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
  };
  const expectedType = imageTypes[extension];
  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const isPng = bytes
    .subarray(0, 8)
    .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  const isWebp =
    bytes.subarray(0, 4).toString() === "RIFF" && bytes.subarray(8, 12).toString() === "WEBP";
  const hasExpectedSignature =
    (expectedType === "image/jpeg" && isJpeg) ||
    (expectedType === "image/png" && isPng) ||
    (expectedType === "image/webp" && isWebp);

  if (!expectedType || contentType !== expectedType || !hasExpectedSignature) {
    throw new Error("Envie uma imagem JPG, JPEG, PNG ou WEBP válida.");
  }
  if (bytes.byteLength > 5 * 1024 * 1024) {
    throw new Error("A imagem deve ter no máximo 5 MB.");
  }
}

export const uploadPublicacaoFile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: PublicacaoUploadInput) => {
    if (!data?.name || !data?.dataBase64 || !["image", "pdf"].includes(data.kind)) {
      throw new Error("Arquivo inválido.");
    }
    return data;
  })
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError || !isAdmin) throw new Error("Sem permissão para enviar arquivos.");

    const bytes = Buffer.from(data.dataBase64, "base64");
    const extension = data.name.split(".").pop()?.toLowerCase() ?? "";
    if (data.kind === "pdf") {
      const valid =
        extension === "pdf" &&
        data.contentType === "application/pdf" &&
        bytes.subarray(0, 5).toString() === "%PDF-";
      if (!valid) throw new Error("Envie um arquivo PDF válido.");
      if (bytes.byteLength > 10 * 1024 * 1024) throw new Error("O PDF deve ter no máximo 10 MB.");
    } else {
      validateImage(data.name, data.contentType, bytes);
    }

    const folder = data.kind === "image" ? "images" : "pdfs";
    const path = `publicacoes/${folder}/${crypto.randomUUID()}-${safeFileName(data.name)}`;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage.from("arquivos").upload(path, bytes, {
      contentType: data.contentType,
      upsert: false,
    });
    if (error) throw new Error(error.message);
    return { url: `/api/public/arquivo/${path}` };
  });

export const deletePublicacaoFiles = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { urls: string[] }) => {
    if (!Array.isArray(data?.urls) || data.urls.length > 4) throw new Error("Lista inválida.");
    return data;
  })
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError || !isAdmin) throw new Error("Sem permissão para excluir arquivos.");

    const prefix = "/api/public/arquivo/";
    const allowedPrefixes = [`${prefix}publicacoes/`, `${prefix}editais/`];
    const paths = data.urls.flatMap((url) => {
      if (!allowedPrefixes.some((allowedPrefix) => url.startsWith(allowedPrefix))) return [];
      const path = decodeURIComponent(url.slice(prefix.length));
      return path.includes("..") ? [] : [path];
    });
    if (!paths.length) return { removed: 0 };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage.from("arquivos").remove(paths);
    if (error) throw new Error(error.message);
    return { removed: paths.length };
  });

export const uploadNoticiaImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: UploadInput) => {
    if (!data?.name || !data?.dataBase64) throw new Error("Arquivo inválido.");
    return data;
  })
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError || !isAdmin) throw new Error("Sem permissão para enviar arquivos.");

    const bytes = Buffer.from(data.dataBase64, "base64");
    validateImage(data.name, data.contentType, bytes);

    const path = `noticias/capas/${crypto.randomUUID()}-${safeFileName(data.name)}`;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage.from("arquivos").upload(path, bytes, {
      contentType: data.contentType,
      upsert: false,
    });
    if (error) throw new Error(error.message);
    return { url: `/api/public/arquivo/${path}` };
  });

export const deleteNoticiaImages = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((data: { urls: string[] }) => {
    if (!Array.isArray(data?.urls) || data.urls.length > 2) throw new Error("Lista inválida.");
    return data;
  })
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError || !isAdmin) throw new Error("Sem permissão para excluir arquivos.");

    const prefix = "/api/public/arquivo/";
    const paths = data.urls.flatMap((url) => {
      if (!url.startsWith(`${prefix}noticias/capas/`)) return [];
      const path = decodeURIComponent(url.slice(prefix.length));
      return path.includes("..") ? [] : [path];
    });
    if (!paths.length) return { removed: 0 };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.storage.from("arquivos").remove(paths);
    if (error) throw new Error(error.message);
    return { removed: paths.length };
  });
