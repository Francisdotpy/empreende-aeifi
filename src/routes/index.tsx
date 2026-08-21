import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Handshake,
  GraduationCap,
  Megaphone,
  Lightbulb,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import heroImg from "@/assets/hero-aeifi.jpg";
import { areas, impacto, iniciativas, noticias, org, depoimentos, TBD } from "@/content/site";
import { Card, CtaLink, Section, Value } from "@/components/site/ui";
import { useSite } from "@/content/useSite";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AEIFI — Associação de Empreendedores de Foz do Iguaçu" },
      {
        name: "description",
        content:
          "A AEIFI apoia, capacita, representa e conecta microempreendedores individuais e pequenos negócios de Foz do Iguaçu. Conheça a associação e associe-se.",
      },
      { property: "og:title", content: "AEIFI — Associação de Empreendedores de Foz do Iguaçu" },
      {
        property: "og:description",
        content:
          "Fortalecemos quem empreende e desenvolvemos nossa comunidade. Conheça a AEIFI, suas áreas de atuação e suas iniciativas.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const icons = [Megaphone, GraduationCap, Handshake, Sparkles, Lightbulb];

function Home() {
  const { org, impacto, depoimentos, noticias, get } = useSite();
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="container-page grid items-center gap-10 py-14 md:py-20 lg:grid-cols-2">
          <div>
            <p className="inline-flex rounded-full bg-highlight px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-highlight-foreground">
              Associação de Foz do Iguaçu
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold text-primary text-balance-tight md:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
              Fortalecemos quem empreende. Desenvolvemos nossa comunidade.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              A AEIFI trabalha para apoiar, conectar, representar e criar oportunidades para
              microempreendedores e pequenos negócios de Foz do Iguaçu.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink to="/a-aeifi">Conheça a AEIFI</CtaLink>
              <CtaLink to="/associe-se" variant="secondary">
                Quero me associar
              </CtaLink>
            </div>
          </div>
          <img
            src={get("home.hero.foto") || heroImg}
            width={1600}
            height={1008}
            alt="Microempreendedores de Foz do Iguaçu reunidos em um encontro da AEIFI"
            className="aspect-[16/10] w-full rounded-3xl object-cover shadow-lift"
          />

        </div>
      </section>

      <div className="border-b border-border bg-primary text-primary-foreground">
        <div className="container-page py-6 text-sm md:text-base">
          <p>
            <strong className="font-semibold">Quem representamos:</strong> microempreendedores
            individuais, pequenos negócios e profissionais autônomos de Foz do Iguaçu.
          </p>
        </div>
      </div>

      <Section
        title="O que fazemos"
        lead="Nossa atuação se organiza em cinco frentes complementares, todas voltadas ao fortalecimento de quem empreende na cidade."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, i) => {
            const Icon = icons[i] ?? Megaphone;
            return (
              <Card key={area.slug}>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-secondary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-primary">{area.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{area.resumo}</p>
              </Card>
            );
          })}
          <Card className="flex flex-col justify-center bg-surface">
            <p className="text-sm text-muted-foreground">
              Saiba como cada frente acontece na prática, com exemplos das ações da associação.
            </p>
            <Link
              to="/o-que-fazemos"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline"
            >
              Ver todas as áreas de atuação <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        </div>
      </Section>

      <Section tone="muted" title="Nossa missão">
        <div className="grid gap-8 lg:grid-cols-3">
          <p className="text-xl leading-relaxed text-foreground lg:col-span-2">{org.missao}</p>
          <div>
            <p className="text-sm text-muted-foreground">
              A AEIFI é uma associação sem fins lucrativos sediada em Foz do Iguaçu, constituída para
              representar e desenvolver a base empreendedora da cidade.
            </p>
            <div className="mt-5">
              <CtaLink to="/a-aeifi" variant="ghost">
                Conheça nossa história
              </CtaLink>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Nossas iniciativas"
        lead="Projetos, produtos e ações desenvolvidos pela associação para responder a problemas concretos dos pequenos negócios."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {iniciativas.slice(0, 4).map((ini) => (
            <Card key={ini.slug} className={ini.destaque ? "border-accent/60 bg-highlight/40" : ""}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
                {ini.etiqueta}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-primary">{ini.titulo}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{ini.resumo}</p>
              <Link
                to={ini.slug === "buscamei" ? "/buscamei" : "/iniciativas"}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline"
              >
                Saiba mais <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="muted" title="Nosso impacto" lead="Resultados da atuação da associação em Foz do Iguaçu.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {impacto.map((item) => (
            <Card key={item.rotulo}>
              <p className="font-display text-lg font-semibold text-primary">
                <Value value={item.valor} />
              </p>
              <p className="mt-3 text-sm font-medium text-muted-foreground">{item.rotulo}</p>
            </Card>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {depoimentos.map((d, i) => (
            <Card key={i}>
              <p className="text-sm text-muted-foreground">Depoimento de empreendedor atendido:</p>
              <blockquote className="mt-3 text-base text-foreground">
                <Value value={d.texto} />
              </blockquote>
              <p className="mt-3 text-sm font-semibold text-primary">
                <Value
                  value={[d.autor, d.negocio]
                    .filter((t) => t && t.trim() && t.trim() !== TBD)
                    .join(" — ")}
                  label="[NOME E NEGÓCIO A SEREM FORNECIDOS PELA AEIFI]"
                />
              </p>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Publicamos apenas dados verificáveis. Os números e depoimentos serão preenchidos com as
          informações oficiais da associação.
        </p>
      </Section>

      <Section title="Notícias e atividades" lead="Acompanhe o que a AEIFI tem realizado.">
        <div className="grid gap-5 md:grid-cols-3">
          {noticias.map((n) => (
            <Card key={n.slug}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
                {n.categoria}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold text-primary">{n.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{n.resumo}</p>
              <Link
                to="/noticias/$slug"
                params={{ slug: n.slug }}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline"
              >
                Ler notícia <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="muted" title="Parceiros" lead="A AEIFI constrói suas ações com empresas, entidades, universidades e poder público.">
        <div className="flex flex-wrap items-center gap-4">
          <Value
            value={get("parceiros.lista")}
            label="[RELAÇÃO DE PARCEIROS A SER FORNECIDA PELA AEIFI]"
          />
          <CtaLink to="/parceiros" variant="ghost">
            Seja parceiro da AEIFI
          </CtaLink>
        </div>
      </Section>

      <section className="bg-ink text-ink-foreground">
        <div className="container-page section-y text-center">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Faça parte da AEIFI</h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink-foreground/85">
            Associe-se e participe de uma rede que representa, capacita e conecta quem empreende em
            Foz do Iguaçu.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CtaLink to="/associe-se" variant="secondary">
              Quero me associar
            </CtaLink>
            <CtaLink to="/contato" variant="ghost">
              Falar com a associação
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
