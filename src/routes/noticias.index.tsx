import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card, PageHero, Section } from "@/components/site/ui";
import { responsiveImageProps } from "@/lib/responsive-images";
import { formatarDataNoticia, noticiasPublicadasQuery } from "@/lib/noticias";

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
        content:
          "Acompanhe o trabalho da associação: capacitações, encontros, parcerias e projetos.",
      },
      { property: "og:url", content: "/noticias" },
    ],
    links: [{ rel: "canonical", href: "/noticias" }],
  }),
  component: Page,
});

function Page() {
  const { data: noticiasPublicadas = [], isLoading, isError } = useQuery(noticiasPublicadasQuery);

  return (
    <>
      <PageHero
        eyebrow="Notícias"
        title="O que a AEIFI tem realizado"
        lead="Registro das atividades, projetos, parcerias e conquistas da associação junto aos microempreendedores."
      />

      <Section>
        {isLoading ? (
          <p className="text-center text-sm text-muted-foreground" aria-live="polite">
            Carregando notícias…
          </p>
        ) : isError ? (
          <div className="border border-destructive/25 bg-card px-5 py-4 text-center text-sm text-destructive shadow-sm">
            Não foi possível carregar as notícias. Tente novamente em alguns instantes.
          </div>
        ) : noticiasPublicadas.length === 0 ? (
          <div className="border border-border bg-card px-6 py-10 text-center shadow-sm">
            <p className="font-display text-xl font-semibold text-primary">
              Nenhuma notícia publicada no momento.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Novas atividades da AEIFI serão divulgadas nesta página.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {noticiasPublicadas.map((noticia) => (
              <Card key={noticia.id}>
                <img
                  {...responsiveImageProps(
                    noticia.capa_url,
                    "(min-width: 1280px) 24rem, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, calc(100vw - 2.5rem)",
                  )}
                  alt={`Capa da notícia ${noticia.titulo}`}
                  loading="lazy"
                  className="mb-4 aspect-[16/9] w-full rounded-xl object-cover"
                />
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="min-w-0 break-words font-semibold uppercase tracking-[0.14em] text-secondary [overflow-wrap:anywhere]">
                    {noticia.categoria}
                  </span>
                  <span className="text-muted-foreground">
                    {formatarDataNoticia(noticia.data_noticia)}
                  </span>
                </div>
                <h2 className="mt-3 break-words font-display text-xl font-semibold text-primary">
                  {noticia.titulo}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{noticia.subtitulo}</p>
                <Link
                  to="/noticias/$slug"
                  params={{ slug: noticia.slug }}
                  className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-secondary hover:underline"
                >
                  Ler notícia completa
                </Link>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
