import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Concede o papel de administrador ao usuário autenticado, desde que o e-mail
 * esteja na lista de permissão. Executado somente no servidor.
 */
export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(
      context.userId,
    );
    const email = userData?.user?.email?.toLowerCase();
    if (userError || !email) return { admin: false };

    const { data: allowed } = await supabaseAdmin
      .from("admin_allowlist")
      .select("email")
      .ilike("email", email)
      .maybeSingle();
    if (!allowed) return { admin: false };

    const { data: existing } = await supabaseAdmin
      .from("user_roles")
      .select("id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();

    if (!existing) {
      await supabaseAdmin.from("user_roles").insert({ user_id: context.userId, role: "admin" });
    }

    return { admin: true };
  });
