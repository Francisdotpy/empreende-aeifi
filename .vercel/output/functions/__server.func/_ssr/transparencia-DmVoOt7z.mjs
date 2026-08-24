import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { s as useSite } from "./router-B2yRfqy2.mjs";
import { a as FileValue, c as Section, l as Value, n as CtaLink, r as DataRow, s as PageHero, t as Card } from "./ui-DPwwP1Yp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transparencia-DmVoOt7z.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { org, diretoria, documentos, get } = useSite();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Transparência",
			title: "Informação aberta sobre como a AEIFI se organiza",
			lead: "A associação disponibiliza seus dados institucionais, documentos e resultados para associados, parceiros e para toda a comunidade."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Dados institucionais",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataRow, {
					term: "Nome",
					value: org.nome
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
					term: "Natureza jurídica",
					value: "Associação civil sem fins lucrativos"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataRow, {
					term: "Data de constituição",
					value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, { value: org.fundacao })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataRow, {
					term: "Sede",
					value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, { value: org.sede })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataRow, {
					term: "E-mail institucional",
					value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, { value: org.email })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataRow, {
					term: "Telefone / WhatsApp",
					value: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, { value: org.telefone }),
						" ",
						" / ",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, { value: org.whatsapp })
					] })
				})
			] }) })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			tone: "muted",
			title: "Documentos institucionais",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: documentos.map((d, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-semibold text-primary",
						children: d.nome
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: d.descricao
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: ["Situação: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, { value: d.situacao })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileValue, { value: get(`documentos.${idx}.arquivo`) })
					})
				] }, d.nome))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			title: "Diretoria e conselho fiscal",
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
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted-foreground",
				children: "A diretoria é eleita em assembleia geral, com mandato e atribuições definidos no Estatuto Social."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			tone: "muted",
			title: "Relatórios e prestação de contas",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-semibold text-primary",
						children: "Relatório de atividades"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Documento anual com as ações realizadas, participantes atendidos, parcerias firmadas e resultados alcançados."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileValue, { value: get("relatorios.atividades.arquivo") })
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-semibold text-primary",
						children: "Prestação de contas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Demonstração das receitas e despesas do exercício, quando aplicável, aprovada em assembleia."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileValue, { value: get("relatorios.contas.arquivo") })
					})
				] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			title: "Pedidos de informação",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-2xl text-muted-foreground",
				children: "Qualquer pessoa pode solicitar informações institucionais à AEIFI. Entre em contato pelos nossos canais oficiais e responderemos com os documentos ou esclarecimentos disponíveis."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CtaLink, {
					to: "/contato",
					children: "Solicitar informações"
				})
			})]
		})
	] });
}
//#endregion
export { Page as component };
