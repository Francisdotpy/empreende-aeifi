import { createFileRoute } from "@tanstack/react-router";
import { org } from "@/content/site";
import { Card, CtaLink, DataRow, PageHero, Section } from "@/components/site/ui";
import { useSite } from "@/content/useSite";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — fale com a AEIFI" },
      {
        name: "description",
        content:
          "Canais de atendimento da AEIFI: telefone, WhatsApp, e-mail, endereço da sede e horário de atendimento em Foz do Iguaçu.",
      },
      { property: "og:title", content: "Contato — fale com a AEIFI" },
      {
        property: "og:description",
        content: "Fale com a associação sobre associação, parcerias, capacitações ou o BuscaMEI.",
      },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: Page,
});

function Page() {
  const { org } = useSite();
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Fale com a AEIFI"
        lead="Estamos à disposição de empreendedores, associados, parceiros, imprensa e de toda a comunidade de Foz do Iguaçu."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <h2 className="font-display text-xl font-semibold text-primary">Canais oficiais</h2>
            <dl className="mt-4">
              <DataRow term="Telefone / WhatsApp" value={org.whatsapp} />
              <DataRow term="E-mail" value={org.email} />
              <DataRow term="Endereço da sede" value={org.sede} />
              <DataRow term="Horário de atendimento" value={org.horario} />
              <DataRow term="Cidade" value={org.cidade} />
              <DataRow
                term="Redes sociais"
                value={org.redes.map((r) => `${r.nome}: ${r.url}`).join(" · ")}
              />
            </dl>
          </Card>

          <div className="grid gap-5">
            <Card>
              <h2 className="font-display text-xl font-semibold text-primary">Quero me associar</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Empreendedores interessados em fazer parte da associação podem falar diretamente
                conosco pelos canais acima.
              </p>
              <div className="mt-4">
                <CtaLink to="/associe-se" variant="secondary">
                  Ver como se associar
                </CtaLink>
              </div>
            </Card>
            <Card>
              <h2 className="font-display text-xl font-semibold text-primary">Propostas de parceria</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Empresas, entidades, universidades e órgãos públicos podem apresentar propostas de
                colaboração com as iniciativas da AEIFI.
              </p>
              <div className="mt-4">
                <CtaLink to="/parceiros" variant="ghost">
                  Seja parceiro
                </CtaLink>
              </div>
            </Card>
            <Card>
              <h2 className="font-display text-xl font-semibold text-primary">Dúvidas sobre o BuscaMEI</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                O BuscaMEI é um produto da AEIFI. Orientações sobre cadastro e uso da plataforma
                também são prestadas pelos canais da associação.
              </p>
              <div className="mt-4">
                <CtaLink to="/buscamei" variant="ghost">
                  Conhecer o BuscaMEI
                </CtaLink>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
