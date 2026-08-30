import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/arquivo/$")({
  server: {
    handlers: {
      GET: async ({ params, request }) => {
        const path = (params as { _splat?: string })._splat ?? "";
        if (!path || path.includes("..")) return new Response("Not found", { status: 404 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
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
            "cache-control": "public, max-age=3600",
            vary: "Accept",
          },
        });
      },
    },
  },
});
