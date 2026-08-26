import { createFileRoute } from "@tanstack/react-router";
import { areas } from "@/content/site";
import { Card, CtaLink, PageHero, Section } from "@/components/site/ui";

export const Route = createFileRoute("/o-que-fazemos")({
  head: () => ({
    meta: [
      { title: "O que fazemos — áreas de atuação da AEIFI" },
      {
        name: "description",
        content:
          "Representatividade, capacitação, conexões, oportunidades e projetos: conheça em detalhe as áreas de atuação da AEIFI junto aos empreendedores de Foz do Iguaçu.",
      },
      { property: "og:title", content: "O que fazemos — áreas de atuação da AEIFI" },
      {
        property: "og:description",
        content: "As cinco frentes de trabalho da associação e como cada uma acontece na prática.",
      },
      { property: "og:url", content: "/o-que-fazemos" },
    ],
    links: [{ rel: "canonical", href: "/o-que-fazemos" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Áreas de atuação"
        title="O que a AEIFI faz pelos empreendedores"
        lead="Nossa atuação é organizada em cinco frentes. Cada uma responde a uma necessidade concreta de quem toca um pequeno negócio na cidade."
      />

      {areas.map((area, i) => (
        <Section
          key={area.slug}
          id={area.slug}
          tone={i % 2 === 1 ? "muted" : "default"}
          title={area.titulo}
        >
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground lg:col-span-2">
              <p className="text-lg text-foreground">{area.resumo}</p>
              <p>{area.descricao}</p>
            </div>
            <Card className="h-fit">
              <h3 className="font-display text-lg font-semibold text-primary">Na prática</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {area.praticas.map((p) => (
                  <li key={p} className="border-b border-border pb-2 last:border-0">
                    {p}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Section>
      ))}

      <Section title="Como isso vira ação concreta">
        <p className="max-w-2xl text-muted-foreground">
          Cada frente se materializa em projetos, produtos e eventos da associação — de programas de
          capacitação ao BuscaMEI, plataforma criada pela AEIFI para ampliar a visibilidade dos
          microempreendedores.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <CtaLink to="/iniciativas">Ver projetos e iniciativas</CtaLink>
          <CtaLink to="/associe-se" variant="secondary">
            Quero me associar
          </CtaLink>
        </div>
      </Section>
    </>
  );
}
