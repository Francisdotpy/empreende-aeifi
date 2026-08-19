import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import buscameiImg from "@/assets/buscamei.jpg";
import { Card, CtaLink, ExternalCta, PageHero, Section, Value } from "@/components/site/ui";
import { useSite } from "@/content/useSite";

export const Route = createFileRoute("/buscamei")({
  head: () => ({
    meta: [
      { title: "BuscaMEI — um produto da AEIFI" },
      {
        name: "description",
        content:
          "O BuscaMEI é a plataforma criada pela AEIFI para ampliar a visibilidade dos microempreendedores e conectar quem oferece a quem procura.",
      },
      { property: "og:title", content: "BuscaMEI — um produto da AEIFI" },
      {
        property: "og:description",
        content:
          "Entenda por que a AEIFI criou o BuscaMEI, como a plataforma funciona, quem pode participar e quais são os benefícios para empreendedores e comunidade.",
      },
      { property: "og:url", content: "/buscamei" },
    ],
    links: [{ rel: "canonical", href: "/buscamei" }],
  }),
  component: Page,
});

function Page() {
  const { get } = useSite();
  return (
    <>
      <PageHero
        eyebrow="Uma iniciativa da AEIFI"
        title="BuscaMEI — um produto da AEIFI"
        lead="O BuscaMEI é uma iniciativa desenvolvida pela AEIFI para ampliar a visibilidade dos microempreendedores e facilitar a conexão entre quem oferece e quem procura produtos e serviços."
      />

      <Section title="Por que a AEIFI criou o BuscaMEI">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              No atendimento diário aos empreendedores, a associação identificou um problema
              recorrente: negócios sérios, com bom produto e bom serviço, permaneciam praticamente
              invisíveis para o público. Sem site, sem estrutura de divulgação e sem tempo para
              gerenciar presença digital, muitos MEIs dependiam apenas do boca a boca.
            </p>
            <p>
              Ao mesmo tempo, consumidores relatavam dificuldade em encontrar prestadores de
              serviço e pequenos produtores. Havia oferta e havia procura — faltava um lugar
              organizado onde as duas se encontrassem.
            </p>
            <p>
              O BuscaMEI é a resposta da AEIFI a esse problema. Não é um negócio à parte: é uma
              ferramenta institucional, mantida pela associação, dentro da sua frente de projetos e
              inovação.
            </p>
          </div>
          <img
            src={buscameiImg}
            width={1400}
            height={900}
            loading="lazy"
            alt="Empreendedora consultando a plataforma BuscaMEI pelo celular em seu comércio"
            className="w-full rounded-2xl object-cover shadow-card"
          />
        </div>
      </Section>

      <Section tone="muted" title="Objetivo do produto">
        <div className="grid gap-5 md:grid-cols-3">
          <Card>
            <h3 className="font-display text-lg font-semibold text-primary">Dar visibilidade</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Colocar o microempreendedor em um espaço organizado, onde suas atividades e contatos
              fiquem acessíveis a quem procura.
            </p>
          </Card>
          <Card>
            <h3 className="font-display text-lg font-semibold text-primary">Facilitar o encontro</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Permitir que consumidores localizem produtos e serviços por tipo de atividade e entrem
              em contato diretamente.
            </p>
          </Card>
          <Card>
            <h3 className="font-display text-lg font-semibold text-primary">Valorizar quem está perto</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Estimular que a compra aconteça dentro da própria cidade, fortalecendo a economia de
              Foz do Iguaçu.
            </p>
          </Card>
        </div>
      </Section>

      <Section title="Como funciona">
        <ol className="grid gap-4 md:grid-cols-2">
          {[
            "O empreendedor realiza seu cadastro, informando o negócio, as atividades que exerce e as formas de contato.",
            "As informações são organizadas por categoria de produto ou serviço, facilitando a localização.",
            "Quem procura utiliza a busca e visualiza os empreendedores que atendem àquela necessidade.",
            "O contato é feito diretamente entre o consumidor e o empreendedor, sem intermediação.",
          ].map((step, i) => (
            <li key={step} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <span className="font-display text-sm font-semibold text-secondary">Passo {i + 1}</span>
              <p className="mt-2 text-sm text-muted-foreground">{step}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="muted" title="Quem pode participar">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-base text-muted-foreground">
              O BuscaMEI foi pensado para microempreendedores individuais e pequenos negócios que
              atuam em qualquer cidade, de qualquer setor: alimentação, serviços, reformas,
              beleza, artesanato, tecnologia, comércio e muitos outros.
            </p>
            <p className="mt-4 text-base text-muted-foreground">
              Regras específicas de participação, documentos exigidos e eventuais condições:{" "}
              <Value value={get("buscamei.regras")} />
            </p>
          </div>
          <div className="grid gap-5">
            <Card>
              <h3 className="font-display text-lg font-semibold text-primary">Você é MEI?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Conheça uma ferramenta criada pela AEIFI para ajudar a ampliar sua presença e
                facilitar que novos clientes encontrem seu negócio.
              </p>
            </Card>
            <Card>
              <h3 className="font-display text-lg font-semibold text-primary">
                Está procurando um produto ou serviço?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Encontre microempreendedores por categoria, cidade ou estado no BuscaMEI.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      <Section title="Benefícios">
        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <h3 className="font-display text-xl font-semibold text-primary">Para os empreendedores</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Um espaço digital organizado para apresentar o negócio, sem precisar criar um site.</li>
              <li>Mais chances de ser encontrado por quem procura aquele produto ou serviço.</li>
              <li>Contato direto com o interessado, sem intermediários.</li>
              <li>Participação em uma iniciativa mantida por uma associação da própria cidade.</li>
            </ul>
          </Card>
          <Card>
            <h3 className="font-display text-xl font-semibold text-primary">Para a comunidade</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Facilidade para localizar produtos e serviços oferecidos por pequenos negócios.</li>
              <li>Acesso a uma variedade de empreendedores que antes eram pouco visíveis.</li>
              <li>Estímulo ao consumo local e à circulação de renda em cada comunidade atendida.</li>
              <li>Aproximação entre consumidores e a base empreendedora.</li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section tone="muted" title="Relação com a missão da AEIFI">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          A missão da AEIFI é apoiar, representar e conectar quem empreende. O
          BuscaMEI cumpre diretamente a parte de <strong>conexão</strong> e{" "}
          <strong>oportunidade</strong> dessa missão: é a tradução prática de uma associação que não
          se limita a discursos, mas desenvolve ferramentas para resolver dificuldades reais dos seus
          associados. Ele integra a frente de projetos e inovação e convive com as demais ações —
          representatividade, capacitação e articulação de parcerias.
        </p>
      </Section>

      <Section title="Resultados já alcançados">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { rotulo: "Empreendedores cadastrados", key: "buscamei.cadastrados" },
            { rotulo: "Categorias de atividade", key: "buscamei.categorias" },
            { rotulo: "Buscas realizadas", key: "buscamei.buscas" },
          ].map((r) => (
            <Card key={r.key}>
              <p>
                <Value value={get(r.key)} />
              </p>
              <p className="mt-3 text-sm font-medium text-muted-foreground">{r.rotulo}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Divulgamos apenas números verificados pela associação.
        </p>
      </Section>

      <Section tone="muted" title="Como acessar">
        <p className="max-w-2xl text-base text-muted-foreground">
          O BuscaMEI é aberto ao público e pode ser acessado por qualquer pessoa, pelo computador ou
          pelo celular. Empreendedores interessados em participar também podem falar diretamente com
          a AEIFI para receber orientação sobre o cadastro.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <ExternalCta href="https://www.buscamei.com.br">
            Acessar o BuscaMEI <ArrowUpRight className="h-4 w-4" />
          </ExternalCta>
          <CtaLink to="/contato" variant="ghost">
            Falar com a AEIFI sobre o cadastro
          </CtaLink>
        </div>
      </Section>
    </>
  );
}
