import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/arquivo/$")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const path = (params as { _splat?: string })._splat ?? "";
        if (!path || path.includes("..") || path.includes("\\")) {
          return new Response("Not found", { status: 404 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const fileUrl = `/api/public/arquivo/${path}`;
        let published = false;

        if (path.startsWith("conexao-mei/documentos/")) {
          const result = await supabaseAdmin
            .from("conexao_mei_documentos")
            .select("id")
            .eq("arquivo_path", path)
            .eq("visivel", true)
            .maybeSingle();
          published = !result.error && !!result.data;
        } else if (path.startsWith("conexao-mei/parceiros/")) {
          const result = await supabaseAdmin
            .from("conexao_mei_parceiros")
            .select("id")
            .eq("logo_path", path)
            .eq("visivel", true)
            .maybeSingle();
          published = !result.error && !!result.data;
        } else if (path.startsWith("conexao-mei/expositores/")) {
          const result = await supabaseAdmin
            .from("conexao_mei_expositores")
            .select("id")
            .eq("logo_path", path)
            .eq("status", "Confirmado")
            .maybeSingle();
          published = !result.error && !!result.data;
        } else if (path.startsWith("noticias/capas/")) {
          const result = await supabaseAdmin
            .from("noticias")
            .select("id")
            .eq("capa_url", fileUrl)
            .eq("status", "publicado")
            .maybeSingle();
          published = !result.error && !!result.data;
        } else if (/^(?:publicacoes|editais)\/images\//.test(path)) {
          const result = await supabaseAdmin
            .from("downloads_editais")
            .select("id")
            .eq("imagem_url", fileUrl)
            .eq("status", "publicado")
            .maybeSingle();
          published = !result.error && !!result.data;
        } else if (/^(?:publicacoes|editais)\/pdfs\//.test(path)) {
          const result = await supabaseAdmin
            .from("downloads_editais")
            .select("id")
            .eq("pdf_url", fileUrl)
            .eq("status", "publicado")
            .maybeSingle();
          published = !result.error && !!result.data;
        } else if (!path.includes("/")) {
          // Legacy site uploads have no folder; only files still linked in public content are public.
          const result = await supabaseAdmin
            .from("site_content")
            .select("key")
            .eq("value", fileUrl)
            .limit(1);
          published = !result.error && !!result.data?.length;
        }
        if (!published) return new Response("Not found", { status: 404 });

        const requestedWidth = Number(new URL(request.url).searchParams.get("width"));
        const allowedWidths = new Set([480, 768, 1024, 1440]);
        const canTransform =
          allowedWidths.has(requestedWidth) && /\.(?:jpe?g|png|webp)$/i.test(path);
        const storage = supabaseAdmin.storage.from("arquivos");
        let { data, error } = await storage.download(
          path,
          canTransform
            ? { transform: { width: requestedWidth, quality: 82, resize: "contain" } }
            : undefined,
        );

        // Image transformations depend on the Storage plan. Keep the original
        // available if a deployment does not support the rendering endpoint.
        if ((error || !data) && canTransform) {
          ({ data, error } = await storage.download(path));
        }
        if (error || !data) return new Response("Not found", { status: 404 });

        return new Response(await data.arrayBuffer(), {
          headers: {
            "content-type": data.type || "application/octet-stream",
            "cache-control": "public, max-age=60",
            vary: "Accept",
          },
        });
      },
    },
  },
});
