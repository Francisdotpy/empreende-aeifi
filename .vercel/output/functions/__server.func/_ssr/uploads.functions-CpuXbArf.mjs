import { r as createServerFn } from "./server--SO13o6a.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-D18V-PXc.mjs";
import { t as createServerRpc } from "./createServerRpc-h3YGBsUt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/uploads.functions-CpuXbArf.js
var uploadSiteFile_createServerFn_handler = createServerRpc({
	id: "87c9c96ef0822f31202a3a0ee43e0d91281993e49cb43e4cb7f78161174ea80a",
	name: "uploadSiteFile",
	filename: "src/lib/uploads.functions.ts"
}, (opts) => uploadSiteFile.__executeServer(opts));
var uploadSiteFile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => {
	if (!data?.name || !data?.dataBase64) throw new Error("Arquivo inválido");
	return data;
}).handler(uploadSiteFile_createServerFn_handler, async ({ data, context }) => {
	const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "admin"
	});
	if (roleError || !isAdmin) throw new Error("Sem permissão para enviar arquivos.");
	const bytes = Buffer.from(data.dataBase64, "base64");
	if (bytes.byteLength > 8388608) throw new Error("Arquivo maior que 8 MB.");
	const safeName = data.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]/g, "-").slice(-80);
	const path = `${Date.now()}-${safeName}`;
	const { supabaseAdmin } = await import("./client.server-Cxb4Tlrp.mjs");
	const { error } = await supabaseAdmin.storage.from("arquivos").upload(path, bytes, {
		contentType: data.contentType || "application/octet-stream",
		upsert: true
	});
	if (error) throw new Error(error.message);
	return { url: `/api/public/arquivo/${path}` };
});
//#endregion
export { uploadSiteFile_createServerFn_handler };
