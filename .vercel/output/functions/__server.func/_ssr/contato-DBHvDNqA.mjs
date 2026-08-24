import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { s as useSite } from "./router-B2yRfqy2.mjs";
import { c as Section, n as CtaLink, r as DataRow, s as PageHero, t as Card } from "./ui-DPwwP1Yp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contato-DBHvDNqA.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { org } = useSite();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Contato",
		title: "Fale com a AEIFI",
		lead: "Estamos à disposição de empreendedores, associados, parceiros, imprensa e de toda a comunidade de Foz do Iguaçu."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-semibold text-primary",
			children: "Canais oficiais"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataRow, {
					term: "Telefone / WhatsApp",
					value: org.whatsapp
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataRow, {
					term: "E-mail",
					value: org.email
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataRow, {
					term: "Endereço da sede",
					value: org.sede
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataRow, {
					term: "Horário de atendimento",
					value: org.horario
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataRow, {
					term: "Cidade",
					value: org.cidade
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataRow, {
					term: "Redes sociais",
					value: org.redes.map((r) => `${r.nome}: ${r.url}`).join(" · ")
				})
			]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold text-primary",
						children: "Quero me associar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Empreendedores interessados em fazer parte da associação podem falar diretamente conosco pelos canais acima."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaLink, {
							to: "/associe-se",
							variant: "secondary",
							children: "Ver como se associar"
						})
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold text-primary",
						children: "Propostas de parceria"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Empresas, entidades, universidades e órgãos públicos podem apresentar propostas de colaboração com as iniciativas da AEIFI."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaLink, {
							to: "/parceiros",
							variant: "ghost",
							children: "Seja parceiro"
						})
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold text-primary",
						children: "Dúvidas sobre o BuscaMEI"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "O BuscaMEI é um produto da AEIFI. Orientações sobre cadastro e uso da plataforma também são prestadas pelos canais da associação."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaLink, {
							to: "/buscamei",
							variant: "ghost",
							children: "Conhecer o BuscaMEI"
						})
					})
				] })
			]
		})]
	}) })] });
}
//#endregion
export { Page as component };
