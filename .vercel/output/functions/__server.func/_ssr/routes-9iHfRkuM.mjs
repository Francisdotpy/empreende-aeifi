import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Megaphone, c as GraduationCap, n as Sparkles, o as Lightbulb, s as Handshake, u as ArrowRight } from "../_libs/lucide-react.mjs";
import { c as areas, d as iniciativas, s as useSite } from "./router-B2yRfqy2.mjs";
import { c as Section, l as Value, n as CtaLink, t as Card } from "./ui-DPwwP1Yp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-9iHfRkuM.js
var import_jsx_runtime = require_jsx_runtime();
var hero_aeifi_default = "/assets/hero-aeifi-CfeYtnQD.jpg";
var icons = [
	Megaphone,
	GraduationCap,
	Handshake,
	Sparkles,
	Lightbulb
];
function Home() {
	const { org, impacto, depoimentos, noticias, get } = useSite();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "inline-flex rounded-full bg-highlight px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-highlight-foreground",
						children: "Associação de Foz do Iguaçu"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-5 font-display text-4xl font-semibold text-primary text-balance-tight md:text-5xl lg:text-[3.4rem] lg:leading-[1.05]",
						children: "Fortalecemos quem empreende. Desenvolvemos nossa comunidade."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-xl text-lg text-muted-foreground",
						children: "A AEIFI trabalha para apoiar, conectar, representar e criar oportunidades para microempreendedores e pequenos negócios de Foz do Iguaçu."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaLink, {
							to: "/a-aeifi",
							children: "Conheça a AEIFI"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaLink, {
							to: "/associe-se",
							variant: "secondary",
							children: "Quero me associar"
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_aeifi_default,
					width: 1600,
					height: 1008,
					alt: "Microempreendedores de Foz do Iguaçu reunidos em um encontro da AEIFI",
					className: "aspect-[16/10] w-full rounded-3xl object-cover shadow-lift"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-b border-border bg-primary text-primary-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-page py-6 text-sm md:text-base",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "font-semibold",
					children: "Quem representamos:"
				}), " microempreendedores individuais, pequenos negócios e profissionais autônomos de Foz do Iguaçu."] })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "O que fazemos",
			lead: "Nossa atuação se organiza em cinco frentes complementares, todas voltadas ao fortalecimento de quem empreende na cidade.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3",
				children: [areas.map((area, i) => {
					const Icon = icons[i] ?? Megaphone;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "h-5 w-5",
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-xl font-semibold text-primary",
							children: area.titulo
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: area.resumo
						})
					] }, area.slug);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-col justify-center bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Saiba como cada frente acontece na prática, com exemplos das ações da associação."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/o-que-fazemos",
						className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline",
						children: ["Ver todas as áreas de atuação ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			tone: "muted",
			title: "Nossa missão",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xl leading-relaxed text-foreground lg:col-span-2",
					children: org.missao
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "A AEIFI é uma associação sem fins lucrativos sediada em Foz do Iguaçu, constituída para representar e desenvolver a base empreendedora da cidade."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaLink, {
						to: "/a-aeifi",
						variant: "ghost",
						children: "Conheça nossa história"
					})
				})] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Nossas iniciativas",
			lead: "Projetos, produtos e ações desenvolvidos pela associação para responder a problemas concretos dos pequenos negócios.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 lg:grid-cols-2",
				children: iniciativas.slice(0, 4).map((ini) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: ini.destaque ? "border-accent/60 bg-highlight/40" : "",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.14em] text-secondary",
							children: ini.etiqueta
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 font-display text-2xl font-semibold text-primary",
							children: ini.titulo
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: ini.resumo
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: ini.slug === "buscamei" ? "/buscamei" : "/iniciativas",
							className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline",
							children: ["Saiba mais ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					]
				}, ini.slug))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			tone: "muted",
			title: "Nosso impacto",
			lead: "Resultados da atuação da associação em Foz do Iguaçu.",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: impacto.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-semibold text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, { value: item.valor })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm font-medium text-muted-foreground",
						children: item.rotulo
					})] }, item.rotulo))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 md:grid-cols-2",
					children: depoimentos.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Depoimento de empreendedor atendido:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
							className: "mt-3 text-base text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, { value: d.texto })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm font-semibold text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, {
								value: [d.autor, d.negocio].filter((t) => t && t.trim() && t.trim() !== "[INFORMAÇÃO A SER FORNECIDA PELA AEIFI]").join(" — "),
								label: "[NOME E NEGÓCIO A SEREM FORNECIDOS PELA AEIFI]"
							})
						})
					] }, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-muted-foreground",
					children: "Publicamos apenas dados verificáveis. Os números e depoimentos serão preenchidos com as informações oficiais da associação."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Notícias e atividades",
			lead: "Acompanhe o que a AEIFI tem realizado.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 md:grid-cols-3",
				children: noticias.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.14em] text-secondary",
						children: n.categoria
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-2 font-display text-lg font-semibold text-primary",
						children: n.titulo
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: n.resumo
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/noticias/$slug",
						params: { slug: n.slug },
						className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline",
						children: ["Ler notícia ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				] }, n.slug))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			tone: "muted",
			title: "Parceiros",
			lead: "A AEIFI constrói suas ações com empresas, entidades, universidades e poder público.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, {
					value: get("parceiros.lista"),
					label: "[RELAÇÃO DE PARCEIROS A SER FORNECIDA PELA AEIFI]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaLink, {
					to: "/parceiros",
					variant: "ghost",
					children: "Seja parceiro da AEIFI"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-ink text-ink-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page section-y text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-semibold md:text-4xl",
						children: "Faça parte da AEIFI"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-2xl text-ink-foreground/85",
						children: "Associe-se e participe de uma rede que representa, capacita e conecta quem empreende em Foz do Iguaçu."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaLink, {
							to: "/associe-se",
							variant: "secondary",
							children: "Quero me associar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaLink, {
							to: "/contato",
							variant: "ghost",
							children: "Falar com a associação"
						})]
					})
				]
			})
		})
	] });
}
//#endregion
export { Home as component };
