import { createFileRoute } from "@tanstack/react-router";
import { formatosParceria, org } from "@/content/site";
import { Card, CtaLink, PageHero, Pending, Section } from "@/components/site/ui";
import { useSite } from "@/content/useSite";

export const Route = createFileRoute("/parceiros")({
  head: () => ({
    meta: [
      { title: "Parceiros — colabore com a AEIFI" },
      {
        name: "description",
        content:
          "Empresas, entidades, universidades e poder público podem apoiar as iniciativas da AEIFI em favor dos microempreendedores de Foz do Iguaçu.",
      },
      { property: "og:title", content: "Parceiros — colabore com a AEIFI" },
      {
        property: "og:description",
        content: "Formatos de parceria e canal direto para instituições interessadas em colaborar.",
      },
      { property: "og:url", content: "/parceiros" },
    ],
    links: [{ rel: "canonical", href: "/parceiros" }],
  }),
  component: Page,
});

function Page() {
  const { org } = useSite();
  return (
    <>
      <PageHero
        eyebrow="Parcerias"
        title="Seja parceiro da AEIFI"
        lead="As ações da associação ganham alcance quando são construídas em conjunto. Empresas, entidades, instituições de ensino e órgãos públicos podem colaborar com nossas iniciativas."
      />

      <Section title="Por que ser parceiro">
        <div className="grid gap-8 lg:grid-cols-2">
          <p className="text-base leading-relaxed text-muted-foreground">
            Apoiar a AEIFI é investir diretamente na base econômica de Foz do Iguaçu. Os
            microempreendedores atendidos pela associação geram renda, empregam, movimentam bairros e
            sustentam famílias. Cada capacitação, encontro ou projeto viabilizado por um parceiro se
            converte em negócios mais organizados, formais e competitivos.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Para a instituição parceira, a colaboração significa presença qualificada junto a uma
            rede de empreendedores locais, associação a uma causa de desenvolvimento econômico e
            impacto social mensurável na própria cidade.
          </p>
        </div>
      </Section>

      <Section tone="muted" title="Formatos de parceria">
        <div className="grid gap-5 md:grid-cols-2">
          {formatosParceria.map((f) => (
            <Card key={f.titulo}>
              <h3 className="font-display text-lg font-semibold text-primary">{f.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.texto}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Parceiros atuais">
        <p className="text-muted-foreground">
          Relação de parceiros, escopo de cada parceria e logotipos:
        </p>
        <p className="mt-3">
          <Pending />
        </p>
      </Section>

      <Section tone="muted" title="Canal para potenciais parceiros">
        <Card className="max-w-2xl">
          <p className="text-muted-foreground">
            Sua organização quer conhecer as iniciativas da AEIFI ou propor uma parceria? Fale
            diretamente com a diretoria.
          </p>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex flex-wrap gap-2">
              <dt className="font-semibold text-primary">E-mail para parcerias:</dt>
              <dd>{org.email}</dd>
            </div>
            <div className="flex flex-wrap gap-2">
              <dt className="font-semibold text-primary">Telefone / WhatsApp:</dt>
              <dd>{org.whatsapp}</dd>
            </div>
          </dl>
          <div className="mt-6">
            <CtaLink to="/contato">Enviar proposta de parceria</CtaLink>
          </div>
        </Card>
      </Section>
    </>
  );
}
