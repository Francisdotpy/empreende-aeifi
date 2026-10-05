import { useEffect, useState } from "react";
import { Card } from "@/components/site/ui";
import { formControlClassName } from "@/components/site/form-styles";
import { supabase } from "@/integrations/supabase/client";
import { claimAdmin } from "@/lib/admin.functions";
import type { Tables } from "@/integrations/supabase/types";

type Manifestacao = Tables<"conexao_mei_manifestacoes">;

export function ConexaoMeiAdmin() {
  const [destinatario, setDestinatario] = useState("");
  const [manifestacoes, setManifestacoes] = useState<Manifestacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const { admin } = await claimAdmin();
        if (!admin) throw new Error("Sem acesso administrativo.");
        const [config, list] = await Promise.all([
          supabase.from("conexao_mei_config").select("destinatario").eq("id", true).single(),
          supabase
            .from("conexao_mei_manifestacoes")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(50),
        ]);
        if (config.error || list.error) throw config.error ?? list.error;
        if (active) {
          setDestinatario(config.data.destinatario);
          setManifestacoes(list.data ?? []);
        }
      } catch {
        if (active) setLoadError(true);
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, []);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    const { error } = await supabase
      .from("conexao_mei_config")
      .update({ destinatario: destinatario.trim() })
      .eq("id", true);
    setMessage(error ? "Não foi possível salvar. Verifique seu acesso." : "Destinatário salvo.");
    setSaving(false);
  }

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-primary">Conexão MEI</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        As manifestações da página /conexaomei serão enviadas para o endereço abaixo.
      </p>
      {loading ? (
        <p className="mt-4 text-sm text-muted-foreground">Carregando…</p>
      ) : loadError ? (
        <p className="mt-4 text-sm text-destructive">
          Não foi possível carregar as configurações do Conexão MEI.
        </p>
      ) : (
        <>
          <form onSubmit={save} className="mt-5 flex flex-wrap items-end gap-3">
            <label className="grid min-w-[min(100%,20rem)] flex-1 gap-1.5 text-sm font-medium text-primary">
              E-mail destinatário
              <input
                type="email"
                required
                maxLength={254}
                value={destinatario}
                onChange={(event) => setDestinatario(event.target.value)}
                className={formControlClassName}
              />
            </label>
            <button
              type="submit"
              disabled={saving}
              className="min-h-11 rounded-lg bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground disabled:opacity-50"
            >
              {saving ? "Salvando…" : "Salvar destinatário"}
            </button>
          </form>
          {message ? (
            <p role="status" className="mt-3 text-sm text-muted-foreground">
              {message}
            </p>
          ) : null}
          <div className="mt-8 border-t border-border pt-6">
            <h3 className="font-display text-base font-semibold text-primary">
              Últimas manifestações
            </h3>
            {manifestacoes.length ? (
              <ul className="mt-4 grid gap-3">
                {manifestacoes.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-xl border border-border bg-muted/30 p-4 text-sm"
                  >
                    <div className="flex flex-wrap justify-between gap-2">
                      <p className="font-semibold text-primary">
                        {item.nome} · {item.modalidade}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.created_at).toLocaleString("pt-BR")} · {item.status}
                      </p>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      {item.empresa} · {item.cidade_uf}
                    </p>
                    <p className="mt-1 break-words text-muted-foreground">
                      {item.email} · {item.telefone}
                    </p>
                    <p className="mt-3 whitespace-pre-wrap break-words">{item.mensagem}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">Nenhuma manifestação registrada.</p>
            )}
          </div>
        </>
      )}
    </Card>
  );
}
