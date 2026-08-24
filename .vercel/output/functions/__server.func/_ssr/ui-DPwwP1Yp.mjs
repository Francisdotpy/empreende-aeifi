import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import "./router-B2yRfqy2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-DPwwP1Yp.js
var import_jsx_runtime = require_jsx_runtime();
function PageHero({ eyebrow, title, lead, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-border bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page py-14 md:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold uppercase tracking-[0.18em] text-secondary",
					children: eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 max-w-3xl font-display text-4xl font-semibold text-primary text-balance-tight md:text-5xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-2xl text-lg text-muted-foreground",
					children: lead
				}),
				children ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7",
					children
				}) : null
			]
		})
	});
}
function Section({ id, title, lead, tone = "default", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id,
		className: tone === "muted" ? "border-y border-border/70 bg-surface" : void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page section-y",
			children: [title ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-semibold text-primary md:text-4xl",
					children: title
				}), lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-base text-muted-foreground md:text-lg",
					children: lead
				}) : null]
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: title ? "mt-10" : void 0,
				children
			})]
		})
	});
}
function Card({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `rounded-2xl border border-border/90 bg-card p-6 shadow-card transition-[box-shadow,border-color] duration-200 ${className}`,
		children
	});
}
function Pending({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex items-center rounded-md border border-dashed border-accent/70 bg-highlight px-2 py-1 text-xs font-medium text-highlight-foreground",
		children: label ?? "[INFORMAÇÃO A SER FORNECIDA PELA AEIFI]"
	});
}
/** Mostra o valor preenchido pela AEIFI ou o marcador de pendência. */
function Value({ value, label }) {
	if (value && value.trim() && value.trim() !== "[INFORMAÇÃO A SER FORNECIDA PELA AEIFI]") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: value });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pending, { label });
}
/** Link para arquivo enviado na área administrativa. */
function FileValue({ value, label }) {
	if (value && value.trim()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: value,
		target: "_blank",
		rel: "noopener noreferrer",
		className: "text-sm font-semibold text-secondary underline",
		children: "Abrir documento"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pending, { label: label ?? "[ARQUIVO A SER FORNECIDO PELA AEIFI]" });
}
/** Imagem enviada na área administrativa, com marcador quando ausente. */
function ImageValue({ value, alt, label }) {
	if (value && value.trim()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: value,
		alt,
		loading: "lazy",
		className: "w-full rounded-xl border border-border object-cover"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pending, { label: label ?? "[FOTOS A SEREM FORNECIDAS PELA AEIFI]" });
}
function CtaLink({ to, children, variant = "primary" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: `inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-all active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${{
			primary: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/92 hover:shadow-md",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 hover:shadow-md",
			ghost: "border border-border bg-card text-primary shadow-sm hover:border-primary/25 hover:bg-muted"
		}[variant]}`,
		children
	});
}
function ExternalCta({ href, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		target: "_blank",
		rel: "noopener noreferrer",
		className: "inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:brightness-95 hover:shadow-md active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
		children
	});
}
function DataRow({ term, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 gap-1 border-b border-border/80 px-2 py-3.5 transition-colors last:border-0 hover:bg-muted/45 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] sm:gap-4 md:gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-sm font-semibold text-primary",
			children: term
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "min-w-0 whitespace-normal break-words text-sm text-muted-foreground",
			children: value
		})]
	});
}
//#endregion
export { FileValue as a, Section as c, ExternalCta as i, Value as l, CtaLink as n, ImageValue as o, DataRow as r, PageHero as s, Card as t };
