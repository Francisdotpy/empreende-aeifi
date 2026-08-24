import { r as createServerFn } from "./server--SO13o6a.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-D18V-PXc.mjs";
import { t as createServerRpc } from "./createServerRpc-h3YGBsUt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-CyLIdH6X.js
/**
* Concede o papel de administrador ao usuário autenticado, desde que o e-mail
* esteja na lista de permissão. Executado somente no servidor.
*/
var claimAdmin_createServerFn_handler = createServerRpc({
	id: "420039d888d6f92ecb02d2e25a67a5644d3a2ad34e92c5fcd0204779278c07c3",
	name: "claimAdmin",
	filename: "src/lib/admin.functions.ts"
}, (opts) => claimAdmin.__executeServer(opts));
var claimAdmin = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(claimAdmin_createServerFn_handler, async ({ context }) => {
	const { supabaseAdmin } = await import("./client.server-Cxb4Tlrp.mjs");
	const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(context.userId);
	const email = userData?.user?.email?.toLowerCase();
	if (userError || !email) return { admin: false };
	const { data: allowed } = await supabaseAdmin.from("admin_allowlist").select("email").ilike("email", email).maybeSingle();
	if (!allowed) return { admin: false };
	const { data: existing } = await supabaseAdmin.from("user_roles").select("id").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
	if (!existing) await supabaseAdmin.from("user_roles").insert({
		user_id: context.userId,
		role: "admin"
	});
	return { admin: true };
});
//#endregion
export { claimAdmin_createServerFn_handler };
