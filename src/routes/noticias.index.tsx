import { createFileRoute, Link } from "@tanstack/react-router";
import capacitacaoImg from "@/assets/capacitacao.jpg";
import { noticias } from "@/content/site";
import { Card, PageHero, Pending, Section } from "@/components/site/ui";

export const Route = createFileRoute("/noticias/")({
  head: () => ({
    meta: [
      { title: "Notícias e atividades da AEIFI" },
      {
        name: "description",
        content:
          "Eventos, capacitações, parcerias e ações institucionais: acompanhe as atividades da AEIFI com os empreendedores de Foz do Iguaçu.",
      },
      { property: "og:title", content: "Notícias e atividades da AEIFI" },
      {
        property: "og:description",
        content: "Acompanhe o trabalho da associação: capacitações, encontros, parcerias e projetos.",
      },
      { property: "og:url", content: "/noticias" },
    ],
    links: [{ rel: "canonical", href: "/noticias" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Notícias"
        title="O que a AEIFI tem realizado"
        lead="Registro das atividades, projetos, parcerias e conquistas da associação junto aos microempreendedores de Foz do Iguaçu."
      />

      <Section>
        <img
          src={capacitacaoImg}
          width={1400}
          height={900}
          loading="lazy"
          alt="Participantes em atividade de capacitação promovida pela AEIFI"
          className="mb-10 w-full rounded-2xl object-cover shadow-card"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {noticias.map((n) => (
            <Card key={n.slug}>
              <div className="flex items-center gap-3 text-xs">
                <span className="font-semibold uppercase tracking-[0.14em] text-secondary">
                  {n.categoria}
                </span>
                <Pending label="[DATA]" />
              </div>
              <h2 className="mt-3 font-display text-xl font-semibold text-primary">{n.titulo}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{n.resumo}</p>
              <Link
                to="/noticias/$slug"
                params={{ slug: n.slug }}
                className="mt-4 inline-block text-sm font-semibold text-secondary hover:underline"
              >
                Ler notícia completa
              </Link>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Novas publicações são acrescentadas conforme as atividades da associação acontecem. Textos e
          fotos são de produção própria da AEIFI.
        </p>
      </Section>
    </>
  );
}
