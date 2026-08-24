import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as useSite } from "./router-B2yRfqy2.mjs";
import { c as Section, l as Value, s as PageHero, t as Card } from "./ui-DPwwP1Yp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/noticias.index-B3BGIyu3.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { noticias, get } = useSite();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Notícias",
		title: "O que a AEIFI tem realizado",
		lead: "Registro das atividades, projetos, parcerias e conquistas da associação junto aos microempreendedores de Foz do Iguaçu."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3",
		children: noticias.map((n, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			get(`noticias.${idx}.foto`) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: get(`noticias.${idx}.foto`),
				alt: n.titulo,
				loading: "lazy",
				className: "mb-4 w-full rounded-xl object-cover"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold uppercase tracking-[0.14em] text-secondary",
					children: n.categoria
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, {
					value: n.data,
					label: "[DATA]"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-xl font-semibold text-primary",
				children: n.titulo
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: n.resumo
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/noticias/$slug",
				params: { slug: n.slug },
				className: "mt-4 inline-block text-sm font-semibold text-secondary hover:underline",
				children: "Ler notícia completa"
			})
		] }, n.slug))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-8 text-sm text-muted-foreground",
		children: "Novas publicações são acrescentadas conforme as atividades da associação acontecem. Textos e fotos são de produção própria da AEIFI."
	})] })] });
}
//#endregion
export { Page as component };
