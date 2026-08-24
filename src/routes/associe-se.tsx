import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { beneficiosAssociado } from "@/content/site";
import { Card, PageHero, Section, Value } from "@/components/site/ui";
import { useSite } from "@/content/useSite";
import { sendAssociationRequest } from "@/lib/association.functions";

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
        lead="Associar-se é somar sua voz a uma rede organizada de empreendedores que trabalha por representação, formação e oportunidades em Foz do Iguaçu."
      />

      <Section title="Solicite sua associação">
        <AssociationForm />
      </Section>

      <Section tone="muted" title="Quem pode participar">
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {org.publico.map((p) => (
            <li key={p} className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
          Critérios completos de admissão, categorias de associado e eventual contribuição associativa
          estão previstos no Estatuto Social: <Value value={get("associe.contribuicao")} />
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
            associado tem direito a voz e voto, pode propor pautas e participar das comissões e ações
            organizadas pela entidade.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            O trabalho é contínuo: encontros periódicos, capacitações, articulação com parceiros e
            desenvolvimento de projetos como o BuscaMEI. Quanto maior a base associada, maior a força
            de representação do microempreendedorismo local.
          </p>
        </div>
      </Section>

      <Section title="Como solicitar sua associação">
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
        </Card>
      </Section>
    </>
  );
}

function AssociationForm() {
  const [form, setForm] = useState({ nome: "", cnpj: "", telefone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const data = {
      nome: form.nome.trim(),
      cnpj: form.cnpj.trim(),
      telefone: form.telefone.trim(),
    };
    if (!data.nome || !data.cnpj || !data.telefone) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      await sendAssociationRequest({ data });
      setForm({ nome: "", cnpj: "", telefone: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputClassName =
    "rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-normal text-foreground";

  return (
    <Card className="max-w-2xl">
      <p className="text-sm text-muted-foreground">
        Preencha os dados abaixo. A equipe da AEIFI receberá sua solicitação e entrará em contato.
      </p>
      <form className="mt-5 grid gap-4" onSubmit={submit}>
        <label className="grid gap-1.5 text-sm font-semibold text-primary">
          Nome
          <input
            required
            autoComplete="name"
            value={form.nome}
            onChange={(event) => setForm((current) => ({ ...current, nome: event.target.value }))}
            className={inputClassName}
          />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-primary">
          CNPJ
          <input
            required
            inputMode="numeric"
            autoComplete="off"
            value={form.cnpj}
            onChange={(event) => setForm((current) => ({ ...current, cnpj: event.target.value }))}
            className={inputClassName}
          />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold text-primary">
          Telefone / WhatsApp
          <input
            required
            type="tel"
            autoComplete="tel"
            value={form.telefone}
            onChange={(event) =>
              setForm((current) => ({ ...current, telefone: event.target.value }))
            }
            className={inputClassName}
          />
        </label>
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-1 rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Enviando solicitação…" : "Enviar solicitação"}
        </button>
        <div aria-live="polite" className="min-h-5 text-sm">
          {status === "success" ? (
            <p className="font-medium text-green-700">Solicitação enviada com sucesso.</p>
          ) : null}
          {status === "error" ? (
            <p className="font-medium text-destructive">
              Não foi possível enviar. Confira os campos e tente novamente.
            </p>
          ) : null}
        </div>
      </form>
    </Card>
  );
}
