import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as noticias, n as Route$1, s as useSite } from "./router-B2yRfqy2.mjs";
import { c as Section, l as Value, o as ImageValue } from "./ui-DPwwP1Yp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/noticias._slug-DeA4S6EC.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { noticia } = Route$1.useLoaderData();
	const { get } = useSite();
	const idx = noticias.findIndex((n) => n.slug === noticia.slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/noticias",
				className: "text-sm font-semibold text-secondary hover:underline",
				children: "← Voltar para notícias"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-center gap-3 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold uppercase tracking-[0.14em] text-secondary",
					children: noticia.categoria
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, {
					value: get(`noticias.${idx}.data`),
					label: "[DATA]"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl font-semibold text-primary text-balance-tight",
				children: noticia.titulo
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-lg text-foreground",
				children: noticia.resumo
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 space-y-4 text-base leading-relaxed text-muted-foreground",
				children: noticia.corpo.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 text-sm text-muted-foreground",
				children: ["Fotos da atividade:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageValue, {
						value: get(`noticias.${idx}.foto`),
						alt: noticia.titulo
					})
				})]
			})
		]
	}) });
}
//#endregion
export { Page as component };
