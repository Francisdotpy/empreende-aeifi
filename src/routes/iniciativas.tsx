import { createFileRoute, Link } from "@tanstack/react-router";
import { iniciativas } from "@/content/site";
import { Card, CtaLink, ImageValue, PageHero, Section, Value } from "@/components/site/ui";
import { useSite } from "@/content/useSite";

export const Route = createFileRoute("/iniciativas")({
  head: () => ({
    meta: [
      { title: "Projetos e iniciativas da AEIFI" },
      {
        name: "description",
        content:
          "Conheça os projetos, produtos, eventos e programas desenvolvidos pela AEIFI para fortalecer microempreendedores e pequenos negócios.",
      },
      { property: "og:title", content: "Projetos e iniciativas da AEIFI" },
      {
        property: "og:description",
        content:
          "Capacitação, encontros de associados, apoio à formalização e o BuscaMEI — um produto da AEIFI.",
      },
      { property: "og:url", content: "/iniciativas" },
    ],
    links: [{ rel: "canonical", href: "/iniciativas" }],
  }),
  component: Page,
});

function Page() {
  const { get } = useSite();
  return (
    <>
      <PageHero
        eyebrow="Nossas iniciativas"
        title="Projetos, produtos e ações desenvolvidos pela AEIFI"
        lead="Cada iniciativa nasce de um problema real identificado junto aos empreendedores e é conduzida pela associação com objetivo, público e resultados definidos."
      />

      {iniciativas.map((ini, i) => (
        <Section key={ini.slug} id={ini.slug} tone={i % 2 === 1 ? "muted" : "default"}>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                {ini.etiqueta}
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-primary">{ini.titulo}</h2>
              <p className="mt-4 text-lg text-foreground">{ini.resumo}</p>

              <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
                <div>
                  <h3 className="font-display text-lg font-semibold text-primary">Problema que busca resolver</h3>
                  <p className="mt-1">{ini.problema}</p>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-primary">Objetivo</h3>
                  <p className="mt-1">{ini.objetivo}</p>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-primary">Público beneficiado</h3>
                  <p className="mt-1">{ini.publico}</p>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-primary">Como funciona</h3>
                  <ol className="mt-2 list-decimal space-y-1 pl-5">
                    {ini.funcionamento.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ol>
                </div>
              </div>

              {ini.href ? (
                <Link
                  to={ini.href}
                  className="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  Conheça o {ini.titulo}
                </Link>
              ) : null}
            </div>

            <Card className="h-fit">
              <h3 className="font-display text-lg font-semibold text-primary">Resultados</h3>
              <p className="mt-2 text-sm">
                <Value value={get(`iniciativas.${ini.slug}.resultados`)} />
              </p>
              <h3 className="mt-5 font-display text-lg font-semibold text-primary">Parceiros envolvidos</h3>
              <p className="mt-2 text-sm">
                <Value value={get(`iniciativas.${ini.slug}.parceiros`)} />
              </p>
              <h3 className="mt-5 font-display text-lg font-semibold text-primary">Registro fotográfico</h3>
              <div className="mt-2 text-sm">
                <ImageValue value={get(`iniciativas.${ini.slug}.foto`)} alt={`Registro da iniciativa ${ini.titulo}`} />
              </div>
            </Card>
          </div>
        </Section>
      ))}

      <Section title="Quer apoiar uma iniciativa?">
        <p className="max-w-2xl text-muted-foreground">
          Empresas, entidades, universidades e órgãos públicos podem somar-se aos projetos da AEIFI.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <CtaLink to="/parceiros">Seja parceiro da AEIFI</CtaLink>
          <CtaLink to="/associe-se" variant="secondary">
            Quero me associar
          </CtaLink>
        </div>
      </Section>
    </>
  );
}
