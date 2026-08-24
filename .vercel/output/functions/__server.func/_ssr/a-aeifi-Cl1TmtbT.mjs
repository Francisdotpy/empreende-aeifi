import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { s as useSite } from "./router-B2yRfqy2.mjs";
import { c as Section, l as Value, n as CtaLink, r as DataRow, s as PageHero, t as Card } from "./ui-DPwwP1Yp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/a-aeifi-Cl1TmtbT.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { org, diretoria, get } = useSite();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Quem somos",
			title: "Uma associação construída por quem empreende em Foz do Iguaçu",
			lead: "A AEIFI reúne microempreendedores individuais e pequenos negócios da cidade em torno de um objetivo comum: ter representação, formação e oportunidades de crescimento."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Nossa história",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 text-base leading-relaxed text-muted-foreground lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A AEIFI nasceu da percepção de que o microempreendedor individual, apesar de representar parcela expressiva da economia de Foz do Iguaçu, atuava de forma isolada: sem canal de representação, com pouco acesso a formação e com dificuldade de ser encontrado por clientes." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A associação foi constituída formalmente como entidade sem fins lucrativos para organizar essa base, dar voz coletiva ao segmento e desenvolver ações concretas de apoio. Desde então, sua trajetória combina representação institucional, capacitação, articulação de parcerias e desenvolvimento de projetos próprios." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Data de fundação, marcos da trajetória e principais conquistas: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, { value: get("org.historia") })] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "h-fit overflow-hidden p-5 md:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-semibold text-primary",
						children: "Ficha institucional"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-3 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataRow, {
								term: "Nome",
								value: org.nome
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataRow, {
								term: "Sigla",
								value: org.sigla
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataRow, {
								term: "Razão social",
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, { value: org.razaoSocial })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataRow, {
								term: "CNPJ",
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, { value: org.cnpj })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataRow, {
								term: "Fundação",
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, { value: org.fundacao })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataRow, {
								term: "Sede",
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, { value: org.sede })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataRow, {
								term: "Cidade",
								value: org.cidade
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataRow, {
								term: "Natureza",
								value: "Associação civil sem fins lucrativos"
							})
						]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			tone: "muted",
			title: "Missão, visão e valores",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl font-semibold text-primary",
					children: "Missão"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: org.missao
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl font-semibold text-primary",
					children: "Visão"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: org.visao
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
				children: org.valores.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-semibold text-primary",
					children: v.titulo
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: v.texto
				})] }, v.titulo))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Objetivos institucionais",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3 md:grid-cols-2",
				children: org.objetivos.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground shadow-sm",
					children: o
				}, o))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			tone: "muted",
			title: "Quem atendemos",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3 md:grid-cols-2 lg:grid-cols-3",
				children: org.publico.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground shadow-sm",
					children: p
				}, p))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			title: "Diretoria",
			lead: "A AEIFI é dirigida por associados eleitos em assembleia, conforme o Estatuto Social.",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: diretoria.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.14em] text-secondary",
					children: d.cargo
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, {
						value: d.nome,
						label: "[NOME A SER FORNECIDO PELA AEIFI]"
					})
				})] }, d.cargo))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaLink, {
					to: "/transparencia",
					variant: "ghost",
					children: "Ver documentos e transparência"
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
