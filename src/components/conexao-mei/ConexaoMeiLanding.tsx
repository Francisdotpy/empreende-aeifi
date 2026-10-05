import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import heroLogo from "@/assets/conexao-mei-hero.png";
import navLogo from "@/assets/conexao-mei-nav.png";
import {
  conexaoMeiFileUrl,
  conexaoMeiModules,
  getConexaoMeiPublicData,
} from "@/lib/conexao-mei-content";
import { InterestForm } from "./InterestForm";
import { StageParticipation } from "./StageParticipation";

type Stage = {
  slug: string;
  date: string;
  fullDate: string;
  city: string;
  label: string;
  venue: string;
  address: string;
  program: string;
  registrationOpen: boolean;
  certificates: boolean;
  hours: string;
};

const fallbackStages: Stage[] = [
  {
    slug: "missal",
    date: "27/02",
    fullDate: "27/02/2027",
    city: "Missal",
    label: "1ª etapa",
    venue: "",
    address: "",
    program: "",
    registrationOpen: false,
    certificates: false,
    hours: "",
  },
  {
    slug: "itaipulandia",
    date: "20/03",
    fullDate: "20/03/2027",
    city: "Itaipulândia",
    label: "2ª etapa",
    venue: "",
    address: "",
    program: "",
    registrationOpen: false,
    certificates: false,
    hours: "",
  },
  {
    slug: "medianeira",
    date: "24/04",
    fullDate: "24/04/2027",
    city: "Medianeira",
    label: "3ª etapa",
    venue: "",
    address: "",
    program: "",
    registrationOpen: false,
    certificates: false,
    hours: "",
  },
  {
    slug: "saomiguel",
    date: "29/05",
    fullDate: "29/05/2027",
    city: "São Miguel do Iguaçu",
    label: "4ª etapa",
    venue: "",
    address: "",
    program: "",
    registrationOpen: false,
    certificates: false,
    hours: "",
  },
  {
    slug: "santaterezinha",
    date: "26/06",
    fullDate: "26/06/2027",
    city: "Santa Terezinha de Itaipu",
    label: "5ª etapa",
    venue: "",
    address: "",
    program: "",
    registrationOpen: false,
    certificates: false,
    hours: "",
  },
  {
    slug: "foz",
    date: "24/07",
    fullDate: "24/07/2027",
    city: "Foz do Iguaçu",
    label: "Encontro Regional",
    venue: "",
    address: "",
    program: "",
    registrationOpen: false,
    certificates: false,
    hours: "",
  },
];

const button =
  "inline-flex min-h-11 items-center justify-center rounded-lg px-5 py-3 text-center text-sm font-extrabold transition-colors";
const blueButton = `${button} bg-[#063f78] text-white hover:bg-[#0a5aa4]`;
const lightButton = `${button} border border-[#dbe5ef] bg-white text-[#063f78] hover:bg-[#eef5fb]`;
const card =
  "rounded-2xl border border-[#dbe5ef] bg-white p-5 shadow-[0_8px_24px_rgba(7,67,116,0.05)]";

function Heading({ kicker, title, lead }: { kicker: string; title: string; lead?: string }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.12em] text-[#0a5aa4]">{kicker}</p>
      <h2 className="mt-2 max-w-3xl text-[clamp(2rem,4vw,2.875rem)] font-extrabold leading-[1.08] text-[#063f78]">
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 max-w-[840px] text-lg leading-relaxed text-[#607286]">{lead}</p>
      ) : null}
    </div>
  );
}

