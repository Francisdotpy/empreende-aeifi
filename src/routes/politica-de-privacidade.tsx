import { createFileRoute } from "@tanstack/react-router";
import { org } from "@/content/site";
import { PageHero, Section } from "@/components/site/ui";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — AEIFI" },
      {
        name: "description",
        content:
          "Como a AEIFI trata os dados pessoais de associados, visitantes e interessados, em conformidade com a LGPD.",
      },
      { property: "og:title", content: "Política de Privacidade — AEIFI" },
      { property: "og:description", content: "Tratamento de dados pessoais pela AEIFI." },
      { property: "og:url", content: "/politica-de-privacidade" },
    ],
    links: [{ rel: "canonical", href: "/politica-de-privacidade" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Privacidade"
        title="Política de Privacidade"
        lead="Esta política descreve como a AEIFI trata os dados pessoais de associados, visitantes e interessados em suas atividades."
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
          <div>
            <h2 className="font-display text-xl font-semibold text-primary">Quem é o controlador</h2>
            <p className="mt-2">
              {org.nome} (AEIFI), associação civil sem fins lucrativos sediada em Foz do Iguaçu,
              Paraná. Razão social e CNPJ estão indicados na página de Transparência.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-primary">Dados que coletamos</h2>
            <p className="mt-2">
              Coletamos apenas os dados necessários para o relacionamento institucional: nome,
              contato, dados do negócio e informações fornecidas voluntariamente em pedidos de
              associação, inscrições em atividades e mensagens enviadas aos nossos canais.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-primary">Como utilizamos</h2>
            <p className="mt-2">
              Os dados são usados para gerir o quadro associativo, organizar capacitações e eventos,
              comunicar oportunidades e cumprir obrigações legais da associação. Não vendemos dados
              pessoais.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-primary">Compartilhamento</h2>
            <p className="mt-2">
              O compartilhamento ocorre apenas quando necessário à execução das atividades (por
              exemplo, com instituições parceiras de uma capacitação) ou por exigência legal.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-primary">Direitos do titular</h2>
            <p className="mt-2">
              Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode solicitar
              confirmação de tratamento, acesso, correção, portabilidade, anonimização ou exclusão
              dos seus dados, bem como revogar consentimentos.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-primary">Contato</h2>
            <p className="mt-2">
              Pedidos relacionados a dados pessoais devem ser enviados aos canais oficiais indicados
              na página de Contato.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
