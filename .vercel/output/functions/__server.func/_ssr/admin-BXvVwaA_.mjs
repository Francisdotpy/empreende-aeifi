import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-B8vHX-rA.mjs";
import { a as require_react, i as require_jsx_runtime, r as useQueryClient, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { a as parseWhatsAppContacts, i as editableFields, o as siteContentQuery, r as WHATSAPP_CONTACTS_KEY } from "./router-B2yRfqy2.mjs";
import { c as Section, s as PageHero, t as Card } from "./ui-DPwwP1Yp.mjs";
import { r as createServerFn } from "./server--SO13o6a.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-D18V-PXc.mjs";
import { t as createSsrRpc } from "./createSsrRpc-BNhEyr6m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BXvVwaA_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var uploadSiteFile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => {
	if (!data?.name || !data?.dataBase64) throw new Error("Arquivo inválido");
	return data;
}).handler(createSsrRpc("87c9c96ef0822f31202a3a0ee43e0d91281993e49cb43e4cb7f78161174ea80a"));
/**
* Concede o papel de administrador ao usuário autenticado, desde que o e-mail
* esteja na lista de permissão. Executado somente no servidor.
*/
var claimAdmin = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("420039d888d6f92ecb02d2e25a67a5644d3a2ad34e92c5fcd0204779278c07c3"));
var ADMIN_EMAIL = "aeififoz@gmail.com";
function AdminPage() {
	const [session, setSession] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setReady(true);
		});
		return () => sub.subscription.unsubscribe();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		eyebrow: "Área restrita",
		title: "Área administrativa",
		lead: "Atualize aqui as informações institucionais que aparecem no site. O que for preenchido substitui automaticamente os marcadores de informação pendente."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: !ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Carregando…"
	}) : session ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editor, { onSignOut: () => supabase.auth.signOut() }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, {}) })] });
}
function LoginForm() {
	const [email, setEmail] = (0, import_react.useState)(ADMIN_EMAIL);
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		let { error: signInError } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (signInError && signInError.message.toLowerCase().includes("invalid login")) {
			const { error: signUpError } = await supabase.auth.signUp({
				email,
				password,
				options: { emailRedirectTo: `${window.location.origin}/admin` }
			});
			if (!signUpError) ({error: signInError} = await supabase.auth.signInWithPassword({
				email,
				password
			}));
			else signInError = signUpError;
		}
		if (signInError) setError("Não foi possível entrar. Verifique o e-mail e a senha.");
		else await claimAdmin().catch(() => void 0);
		setLoading(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "mx-auto max-w-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl font-semibold text-primary",
			children: "Entrar"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-5 grid gap-4",
			onSubmit: submit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1.5 text-sm font-medium text-primary",
					children: ["E-mail", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "email",
						required: true,
						value: email,
						onChange: (e) => setEmail(e.target.value),
						className: "rounded-lg border border-input bg-card px-3 py-2.5 text-sm font-normal text-foreground shadow-sm hover:border-primary/30 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1.5 text-sm font-medium text-primary",
					children: ["Senha", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						required: true,
						value: password,
						onChange: (e) => setPassword(e.target.value),
						className: "rounded-lg border border-input bg-card px-3 py-2.5 text-sm font-normal text-foreground shadow-sm hover:border-primary/30 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-destructive",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: loading,
					className: "rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
					children: loading ? "Entrando…" : "Entrar"
				})
			]
		})]
	});
}
function Editor({ onSignOut }) {
	const queryClient = useQueryClient();
	const { data, isLoading } = useQuery(siteContentQuery);
	const [values, setValues] = (0, import_react.useState)({});
	const [status, setStatus] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (data) setValues(data);
	}, [data]);
	(0, import_react.useEffect)(() => {
		claimAdmin().catch(() => void 0);
	}, []);
	const groups = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const field of editableFields) {
			const list = map.get(field.group) ?? [];
			list.push(field);
			map.set(field.group, list);
		}
		return [...map.entries()];
	}, []);
	async function save() {
		setSaving(true);
		setStatus(null);
		const rows = editableFields.map((f) => ({
			key: f.key,
			value: values[f.key] ?? ""
		}));
		const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
		setSaving(false);
		if (error) {
			setStatus("Não foi possível salvar. Verifique se você está com acesso de administrador.");
			return;
		}
		setStatus("Informações salvas e publicadas no site.");
		queryClient.invalidateQueries({ queryKey: ["site_content"] });
	}
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Carregando informações…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Campos deixados em branco continuam exibindo o marcador de informação pendente."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onSignOut,
					className: "rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-colors hover:border-primary/25 hover:bg-muted",
					children: "Sair"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold text-primary",
					children: "Textos das páginas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [
						"Para reescrever qualquer texto do site, navegue até a página desejada com o seu login ativo e clique em ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "“Editar textos da página”" }),
						", no canto inferior esquerdo. Depois é só clicar sobre o trecho e digitar. Abaixo ficam registradas as alterações já feitas."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomTexts, { data: data ?? {} })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppContactsEditor, {
				value: values["whatsapp.contatos"] ?? "",
				onChange: (next) => setValues((current) => ({
					...current,
					[WHATSAPP_CONTACTS_KEY]: next
				}))
			}),
			groups.map(([group, fields]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold text-primary",
				children: group
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-4 md:grid-cols-2",
				children: fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldEditor, {
					field,
					value: values[field.key] ?? "",
					onChange: (next) => setValues((v) => ({
						...v,
						[field.key]: next
					}))
				}, field.key))
			})] }, group)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky bottom-4 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-lift",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: save,
					disabled: saving,
					className: "rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground shadow-sm transition-all hover:bg-secondary/90 hover:shadow-md active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
					children: saving ? "Salvando…" : "Salvar e publicar"
				}), status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted-foreground",
					children: status
				}) : null]
			})
		]
	});
}
function WhatsAppContactsEditor({ value, onChange }) {
	const queryClient = useQueryClient();
	const contacts = parseWhatsAppContacts(value);
	const [draft, setDraft] = (0, import_react.useState)({
		nome: "",
		funcao: "",
		numero: ""
	});
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [message, setMessage] = (0, import_react.useState)(null);
	async function publish(next, operation) {
		setBusy(operation);
		setMessage(null);
		const encoded = JSON.stringify(next);
		const { error } = await supabase.from("site_content").upsert([{
			key: WHATSAPP_CONTACTS_KEY,
			value: encoded
		}], { onConflict: "key" });
		if (error) {
			setMessage({
				type: "error",
				text: "Não foi possível atualizar os contatos. Verifique seu acesso e tente novamente."
			});
			setBusy(null);
			return false;
		}
		onChange(encoded);
		await queryClient.invalidateQueries({ queryKey: ["site_content"] });
		setBusy(null);
		return true;
	}
	async function addContact(event) {
		event.preventDefault();
		const contact = {
			nome: draft.nome.trim(),
			funcao: draft.funcao.trim(),
			numero: draft.numero.replace(/\D/g, "")
		};
		if (!contact.nome || !contact.funcao || contact.numero.length < 10 || contact.numero.length > 15) {
			setMessage({
				type: "error",
				text: "Preencha nome, função e um número internacional válido com 10 a 15 dígitos."
			});
			return;
		}
		if (contacts.some((item) => item.numero === contact.numero)) {
			setMessage({
				type: "error",
				text: "Este número já está cadastrado."
			});
			return;
		}
		if (await publish([...contacts, contact], "add")) {
			setDraft({
				nome: "",
				funcao: "",
				numero: ""
			});
			setMessage({
				type: "success",
				text: "Contato adicionado e publicado no WhatsApp flutuante."
			});
		}
	}
	async function removeContact(index) {
		if (await publish(contacts.filter((_, current) => current !== index), `remove-${index}`)) setMessage({
			type: "success",
			text: "Contato removido do WhatsApp flutuante."
		});
	}
	const inputClassName = "rounded-lg border border-input bg-card px-3 py-2.5 text-sm font-normal text-foreground shadow-sm hover:border-primary/30 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-semibold text-primary",
			children: "WhatsApp flutuante"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Cadastre os contatos que serão exibidos no botão flutuante. Use o número com DDI e DDD."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: addContact,
			className: "mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1.5 text-sm font-medium text-primary",
					children: ["Nome", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						value: draft.nome,
						onChange: (event) => setDraft((current) => ({
							...current,
							nome: event.target.value
						})),
						className: inputClassName
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1.5 text-sm font-medium text-primary",
					children: ["Função", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						value: draft.funcao,
						onChange: (event) => setDraft((current) => ({
							...current,
							funcao: event.target.value
						})),
						className: inputClassName
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1.5 text-sm font-medium text-primary",
					children: ["Número", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						type: "tel",
						inputMode: "numeric",
						placeholder: "5545999999999",
						value: draft.numero,
						onChange: (event) => setDraft((current) => ({
							...current,
							numero: event.target.value
						})),
						className: inputClassName
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: busy !== null,
					className: "rounded-lg bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground shadow-sm transition-all hover:bg-secondary/90 hover:shadow-md active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
					children: busy === "add" ? "Adicionando…" : "Adicionar"
				})
			]
		}),
		message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-3 text-sm font-medium ${message.type === "error" ? "text-destructive" : "text-green-700"}`,
			"aria-live": "polite",
			children: message.text
		}) : null,
		contacts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-5 grid gap-2",
			children: contacts.map((contact, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-muted/35 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-primary",
						children: contact.nome
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							contact.funcao,
							" · +",
							contact.numero
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: busy !== null,
					onClick: () => void removeContact(index),
					className: "rounded-lg border border-destructive/30 bg-card px-3 py-2 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50",
					children: busy === `remove-${index}` ? "Removendo…" : "Remover"
				})]
			}, `${contact.numero}-${index}`))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-5 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground",
			children: "Nenhum contato cadastrado."
		})
	] });
}
function FieldEditor({ field, value, onChange }) {
	const isUpload = field.kind === "file" || field.kind === "image";
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [uploadError, setUploadError] = (0, import_react.useState)(null);
	async function handleFile(file) {
		setUploading(true);
		setUploadError(null);
		try {
			const buffer = await file.arrayBuffer();
			let binary = "";
			const bytes = new Uint8Array(buffer);
			for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
			onChange((await uploadSiteFile({ data: {
				name: file.name,
				contentType: file.type || "application/octet-stream",
				dataBase64: btoa(binary)
			} })).url);
		} catch {
			setUploadError("Não foi possível enviar o arquivo. Tente um arquivo menor que 8 MB.");
		}
		setUploading(false);
	}
	if (isUpload) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5 text-sm font-medium text-primary",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: field.label }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "file",
				accept: field.kind === "image" ? "image/*" : "application/pdf,image/*",
				onChange: (e) => {
					const file = e.target.files?.[0];
					if (file) handleFile(file);
				},
				className: "rounded-lg border border-input bg-card px-3 py-2.5 text-sm font-normal text-foreground shadow-sm hover:border-primary/30 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
			}),
			uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted-foreground",
				children: "Enviando…"
			}) : null,
			uploadError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-destructive",
				children: uploadError
			}) : null,
			value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-3 text-xs font-normal",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: value,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "text-secondary underline",
					children: "Ver arquivo atual"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onChange(""),
					className: "text-destructive underline",
					children: "Remover"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-normal text-muted-foreground",
				children: "Nenhum arquivo enviado."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1.5 text-sm font-medium text-primary",
		children: [field.label, field.multiline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			rows: 3,
			value,
			onChange: (e) => onChange(e.target.value),
			className: "rounded-lg border border-input bg-card px-3 py-2.5 text-sm font-normal text-foreground shadow-sm hover:border-primary/30 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "rounded-lg border border-input bg-card px-3 py-2.5 text-sm font-normal text-foreground shadow-sm hover:border-primary/30 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
		})]
	});
}
function CustomTexts({ data }) {
	const queryClient = useQueryClient();
	const [busy, setBusy] = (0, import_react.useState)(null);
	const items = Object.entries(data).filter(([key, value]) => key.startsWith("txt.") && value.trim()).map(([key, value]) => ({
		key,
		value,
		original: data[`src.${key.slice(4)}`] ?? ""
	}));
	async function reset(key) {
		setBusy(key);
		await supabase.from("site_content").upsert([{
			key,
			value: ""
		}], { onConflict: "key" });
		await queryClient.invalidateQueries({ queryKey: ["site_content"] });
		setBusy(null);
	}
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-4 text-sm text-muted-foreground",
		children: "Nenhum texto personalizado ainda. As alterações feitas na navegação aparecerão aqui."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-4 grid gap-3",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "rounded-xl border border-border bg-card p-4 shadow-sm",
			children: [
				item.original ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground line-through",
					children: item.original
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-foreground",
					children: item.value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: busy === item.key,
					onClick: () => void reset(item.key),
					className: "mt-2 text-xs font-semibold text-destructive underline disabled:opacity-60",
					children: busy === item.key ? "Restaurando…" : "Restaurar texto original"
				})
			]
		}, item.key))
	});
}
//#endregion
export { AdminPage as component };
