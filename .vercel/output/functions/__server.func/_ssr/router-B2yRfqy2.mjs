import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-B8vHX-rA.mjs";
import { a as require_react, i as require_jsx_runtime, n as QueryClientProvider, r as useQueryClient, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useRouter, h as Link, j as notFound, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as Menu, r as MessageCircle, t as X } from "../_libs/lucide-react.mjs";
import { c as __exportAll } from "./server--SO13o6a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-b1prtc50.js
var TBD = "[INFORMAÇÃO A SER FORNECIDA PELA AEIFI]";
var org = {
	sigla: "AEIFI",
	nome: "Associação dos Empreendedores Individuais de Foz do Iguaçu",
	razaoSocial: TBD,
	cnpj: TBD,
	fundacao: TBD,
	sede: TBD,
	cidade: "Foz do Iguaçu, Paraná",
	telefone: TBD,
	whatsapp: TBD,
	email: TBD,
	horario: TBD,
	redes: [{
		nome: "Instagram",
		url: TBD
	}, {
		nome: "Facebook",
		url: TBD
	}],
	missao: "Apoiar, representar e conectar microempreendedores individuais e pequenos negócios de Foz do Iguaçu, criando oportunidades reais de desenvolvimento para quem empreende na cidade.",
	visao: "Ser a referência associativa do microempreendedorismo em Foz do Iguaçu, reconhecida pela seriedade, pela capacidade de articulação e pelo impacto concreto na vida de quem empreende.",
	valores: [
		{
			titulo: "Coletividade",
			texto: "Acreditamos que empreendedores avançam mais longe quando caminham juntos. A associação existe para transformar esforços individuais em força coletiva."
		},
		{
			titulo: "Transparência",
			texto: "Documentos, decisões e resultados são apresentados de forma aberta a associados, parceiros e à comunidade."
		},
		{
			titulo: "Compromisso local",
			texto: "Nossa atuação é enraizada em Foz do Iguaçu. Fortalecer o pequeno negócio é fortalecer os bairros, as famílias e a economia da cidade."
		},
		{
			titulo: "Respeito e inclusão",
			texto: "Atendemos empreendedores de todos os perfis, setores e regiões da cidade, sem distinção."
		},
		{
			titulo: "Inovação com propósito",
			texto: "Desenvolvemos soluções práticas — como o BuscaMEI — sempre a serviço da missão institucional, nunca como um fim em si mesmas."
		}
	],
	objetivos: [
		"Representar os interesses dos microempreendedores individuais junto ao poder público, entidades e instituições.",
		"Promover capacitação continuada e acesso à informação de qualidade para pequenos negócios.",
		"Estimular conexões entre empreendedores, consumidores, empresas e instituições da cidade.",
		"Criar e divulgar oportunidades de negócio, formalização e crescimento.",
		"Desenvolver projetos e ferramentas que ampliem a visibilidade e a competitividade do pequeno negócio local.",
		"Manter uma gestão transparente, participativa e prestadora de contas."
	],
	publico: [
		"Microempreendedores individuais (MEI) formalizados",
		"Empreendedores em processo de formalização",
		"Pequenos negócios e empresas de pequeno porte",
		"Autônomos e profissionais que atuam por conta própria",
		"Instituições, empresas e órgãos públicos parceiros"
	]
};
var areas = [
	{
		slug: "representatividade",
		titulo: "Representatividade",
		resumo: "Fortalecimento e representação dos interesses dos empreendedores de Foz do Iguaçu.",
		descricao: "A AEIFI existe para que o microempreendedor individual não precise falar sozinho. Reunimos demandas comuns, organizamos a pauta do segmento e levamos essa voz a espaços de decisão, entidades e instituições que influenciam o dia a dia de quem empreende na cidade.",
		praticas: [
			"Escuta permanente das demandas dos associados",
			"Articulação com poder público, entidades e instituições locais",
			"Participação em fóruns, conselhos e reuniões de interesse do segmento",
			"Posicionamento institucional sobre temas que afetam o pequeno negócio"
		]
	},
	{
		slug: "capacitacao",
		titulo: "Capacitação",
		resumo: "Cursos, palestras, oficinas e iniciativas para o desenvolvimento dos empreendedores.",
		descricao: "Conhecimento aplicado é o que separa uma ideia de um negócio que se sustenta. A AEIFI promove e viabiliza ações formativas voltadas à realidade do microempreendedor: gestão simples, formalização, atendimento, precificação, presença digital e organização financeira.",
		praticas: [
			"Oficinas e cursos práticos para MEIs e pequenos negócios",
			"Palestras e encontros temáticos com especialistas e parceiros",
			"Orientação sobre formalização e obrigações do MEI",
			"Conteúdos e materiais de apoio para os associados"
		]
	},
	{
		slug: "conexoes",
		titulo: "Conexões",
		resumo: "Aproximação entre empreendedores, consumidores, empresas, instituições e parceiros.",
		descricao: "Boa parte das oportunidades nasce de um encontro. A associação cria pontes: entre empreendedores que podem comprar e vender entre si, entre pequenos negócios e consumidores da cidade, e entre a base empreendedora e instituições capazes de apoiá-la.",
		praticas: [
			"Encontros e reuniões de associados",
			"Aproximação entre empreendedores e consumidores locais",
			"Intermediação de contatos com empresas e instituições",
			"Rede de parceiros à disposição dos associados"
		]
	},
	{
		slug: "oportunidades",
		titulo: "Oportunidades",
		resumo: "Criação e divulgação de oportunidades para o fortalecimento dos pequenos negócios.",
		descricao: "Identificamos, organizamos e divulgamos oportunidades que muitas vezes não chegam ao microempreendedor: editais, feiras, ações de divulgação, chamadas de parceiros e espaços de comercialização.",
		praticas: [
			"Divulgação de editais, feiras e chamadas públicas",
			"Espaços de exposição e comercialização para associados",
			"Ações conjuntas de divulgação dos pequenos negócios",
			"Encaminhamento de demandas de compradores para associados"
		]
	},
	{
		slug: "projetos-e-inovacao",
		titulo: "Projetos e inovação",
		resumo: "Desenvolvimento de soluções que contribuam para o crescimento dos empreendedores.",
		descricao: "A AEIFI desenvolve projetos e ferramentas próprias quando identifica um problema concreto que o mercado não resolve. É desse trabalho que nasceu o BuscaMEI, plataforma criada pela associação para ampliar a visibilidade dos microempreendedores da cidade.",
		praticas: [
			"Diagnóstico de dificuldades recorrentes dos associados",
			"Desenvolvimento de soluções próprias, como o BuscaMEI",
			"Projetos em parceria com instituições e empresas",
			"Acompanhamento de resultados e melhoria contínua"
		]
	}
];
var iniciativas = [
	{
		slug: "buscamei",
		titulo: "BuscaMEI",
		etiqueta: "Um produto da AEIFI",
		resumo: "Plataforma criada pela AEIFI para ampliar a visibilidade dos microempreendedores e facilitar a conexão entre quem oferece e quem procura produtos e serviços.",
		problema: "Muitos microempreendedores prestam serviços de qualidade, mas são pouco encontrados por quem procura. A ausência de presença digital organizada limita o alcance do negócio.",
		objetivo: "Ampliar a visibilidade dos microempreendedores de Foz do Iguaçu e facilitar que consumidores encontrem produtos e serviços locais.",
		publico: "Microempreendedores individuais e pequenos negócios; e a comunidade que procura produtos e serviços na cidade.",
		funcionamento: [
			"O empreendedor cadastra seu negócio, atividades e formas de contato.",
			"As informações ficam organizadas por tipo de produto ou serviço.",
			"Quem procura faz a busca e encontra empreendedores locais.",
			"O contato acontece diretamente entre consumidor e empreendedor."
		],
		resultados: TBD,
		parceiros: TBD,
		destaque: true,
		href: "/buscamei"
	},
	{
		slug: "programa-de-capacitacao",
		titulo: "Programa de capacitação de empreendedores",
		etiqueta: "Formação",
		resumo: "Ciclo de oficinas, cursos e palestras voltados às necessidades práticas de quem toca um pequeno negócio.",
		problema: "O microempreendedor costuma aprender na tentativa e erro, sem acesso a formação acessível e aplicada à sua realidade.",
		objetivo: "Oferecer formação prática e gratuita ou de baixo custo em temas essenciais para a sustentação do negócio.",
		publico: "MEIs, empreendedores em formalização e pequenos negócios da cidade.",
		funcionamento: [
			"Levantamento das necessidades formativas junto aos associados.",
			"Organização das turmas, temas e parcerias.",
			"Realização das atividades presenciais e/ou on-line.",
			"Acompanhamento e avaliação dos participantes."
		],
		resultados: TBD,
		parceiros: TBD
	},
	{
		slug: "encontros-de-associados",
		titulo: "Encontros de associados",
		etiqueta: "Rede",
		resumo: "Reuniões periódicas para troca de experiências, apresentação de oportunidades e construção coletiva da pauta da associação.",
		problema: "Empreender sozinho gera isolamento e reduz o acesso a informação e oportunidades.",
		objetivo: "Manter uma rede ativa de empreendedores que se conhecem, se indicam e decidem juntos os rumos da associação.",
		publico: "Associados da AEIFI e empreendedores interessados em participar.",
		funcionamento: [
			"Convocação e divulgação do encontro aos associados.",
			"Pauta com informes institucionais e temas de interesse.",
			"Espaço de apresentação dos negócios participantes.",
			"Registro das deliberações e encaminhamentos."
		],
		resultados: TBD,
		parceiros: TBD
	},
	{
		slug: "apoio-a-formalizacao",
		titulo: "Apoio à formalização e orientação ao MEI",
		etiqueta: "Atendimento",
		resumo: "Orientação sobre abertura, obrigações e regularização do MEI, com encaminhamento aos órgãos e parceiros competentes.",
		problema: "Dúvidas sobre formalização, declaração anual e obrigações fazem muitos empreendedores permanecerem informais ou irregulares.",
		objetivo: "Reduzir barreiras de informação para que mais empreendedores atuem formalmente e com segurança.",
		publico: "Empreendedores informais, MEIs recém-abertos e MEIs em regularização.",
		funcionamento: [
			"Atendimento e escuta da situação do empreendedor.",
			"Orientação sobre os passos e documentos necessários.",
			"Encaminhamento a órgãos e parceiros quando necessário.",
			"Acompanhamento do caso pela associação."
		],
		resultados: TBD,
		parceiros: TBD
	}
];
var impacto = [
	{
		valor: TBD,
		rotulo: "Empreendedores apoiados"
	},
	{
		valor: TBD,
		rotulo: "Associados ativos"
	},
	{
		valor: TBD,
		rotulo: "Capacitações realizadas"
	},
	{
		valor: TBD,
		rotulo: "Eventos e ações institucionais"
	},
	{
		valor: TBD,
		rotulo: "Parceiros e instituições"
	},
	{
		valor: TBD,
		rotulo: "Empreendedores no BuscaMEI"
	}
];
var depoimentos = [{
	texto: TBD,
	autor: TBD,
	negocio: TBD
}, {
	texto: TBD,
	autor: TBD,
	negocio: TBD
}];
var noticias = [
	{
		slug: "aeifi-apresenta-o-buscamei-aos-associados",
		titulo: "AEIFI apresenta o BuscaMEI aos associados",
		data: TBD,
		categoria: "Projetos",
		resumo: "A associação apresentou aos associados a plataforma desenvolvida para ampliar a visibilidade dos microempreendedores da cidade.",
		corpo: [
			"A AEIFI apresentou aos seus associados o BuscaMEI, plataforma desenvolvida pela própria associação para ampliar a visibilidade dos microempreendedores de Foz do Iguaçu e facilitar a conexão entre quem oferece e quem procura produtos e serviços.",
			"Durante o encontro foram explicados o funcionamento do cadastro, as informações que ficam visíveis para quem faz a busca e a forma como a ferramenta se articula com as demais ações da associação.",
			`Detalhes da atividade, data, local e número de participantes: ${TBD}.`
		]
	},
	{
		slug: "capacitacao-para-microempreendedores",
		titulo: "Capacitação para microempreendedores reúne participantes em Foz do Iguaçu",
		data: TBD,
		categoria: "Capacitação",
		resumo: "Atividade formativa abordou temas práticos de gestão para quem toca um pequeno negócio na cidade.",
		corpo: [
			"A AEIFI realizou mais uma atividade de capacitação voltada a microempreendedores individuais e pequenos negócios de Foz do Iguaçu, dentro do seu programa permanente de formação.",
			"A programação tratou de temas práticos do dia a dia do empreendedor, como organização financeira, atendimento ao cliente e presença digital.",
			`Data, local, conteúdo programático, parceiros e número de participantes: ${TBD}.`
		]
	},
	{
		slug: "aeifi-amplia-rede-de-parceiros",
		titulo: "AEIFI amplia sua rede de parceiros institucionais",
		data: TBD,
		categoria: "Parcerias",
		resumo: "Novas articulações buscam ampliar as oportunidades oferecidas aos empreendedores associados.",
		corpo: [
			"A associação segue ampliando sua rede de parceiros com empresas, entidades, instituições de ensino e órgãos públicos interessados em contribuir com o desenvolvimento do microempreendedorismo em Foz do Iguaçu.",
			"As parcerias viabilizam capacitações, ações de divulgação, espaços de comercialização e apoio técnico às iniciativas da AEIFI.",
			`Relação de parceiros, escopo de cada parceria e datas: ${TBD}.`
		]
	}
];
var diretoria = [
	{
		id: "presidencia",
		cargo: "Presidência",
		nome: TBD
	},
	{
		id: "secretaria",
		cargo: "Secretaria",
		nome: TBD
	},
	{
		id: "tesouraria",
		cargo: "Tesouraria",
		nome: TBD
	},
	{
		id: "conselho-fiscal",
		cargo: "Conselho fiscal",
		nome: TBD
	}
];
var documentos = [
	{
		nome: "Estatuto Social",
		descricao: "Documento que define a finalidade, a estrutura e as regras de funcionamento da associação.",
		situacao: TBD
	},
	{
		nome: "Ata de fundação",
		descricao: "Registro da constituição formal da AEIFI.",
		situacao: TBD
	},
	{
		nome: "Ata de eleição da diretoria vigente",
		descricao: "Registro da composição atual da diretoria e do conselho fiscal.",
		situacao: TBD
	},
	{
		nome: "Cartão CNPJ",
		descricao: "Comprovante de inscrição e situação cadastral da associação.",
		situacao: TBD
	},
	{
		nome: "Relatório anual de atividades",
		descricao: "Resumo das ações, projetos e resultados do período.",
		situacao: TBD
	},
	{
		nome: "Prestação de contas",
		descricao: "Demonstração das receitas e despesas do exercício, quando aplicável.",
		situacao: TBD
	}
];
var beneficiosAssociado = [
	"Representação institucional dos seus interesses como microempreendedor.",
	"Participação nas capacitações, oficinas e palestras promovidas pela associação.",
	"Acesso à rede de empreendedores, parceiros e instituições da AEIFI.",
	"Divulgação do seu negócio nas ações e canais da associação.",
	"Cadastro e presença no BuscaMEI, plataforma desenvolvida pela AEIFI.",
	"Orientação sobre formalização, obrigações e regularização do MEI.",
	"Voz e voto nas assembleias, participando das decisões da associação."
];
var formatosParceria = [
	{
		titulo: "Apoio a capacitações",
		texto: "Ceder instrutores, conteúdo, espaço ou estrutura para oficinas, cursos e palestras."
	},
	{
		titulo: "Projetos conjuntos",
		texto: "Desenvolver com a AEIFI projetos voltados ao fortalecimento do pequeno negócio local."
	},
	{
		titulo: "Oportunidades para associados",
		texto: "Oferecer condições, serviços, espaços de comercialização ou vagas de compra a empreendedores associados."
	},
	{
		titulo: "Apoio institucional",
		texto: "Somar-se às ações da associação com apoio técnico, articulação ou patrocínio de iniciativas."
	}
];
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-B2yRfqy2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-D4V3zcfa.css";
var logo_header_default = "/assets/logo-header-BzY9OVoN.jpeg";
var nav = [
	{
		to: "/",
		label: "Início"
	},
	{
		to: "/a-aeifi",
		label: "A AEIFI"
	},
	{
		to: "/o-que-fazemos",
		label: "O que fazemos"
	},
	{
		to: "/iniciativas",
		label: "Projetos e Iniciativas"
	},
	{
		to: "/buscamei",
		label: "BuscaMEI"
	},
	{
		to: "/noticias",
		label: "Notícias"
	},
	{
		to: "/transparencia",
		label: "Transparência"
	},
	{
		to: "/contato",
		label: "Contato"
	}
];
function Header() {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 border-b border-border bg-card/95 shadow-sm backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page flex h-18 items-center justify-between gap-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "flex items-center",
					onClick: () => setOpen(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logo_header_default,
						alt: "Logotipo da AEIFI",
						className: "h-11 w-11 rounded-xl object-contain"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 xl:flex",
					"aria-label": "Navegação principal",
					children: nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						activeOptions: { exact: item.to === "/" },
						activeProps: { className: "bg-muted text-primary shadow-sm" },
						className: "whitespace-nowrap rounded-md px-2.5 py-2 text-[0.82rem] font-medium text-foreground/80 transition-all hover:bg-muted hover:text-primary",
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/associe-se",
						className: "hidden rounded-md bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground shadow-sm transition-all hover:bg-secondary/90 hover:shadow-md active:translate-y-px sm:inline-flex",
						children: "Quero me associar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setOpen((v) => !v),
						"aria-expanded": open,
						"aria-label": open ? "Fechar menu" : "Abrir menu",
						className: "inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted xl:hidden",
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
					})]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "border-t border-border bg-card shadow-md xl:hidden",
			"aria-label": "Navegação principal (mobile)",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page grid gap-1 py-3",
				children: [nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: item.to,
					onClick: () => setOpen(false),
					activeOptions: { exact: item.to === "/" },
					activeProps: { className: "bg-muted text-primary shadow-sm" },
					className: "rounded-md px-3 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-muted",
					children: item.label
				}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/associe-se",
					onClick: () => setOpen(false),
					className: "mt-2 rounded-md bg-secondary px-3 py-3 text-center text-base font-semibold text-secondary-foreground",
					children: "Quero me associar"
				})]
			})
		})]
	});
}
var WHATSAPP_CONTACTS_KEY = "whatsapp.contatos";
function parseWhatsAppContacts(value) {
	if (!value.trim()) return [];
	try {
		const parsed = JSON.parse(value);
		if (!Array.isArray(parsed)) return [];
		return parsed.flatMap((entry) => {
			if (!entry || typeof entry !== "object") return [];
			const contact = entry;
			const nome = typeof contact.nome === "string" ? contact.nome.trim() : "";
			const funcao = typeof contact.funcao === "string" ? contact.funcao.trim() : "";
			const numero = typeof contact.numero === "string" ? contact.numero.replace(/\D/g, "") : "";
			if (!nome || !funcao || numero.length < 10 || numero.length > 15) return [];
			return [{
				nome,
				funcao,
				numero
			}];
		});
	} catch {
		return [];
	}
}
var siteContentQuery = {
	queryKey: ["site_content"],
	queryFn: async () => {
		const { data, error } = await supabase.from("site_content").select("key,value");
		if (error) throw error;
		const map = {};
		for (const row of data ?? []) if (row.value && row.value.trim()) map[row.key] = row.value.trim();
		return map;
	},
	staleTime: 6e4
};
/** Lista de campos editáveis na área administrativa. */
var editableFields = [
	{
		group: "Identificação",
		key: "org.razaoSocial",
		label: "Razão social"
	},
	{
		group: "Identificação",
		key: "org.cnpj",
		label: "CNPJ"
	},
	{
		group: "Identificação",
		key: "org.fundacao",
		label: "Data de fundação"
	},
	{
		group: "Identificação",
		key: "org.historia",
		label: "História, marcos e conquistas",
		multiline: true
	},
	{
		group: "Contato",
		key: "org.sede",
		label: "Endereço da sede"
	},
	{
		group: "Contato",
		key: "org.telefone",
		label: "Telefone"
	},
	{
		group: "Contato",
		key: "org.whatsapp",
		label: "WhatsApp"
	},
	{
		group: "Contato",
		key: "org.email",
		label: "E-mail"
	},
	{
		group: "Contato",
		key: "org.horario",
		label: "Horário de atendimento"
	},
	{
		group: "Redes sociais",
		key: "org.redes.0",
		label: "Instagram (URL)"
	},
	{
		group: "Redes sociais",
		key: "org.redes.1",
		label: "Facebook (URL)"
	},
	...impacto.map((i, idx) => ({
		group: "Números de impacto",
		key: `impacto.${idx}`,
		label: i.rotulo
	})),
	...diretoria.map((d) => ({
		group: "Diretoria",
		key: `diretoria.${d.id}`,
		label: d.cargo
	})),
	...documentos.map((d, idx) => ({
		group: "Transparência (situação dos documentos)",
		key: `documentos.${idx}`,
		label: d.nome
	})),
	...documentos.map((d, idx) => ({
		group: "Transparência (arquivos)",
		key: `documentos.${idx}.arquivo`,
		label: `${d.nome} — arquivo (PDF/imagem)`,
		kind: "file"
	})),
	{
		group: "Transparência (arquivos)",
		key: "relatorios.atividades.arquivo",
		label: "Relatório anual de atividades — arquivo",
		kind: "file"
	},
	{
		group: "Transparência (arquivos)",
		key: "relatorios.contas.arquivo",
		label: "Prestação de contas — arquivo",
		kind: "file"
	},
	{
		group: "Depoimentos",
		key: "depoimentos.0.texto",
		label: "Depoimento 1 — texto",
		multiline: true
	},
	{
		group: "Depoimentos",
		key: "depoimentos.0.autor",
		label: "Depoimento 1 — autor"
	},
	{
		group: "Depoimentos",
		key: "depoimentos.0.negocio",
		label: "Depoimento 1 — negócio"
	},
	{
		group: "Depoimentos",
		key: "depoimentos.1.texto",
		label: "Depoimento 2 — texto",
		multiline: true
	},
	{
		group: "Depoimentos",
		key: "depoimentos.1.autor",
		label: "Depoimento 2 — autor"
	},
	{
		group: "Depoimentos",
		key: "depoimentos.1.negocio",
		label: "Depoimento 2 — negócio"
	},
	...noticias.map((n, idx) => ({
		group: "Notícias (datas)",
		key: `noticias.${idx}.data`,
		label: n.titulo
	})),
	...noticias.map((n, idx) => ({
		group: "Notícias (fotos)",
		key: `noticias.${idx}.foto`,
		label: `${n.titulo} — foto`,
		kind: "image"
	})),
	...iniciativas.flatMap((i) => [
		{
			group: "Iniciativas",
			key: `iniciativas.${i.slug}.resultados`,
			label: `${i.titulo} — resultados`,
			multiline: true
		},
		{
			group: "Iniciativas",
			key: `iniciativas.${i.slug}.parceiros`,
			label: `${i.titulo} — parceiros envolvidos`,
			multiline: true
		},
		{
			group: "Iniciativas",
			key: `iniciativas.${i.slug}.foto`,
			label: `${i.titulo} — foto`,
			kind: "image"
		}
	]),
	{
		group: "BuscaMEI",
		key: "buscamei.regras",
		label: "Regras de participação e documentos exigidos",
		multiline: true
	},
	{
		group: "BuscaMEI",
		key: "buscamei.cadastrados",
		label: "Empreendedores cadastrados"
	},
	{
		group: "BuscaMEI",
		key: "buscamei.categorias",
		label: "Categorias de atividade"
	},
	{
		group: "BuscaMEI",
		key: "buscamei.buscas",
		label: "Buscas realizadas"
	},
	{
		group: "Parceiros",
		key: "parceiros.lista",
		label: "Relação de parceiros e escopo das parcerias",
		multiline: true
	},
	{
		group: "Associe-se",
		key: "associe.contribuicao",
		label: "Contribuição associativa (valores e condições)",
		multiline: true
	}
];
function pick(map, key, fallback) {
	return map[key] ?? fallback;
}
function buildSite(map) {
	return {
		org: {
			...org,
			razaoSocial: pick(map, "org.razaoSocial", org.razaoSocial),
			cnpj: pick(map, "org.cnpj", org.cnpj),
			fundacao: pick(map, "org.fundacao", org.fundacao),
			sede: pick(map, "org.sede", org.sede),
			telefone: pick(map, "org.telefone", org.telefone),
			whatsapp: pick(map, "org.whatsapp", org.whatsapp),
			email: pick(map, "org.email", org.email),
			horario: pick(map, "org.horario", org.horario),
			redes: org.redes.map((r, idx) => ({
				...r,
				url: pick(map, `org.redes.${idx}`, r.url)
			}))
		},
		impacto: impacto.map((i, idx) => ({
			...i,
			valor: pick(map, `impacto.${idx}`, i.valor)
		})),
		diretoria: diretoria.map((d) => ({
			...d,
			nome: pick(map, `diretoria.${d.id}`, d.nome)
		})),
		documentos: documentos.map((d, idx) => ({
			...d,
			situacao: pick(map, `documentos.${idx}`, d.situacao)
		})),
		depoimentos: depoimentos.map((d, idx) => ({
			texto: pick(map, `depoimentos.${idx}.texto`, d.texto),
			autor: pick(map, `depoimentos.${idx}.autor`, d.autor),
			negocio: pick(map, `depoimentos.${idx}.negocio`, d.negocio)
		})),
		noticias: noticias.map((n, idx) => ({
			...n,
			data: pick(map, `noticias.${idx}.data`, n.data)
		})),
		/** Valor bruto de qualquer chave editável (string vazia quando não preenchida). */
		get: (key) => map[key] ?? ""
	};
}
function useSite() {
	const { data } = useQuery(siteContentQuery);
	return buildSite(data ?? {});
}
function visible(value) {
	const trimmed = value?.trim();
	return trimmed && trimmed !== "[INFORMAÇÃO A SER FORNECIDA PELA AEIFI]" ? trimmed : null;
}
function Footer() {
	const { org } = useSite();
	const details = [
		["Razão social", visible(org.razaoSocial)],
		["CNPJ", visible(org.cnpj)],
		["Endereço", visible(org.sede)],
		["Telefone", visible(org.telefone)],
		["E-mail", visible(org.email)]
	].filter((detail) => Boolean(detail[1]));
	const socialLinks = org.redes.map((network) => ({
		...network,
		url: visible(network.url)
	})).filter((network) => Boolean(network.url));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-20 bg-ink text-ink-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page grid gap-10 py-14 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl font-semibold",
							children: "AEIFI"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-sm text-sm text-ink-foreground/80",
							children: "Associação dos Empreendedores Individuais de Foz do Iguaçu"
						}),
						details.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "mt-6 space-y-1.5 text-sm text-ink-foreground/80",
							children: details.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", {
									className: "font-semibold text-ink-foreground",
									children: [label, ":"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: value })]
							}, label))
						}) : null,
						socialLinks.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-ink-foreground/80",
							children: socialLinks.map((network) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: network.url ?? void 0,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "hover:text-accent hover:underline",
								children: network.nome
							}, network.nome))
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "Links institucionais",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold uppercase tracking-wide text-accent",
						children: "Institucional"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-2 text-sm text-ink-foreground/85",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/a-aeifi",
								className: "hover:text-accent",
								children: "A AEIFI"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/o-que-fazemos",
								className: "hover:text-accent",
								children: "O que fazemos"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/iniciativas",
								className: "hover:text-accent",
								children: "Projetos e iniciativas"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/noticias",
								className: "hover:text-accent",
								children: "Notícias"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/transparencia",
								className: "hover:text-accent",
								children: "Transparência"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/parceiros",
								className: "hover:text-accent",
								children: "Parceiros"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/associe-se",
								className: "hover:text-accent",
								children: "Quero me associar"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contato",
								className: "hover:text-accent",
								children: "Contato"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/politica-de-privacidade",
								className: "hover:text-accent",
								children: "Política de Privacidade"
							}) })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold uppercase tracking-wide text-accent",
					children: "Nossas iniciativas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-xl border border-ink-foreground/15 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-semibold",
							children: "BuscaMEI"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wide text-accent",
							children: "Um produto da AEIFI"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-ink-foreground/80",
							children: "Plataforma criada pela associação para ampliar a visibilidade dos microempreendedores."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/buscamei",
							className: "mt-3 inline-block text-sm font-semibold text-accent hover:underline",
							children: "Conheça o BuscaMEI"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://www.buscamei.com.br",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "mt-1 block text-sm text-ink-foreground/70 hover:text-accent",
							children: "www.buscamei.com.br"
						})
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-ink-foreground/15",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page flex flex-col gap-1 py-6 text-xs text-ink-foreground/70 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" AEIFI – Associação dos Empreendedores Individuais de Foz do Iguaçu."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Foz do Iguaçu, Paraná — Brasil" })]
			})
		})]
	});
}
function WhatsAppFloatingButton() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { get } = useSite();
	const contacts = parseWhatsAppContacts(get(WHATSAPP_CONTACTS_KEY));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-4 right-4 z-40 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2 sm:bottom-6 sm:right-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": !open,
			className: `flex origin-bottom flex-col items-end gap-2 transition-all duration-200 ${open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-2 scale-95 opacity-0"}`,
			children: contacts.length ? contacts.map((contact) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: `https://wa.me/${contact.numero}`,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "flex max-w-full items-center gap-3 rounded-full border border-border bg-background py-2 pl-4 pr-2 text-sm font-semibold text-foreground shadow-lift transition-transform hover:-translate-y-0.5",
				tabIndex: open ? 0 : -1,
				"aria-label": `Conversar com ${contact.nome}, ${contact.funcao}, pelo WhatsApp`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 truncate",
					children: [
						contact.nome,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-normal text-muted-foreground",
							children: ["— ", contact.funcao]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
						className: "h-5 w-5",
						"aria-hidden": "true"
					})
				})]
			}, `${contact.nome}-${contact.numero}`)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-64 rounded-xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground shadow-lift",
				children: "Contatos de WhatsApp em breve."
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setOpen((value) => !value),
			"aria-expanded": open,
			"aria-label": open ? "Fechar contatos do WhatsApp" : "Abrir contatos do WhatsApp",
			className: "flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105",
			children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
				className: "h-6 w-6",
				"aria-hidden": "true"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
				className: "h-7 w-7",
				"aria-hidden": "true"
			})
		})]
	});
}
/** Hash estável (FNV-1a) usado como parte da chave do texto. */
function textHash(input) {
	let h = 2166136261;
	for (let i = 0; i < input.length; i += 1) {
		h ^= input.charCodeAt(i);
		h = Math.imul(h, 16777619) >>> 0;
	}
	return h.toString(16).padStart(8, "0");
}
function currentPath() {
	if (typeof window === "undefined") return "/";
	return window.location.pathname.replace(/\/+$/, "") || "/";
}
/** Chave única por página + trecho + ocorrência (evita que um texto altere outros). */
function textKey(original, occurrence = 0, path = currentPath()) {
	return `txt.${textHash(path)}.${textHash(normalize(original))}.${occurrence}`;
}
function sourceKey(original, occurrence = 0, path = currentPath()) {
	return `src.${textHash(path)}.${textHash(normalize(original))}.${occurrence}`;
}
function normalize(value) {
	return value.replace(/\s+/g, " ").trim();
}
var SKIP_TAGS = /* @__PURE__ */ new Set([
	"SCRIPT",
	"STYLE",
	"NOSCRIPT",
	"TEXTAREA",
	"INPUT",
	"SVG",
	"PATH"
]);
var originals = /* @__PURE__ */ new WeakMap();
var nodeKeys = /* @__PURE__ */ new WeakMap();
function eligible(node) {
	const parent = node.parentElement;
	if (!parent) return false;
	if (SKIP_TAGS.has(parent.tagName)) return false;
	if (parent.closest("[data-inline-edit-ui]")) return false;
	return normalize(originals.get(node) ?? node.nodeValue ?? "").length > 1;
}
function walk(root, fn) {
	const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
	const nodes = [];
	let current = walker.nextNode();
	while (current) {
		nodes.push(current);
		current = walker.nextNode();
	}
	nodes.forEach(fn);
}
/** Aplica os textos personalizados sobre o conteúdo já renderizado. */
function applyOverrides(map) {
	if (typeof document === "undefined") return;
	const seen = /* @__PURE__ */ new Map();
	walk(document.body, (node) => {
		if (!eligible(node)) return;
		const original = originals.get(node) ?? node.nodeValue ?? "";
		originals.set(node, original);
		const id = normalize(original);
		const occurrence = seen.get(id) ?? 0;
		seen.set(id, occurrence + 1);
		nodeKeys.set(node, {
			original,
			occurrence
		});
		const override = map[textKey(original, occurrence)];
		const next = override && override.trim() ? override : original;
		if (node.nodeValue !== next) node.nodeValue = next;
	});
}
function useIsAdmin() {
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let active = true;
		async function check() {
			const { data } = await supabase.auth.getSession();
			if (!data.session) {
				if (active) setIsAdmin(false);
				return;
			}
			const { data: role } = await supabase.rpc("has_role", {
				_user_id: data.session.user.id,
				_role: "admin"
			});
			if (active) setIsAdmin(Boolean(role));
		}
		check();
		const { data: sub } = supabase.auth.onAuthStateChange((event) => {
			if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") check();
		});
		return () => {
			active = false;
			sub.subscription.unsubscribe();
		};
	}, []);
	return isAdmin;
}
function InlineTextEditor() {
	const isAdmin = useIsAdmin();
	const queryClient = useQueryClient();
	const { data } = useQuery(siteContentQuery);
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [status, setStatus] = (0, import_react.useState)(null);
	const mapRef = (0, import_react.useRef)({});
	const editingRef = (0, import_react.useRef)(false);
	mapRef.current = data ?? {};
	editingRef.current = editing;
	(0, import_react.useEffect)(() => {
		let frame = 0;
		const run = () => {
			observer.disconnect();
			applyOverrides(mapRef.current);
			observer.observe(document.body, {
				childList: true,
				subtree: true,
				characterData: true
			});
		};
		const observer = new MutationObserver(() => {
			if (editingRef.current) return;
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(run);
		});
		run();
		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
		};
	}, [data]);
	(0, import_react.useEffect)(() => {
		if (!editing) return;
		document.body.classList.add("inline-edit-on");
		async function save(original, occurrence, value) {
			const key = textKey(original, occurrence);
			const nextValue = normalize(value) === normalize(original) ? "" : value.trim();
			const rows = [{
				key,
				value: nextValue
			}, {
				key: sourceKey(original, occurrence),
				value: normalize(original)
			}];
			const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
			if (error) {
				setStatus("Não foi possível salvar este texto.");
				return;
			}
			setStatus("Texto salvo e publicado.");
			mapRef.current = {
				...mapRef.current,
				[key]: nextValue
			};
			await queryClient.invalidateQueries({ queryKey: ["site_content"] });
		}
		function startEdit(node) {
			const parent = node.parentNode;
			if (!parent) return;
			const info = nodeKeys.get(node) ?? {
				original: originals.get(node) ?? node.nodeValue ?? "",
				occurrence: 0
			};
			const span = document.createElement("span");
			span.setAttribute("data-inline-editing", "true");
			span.contentEditable = "true";
			span.textContent = node.nodeValue ?? "";
			parent.replaceChild(span, node);
			span.focus();
			const selection = window.getSelection();
			if (selection) {
				const range = document.createRange();
				range.selectNodeContents(span);
				selection.removeAllRanges();
				selection.addRange(range);
			}
			const finish = () => {
				span.removeEventListener("blur", finish);
				span.removeEventListener("keydown", onKey);
				const value = span.textContent ?? "";
				node.nodeValue = value;
				span.replaceWith(node);
				originals.set(node, info.original);
				nodeKeys.set(node, info);
				save(info.original, info.occurrence, value);
			};
			const onKey = (e) => {
				if (e.key === "Escape") {
					span.textContent = mapRef.current[textKey(info.original, info.occurrence)] || info.original;
					span.blur();
				}
				if (e.key === "Enter" && !e.shiftKey) {
					e.preventDefault();
					span.blur();
				}
			};
			span.addEventListener("blur", finish);
			span.addEventListener("keydown", onKey);
		}
		function onClick(event) {
			const target = event.target;
			if (!target || target.closest("[data-inline-edit-ui]")) return;
			if (target.closest("[data-inline-editing]")) return;
			if (SKIP_TAGS.has(target.tagName)) return;
			let node = null;
			const caret = document.caretRangeFromPoint?.(event.clientX, event.clientY);
			if (caret && caret.startContainer.nodeType === Node.TEXT_NODE) node = caret.startContainer;
			if (!node || node.parentElement !== target) node = [...target.childNodes].find((n) => n.nodeType === Node.TEXT_NODE && normalize(n.nodeValue ?? "").length > 1) ?? node;
			if (!node || normalize(node.nodeValue ?? "").length <= 1) {
				setStatus("Clique diretamente sobre o trecho de texto que deseja editar.");
				return;
			}
			event.preventDefault();
			event.stopPropagation();
			if (!originals.has(node)) originals.set(node, node.nodeValue ?? "");
			startEdit(node);
		}
		document.addEventListener("click", onClick, true);
		return () => {
			document.body.classList.remove("inline-edit-on");
			document.removeEventListener("click", onClick, true);
		};
	}, [editing, queryClient]);
	if (!isAdmin) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-inline-edit-ui": true,
		className: "fixed bottom-4 left-4 z-50 flex max-w-[min(92vw,26rem)] flex-wrap items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-lift",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => {
				setStatus(null);
				setEditing((v) => !v);
			},
			className: `rounded-lg px-4 py-2 text-sm font-semibold ${editing ? "bg-secondary text-secondary-foreground" : "border border-border bg-background text-primary"}`,
			children: editing ? "Concluir edição" : "Editar textos da página"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted-foreground",
			children: status ?? (editing ? "Clique em qualquer texto para reescrever." : "Modo administrador")
		})]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$14 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "AEIFI — Associação dos Empreendedores de Foz do Iguaçu" },
			{
				name: "description",
				content: "A AEIFI apoia, representa e conecta microempreendedores individuais e pequenos negócios de Foz do Iguaçu."
			},
			{
				name: "author",
				content: "AEIFI"
			},
			{
				property: "og:site_name",
				content: "AEIFI"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "robots",
				content: "index, follow"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: logo_header_default,
				type: "image/jpeg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap"
			}
		],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "NGO",
				name: "AEIFI – Associação dos Empreendedores Individuais de Foz do Iguaçu",
				alternateName: "AEIFI",
				url: "/",
				areaServed: "Foz do Iguaçu, Paraná, Brasil",
				description: "Associação que apoia, representa e conecta microempreendedores individuais e pequenos negócios de Foz do Iguaçu."
			})
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$14.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-screen flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppFloatingButton, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineTextEditor, {})
		]
	});
}
var $$splitComponentImporter$12 = () => import("./routes-9iHfRkuM.mjs");
var Route$13 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "AEIFI — Associação de Empreendedores de Foz do Iguaçu" },
			{
				name: "description",
				content: "A AEIFI apoia, capacita, representa e conecta microempreendedores individuais e pequenos negócios de Foz do Iguaçu. Conheça a associação e associe-se."
			},
			{
				property: "og:title",
				content: "AEIFI — Associação de Empreendedores de Foz do Iguaçu"
			},
			{
				property: "og:description",
				content: "Fortalecemos quem empreende e desenvolvemos nossa comunidade. Conheça a AEIFI, suas áreas de atuação e suas iniciativas."
			},
			{
				property: "og:url",
				content: "/"
			}
		],
		links: [{
			rel: "canonical",
			href: "/"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./a-aeifi-Cl1TmtbT.mjs");
var Route$12 = createFileRoute("/a-aeifi")({
	head: () => ({
		meta: [
			{ title: "A AEIFI — quem somos, missão e diretoria" },
			{
				name: "description",
				content: "Conheça a AEIFI: história, missão, visão, valores, objetivos, público atendido, sede, CNPJ e diretoria da associação de empreendedores de Foz do Iguaçu."
			},
			{
				property: "og:title",
				content: "A AEIFI — quem somos, missão e diretoria"
			},
			{
				property: "og:description",
				content: "História, missão, visão, valores, objetivos e governança da Associação dos Empreendedores Individuais de Foz do Iguaçu."
			},
			{
				property: "og:url",
				content: "/a-aeifi"
			}
		],
		links: [{
			rel: "canonical",
			href: "/a-aeifi"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./admin-BXvVwaA_.mjs");
var Route$11 = createFileRoute("/admin")({
	head: () => ({ meta: [
		{ title: "Área administrativa — AEIFI" },
		{
			name: "description",
			content: "Área restrita da AEIFI para atualização das informações institucionais publicadas no site."
		},
		{
			name: "robots",
			content: "noindex, nofollow"
		},
		{
			property: "og:title",
			content: "Área administrativa — AEIFI"
		},
		{
			property: "og:description",
			content: "Acesso restrito à equipe da AEIFI."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./associe-se-B2NdAtxT.mjs");
var Route$10 = createFileRoute("/associe-se")({
	head: () => ({
		meta: [
			{ title: "Associe-se — faça parte da AEIFI" },
			{
				name: "description",
				content: "Quem pode se associar, benefícios, funcionamento da associação e como solicitar a associação à AEIFI, em Foz do Iguaçu."
			},
			{
				property: "og:title",
				content: "Associe-se — faça parte da AEIFI"
			},
			{
				property: "og:description",
				content: "Participe de uma rede que representa, capacita e conecta microempreendedores de Foz do Iguaçu."
			},
			{
				property: "og:url",
				content: "/associe-se"
			}
		],
		links: [{
			rel: "canonical",
			href: "/associe-se"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./buscamei-lIowPOof.mjs");
var Route$9 = createFileRoute("/buscamei")({
	head: () => ({
		meta: [
			{ title: "BuscaMEI — um produto da AEIFI" },
			{
				name: "description",
				content: "O BuscaMEI é a plataforma criada pela AEIFI para ampliar a visibilidade dos microempreendedores de Foz do Iguaçu e conectar quem oferece a quem procura."
			},
			{
				property: "og:title",
				content: "BuscaMEI — um produto da AEIFI"
			},
			{
				property: "og:description",
				content: "Entenda por que a AEIFI criou o BuscaMEI, como a plataforma funciona, quem pode participar e quais são os benefícios para empreendedores e comunidade."
			},
			{
				property: "og:url",
				content: "/buscamei"
			}
		],
		links: [{
			rel: "canonical",
			href: "/buscamei"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./contato-DBHvDNqA.mjs");
var Route$8 = createFileRoute("/contato")({
	head: () => ({
		meta: [
			{ title: "Contato — fale com a AEIFI" },
			{
				name: "description",
				content: "Canais de atendimento da AEIFI: telefone, WhatsApp, e-mail, endereço da sede e horário de atendimento em Foz do Iguaçu."
			},
			{
				property: "og:title",
				content: "Contato — fale com a AEIFI"
			},
			{
				property: "og:description",
				content: "Fale com a associação sobre associação, parcerias, capacitações ou o BuscaMEI."
			},
			{
				property: "og:url",
				content: "/contato"
			}
		],
		links: [{
			rel: "canonical",
			href: "/contato"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./iniciativas-DFW6BcPO.mjs");
var Route$7 = createFileRoute("/iniciativas")({
	head: () => ({
		meta: [
			{ title: "Projetos e iniciativas da AEIFI" },
			{
				name: "description",
				content: "Conheça os projetos, produtos, eventos e programas desenvolvidos pela AEIFI para fortalecer microempreendedores e pequenos negócios de Foz do Iguaçu."
			},
			{
				property: "og:title",
				content: "Projetos e iniciativas da AEIFI"
			},
			{
				property: "og:description",
				content: "Capacitação, encontros de associados, apoio à formalização e o BuscaMEI — um produto da AEIFI."
			},
			{
				property: "og:url",
				content: "/iniciativas"
			}
		],
		links: [{
			rel: "canonical",
			href: "/iniciativas"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./o-que-fazemos-BhI80HVl.mjs");
var Route$6 = createFileRoute("/o-que-fazemos")({
	head: () => ({
		meta: [
			{ title: "O que fazemos — áreas de atuação da AEIFI" },
			{
				name: "description",
				content: "Representatividade, capacitação, conexões, oportunidades e projetos: conheça em detalhe as áreas de atuação da AEIFI junto aos empreendedores de Foz do Iguaçu."
			},
			{
				property: "og:title",
				content: "O que fazemos — áreas de atuação da AEIFI"
			},
			{
				property: "og:description",
				content: "As cinco frentes de trabalho da associação e como cada uma acontece na prática."
			},
			{
				property: "og:url",
				content: "/o-que-fazemos"
			}
		],
		links: [{
			rel: "canonical",
			href: "/o-que-fazemos"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./parceiros-C2r0-e0n.mjs");
var Route$5 = createFileRoute("/parceiros")({
	head: () => ({
		meta: [
			{ title: "Parceiros — colabore com a AEIFI" },
			{
				name: "description",
				content: "Empresas, entidades, universidades e poder público podem apoiar as iniciativas da AEIFI em favor dos microempreendedores de Foz do Iguaçu."
			},
			{
				property: "og:title",
				content: "Parceiros — colabore com a AEIFI"
			},
			{
				property: "og:description",
				content: "Formatos de parceria e canal direto para instituições interessadas em colaborar."
			},
			{
				property: "og:url",
				content: "/parceiros"
			}
		],
		links: [{
			rel: "canonical",
			href: "/parceiros"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./politica-de-privacidade-5XfrVwKD.mjs");
var Route$4 = createFileRoute("/politica-de-privacidade")({
	head: () => ({
		meta: [
			{ title: "Política de Privacidade — AEIFI" },
			{
				name: "description",
				content: "Como a AEIFI trata os dados pessoais de associados, visitantes e interessados, em conformidade com a LGPD."
			},
			{
				property: "og:title",
				content: "Política de Privacidade — AEIFI"
			},
			{
				property: "og:description",
				content: "Tratamento de dados pessoais pela AEIFI."
			},
			{
				property: "og:url",
				content: "/politica-de-privacidade"
			}
		],
		links: [{
			rel: "canonical",
			href: "/politica-de-privacidade"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./transparencia-DmVoOt7z.mjs");
var Route$3 = createFileRoute("/transparencia")({
	head: () => ({
		meta: [
			{ title: "Transparência — documentos e governança da AEIFI" },
			{
				name: "description",
				content: "Razão social, CNPJ, estatuto, diretoria, relatórios de atividades e prestação de contas da AEIFI, associação de empreendedores de Foz do Iguaçu."
			},
			{
				property: "og:title",
				content: "Transparência — documentos e governança da AEIFI"
			},
			{
				property: "og:description",
				content: "Documentos institucionais, governança e prestação de contas da AEIFI."
			},
			{
				property: "og:url",
				content: "/transparencia"
			}
		],
		links: [{
			rel: "canonical",
			href: "/transparencia"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./noticias.index-B3BGIyu3.mjs");
var Route$2 = createFileRoute("/noticias/")({
	head: () => ({
		meta: [
			{ title: "Notícias e atividades da AEIFI" },
			{
				name: "description",
				content: "Eventos, capacitações, parcerias e ações institucionais: acompanhe as atividades da AEIFI com os empreendedores de Foz do Iguaçu."
			},
			{
				property: "og:title",
				content: "Notícias e atividades da AEIFI"
			},
			{
				property: "og:description",
				content: "Acompanhe o trabalho da associação: capacitações, encontros, parcerias e projetos."
			},
			{
				property: "og:url",
				content: "/noticias"
			}
		],
		links: [{
			rel: "canonical",
			href: "/noticias"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./noticias._slug-DeA4S6EC.mjs");
var Route$1 = createFileRoute("/noticias/$slug")({
	loader: ({ params }) => {
		const noticia = noticias.find((n) => n.slug === params.slug);
		if (!noticia) throw notFound();
		return { noticia };
	},
	head: ({ loaderData, params }) => {
		if (!loaderData) return { meta: [{ title: "Notícia indisponível — AEIFI" }, {
			name: "robots",
			content: "noindex"
		}] };
		return {
			meta: [
				{ title: `${loaderData.noticia.titulo} — AEIFI` },
				{
					name: "description",
					content: loaderData.noticia.resumo
				},
				{
					property: "og:title",
					content: loaderData.noticia.titulo
				},
				{
					property: "og:description",
					content: loaderData.noticia.resumo
				},
				{
					property: "og:type",
					content: "article"
				},
				{
					property: "og:url",
					content: `/noticias/${params.slug}`
				}
			],
			links: [{
				rel: "canonical",
				href: `/noticias/${params.slug}`
			}],
			scripts: [{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Article",
					headline: loaderData.noticia.titulo,
					description: loaderData.noticia.resumo,
					publisher: {
						"@type": "NGO",
						name: "AEIFI"
					}
				})
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route = createFileRoute("/api/public/arquivo/$")({ server: { handlers: { GET: async ({ params }) => {
	const path = params._splat ?? "";
	if (!path || path.includes("..")) return new Response("Not found", { status: 404 });
	const { supabaseAdmin } = await import("./client.server-Cxb4Tlrp.mjs");
	const { data, error } = await supabaseAdmin.storage.from("arquivos").download(path);
	if (error || !data) return new Response("Not found", { status: 404 });
	return new Response(await data.arrayBuffer(), { headers: {
		"content-type": data.type || "application/octet-stream",
		"cache-control": "public, max-age=3600"
	} });
} } } });
var IndexRoute = Route$13.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$14
});
var AAeifiRoute = Route$12.update({
	id: "/a-aeifi",
	path: "/a-aeifi",
	getParentRoute: () => Route$14
});
var AdminRoute = Route$11.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$14
});
var AssocieSeRoute = Route$10.update({
	id: "/associe-se",
	path: "/associe-se",
	getParentRoute: () => Route$14
});
var BuscameiRoute = Route$9.update({
	id: "/buscamei",
	path: "/buscamei",
	getParentRoute: () => Route$14
});
var ContatoRoute = Route$8.update({
	id: "/contato",
	path: "/contato",
	getParentRoute: () => Route$14
});
var IniciativasRoute = Route$7.update({
	id: "/iniciativas",
	path: "/iniciativas",
	getParentRoute: () => Route$14
});
var OQueFazemosRoute = Route$6.update({
	id: "/o-que-fazemos",
	path: "/o-que-fazemos",
	getParentRoute: () => Route$14
});
var ParceirosRoute = Route$5.update({
	id: "/parceiros",
	path: "/parceiros",
	getParentRoute: () => Route$14
});
var PoliticaDePrivacidadeRoute = Route$4.update({
	id: "/politica-de-privacidade",
	path: "/politica-de-privacidade",
	getParentRoute: () => Route$14
});
var TransparenciaRoute = Route$3.update({
	id: "/transparencia",
	path: "/transparencia",
	getParentRoute: () => Route$14
});
var NoticiasIndexRoute = Route$2.update({
	id: "/noticias/",
	path: "/noticias/",
	getParentRoute: () => Route$14
});
var rootRouteChildren = {
	IndexRoute,
	AAeifiRoute,
	AdminRoute,
	AssocieSeRoute,
	BuscameiRoute,
	ContatoRoute,
	IniciativasRoute,
	OQueFazemosRoute,
	ParceirosRoute,
	PoliticaDePrivacidadeRoute,
	TransparenciaRoute,
	NoticiasSlugRoute: Route$1.update({
		id: "/noticias/$slug",
		path: "/noticias/$slug",
		getParentRoute: () => Route$14
	}),
	NoticiasIndexRoute,
	ApiPublicArquivoSplatRoute: Route.update({
		id: "/api/public/arquivo/$",
		path: "/api/public/arquivo/$",
		getParentRoute: () => Route$14
	})
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { parseWhatsAppContacts as a, areas as c, iniciativas as d, noticias as f, editableFields as i, beneficiosAssociado as l, Route$1 as n, siteContentQuery as o, WHATSAPP_CONTACTS_KEY as r, useSite as s, router_exports as t, formatosParceria as u };
