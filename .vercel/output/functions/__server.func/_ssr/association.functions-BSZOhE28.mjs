import { r as createServerFn } from "./server--SO13o6a.mjs";
import { t as createServerRpc } from "./createServerRpc-h3YGBsUt.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/association.functions-BSZOhE28.js
var associationRequestSchema = objectType({
	nome: stringType().trim().min(1).max(160),
	cnpj: stringType().trim().min(1).max(30),
	telefone: stringType().trim().min(1).max(40)
});
var RECIPIENT = "aeififoz@gmail.com";
var sendAssociationRequest_createServerFn_handler = createServerRpc({
	id: "0dfe155c2cb79184130c1b715681133fd26d0a90c479ab76f5ff4b049639fe39",
	name: "sendAssociationRequest",
	filename: "src/lib/association.functions.ts"
}, (opts) => sendAssociationRequest.__executeServer(opts));
var sendAssociationRequest = createServerFn({ method: "POST" }).validator(associationRequestSchema).handler(sendAssociationRequest_createServerFn_handler, async ({ data }) => {
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
			"Content-Type": "application/json"
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
				`Telefone/WhatsApp: ${data.telefone}`
			].join("\n")
		})
	});
	if (!response.ok) {
		console.error(`[Association] Resend returned status ${response.status}.`);
		throw new Error("Não foi possível enviar a solicitação. Tente novamente.");
	}
	return { success: true };
});
//#endregion
export { sendAssociationRequest_createServerFn_handler };
