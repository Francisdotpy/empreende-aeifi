import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { noticias } from "@/content/site";
import { Pending, Section } from "@/components/site/ui";

export const Route = createFileRoute("/noticias/$slug")({
  loader: ({ params }) => {
    const noticia = noticias.find((n) => n.slug === params.slug);
    if (!noticia) throw notFound();
    return { noticia };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Notícia indisponível — AEIFI" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.noticia.titulo} — AEIFI` },
        { name: "description", content: loaderData.noticia.resumo },
        { property: "og:title", content: loaderData.noticia.titulo },
        { property: "og:description", content: loaderData.noticia.resumo },
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
            description: loaderData.noticia.resumo,
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
  return (
    <Section>
      <article className="mx-auto max-w-3xl">
        <Link to="/noticias" className="text-sm font-semibold text-secondary hover:underline">
          ← Voltar para notícias
        </Link>
        <div className="mt-6 flex items-center gap-3 text-xs">
          <span className="font-semibold uppercase tracking-[0.14em] text-secondary">
            {noticia.categoria}
          </span>
          <Pending label="[DATA]" />
        </div>
        <h1 className="mt-3 font-display text-4xl font-semibold text-primary text-balance-tight">
          {noticia.titulo}
        </h1>
        <p className="mt-4 text-lg text-foreground">{noticia.resumo}</p>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
          {noticia.corpo.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Fotos da atividade: <Pending label="[FOTOS A SEREM FORNECIDAS PELA AEIFI]" />
        </p>
      </article>
    </Section>
  );
}
