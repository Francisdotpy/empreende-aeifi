import { r as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { l as beneficiosAssociado, s as useSite } from "./router-B2yRfqy2.mjs";
import { c as Section, l as Value, s as PageHero, t as Card } from "./ui-DPwwP1Yp.mjs";
import { r as createServerFn } from "./server--SO13o6a.mjs";
import { t as createSsrRpc } from "./createSsrRpc-BNhEyr6m.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/associe-se-B2NdAtxT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var associationRequestSchema = objectType({
	nome: stringType().trim().min(1).max(160),
	cnpj: stringType().trim().min(1).max(30),
	telefone: stringType().trim().min(1).max(40)
});
var sendAssociationRequest = createServerFn({ method: "POST" }).validator(associationRequestSchema).handler(createSsrRpc("0dfe155c2cb79184130c1b715681133fd26d0a90c479ab76f5ff4b049639fe39"));
var passos = [
	"Entre em contato com a AEIFI pelos canais oficiais e manifeste seu interesse.",
	"Envie os dados e documentos solicitados para o cadastro de associado.",
	"A solicitação é analisada conforme os critérios do Estatuto Social.",
	"Confirmada a associação, você passa a participar das ações, encontros e assembleias."
];
function Page() {
	const { org, get } = useSite();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			eyebrow: "Associe-se",
			title: "Faça parte da AEIFI",
			lead: "Associar-se é somar sua voz a uma rede organizada de empreendedores que trabalha por representação, formação e oportunidades em Foz do Iguaçu."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Solicite sua associação",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssociationForm, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			tone: "muted",
			title: "Quem pode participar",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3 md:grid-cols-2 lg:grid-cols-3",
				children: org.publico.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground shadow-sm",
					children: p
				}, p))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 max-w-3xl text-sm text-muted-foreground",
				children: ["Critérios completos de admissão, categorias de associado e eventual contribuição associativa estão previstos no Estatuto Social: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Value, { value: get("associe.contribuicao") })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			title: "Por que se associar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: beneficiosAssociado.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: b
				}) }, b))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			tone: "muted",
			title: "Como funciona a associação",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base leading-relaxed text-muted-foreground",
					children: "A AEIFI é uma associação civil sem fins lucrativos. Suas decisões são tomadas em assembleia, com participação dos associados, e executadas por uma diretoria eleita. O associado tem direito a voz e voto, pode propor pautas e participar das comissões e ações organizadas pela entidade."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base leading-relaxed text-muted-foreground",
					children: "O trabalho é contínuo: encontros periódicos, capacitações, articulação com parceiros e desenvolvimento de projetos como o BuscaMEI. Quanto maior a base associada, maior a força de representação do microempreendedorismo local."
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			title: "Como solicitar sua associação",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid gap-4 md:grid-cols-2",
				children: passos.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-2xl border border-border bg-card p-5 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-sm font-semibold text-secondary",
						children: ["Passo ", i + 1]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: p
					})]
				}, p))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-8 max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-semibold text-primary",
					children: "Canais de atendimento"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-4 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-semibold text-primary",
								children: "WhatsApp / telefone:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: org.whatsapp })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-semibold text-primary",
								children: "E-mail:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: org.email })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-semibold text-primary",
								children: "Atendimento presencial:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: org.sede })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "font-semibold text-primary",
								children: "Horário:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: org.horario })]
						})
					]
				})]
			})]
		})
	] });
}
function AssociationForm() {
	const [form, setForm] = (0, import_react.useState)({
		nome: "",
		cnpj: "",
		telefone: ""
	});
	const [status, setStatus] = (0, import_react.useState)("idle");
	async function submit(event) {
		event.preventDefault();
		if (status === "loading") return;
		const data = {
			nome: form.nome.trim(),
			cnpj: form.cnpj.trim(),
			telefone: form.telefone.trim()
		};
		if (!data.nome || !data.cnpj || !data.telefone) {
			setStatus("error");
			return;
		}
		setStatus("loading");
		try {
			await sendAssociationRequest({ data });
			setForm({
				nome: "",
				cnpj: "",
				telefone: ""
			});
			setStatus("success");
		} catch {
			setStatus("error");
		}
	}
	const inputClassName = "rounded-lg border border-input bg-card px-3 py-2.5 text-sm font-normal text-foreground shadow-sm hover:border-primary/30 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "max-w-2xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Preencha os dados abaixo. A equipe da AEIFI receberá sua solicitação e entrará em contato."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-5 grid gap-4",
			onSubmit: submit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1.5 text-sm font-semibold text-primary",
					children: ["Nome", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						autoComplete: "name",
						value: form.nome,
						onChange: (event) => setForm((current) => ({
							...current,
							nome: event.target.value
						})),
						className: inputClassName
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1.5 text-sm font-semibold text-primary",
					children: ["CNPJ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						inputMode: "numeric",
						autoComplete: "off",
						value: form.cnpj,
						onChange: (event) => setForm((current) => ({
							...current,
							cnpj: event.target.value
						})),
						className: inputClassName
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1.5 text-sm font-semibold text-primary",
					children: ["Telefone / WhatsApp", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						type: "tel",
						autoComplete: "tel",
						value: form.telefone,
						onChange: (event) => setForm((current) => ({
							...current,
							telefone: event.target.value
						})),
						className: inputClassName
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: status === "loading",
					className: "mt-1 rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground shadow-sm transition-all hover:bg-secondary/90 hover:shadow-md active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
					children: status === "loading" ? "Enviando solicitação…" : "Enviar solicitação"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"aria-live": "polite",
					className: "min-h-5 text-sm",
					children: [status === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-green-700",
						children: "Solicitação enviada com sucesso."
					}) : null, status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-destructive",
						children: "Não foi possível enviar. Confira os campos e tente novamente."
					}) : null]
				})
			]
		})]
	});
}
//#endregion
export { Page as component };
