import { createFileRoute } from "@tanstack/react-router";
import { Card, CtaLink, DataRow, FileValue, PageHero, Section, Value } from "@/components/site/ui";
import { useSite } from "@/content/useSite";

export const Route = createFileRoute("/transparencia")({
  head: () => ({
    meta: [
      { title: "Transparência — documentos e governança da AEIFI" },
      {
        name: "description",
        content:
          "Razão social, CNPJ, estatuto, diretoria, relatórios de atividades e prestação de contas da AEIFI, associação de empreendedores de Foz do Iguaçu.",
      },
      { property: "og:title", content: "Transparência — documentos e governança da AEIFI" },
      {
        property: "og:description",
        content: "Documentos institucionais, governança e prestação de contas da AEIFI.",
      },
      { property: "og:url", content: "/transparencia" },
    ],
    links: [{ rel: "canonical", href: "/transparencia" }],
  }),
  component: Page,
});

function Page() {
  const { org, diretoria, documentos, get } = useSite();
  return (
    <>
      <PageHero
        eyebrow="Transparência"
        title="Informação aberta sobre como a AEIFI se organiza"
        lead="A associação disponibiliza seus dados institucionais, documentos e resultados para associados, parceiros e para toda a comunidade."
      />

      <Section title="Dados institucionais">
        <Card>
          <dl>
            <DataRow term="Nome" value={org.nome} />
            <DataRow term="Razão social" value={<Value value={org.razaoSocial} />} />
            <DataRow term="CNPJ" value={<Value value={org.cnpj} />} />
            <DataRow term="Natureza jurídica" value="Associação civil sem fins lucrativos" />
            <DataRow term="Data de constituição" value={<Value value={org.fundacao} />} />
            <DataRow term="Sede" value={<Value value={org.sede} />} />
            <DataRow term="E-mail institucional" value={<Value value={org.email} />} />
            <DataRow
              term="Telefone / WhatsApp"
              value={
                <>
                  <Value value={org.telefone} /> {" / "} <Value value={org.whatsapp} />
                </>
              }
            />
          </dl>
        </Card>
      </Section>

      <Section tone="muted" title="Documentos institucionais">
        <div className="grid gap-4 md:grid-cols-2">
          {documentos.map((d, idx) => (
            <Card key={d.nome}>
              <h3 className="font-display text-lg font-semibold text-primary">{d.nome}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.descricao}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Situação: <Value value={d.situacao} />
              </p>
              <p className="mt-3">
                <FileValue value={get(`documentos.${idx}.arquivo`)} />
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Diretoria e conselho fiscal">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {diretoria.map((d) => (
            <Card key={d.cargo}>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">{d.cargo}</p>
              <p className="mt-2">
                <Value value={d.nome} label="[NOME A SER FORNECIDO PELA AEIFI]" />
              </p>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          A diretoria é eleita em assembleia geral, com mandato e atribuições definidos no Estatuto
          Social.
        </p>
      </Section>

      <Section tone="muted" title="Relatórios e prestação de contas">
        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <h3 className="font-display text-lg font-semibold text-primary">Relatório de atividades</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Documento anual com as ações realizadas, participantes atendidos, parcerias firmadas e
              resultados alcançados.
            </p>
            <p className="mt-3">
              <FileValue value={get("relatorios.atividades.arquivo")} />
            </p>
          </Card>
          <Card>
            <h3 className="font-display text-lg font-semibold text-primary">Prestação de contas</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Demonstração das receitas e despesas do exercício, quando aplicável, aprovada em
              assembleia.
            </p>
            <p className="mt-3">
              <FileValue value={get("relatorios.contas.arquivo")} />
            </p>
          </Card>
        </div>
      </Section>

      <Section title="Pedidos de informação">
        <p className="max-w-2xl text-muted-foreground">
          Qualquer pessoa pode solicitar informações institucionais à AEIFI. Entre em contato pelos
          nossos canais oficiais e responderemos com os documentos ou esclarecimentos disponíveis.
        </p>
        <div className="mt-6">
          <CtaLink to="/contato">Solicitar informações</CtaLink>
        </div>
      </Section>
    </>
  );
}
