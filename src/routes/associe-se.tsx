import { createFileRoute } from "@tanstack/react-router";
import { beneficiosAssociado, org } from "@/content/site";
import { Card, CtaLink, PageHero, Section, Value } from "@/components/site/ui";
import { useSite } from "@/content/useSite";

export const Route = createFileRoute("/associe-se")({
  head: () => ({
    meta: [
      { title: "Associe-se — faça parte da AEIFI" },
      {
        name: "description",
        content:
          "Quem pode se associar, benefícios, funcionamento da associação e como solicitar a associação à AEIFI, esteja você em qualquer cidade.",
      },
      { property: "og:title", content: "Associe-se — faça parte da AEIFI" },
      {
        property: "og:description",
        content:
          "Participe de uma rede que representa, capacita e conecta microempreendedores de diferentes cidades.",
      },
      { property: "og:url", content: "/associe-se" },
    ],
    links: [{ rel: "canonical", href: "/associe-se" }],
  }),
  component: Page,
});

const passos = [
  "Entre em contato com a AEIFI pelos canais oficiais e manifeste seu interesse.",
  "Envie os dados e documentos solicitados para o cadastro de associado.",
  "A solicitação é analisada conforme os critérios do Estatuto Social.",
  "Confirmada a associação, você passa a participar das ações, encontros e assembleias.",
];

function Page() {
  const { org, get } = useSite();
  return (
    <>
      <PageHero
        eyebrow="Associe-se"
        title="Faça parte da AEIFI"
        lead="Associar-se é somar sua voz a uma rede organizada de empreendedores que trabalha por representação, formação e oportunidades — participação aberta a empreendedores de qualquer cidade."
      />

      <Section title="Quem pode participar">
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {org.publico.map((p) => (
            <li key={p} className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          A associação está aberta a empreendedores de qualquer cidade ou estado — não há
          exigência de que o negócio esteja em Foz do Iguaçu. No cadastro, basta informar cidade,
          estado e, quando aplicável, bairro.{" "}
          Critérios completos de admissão, categorias de associado e eventual contribuição associativa
          estão previstos no Estatuto Social: <Value value={get("associe.contribuicao")} />
        </p>
      </Section>

      <Section tone="muted" title="Por que se associar">
        <div className="grid gap-4 md:grid-cols-2">
          {beneficiosAssociado.map((b) => (
            <Card key={b}>
              <p className="text-sm text-muted-foreground">{b}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Como funciona a associação">
        <div className="grid gap-8 lg:grid-cols-2">
          <p className="text-base leading-relaxed text-muted-foreground">
            A AEIFI é uma associação civil sem fins lucrativos. Suas decisões são tomadas em
            assembleia, com participação dos associados, e executadas por uma diretoria eleita. O
            associado tem direito a voz e voto, pode propor pautas e participar das comissões e ações
            organizadas pela entidade.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            O trabalho é contínuo: encontros periódicos, capacitações, articulação com parceiros e
            desenvolvimento de projetos como o BuscaMEI. Quanto maior a base associada, maior a força
            de representação do microempreendedorismo.
          </p>
        </div>
      </Section>

      <Section tone="muted" title="Como solicitar sua associação">
        <ol className="grid gap-4 md:grid-cols-2">
          {passos.map((p, i) => (
            <li key={p} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <span className="font-display text-sm font-semibold text-secondary">Passo {i + 1}</span>
              <p className="mt-2 text-sm text-muted-foreground">{p}</p>
            </li>
          ))}
        </ol>
        <Card className="mt-8 max-w-2xl">
          <h3 className="font-display text-lg font-semibold text-primary">Canais de atendimento</h3>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex flex-wrap gap-2">
              <dt className="font-semibold text-primary">WhatsApp / telefone:</dt>
              <dd>{org.whatsapp}</dd>
            </div>
            <div className="flex flex-wrap gap-2">
              <dt className="font-semibold text-primary">E-mail:</dt>
              <dd>{org.email}</dd>
            </div>
            <div className="flex flex-wrap gap-2">
              <dt className="font-semibold text-primary">Atendimento presencial:</dt>
              <dd>{org.sede}</dd>
            </div>
            <div className="flex flex-wrap gap-2">
              <dt className="font-semibold text-primary">Horário:</dt>
              <dd>{org.horario}</dd>
            </div>
          </dl>
          <div className="mt-6">
            <CtaLink to="/contato" variant="secondary">
              Quero me associar
            </CtaLink>
          </div>
        </Card>
      </Section>
    </>
  );
}
