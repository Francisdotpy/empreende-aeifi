import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { s as useSite, u as formatosParceria } from "./router-B2yRfqy2.mjs";
import { c as Section, l as Value, n as CtaLink, s as PageHero, t as Card } from "./ui-DPwwP1Yp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parceiros-C2r0-e0n.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { org, get } = useSite();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Parcerias",
			title: "Seja parceiro da AEIFI",
			lead: "As ações da associação ganham alcance quando são construídas em conjunto. Empresas, entidades, instituições de ensino e órgãos públicos podem colaborar com nossas iniciativas."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Por que ser parceiro",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base leading-relaxed text-muted-foreground",
					children: "Apoiar a AEIFI é investir diretamente na base econômica de Foz do Iguaçu. Os microempreendedores atendidos pela associação geram renda, empregam, movimentam bairros e sustentam famílias. Cada capacitação, encontro ou projeto viabilizado por um parceiro se converte em negócios mais organizados, formais e competitivos."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base leading-relaxed text-muted-foreground",
					children: "Para a instituição parceira, a colaboração significa presença qualificada junto a uma rede de empreendedores locais, associação a uma causa de desenvolvimento econômico e impacto social mensurável na própria cidade."
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			tone: "muted",
			title: "Formatos de parceria",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 md:grid-cols-2",
				children: formatosParceria.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-semibold text-primary",
					children: f.titulo
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: f.texto
				})] }, f.titulo))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			title: "Parceiros atuais",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Relação de parceiros, escopo de cada parceria e logotipos:"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, { value: get("parceiros.lista") })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			tone: "muted",
			title: "Canal para potenciais parceiros",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Sua organização quer conhecer as iniciativas da AEIFI ou propor uma parceria? Fale diretamente com a diretoria."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-5 space-y-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-semibold text-primary",
								children: "E-mail para parcerias:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: org.email })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-semibold text-primary",
								children: "Telefone / WhatsApp:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: org.whatsapp })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaLink, {
							to: "/contato",
							children: "Enviar proposta de parceria"
						})
					})
				]
			})
		})
	] });
}
//#endregion
export { Page as component };
