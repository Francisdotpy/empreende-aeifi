import { useEffect, useState } from "react";
import {
  getConexaoMeiRegistrationAvailability,
  lookupConexaoMeiRegistration,
  registerConexaoMeiStage,
} from "@/lib/conexao-mei-inscricoes.functions";
import { printConexaoMeiCertificate, printConexaoMeiLabel } from "@/lib/conexao-mei-print";

type StageInfo = {
  slug: string;
  city: string;
  date: string;
  registrationOpen: boolean;
  certificates: boolean;
};
type Label = { id: string; nome: string; cidade: string; rotulo: string; data: string };
type Certificate = {
  horas: string;
  assinanteNome: string;
  assinanteCargo: string;
  coordenadorNome: string;
  coordenadorCargo: string;
};
type Mode = "inscricao" | "etiqueta" | "certificado";
export function StageParticipation({
  stage,
  partners,
}: {
  stage: StageInfo;
  partners: { nome: string; logoUrl: string }[];
}) {
  const [mode, setMode] = useState<Mode>("inscricao");
  const [available, setAvailable] = useState(false);
  const [checking, setChecking] = useState(true);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [label, setLabel] = useState<Label | null>(null);
  const [certificate, setCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    let active = true;
    getConexaoMeiRegistrationAvailability()
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
  useEffect(() => {
    setMessage("");
    setLabel(null);
    setCertificate(null);
    setCpf("");
    setName("");
    setWhatsapp("");
  }, [stage.slug, mode]);
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!available || busy) return;
    setBusy(true);
    setMessage("");
    setLabel(null);
    setCertificate(null);
    try {
      if (mode === "inscricao") {
        const result = await registerConexaoMeiStage({
          data: {
            etapa: stage.slug,
            nome: name,
            cpf,
            whatsapp,
            consentimento: consent as true,
            website: "",
          },
        });
        setMessage(result.message);
        if (result.ok && result.label) setLabel(result.label);
      } else {
        const result = await lookupConexaoMeiRegistration({
          data: { etapa: stage.slug, cpf, finalidade: mode },
        });
        setMessage(result.message);
        if (result.ok && result.label) {
          setLabel(result.label);
          setCertificate(result.certificate ?? null);
        }
      }
    } catch {
      setMessage("Não foi possível concluir a operação. Confira os dados e tente novamente.");
    }
    setBusy(false);
  }

  return (
    <div className="rounded-2xl border border-[#dbe5ef] bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-[#0a5aa4]">
        Inscrição gratuita
      </p>
      <h3 className="mt-2 text-2xl font-extrabold text-[#063f78]">Participe desta etapa</h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {(
          [
            ["inscricao", "Inscrever-se"],
            ["etiqueta", "Recuperar etiqueta"],
            ["certificado", "Certificado"],
          ] as const
        ).map(([key, text]) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            className={`min-h-10 rounded-lg px-3 py-2 text-xs font-bold ${mode === key ? "bg-[#063f78] text-white" : "border border-[#dbe5ef] text-[#063f78]"}`}
          >
            {text}
          </button>
        ))}
      </div>
      {mode === "inscricao" && !stage.registrationOpen ? (
        <p className="mt-4 text-sm text-[#607286]">
          As inscrições desta etapa estão fechadas no momento.
        </p>
      ) : null}
      {mode === "certificado" && !stage.certificates ? (
        <p className="mt-4 text-sm text-[#607286]">
          Os certificados serão liberados pela organização após o evento e a confirmação de
          presença.
        </p>
      ) : null}
      {checking ? (
        <p className="mt-4 text-sm">Verificando disponibilidade…</p>
      ) : !available ? (
        <p className="mt-4 text-sm text-[#607286]">
          Inscrições, etiquetas e certificados estarão disponíveis após a ativação do sistema do
          evento.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-5 grid gap-3">
          {mode === "inscricao" ? (
            <>
              <label className="grid gap-1 text-sm font-semibold">
                Nome completo
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={160}
                  className="min-h-11 rounded-lg border border-[#cbd9e6] px-3"
                />
              </label>
              <label className="grid gap-1 text-sm font-semibold">
                WhatsApp
                <input
                  required
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  maxLength={30}
                  className="min-h-11 rounded-lg border border-[#cbd9e6] px-3"
                />
              </label>
            </>
          ) : null}
          <label className="grid gap-1 text-sm font-semibold">
            CPF
            <input
              required
              inputMode="numeric"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              maxLength={14}
              placeholder="000.000.000-00"
              className="min-h-11 rounded-lg border border-[#cbd9e6] px-3"
            />
          </label>
          {mode === "inscricao" ? (
            <label className="flex items-start gap-2 text-xs text-[#607286]">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />{" "}
              Autorizo o uso destes dados para inscrição, controle de participação, etiqueta e
              certificado desta etapa.
            </label>
          ) : null}
          <button
            type="submit"
            disabled={busy || (mode === "inscricao" && !stage.registrationOpen)}
            className="min-h-11 rounded-lg bg-[#063f78] px-4 py-2 text-sm font-extrabold text-white disabled:opacity-50"
          >
            {busy
              ? "AGUARDE…"
              : mode === "inscricao"
                ? "CONFIRMAR INSCRIÇÃO"
                : mode === "etiqueta"
                  ? "RECUPERAR ETIQUETA"
                  : "CONSULTAR CERTIFICADO"}
          </button>
        </form>
      )}
      {message ? (
        <p role="status" className="mt-4 text-sm font-semibold text-[#063f78]">
          {message}
        </p>
      ) : null}
      {label ? (
        <div className="mt-5 rounded-xl border border-[#dbe5ef] bg-[#eef5fb] p-4 text-sm">
          <b className="block text-[#063f78]">{label.nome}</b>
          <span>
            {label.cidade} • inscrição {label.id.slice(0, 8).toUpperCase()}
          </span>
          {certificate ? (
            <button
              type="button"
              onClick={() => {
                void printConexaoMeiCertificate(label, certificate, partners).then((ok) => {
                  if (!ok)
                    setMessage(
                      "Não foi possível carregar as logos ou abrir a impressão do certificado.",
                    );
                });
              }}
              className="mt-3 block min-h-10 rounded-lg bg-[#063f78] px-4 py-2 font-bold text-white"
            >
              IMPRIMIR / SALVAR CERTIFICADO EM PDF
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                void printConexaoMeiLabel(label).then((ok) => {
                  if (!ok) setMessage("Permita pop-ups para imprimir a etiqueta.");
                })
              }
              className="mt-3 block min-h-10 rounded-lg bg-[#063f78] px-4 py-2 font-bold text-white"
            >
              IMPRIMIR ETIQUETA
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
