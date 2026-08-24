import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as areas } from "./router-B2yRfqy2.mjs";
import { c as Section, n as CtaLink, s as PageHero, t as Card } from "./ui-DPwwP1Yp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/o-que-fazemos-BhI80HVl.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Áreas de atuação",
			title: "O que a AEIFI faz pelos empreendedores de Foz do Iguaçu",
			lead: "Nossa atuação é organizada em cinco frentes. Cada uma responde a uma necessidade concreta de quem toca um pequeno negócio na cidade."
		}),
		areas.map((area, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			id: area.slug,
			tone: i % 2 === 1 ? "muted" : "default",
			title: area.titulo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 text-base leading-relaxed text-muted-foreground lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg text-foreground",
						children: area.resumo
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: area.descricao })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "h-fit",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-semibold text-primary",
						children: "Na prática"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2 text-sm text-muted-foreground",
						children: area.praticas.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-b border-border pb-2 last:border-0",
							children: p
						}, p))
					})]
				})]
			})
		}, area.slug)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			title: "Como isso vira ação concreta",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-muted-foreground",
				children: "Cada frente se materializa em projetos, produtos e eventos da associação — de programas de capacitação ao BuscaMEI, plataforma criada pela AEIFI para ampliar a visibilidade dos microempreendedores."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaLink, {
					to: "/iniciativas",
					children: "Ver projetos e iniciativas"
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
