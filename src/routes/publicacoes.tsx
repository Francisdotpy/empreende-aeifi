import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHero, Section } from "@/components/site/ui";
import { responsiveImageProps } from "@/lib/responsive-images";
import { formatarDataPublicacao, publicacoesPublicadasQuery } from "@/lib/publicacoes";

export const Route = createFileRoute("/publicacoes")({
  head: () => ({
    meta: [
      { title: "Publicações — AEIFI" },
      {
        name: "description",
        content: "Consulte e baixe as publicações oficiais da AEIFI.",
      },
      { property: "og:title", content: "Publicações — AEIFI" },
      {
        property: "og:description",
        content: "Publicações e documentos oficiais da AEIFI.",
      },
      { property: "og:url", content: "/publicacoes" },
    ],
    links: [{ rel: "canonical", href: "/publicacoes" }],
  }),
  component: PublicacoesPage,
});

function PublicacoesPage() {
  const { data: publicacoes = [], isLoading, isError } = useQuery(publicacoesPublicadasQuery);
  const [selectedYear, setSelectedYear] = useState("todos");

  const availableYears = useMemo(
    () =>
      Array.from(
        new Set(publicacoes.map((publicacao) => publicacao.data_publicacao.slice(0, 4))),
      ).sort((a, b) => Number(b) - Number(a)),
    [publicacoes],
  );

  const filteredPublicacoes = useMemo(
    () =>
      selectedYear === "todos"
        ? publicacoes
        : publicacoes.filter((publicacao) => publicacao.data_publicacao.startsWith(selectedYear)),
    [publicacoes, selectedYear],
  );

  const publicacoesGroupedByYear = useMemo(() => {
    const groups = new Map<string, typeof publicacoes>();

    for (const publicacao of filteredPublicacoes) {
      const year = publicacao.data_publicacao.slice(0, 4);
      const group = groups.get(year) ?? [];
      group.push(publicacao);
      groups.set(year, group);
    }

    return Array.from(groups.entries())
      .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
      .map(([year, items]) => ({ year, publicacoes: items }));
  }, [filteredPublicacoes]);

  return (
    <>
      <PageHero
        eyebrow="Documentos públicos"
        title="Publicações"
        lead="Consulte as publicações oficiais da AEIFI e acesse seus documentos."
      />
      <Section>
        {isLoading ? (
          <p className="text-center text-sm text-muted-foreground" aria-live="polite">
            Carregando publicações…
          </p>
        ) : isError ? (
          <div className="border border-destructive/25 bg-card px-5 py-4 text-center text-sm text-destructive shadow-sm">
            Não foi possível carregar as publicações. Tente novamente em alguns instantes.
          </div>
        ) : publicacoes.length === 0 ? (
          <div className="border border-border bg-card px-6 py-10 text-center shadow-sm">
            <p className="font-display text-xl font-semibold text-primary">
              Nenhuma publicação disponível no momento.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Novos documentos serão publicados nesta página assim que estiverem disponíveis.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-2 sm:max-w-xs">
              <label htmlFor="filtro-ano-publicacao" className="text-sm font-semibold text-primary">
                Filtrar por ano
              </label>
              <select
                id="filtro-ano-publicacao"
                value={selectedYear}
                onChange={(event) => setSelectedYear(event.target.value)}
                className="min-h-11 border border-border bg-card px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="todos">Todos os anos</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {filteredPublicacoes.length === 0 ? (
              <div className="border border-border bg-card px-6 py-10 text-center shadow-sm">
                <p className="font-display text-xl font-semibold text-primary">
                  Nenhuma publicação encontrada para {selectedYear}.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Selecione outro ano para consultar as publicações.
                </p>
              </div>
            ) : (
              <div className="space-y-10">
                {publicacoesGroupedByYear.map(({ year, publicacoes: yearPublicacoes }) => (
                  <section key={year} aria-labelledby={`publicacoes-${year}`} className="space-y-5">
                    <div className="border-b border-border pb-3">
                      <h2
                        id={`publicacoes-${year}`}
                        className="font-display text-2xl font-semibold text-primary"
                      >
                        Publicações {year}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {yearPublicacoes.map((publicacao) => (
                        <article
                          key={publicacao.id}
                          className="group flex min-w-0 flex-col overflow-hidden border border-border/90 bg-card shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
                        >
                          <div className="aspect-[4/3] overflow-hidden border-b border-border/80 bg-muted">
                            <img
                              {...responsiveImageProps(
                                publicacao.imagem_url,
                                "(min-width: 1280px) 18rem, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, calc(100vw - 2.5rem)",
                              )}
                              alt={`Imagem de destaque de ${publicacao.titulo}`}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                            />
                          </div>
                          <div className="flex flex-1 flex-col px-5 pb-5 pt-6 text-center">
                            <h3 className="break-words font-display text-xl font-semibold leading-snug text-primary">
                              {publicacao.titulo}
                            </h3>
                            <p className="mt-3 text-sm text-muted-foreground">
                              Publicado em {formatarDataPublicacao(publicacao.data_publicacao)}
                            </p>
                            <a
                              href={publicacao.pdf_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground shadow-sm transition-all hover:bg-secondary/90 hover:shadow-md active:translate-y-px"
                            >
                              <Download className="h-4 w-4" aria-hidden="true" />
                              Baixar publicação
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        )}
      </Section>
    </>
  );
}
