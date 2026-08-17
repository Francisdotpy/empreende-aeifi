import { createFileRoute } from "@tanstack/react-router";
import { diretoria, org } from "@/content/site";
import { Card, CtaLink, DataRow, PageHero, Pending, Section } from "@/components/site/ui";
import { useSite } from "@/content/useSite";

export const Route = createFileRoute("/a-aeifi")({
  head: () => ({
    meta: [
      { title: "A AEIFI — quem somos, missão e diretoria" },
      {
        name: "description",
        content:
          "Conheça a AEIFI: história, missão, visão, valores, objetivos, público atendido, sede, CNPJ e diretoria da associação de empreendedores de Foz do Iguaçu.",
      },
      { property: "og:title", content: "A AEIFI — quem somos, missão e diretoria" },
      {
        property: "og:description",
        content:
          "História, missão, visão, valores, objetivos e governança da Associação dos Empreendedores Individuais de Foz do Iguaçu.",
      },
      { property: "og:url", content: "/a-aeifi" },
    ],
    links: [{ rel: "canonical", href: "/a-aeifi" }],
  }),
  component: Page,
});

function Page() {
  const { org, diretoria } = useSite();
  return (
    <>
      <PageHero
        eyebrow="Quem somos"
        title="Uma associação construída por quem empreende em Foz do Iguaçu"
        lead="A AEIFI reúne microempreendedores individuais e pequenos negócios da cidade em torno de um objetivo comum: ter representação, formação e oportunidades de crescimento."
      />

      <Section title="Nossa história">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground lg:col-span-2">
            <p>
              A AEIFI nasceu da percepção de que o microempreendedor individual, apesar de representar
              parcela expressiva da economia de Foz do Iguaçu, atuava de forma isolada: sem canal de
              representação, com pouco acesso a formação e com dificuldade de ser encontrado por
              clientes.
            </p>
            <p>
              A associação foi constituída formalmente como entidade sem fins lucrativos para
              organizar essa base, dar voz coletiva ao segmento e desenvolver ações concretas de
              apoio. Desde então, sua trajetória combina representação institucional, capacitação,
              articulação de parcerias e desenvolvimento de projetos próprios.
            </p>
            <p>
              Data de fundação, marcos da trajetória e principais conquistas: <Pending />
            </p>
          </div>
          <Card className="h-fit">
            <h3 className="font-display text-lg font-semibold text-primary">Ficha institucional</h3>
            <dl className="mt-3">
              <DataRow term="Nome" value={org.nome} />
              <DataRow term="Sigla" value={org.sigla} />
              <DataRow term="Razão social" value={<Pending />} />
              <DataRow term="CNPJ" value={<Pending />} />
              <DataRow term="Fundação" value={<Pending />} />
              <DataRow term="Sede" value={<Pending />} />
              <DataRow term="Cidade" value={org.cidade} />
              <DataRow term="Natureza" value="Associação civil sem fins lucrativos" />
            </dl>
          </Card>
        </div>
      </Section>

      <Section tone="muted" title="Missão, visão e valores">
        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <h3 className="font-display text-xl font-semibold text-primary">Missão</h3>
            <p className="mt-3 text-muted-foreground">{org.missao}</p>
          </Card>
          <Card>
            <h3 className="font-display text-xl font-semibold text-primary">Visão</h3>
            <p className="mt-3 text-muted-foreground">{org.visao}</p>
          </Card>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {org.valores.map((v) => (
            <Card key={v.titulo}>
              <h3 className="font-display text-lg font-semibold text-primary">{v.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.texto}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Objetivos institucionais">
        <ul className="grid gap-3 md:grid-cols-2">
          {org.objetivos.map((o) => (
            <li key={o} className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
              {o}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted" title="Quem atendemos">
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {org.publico.map((p) => (
            <li key={p} className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
              {p}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Diretoria" lead="A AEIFI é dirigida por associados eleitos em assembleia, conforme o Estatuto Social.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {diretoria.map((d) => (
            <Card key={d.cargo}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">{d.cargo}</p>
              <p className="mt-2">
                <Pending label="[NOME A SER FORNECIDO PELA AEIFI]" />
              </p>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink to="/transparencia" variant="ghost">
            Ver documentos e transparência
          </CtaLink>
          <CtaLink to="/associe-se" variant="secondary">
            Quero me associar
          </CtaLink>
        </div>
      </Section>
    </>
  );
}
