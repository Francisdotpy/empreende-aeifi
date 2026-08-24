import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as iniciativas, s as useSite } from "./router-B2yRfqy2.mjs";
import { c as Section, l as Value, n as CtaLink, o as ImageValue, s as PageHero, t as Card } from "./ui-DPwwP1Yp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/iniciativas-DFW6BcPO.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { get } = useSite();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Nossas iniciativas",
			title: "Projetos, produtos e ações desenvolvidos pela AEIFI",
			lead: "Cada iniciativa nasce de um problema real identificado junto aos empreendedores da cidade e é conduzida pela associação com objetivo, público e resultados definidos."
		}),
		iniciativas.map((ini, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			id: ini.slug,
			tone: i % 2 === 1 ? "muted" : "default",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.16em] text-secondary",
							children: ini.etiqueta
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl font-semibold text-primary",
							children: ini.titulo
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-lg text-foreground",
							children: ini.resumo
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-5 text-base leading-relaxed text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-semibold text-primary",
									children: "Problema que busca resolver"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1",
									children: ini.problema
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-semibold text-primary",
									children: "Objetivo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1",
									children: ini.objetivo
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-semibold text-primary",
									children: "Público beneficiado"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1",
									children: ini.publico
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-semibold text-primary",
									children: "Como funciona"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "mt-2 list-decimal space-y-1 pl-5",
									children: ini.funcionamento.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: f }, f))
								})] })
							]
						}),
						ini.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: ini.href,
							className: "mt-6 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90",
							children: ["Conheça o ", ini.titulo]
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "h-fit",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-semibold text-primary",
							children: "Resultados"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, { value: get(`iniciativas.${ini.slug}.resultados`) })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 font-display text-lg font-semibold text-primary",
							children: "Parceiros envolvidos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, { value: get(`iniciativas.${ini.slug}.parceiros`) })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 font-display text-lg font-semibold text-primary",
							children: "Registro fotográfico"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageValue, {
								value: get(`iniciativas.${ini.slug}.foto`),
								alt: `Registro da iniciativa ${ini.titulo}`
							})
						})
					]
				})]
			})
		}, ini.slug)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			title: "Quer apoiar uma iniciativa?",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-muted-foreground",
				children: "Empresas, entidades, universidades e órgãos públicos podem somar-se aos projetos da AEIFI."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaLink, {
					to: "/parceiros",
					children: "Seja parceiro da AEIFI"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaLink, {
					to: "/associe-se",
					variant: "secondary",
					children: "Quero me associar"
				})]
			})]
		})
	] });
}
//#endregion
export { Page as component };