export function ConexaoMeiLanding() {
  const { data } = useQuery({
    queryKey: ["conexao-mei", "publico"],
    queryFn: getConexaoMeiPublicData,
    retry: false,
    staleTime: 60_000,
  });
  const stages = useMemo(
    () =>
      data?.etapas.length
        ? data.etapas.map((row): Stage => {
            const [year, month, day] = row.data.split("-");
            return {
              slug: row.slug,
              date: `${day}/${month}`,
              fullDate: `${day}/${month}/${year}`,
              city: row.cidade,
              label: row.rotulo,
              venue: row.local_nome,
              address: row.endereco,
              program: row.programacao,
              registrationOpen: row.inscricoes_abertas,
              certificates: row.certificados_liberados,
              hours: row.carga_horaria,
            };
          })
        : fallbackStages,
    [data?.etapas],
  );
  const event = data?.evento;
  const modules = conexaoMeiModules(event);
  const projectDocument = data?.documentos.find((item) => item.tipo === "Projeto do Evento");
  const editalDocument = data?.documentos.find((item) => item.tipo === "Edital");
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const syncStage = () => {
      const slug = new URLSearchParams(window.location.search).get("etapa");
      setSelectedStage(stages.find((stage) => stage.slug === slug) ?? null);
    };
    syncStage();
    window.addEventListener("popstate", syncStage);
    return () => window.removeEventListener("popstate", syncStage);
  }, [stages]);

  function openStage(stage: Stage) {
    const url = new URL(window.location.href);
    url.searchParams.set("etapa", stage.slug);
    window.history.pushState(null, "", url);
    setSelectedStage(stage);
  }
  function closeStage() {
    const url = new URL(window.location.href);
    url.searchParams.delete("etapa");
    window.history.replaceState(null, "", url);
    setSelectedStage(null);
  }

  useEffect(() => {
    if (!selectedStage) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeStage();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedStage]);

  return (
    <div className="min-h-screen bg-white font-sans text-[#102338] [scroll-behavior:smooth] [&_h1]:font-sans [&_h2]:font-sans [&_h3]:font-sans [&_h4]:font-sans">
            <nav
        className="sticky top-0 z-30 border-b border-[#dbe5ef] bg-white/95 backdrop-blur-md"
        aria-label="Navegação do evento"
      >
        <div className="mx-auto flex w-[92%] max-w-[1160px] items-center justify-between gap-4 py-3">
          <a
            href="#inicio"
            aria-label="Conexão MEI 2027 — início"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src={navLogo}
              alt="Conexão MEI 2027"
              className="h-16 w-auto max-w-[150px] object-contain"
            />
          </a>
          <div className="hidden items-center gap-5 text-sm font-bold text-[#063f78] lg:flex">
            <a href="#evento" className="hover:text-[#0a5aa4]">
              O evento
            </a>
            <a href="#caravana" className="hover:text-[#0a5aa4]">
              Caravana
            </a>
            <a href="#expositor" className="hover:text-[#0a5aa4]">
              Expositor
            </a>
            <a href="#parceiro" className="hover:text-[#0a5aa4]">
              Parceiros
            </a>
            <a className={blueButton} href="#interesse">
              Quero participar
            </a>
            <Link
              to="/admin"
              className={`${button} bg-[#eef5fb] text-[#063f78] hover:bg-[#dfeaf5]`}
            >
              Painel administrativo
            </Link>
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <a
              className={`${blueButton} px-3 py-2 text-xs`}
              href="#interesse"
              onClick={() => setMenuOpen(false)}
            >
              Participar
            </a>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="conexao-mobile-nav"
              aria-label="Abrir menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="min-h-11 rounded-lg border border-[#dbe5ef] px-3 font-bold text-[#063f78]"
            >
              ☰
            </button>
          </div>
        </div>
        {menuOpen ? (
          <div
            id="conexao-mobile-nav"
            className="grid gap-1 border-t border-[#dbe5ef] bg-white px-[4%] py-3 text-sm font-bold text-[#063f78] lg:hidden"
          >
            {[
              ["O evento", "#evento"],
              ["Caravana", "#caravana"],
              ["Expositor", "#expositor"],
              ["Parceiros", "#parceiro"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-[#eef5fb]"
              >
                {label}
              </a>
            ))}
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-[#eef5fb]"
            >
              Painel administrativo
            </Link>
          </div>
        ) : null}
      </nav>

      <header
        id="inicio"
        className="relative overflow-hidden bg-gradient-to-r from-[#063f78] to-[#0870b3] text-white"
      >
        <div className="pointer-events-none absolute -bottom-52 -right-24 h-[520px] w-[520px] rounded-full border-[80px] border-white/5" />
        <div className="relative mx-auto grid w-[92%] max-w-[1160px] items-center gap-8 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:py-14">
          <div>
            <img
              src={heroLogo}
              alt="Logo Conexão MEI 2027"
              className="mb-5 max-h-[270px] w-[min(390px,78vw)] object-contain object-left"
              style={{
                filter:
                  "drop-shadow(0 3px 0 rgba(255,255,255,.96)) drop-shadow(0 0 7px rgba(255,255,255,.72)) drop-shadow(0 10px 20px rgba(0,0,0,.12))",
              }}
            />
            <span className="inline-block rounded-full border border-white/35 px-3 py-1 text-xs font-bold tracking-wide">
              ● EMPREENDEDORISMO • INCLUSÃO PRODUTIVA • INOVAÇÃO
            </span>
            <h1 className="mt-5 text-[clamp(3rem,5vw,4rem)] font-black leading-[1.02]">
              Conexão <em className="not-italic">MEI</em> 2027
            </h1>
            <p className="mt-6 max-w-[650px] text-lg leading-relaxed text-[#e1f0ff]">
              <strong>Caravana do Empreendedor - Economia Solidária em Movimento.</strong>
              <br />
              Uma jornada regional para conectar quem empreende a conhecimento, orientação,
              mercados, instituições e novas oportunidades.
            </p>
            <div className="mt-7 flex max-w-[530px] flex-wrap gap-3">
              <a
                className={`${button} bg-[#f4b000] text-[#102338] hover:bg-[#ffd04b]`}
                href="#interesse"
              >
                QUERO PARTICIPAR
              </a>
              <a
                className={`${button} border border-white/70 text-white hover:bg-white/10`}
                href="#expositor"
              >
                QUERO SER EXPOSITOR
              </a>
              <a
                className={`${button} border border-white/70 text-white hover:bg-white/10`}
                href="#parceiro"
              >
                QUERO SER PARCEIRO
              </a>
              {projectDocument ? (
                <a
                  className={`${button} border border-white/70 text-white hover:bg-white/10`}
                  href={conexaoMeiFileUrl(projectDocument.arquivo_path)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ⬇ PROJETO DO EVENTO
                </a>
              ) : (
                <span
                  className={`${button} cursor-not-allowed border border-white/70 text-white/80`}
                  title="Projeto ainda não publicado"
                >
                  ⬇ PROJETO DO EVENTO
                </span>
              )}
            </div>
          </div>
          <aside className="rounded-[28px] border border-white bg-white p-6 text-[#063f78] shadow-xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#e9a900]">
              Encontro Regional
            </p>
            <p className="mt-3 text-[clamp(3.5rem,7vw,5.5rem)] font-black leading-none">
              {event?.data_destaque || "24 JUL"}
            </p>
            <h2 className="mt-3 text-2xl font-bold">
              {event?.cidade_destaque || "Foz do Iguaçu"} • {event?.ano_destaque || "2027"}
            </h2>
            {event?.exibir_local !== false ? (
              <div className="mt-5 rounded-xl border border-[#dbe5ef] bg-[#eef5fb] p-3 text-sm">
                📍 {event?.local_nome || "Local a definir"}
                {event?.local_endereco || event?.local_complemento ? (
                  <span className="mt-1 block">
                    {[event.local_endereco, event.local_complemento].filter(Boolean).join(" • ")}
                  </span>
                ) : null}
              </div>
            ) : null}
            <p className="mt-5 font-semibold leading-relaxed text-[#102338]">
              O grande encontro que encerra a Caravana e reúne empreendedores, municípios,
              instituições, parceiros e oportunidades.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Mostra Regional", "Palestras", "Networking", "Circuito de Oportunidades"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[#eef5fb] px-3 py-1 text-xs font-bold text-[#063f78]"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </aside>
        </div>
      </header>

      <section id="evento" className="scroll-mt-20 pt-12 pb-8 lg:pt-16 lg:pb-8">
        <div className="mx-auto w-[92%] max-w-[1160px]">
          <Heading
            kicker="Uma iniciativa regional da AEIFI"
            title="Um encontro feito para quem movimenta a economia local."
            lead="O Conexão MEI 2027 aproxima Microempreendedores Individuais, pequenos empreendedores, potenciais empreendedores, trabalhadores informais, iniciativas de economia solidária, municípios e instituições de apoio por meio de orientação, capacitação, inclusão digital, acesso a mercados e conexões institucionais."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              [
                "🎯",
                "Orientação prática",
                "Conteúdos e atendimentos voltados aos desafios reais de quem empreende.",
              ],
              [
                "🤝",
                "Conexões",
                "Integração entre empreendedores, instituições, municípios, parceiros e oportunidades.",
              ],
              [
                "🚀",
                "Desenvolvimento",
                "Gestão, vendas, finanças, formalização, transformação digital e acesso a mercados.",
              ],
            ].map(([icon, title, text]) => (
              <article key={title} className={card}>
                <span className="text-3xl">{icon}</span>
                <h3 className="mt-4 text-xl font-extrabold text-[#063f78]">{title}</h3>
                <p className="mt-2 text-[#607286]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="caravana" className="scroll-mt-20 bg-[#f5f8fb] pt-8 pb-12 lg:pt-8 lg:pb-16">
        <div className="mx-auto w-[92%] max-w-[1160px]">
          <Heading
            kicker="Caravana do Empreendedor"
            title="Cinco municípios. Um encontro regional."
            lead="As etapas municipais acontecem entre fevereiro e junho e culminam no Encontro Regional Conexão MEI, em Foz do Iguaçu."
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {stages.map((stage) => (
              <button
                key={stage.slug}
                type="button"
                onClick={() => openStage(stage)}
                className={`min-h-36 rounded-2xl border p-4 text-left shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-[#f4b000] ${stage.city === "Foz do Iguaçu" ? "border-[#f4b000] bg-[#fff8e4]" : "border-[#dbe5ef] bg-white"}`}
              >
                <span className="text-sm font-black text-[#0a5aa4]">{stage.date}</span>
                <strong className="mt-1 block text-lg leading-tight text-[#063f78]">
                  {stage.city}
                </strong>
                <span className="mt-1 block text-sm text-[#607286]">{stage.label}</span>
                <span className="mt-3 block text-xs font-extrabold text-[#0a5aa4]">
                  VER ETAPA →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#063f78] to-[#0870b3] py-12 text-white lg:py-16">
        <div className="mx-auto w-[92%] max-w-[1160px]">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-[#ffd04b]">
            Alcance proposto
          </p>
          <h2 className="mt-2 text-[clamp(2rem,4vw,2.875rem)] font-extrabold leading-tight">
            Uma rede regional de empreendedorismo.
          </h2>
          <p className="mt-4 text-lg text-[#dceeff]">
            Metas do projeto para mobilização, conteúdo e conexão ao longo da jornada.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["600+", "empreendedores diretamente atendidos"],
              ["1.500+", "participações presenciais acumuladas"],
              ["12+", "capacitações e atividades de conteúdo"],
              ["5 + Foz", "municípios mobilizados"],
            ].map(([value, label]) => (
              <div key={value} className="rounded-2xl border border-white/20 bg-white/5 p-5">
                <b className="block text-4xl font-black text-[#ffd04b]">{value}</b>
                <span className="mt-2 block text-[#dceeff]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-12 pb-8 lg:pt-16 lg:pb-8">
        <div className="mx-auto w-[92%] max-w-[1160px]">
          <Heading kicker="Conteúdo que gera resultado" title="Eixos temáticos" />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              [
                "Gestão & Finanças",
                "Planejamento do pequeno negócio",
                "Fluxo de caixa e precificação",
                "Educação financeira",
              ],
              [
                "Mercado & Vendas",
                "Marketing digital e posicionamento",
                "Vendas e relacionamento comercial",
                "Acesso a mercados",
              ],
              [
                "MEI & Inovação",
                "Formalização e regularização",
                "Transformação digital",
                "Economia solidária e redes",
              ],
            ].map(([title, ...items]) => (
              <article key={title} className={`${card} border-t-4 border-t-[#f4b000]`}>
                <h3 className="text-xl font-extrabold text-[#063f78]">{title}</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-[#607286]">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="expositor" className="scroll-mt-20 bg-[#f5f8fb] py-8 lg:py-8">
        <div className="mx-auto grid w-[92%] max-w-[1160px] gap-6 lg:grid-cols-2">
          <div className="flex min-h-[300px] flex-col justify-center rounded-[28px] bg-gradient-to-br from-[#f6b500] to-[#ffd55f] p-8">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[#063f78]">
              Mostra Regional
            </p>
            <h2 className="mt-3 text-[clamp(2rem,3.5vw,2.5rem)] font-black leading-tight text-[#102338]">
              Seja expositor no Conexão MEI 2027.
            </h2>
            <p className="mt-4 text-lg">
              Apresente sua marca, produtos, serviços e soluções para quem empreende.
            </p>
          </div>
          <div>
            <Heading
              kicker="Sua marca conectada ao empreendedor"
              title="Por que participar?"
              lead="O Encontro Regional cria um ambiente de visibilidade, relacionamento e geração de oportunidades."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Divulgue sua marca",
                "Gere novos negócios",
                "Amplie sua rede",
                "Apresente soluções",
                "Faça networking",
                "Apoie o desenvolvimento regional",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-xl border border-[#dbe5ef] bg-white px-4 py-3 text-sm font-semibold text-[#063f78]"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
            <a className={`${blueButton} mt-5`} href="#interesse">
              MANIFESTAR INTERESSE
            </a>
            {modules.documentos && editalDocument ? (
              <a
                className={`${lightButton} ml-2 mt-5`}
                href={conexaoMeiFileUrl(editalDocument.arquivo_path)}
                target="_blank"
                rel="noopener noreferrer"
              >
                VER EDITAL
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section id="parceiro" className="scroll-mt-20 py-8 lg:py-8">
        <div className="mx-auto w-[92%] max-w-[1160px]">
          <Heading
            kicker="Parcerias institucionais"
            title="Construa essa rede com a gente."
            lead="Instituições públicas e privadas podem contribuir conforme sua área de atuação e disponibilidade, sem que a parceria pressuponha necessariamente aporte financeiro."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              [
                "🧠",
                "Conteúdo & especialistas",
                "Consultores, técnicos, professores, palestrantes, oficinas e orientações especializadas.",
              ],
              [
                "📣",
                "Mobilização & estrutura",
                "Divulgação, espaços, apoio local, articulação e aproximação com os públicos.",
              ],
              [
                "🔗",
                "Inovação & oportunidades",
                "Pesquisa, soluções, benefícios, acesso a mercados e conexão com oportunidades.",
              ],
            ].map(([icon, title, text]) => (
              <article key={title} className={card}>
                <span className="text-3xl">{icon}</span>
                <h3 className="mt-4 text-xl font-extrabold text-[#063f78]">{title}</h3>
                <p className="mt-2 text-[#607286]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {modules.interesse ? (
        <section id="interesse" className="scroll-mt-20 bg-[#f5f8fb] py-8 lg:py-8">
          <div className="mx-auto grid w-[92%] max-w-[1160px] gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Heading
                kicker="Faça parte"
                title="Manifeste seu interesse."
                lead="Escolha como você ou sua instituição deseja participar do Conexão MEI 2027. O envio abaixo é uma manifestação inicial de interesse."
              />
              <p className="mt-5 text-sm leading-relaxed">
                <strong>Opções:</strong>
                <br />
                Participante • Expositor • Parceiro institucional • Conteúdo/palestra • Benefício
                aos MEIs • Circuito de Oportunidades
              </p>
            </div>
            <InterestForm />
          </div>
        </section>
      ) : null}

      {modules.parceiros ? (
        <section id="rede-parceiros" className="scroll-mt-20 py-8 text-center lg:py-8">
          <div className="mx-auto w-[92%] max-w-[1160px]">
            <Heading
              kicker="Rede de parceiros"
              title="Realização, parceiros e apoiadores"
              lead="Área preparada para receber as marcas formalmente confirmadas no projeto, organizadas por categoria."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {(
                [
                  ["realizacao", "Realização"],
                  ["parceiro", "Parceiros"],
                  ["apoio", "Apoio"],
                ] as const
              ).map(([category, group]) => (
                <div key={group} className={card}>
                  <h3 className="text-base font-extrabold text-[#063f78]">{group}</h3>
                  <div className="mt-4 flex min-h-20 flex-wrap items-center justify-center gap-3 rounded-xl border border-dashed border-[#aebdca] p-3">
                    {data?.parceiros.filter(
                      (item) => !item.etapa_slug && item.categoria === category,
                    ).length ? (
                      data.parceiros
                        .filter((item) => !item.etapa_slug && item.categoria === category)
                        .map((item) => (
                          <a
                            key={item.id}
                            href={/^https?:\/\//i.test(item.link) ? item.link : undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={item.nome}
                          >
                            <img
                              src={conexaoMeiFileUrl(item.logo_path)}
                              alt={item.nome}
                              className="max-h-16 max-w-32 object-contain"
                            />
                          </a>
                        ))
                    ) : (
                      <span className="text-sm font-bold text-[#7b8da0]">
                        LOGO {group.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <a className={`${lightButton} mt-6`} href="#expositores-confirmados">
              VER TODOS OS EXPOSITORES
            </a>
          </div>
        </section>
      ) : null}

      {modules.expositores ? (
        <section id="expositores-confirmados" className="scroll-mt-20 bg-[#f5f8fb] pt-8 pb-12 lg:pt-8 lg:pb-16">
          <div className="mx-auto w-[92%] max-w-[1160px]">
            <Heading
              kicker="Empresas participantes"
              title="Nossos Expositores"
              lead="Conheça as empresas que estarão no Conexão MEI 2027 apresentando produtos, serviços e soluções para os empreendedores da região."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <a className={blueButton} href="#interesse">
                QUERO SER EXPOSITOR
              </a>
              <span className={`${lightButton} cursor-not-allowed opacity-60`}>
                EDITAL EM PREPARAÇÃO
              </span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data?.expositores.length ? (
                data.expositores.map((item) => (
                  <a
                    key={item.id}
                    href={/^https?:\/\//i.test(item.link) ? item.link : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${card} text-center`}
                  >
                    <img
                      src={conexaoMeiFileUrl(item.logo_path)}
                      alt={item.nome}
                      className="mx-auto h-20 w-full object-contain"
                    />
                    <b className="mt-4 block text-[#063f78]">{item.nome}</b>
                    <span className="mt-1 block text-sm text-[#607286]">
                      {item.segmento}
                      {item.cidade ? ` • ${item.cidade}` : ""}
                    </span>
                  </a>
                ))
              ) : (
                <div className={`${card} max-w-xs text-center`}>
                  <div className="grid min-h-20 place-items-center rounded-xl border border-dashed border-[#aebdca] text-sm font-bold text-[#7b8da0]">
                    SUA EMPRESA AQUI
                  </div>
                  <b className="mt-4 block text-[#063f78]">Próximo expositor</b>
                  <span className="mt-1 block text-sm text-[#607286]">
                    Empresas confirmadas aparecerão aqui.
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>
      ) : null}

      <footer className="bg-[#052d54] py-10 text-[#d9e9f8]">
        <div className="mx-auto w-[92%] max-w-[1160px]">
          <div className="grid gap-8 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
            <div>
              <h2 className="font-extrabold text-white">CONEXÃO MEI 2027</h2>
              <p className="mt-3">Caravana do Empreendedor - Economia Solidária em Movimento.</p>
              <small className="mt-3 block text-[#a9c1d8]">
                Realização: AEIFI - Associação dos Empreendedores Individuais de Foz do Iguaçu
              </small>
            </div>
            <div>
              <h3 className="font-bold text-white">Navegação</h3>
              <div className="mt-3 grid gap-2 text-sm">
                <a href="#evento">O evento</a>
                <a href="#caravana">Caravana</a>
                <a href="#expositor">Expositor</a>
                <a href="#parceiro">Parceiros</a>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-white">Encontro Regional</h3>
              <p className="mt-3 text-sm">
                <strong>24 de julho de 2027</strong>
                <br />
                Foz do Iguaçu - Paraná
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-white/15 pt-5 text-xs text-[#9fb8d0]">
            Página-conceito do Conexão MEI 2027. Informações de parceiros, local exato, inscrições e
            programação poderão ser atualizadas conforme formalização.{" "}
            <Link to="/" className="underline">
              Voltar ao site da AEIFI
            </Link>
            .
          </div>
        </div>
      </footer>

      {selectedStage ? (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-[#f5f8fb]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="stage-dialog-title"
        >
          <div className="bg-gradient-to-r from-[#052f59] to-[#0870b3] py-6 text-white">
            <div className="mx-auto flex w-[92%] max-w-[1160px] flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#ffd04b]">
                  CONEXÃO MEI 2027
                </p>
                <h2 id="stage-dialog-title" className="mt-1 text-3xl font-extrabold">
                  {selectedStage.date} • {selectedStage.city}
                </h2>
                <p>{selectedStage.label}</p>
              </div>
              <button
                type="button"
                onClick={closeStage}
                className="min-h-11 rounded-lg border border-white/60 px-4 py-2 text-sm font-bold hover:bg-white/10"
              >
                ← VOLTAR
              </button>
            </div>
          </div>
          <div className="mx-auto grid w-[92%] max-w-[1160px] gap-6 py-9 md:grid-cols-2">
            <div className={card}>
              <h3 className="text-xl font-extrabold text-[#063f78]">Local e programação</h3>
              <p className="mt-4 font-semibold">📍 {selectedStage.venue || "Local a definir"}</p>
              {selectedStage.address ? (
                <p className="mt-1 text-sm text-[#607286]">{selectedStage.address}</p>
              ) : null}
              <div className="mt-3 rounded-lg bg-[#eef5fb] p-3 text-sm text-[#607286]">
                {selectedStage.program
                  ? selectedStage.program
                      .split(/\n+/)
                      .filter(Boolean)
                      .map((line, index) => {
                        const divider = line.indexOf("|");
                        return (
                          <p
                            key={`${index}-${line}`}
                            className="grid gap-1 border-b border-[#dbe5ef] py-2 last:border-0 sm:grid-cols-[5rem_1fr]"
                          >
                            <b className="text-[#063f78]">
                              {divider > -1 ? line.slice(0, divider).trim() : "•"}
                            </b>
                            <span>
                              {divider > -1 ? line.slice(divider + 1).trim() : line.trim()}
                            </span>
                          </p>
                        );
                      })
                  : "Programação em definição."}
              </div>
              {data?.parceiros
                .filter((item) => item.etapa_slug === selectedStage.slug)
                .map((item) => (
                  <a
                    key={item.id}
                    href={/^https?:\/\//i.test(item.link) ? item.link : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block"
                  >
                    <img
                      src={conexaoMeiFileUrl(item.logo_path)}
                      alt={item.nome}
                      className="h-14 max-w-28 object-contain"
                    />
                  </a>
                ))}
            </div>
            <StageParticipation
              key={selectedStage.slug}
              stage={{
                slug: selectedStage.slug,
                city: selectedStage.city,
                date: selectedStage.fullDate,
                registrationOpen: selectedStage.registrationOpen,
                certificates: selectedStage.certificates,
              }}
            />
          </div>
        </div>
      ) : null}
      {event?.whatsapp_ativo && event.whatsapp_numero.replace(/\D/g, "") ? (
        <a
          href={`https://wa.me/${event.whatsapp_numero.replace(/\D/g, "").replace(/^(?!55)/, "55")}?text=${encodeURIComponent(event.whatsapp_mensagem)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar pelo WhatsApp sobre o Conexão MEI"
          className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-2xl text-white shadow-xl"
        >
          ☎
        </a>
      ) : null}
    </div>
  );
}
