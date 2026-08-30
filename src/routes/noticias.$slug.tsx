import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section } from "@/components/site/ui";
import { responsiveImageProps } from "@/lib/responsive-images";
import {
  fonteLabel,
  formatarDataNoticia,
  isSafeFonteLink,
  noticiaPublicadaPorSlugQuery,
  type NoticiaPublicada,
} from "@/lib/noticias";

export const Route = createFileRoute("/noticias/$slug")({
  loader: async ({ context, params }) => {
    const noticia = await context.queryClient.ensureQueryData(
      noticiaPublicadaPorSlugQuery(params.slug),
    );
    if (!noticia) throw notFound();
    return { noticia };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Notícia indisponível — AEIFI" }, { name: "robots", content: "noindex" }],
      };
    }
    const description = loaderData.noticia.subtitulo;
    return {
      meta: [
        { title: `${loaderData.noticia.titulo} — AEIFI` },
        { name: "description", content: description },
        { property: "og:title", content: loaderData.noticia.titulo },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/noticias/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/noticias/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: loaderData.noticia.titulo,
            description,
            publisher: { "@type": "NGO", name: "AEIFI" },
          }),
        },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { noticia } = Route.useLoaderData();
  return <NoticiaArticle noticia={noticia} />;
}

function NoticiaArticle({ noticia }: { noticia: NoticiaPublicada }) {
  const paragraphs = noticia.texto.split(/\r?\n\s*\r?\n/).filter((paragraph) => paragraph.trim());
  const fontes = noticia.fontes.filter(isSafeFonteLink);

  return (
    <Section>
      <article className="mx-auto max-w-3xl">
        <Link
          to="/noticias"
          className="inline-flex min-h-11 items-center text-sm font-semibold text-secondary hover:underline"
        >
          ← Voltar para notícias
        </Link>
        <img
          {...responsiveImageProps(
            noticia.capa_url,
            "(min-width: 768px) 48rem, calc(100vw - 2.5rem)",
          )}
          alt={`Capa da notícia ${noticia.titulo}`}
          className="mt-6 aspect-[16/9] w-full border border-border object-cover shadow-sm"
        />
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
          <span className="min-w-0 break-words font-semibold uppercase tracking-[0.14em] text-secondary [overflow-wrap:anywhere]">
            {noticia.categoria}
          </span>
          <span className="text-muted-foreground">{formatarDataNoticia(noticia.data_noticia)}</span>
        </div>
        <h1 className="mt-3 break-words font-display text-[clamp(2rem,8vw,2.25rem)] font-semibold text-primary text-balance-tight md:text-4xl">
          {noticia.titulo}
        </h1>
        <p className="mt-4 text-lg text-foreground">{noticia.subtitulo}</p>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>
        {fontes.length ? (
          <footer className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
            <h2 className="font-semibold text-primary">Fontes:</h2>
            <ul className="mt-2 grid gap-2">
              {fontes.map((fonte) => (
                <li key={fonte}>
                  <a
                    href={fonte}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-secondary underline underline-offset-2 hover:text-secondary/80"
                  >
                    {fonteLabel(fonte)}
                  </a>
                </li>
              ))}
            </ul>
          </footer>
        ) : null}
      </article>
    </Section>
  );
}
