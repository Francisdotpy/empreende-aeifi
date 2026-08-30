import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { PageHero, Section } from "@/components/site/ui";
import { responsiveImageProps } from "@/lib/responsive-images";
import { editaisPublicadosQuery, formatarDataPublicacao } from "@/lib/editais";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Editais de credenciamento — AEIFI" },
      {
        name: "description",
        content: "Consulte e baixe os editais de credenciamento publicados pela AEIFI.",
      },
      { property: "og:title", content: "Editais de credenciamento — AEIFI" },
      {
        property: "og:description",
        content: "Editais e documentos de credenciamento publicados pela AEIFI.",
      },
      { property: "og:url", content: "/downloads" },
    ],
    links: [{ rel: "canonical", href: "/downloads" }],
  }),
  component: DownloadsPage,
});

function DownloadsPage() {
  const { data: editais = [], isLoading, isError } = useQuery(editaisPublicadosQuery);

  return (
    <>
      <PageHero
        eyebrow="Documentos públicos"
        title="Editais de credenciamento"
        lead="Consulte os processos de credenciamento publicados pela AEIFI e acesse seus documentos oficiais."
      />
      <Section>
        {isLoading ? (
          <p className="text-center text-sm text-muted-foreground" aria-live="polite">
            Carregando editais…
          </p>
        ) : isError ? (
          <div className="border border-destructive/25 bg-card px-5 py-4 text-center text-sm text-destructive shadow-sm">
            Não foi possível carregar os editais. Tente novamente em alguns instantes.
          </div>
        ) : editais.length === 0 ? (
          <div className="border border-border bg-card px-6 py-10 text-center shadow-sm">
            <p className="font-display text-xl font-semibold text-primary">
              Nenhum edital de credenciamento disponível no momento.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Novos documentos serão publicados nesta página assim que estiverem disponíveis.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {editais.map((edital) => (
              <article
                key={edital.id}
                className="group flex min-w-0 flex-col overflow-hidden border border-border/90 bg-card shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
              >
                <div className="aspect-[4/3] overflow-hidden border-b border-border/80 bg-muted">
                  <img
                    {...responsiveImageProps(
                      edital.imagem_url,
                      "(min-width: 1280px) 18rem, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, calc(100vw - 2.5rem)",
                    )}
                    alt={`Imagem de destaque do ${edital.titulo}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                  />
                </div>
                <div className="flex flex-1 flex-col px-5 pb-5 pt-6 text-center">
                  <h2 className="break-words font-display text-xl font-semibold leading-snug text-primary">
                    {edital.titulo}
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Publicado em {formatarDataPublicacao(edital.data_publicacao)}
                  </p>
                  <a
                    href={edital.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground shadow-sm transition-all hover:bg-secondary/90 hover:shadow-md active:translate-y-px"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Baixar edital
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
