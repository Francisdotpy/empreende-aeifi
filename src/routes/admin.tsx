import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { editableFields, siteContentQuery } from "@/content/useSite";
import { Card, PageHero, Section } from "@/components/site/ui";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Área administrativa — AEIFI" },
      {
        name: "description",
        content:
          "Área restrita da AEIFI para atualização das informações institucionais publicadas no site.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Área administrativa — AEIFI" },
      { property: "og:description", content: "Acesso restrito à equipe da AEIFI." },
    ],
  }),
  component: AdminPage,
});

const ADMIN_EMAIL = "aeififoz@gmail.com";

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Área restrita"
        title="Área administrativa"
        lead="Atualize aqui as informações institucionais que aparecem no site. O que for preenchido substitui automaticamente os marcadores de informação pendente."
      />
      <Section>
        {!ready ? (
          <p className="text-sm text-muted-foreground">Carregando…</p>
        ) : session ? (
          <Editor onSignOut={() => supabase.auth.signOut()} />
        ) : (
          <LoginForm />
        )}
      </Section>
    </>
  );
}

function LoginForm() {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    let { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError && signInError.message.toLowerCase().includes("invalid login")) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (!signUpError) {
        ({ error: signInError } = await supabase.auth.signInWithPassword({ email, password }));
      } else {
        signInError = signUpError;
      }
    }
    if (signInError) setError("Não foi possível entrar. Verifique o e-mail e a senha.");
    else await supabase.rpc("claim_admin");
    setLoading(false);
  }

  return (
    <Card className="mx-auto max-w-md">
      <h2 className="font-display text-xl font-semibold text-primary">Entrar</h2>
      <form className="mt-5 grid gap-4" onSubmit={submit}>
        <label className="grid gap-1.5 text-sm font-medium text-primary">
          E-mail
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm font-normal text-foreground"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-primary">
          Senha
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm font-normal text-foreground"
          />
        </label>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </Card>
  );
}

function Editor({ onSignOut }: { onSignOut: () => void }) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(siteContentQuery);
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setValues(data);
  }, [data]);

  useEffect(() => {
    supabase.rpc("claim_admin");
  }, []);

  const groups = useMemo(() => {
    const map = new Map<string, typeof editableFields>();
    for (const field of editableFields) {
      const list = map.get(field.group) ?? [];
      list.push(field);
      map.set(field.group, list);
    }
    return [...map.entries()];
  }, []);

  async function save() {
    setSaving(true);
    setStatus(null);
    const rows = editableFields.map((f) => ({ key: f.key, value: values[f.key] ?? "" }));
    const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
    setSaving(false);
    if (error) {
      setStatus("Não foi possível salvar. Verifique se você está com acesso de administrador.");
      return;
    }
    setStatus("Informações salvas e publicadas no site.");
    queryClient.invalidateQueries({ queryKey: ["site_content"] });
  }

  if (isLoading) return <p className="text-sm text-muted-foreground">Carregando informações…</p>;

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Campos deixados em branco continuam exibindo o marcador de informação pendente.
        </p>
        <button
          onClick={onSignOut}
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-primary hover:bg-muted"
        >
          Sair
        </button>
      </div>

      {groups.map(([group, fields]) => (
        <Card key={group}>
          <h2 className="font-display text-lg font-semibold text-primary">{group}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <label key={field.key} className="grid gap-1.5 text-sm font-medium text-primary">
                {field.label}
                {field.multiline ? (
                  <textarea
                    rows={3}
                    value={values[field.key] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm font-normal text-foreground"
                  />
                ) : (
                  <input
                    value={values[field.key] ?? ""}
                    onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm font-normal text-foreground"
                  />
                )}
              </label>
            ))}
          </div>
        </Card>
      ))}

      <div className="sticky bottom-4 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-lift">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Salvando…" : "Salvar e publicar"}
        </button>
        {status ? <span className="text-sm text-muted-foreground">{status}</span> : null}
      </div>
    </div>
  );
}
