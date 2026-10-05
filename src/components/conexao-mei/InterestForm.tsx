import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  CONEXAO_MEI_MODALIDADES,
  enviarManifestacaoConexaoMei,
  getConexaoMeiAvailability,
} from "@/lib/conexao-mei.functions";

const emptyForm = {
  nome: "",
  empresa: "",
  telefone: "",
  email: "",
  cidadeUf: "",
  modalidade: "Participante",
  mensagem: "",
  website: "",
};

export function InterestForm() {
  const [form, setForm] = useState(emptyForm);
  const [requestId, setRequestId] = useState(() => crypto.randomUUID());
  const [available, setAvailable] = useState(false);
  const [checking, setChecking] = useState(true);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    let active = true;
    getConexaoMeiAvailability()
      .then((result) => {
        if (active) setAvailable(result.available);
      })
      .catch(() => {
        if (active) setAvailable(false);
      })
      .finally(() => {
        if (active) setChecking(false);
      });
    return () => {
      active = false;
    };
  }, []);

  function change(key: keyof typeof emptyForm, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    if (feedback && !feedback.ok) setRequestId(crypto.randomUUID());
    if (feedback) setFeedback(null);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!available || sending) return;
    setSending(true);
    setFeedback(null);
    try {
      const result = await enviarManifestacaoConexaoMei({
        data: {
          ...form,
          id: requestId,
          modalidade: form.modalidade as (typeof CONEXAO_MEI_MODALIDADES)[number],
        },
      });
      setFeedback({ ok: result.ok, text: result.message });
      if (result.ok) {
        setForm(emptyForm);
        setRequestId(crypto.randomUUID());
      }
    } catch {
      setFeedback({
        ok: false,
        text: "Não foi possível enviar. Confira os campos e tente novamente.",
      });
    } finally {
      setSending(false);
    }
  }

  const labelClass = "grid gap-1.5 text-[13px] font-bold text-[#263e54]";
  const inputClass =
    "min-h-11 w-full rounded-lg border border-[#cbd9e6] bg-white px-3 py-2 text-sm text-[#102338] outline-none focus:border-[#0a5aa4] focus:ring-2 focus:ring-[#0a5aa4]/15";
  return (
    <form
      onSubmit={submit}
      className="rounded-[20px] border border-[#dbe5ef] bg-white p-5 shadow-sm sm:p-7"
    >
      <div className="grid gap-3.5 sm:grid-cols-2">
        <label className={labelClass}>
          Nome / responsável
          <input
            required
            autoComplete="name"
            maxLength={160}
            placeholder="Seu nome"
            value={form.nome}
            onChange={(e) => change("nome", e.target.value)}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Empresa / instituição
          <input
            maxLength={160}
            placeholder="Nome da organização"
            value={form.empresa}
            onChange={(e) => change("empresa", e.target.value)}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Telefone / WhatsApp
          <input
            required
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={30}
            placeholder="(45) 00000-0000"
            value={form.telefone}
            onChange={(e) => change("telefone", e.target.value)}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          E-mail
          <input
            required
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder="contato@exemplo.com"
            value={form.email}
            onChange={(e) => change("email", e.target.value)}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Cidade / UF
          <input
            maxLength={120}
            placeholder="Foz do Iguaçu/PR"
            value={form.cidadeUf}
            onChange={(e) => change("cidadeUf", e.target.value)}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Quero participar como
          <select
            value={form.modalidade}
            onChange={(e) => change("modalidade", e.target.value)}
            className={inputClass}
          >
            {CONEXAO_MEI_MODALIDADES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          Como gostaria de participar?
          <textarea
            rows={4}
            maxLength={3000}
            placeholder="Conte um pouco sobre sua proposta, produto, serviço ou forma de contribuição."
            value={form.mensagem}
            onChange={(e) => change("mensagem", e.target.value)}
            className={inputClass}
          />
        </label>
      </div>
      <div className="hidden" aria-hidden="true">
        <label>
          Deixe este campo vazio
          <input
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => change("website", e.target.value)}
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={checking || !available || sending}
        className="mt-4 min-h-11 w-full rounded-lg bg-[#063f78] px-5 py-3 text-sm font-extrabold text-white transition-colors hover:bg-[#0a5aa4] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {sending ? "ENVIANDO…" : "ENVIAR MANIFESTAÇÃO DE INTERESSE"}
      </button>
      {!checking && !available ? (
        <p className="mt-3 text-sm text-[#607286]">
          O envio de manifestações estará disponível em breve.
        </p>
      ) : null}
      {feedback ? (
        <p
          role="status"
          className={`mt-3 text-sm font-semibold ${feedback.ok ? "text-green-700" : "text-red-700"}`}
        >
          {feedback.text}
        </p>
      ) : null}
      <p className="mt-3 text-xs leading-relaxed text-[#607286]">
        A manifestação será encaminhada à equipe do evento. Seus dados serão usados para responder a
        este contato. Consulte a{" "}
        <Link to="/politica-de-privacidade" className="underline">
          Política de Privacidade
        </Link>
        .
      </p>
    </form>
  );
}
