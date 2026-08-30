import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { beneficiosAssociado } from "@/content/site";
import { Card, PageHero, Section, Value } from "@/components/site/ui";
import { formControlClassName } from "@/components/site/form-styles";
import { useSite } from "@/content/useSite";

export const Route = createFileRoute("/associe-se")({
  head: () => ({
    meta: [
      { title: "Associe-se — faça parte da AEIFI" },
      {
        name: "description",
        content:
          "Quem pode se associar, benefícios, funcionamento da associação e como solicitar a associação à AEIFI, em Foz do Iguaçu.",
      },
      { property: "og:title", content: "Associe-se — faça parte da AEIFI" },
      {
        property: "og:description",
        content:
          "Participe de uma rede que representa, capacita e conecta microempreendedores de Foz do Iguaçu.",
      },
      { property: "og:url", content: "/associe-se" },
    ],
    links: [{ rel: "canonical", href: "/associe-se" }],
  }),
  component: Page,
});

const passos = [
  "Preencha seu nome e CNPJ no formulário e continue o atendimento pelo WhatsApp.",
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
        lead="Associar-se é somar sua voz a uma rede organizada de empreendedores que trabalha por representação, formação e oportunidades em Foz do Iguaçu."
      />

      <Section title="Solicite sua associação">
        <AssociationForm />
      </Section>

      <Section tone="muted" title="Quem pode participar">
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {org.publico.map((p) => (
            <li
              key={p}
              className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground shadow-sm"
            >
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          Critérios completos de admissão, categorias de associado e eventual contribuição
          associativa estão previstos no Estatuto Social:{" "}
          <Value value={get("associe.contribuicao")} />
        </p>
      </Section>

      <Section title="Por que se associar">
        <div className="grid gap-4 md:grid-cols-2">
          {beneficiosAssociado.map((b) => (
            <Card key={b}>
              <p className="text-sm text-muted-foreground">{b}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="muted" title="Como funciona a associação">
        <div className="grid gap-8 lg:grid-cols-2">
          <p className="text-base leading-relaxed text-muted-foreground">
            A AEIFI é uma associação civil sem fins lucrativos. Suas decisões são tomadas em
            assembleia, com participação dos associados, e executadas por uma diretoria eleita. O
            associado tem direito a voz e voto, pode propor pautas e participar das comissões e
            ações organizadas pela entidade.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            O trabalho é contínuo: encontros periódicos, capacitações, articulação com parceiros e
            desenvolvimento de projetos como o BuscaMEI. Quanto maior a base associada, maior a
            força de representação do microempreendedorismo local.
          </p>
        </div>
      </Section>

      <Section title="Como solicitar sua associação">
        <ol className="grid gap-4 md:grid-cols-2">
          {passos.map((p, i) => (
            <li key={p} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <span className="font-display text-sm font-semibold text-secondary">
                Passo {i + 1}
              </span>
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
        </Card>
      </Section>
    </>
  );
}

function AssociationForm() {
  const [form, setForm] = useState({ nome: "", cnpj: "" });
  const [hasError, setHasError] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = {
      nome: form.nome.trim(),
      cnpj: form.cnpj.trim(),
    };
    if (!data.nome || !data.cnpj) {
      setHasError(true);
      return;
    }

    const message = `Olá, meu nome é ${data.nome}, CNPJ ${data.cnpj}. Gostaria de saber mais sobre a associação com a AEIFI.`;
    const whatsappUrl = `https://wa.me/5545998460809?text=${encodeURIComponent(message)}`;

    setHasError(false);
    window.location.assign(whatsappUrl);
  }

  return (
    <Card className="max-w-2xl">
      <p className="text-sm text-muted-foreground">
        Preencha os dados abaixo para preparar sua mensagem e continuar pelo WhatsApp.
      </p>
      <form className="mt-5 grid gap-4" onSubmit={submit}>
        <label className="grid gap-1.5 text-sm font-semibold text-primary">
          Nome
          <input
            required
            autoComplete="name"
            maxLength={160}
            value={form.nome}
            onChange={(event) => setForm((current) => ({ ...current, nome: event.target.value }))}
            className={formControlClassName}
          />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-primary">
          CNPJ
          <input
            required
            inputMode="numeric"
            autoComplete="off"
            maxLength={30}
            value={form.cnpj}
            onChange={(event) => setForm((current) => ({ ...current, cnpj: event.target.value }))}
            className={formControlClassName}
          />
        </label>
        <button
          type="submit"
          className="mt-1 rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground shadow-sm transition-all hover:bg-secondary/90 hover:shadow-md active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          Continuar pelo WhatsApp
        </button>
        <div aria-live="polite" className="min-h-5 text-sm">
          {hasError ? (
            <p className="font-medium text-destructive">Preencha seu nome e CNPJ para continuar.</p>
          ) : null}
        </div>
      </form>
    </Card>
  );
}
