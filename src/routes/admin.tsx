import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { editableFields, siteContentQuery } from "@/content/useSite";
import type { EditableField } from "@/content/useSite";
import { uploadSiteFile } from "@/lib/uploads.functions";
import { claimAdmin } from "@/lib/admin.functions";
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
    else await claimAdmin().catch(() => undefined);
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
            className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm font-normal text-foreground shadow-sm hover:border-primary/30 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-primary">
          Senha
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm font-normal text-foreground shadow-sm hover:border-primary/30 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </label>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
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
    claimAdmin().catch(() => undefined);
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
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-colors hover:border-primary/25 hover:bg-muted"
        >
          Sair
        </button>
      </div>

      <Card>
        <h2 className="font-display text-lg font-semibold text-primary">Textos das páginas</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Para reescrever qualquer texto do site, navegue até a página desejada com o seu login ativo e clique
          em <strong>“Editar textos da página”</strong>, no canto inferior esquerdo. Depois é só clicar sobre o
          trecho e digitar. Abaixo ficam registradas as alterações já feitas.
        </p>
        <CustomTexts data={data ?? {}} />
      </Card>

      {groups.map(([group, fields]) => (
        <Card key={group}>
          <h2 className="font-display text-lg font-semibold text-primary">{group}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <FieldEditor
                key={field.key}
                field={field}
                value={values[field.key] ?? ""}
                onChange={(next) => setValues((v) => ({ ...v, [field.key]: next }))}
              />
            ))}
          </div>
        </Card>
      ))}

      <div className="sticky bottom-4 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-lift">
        <button
          onClick={save}
          disabled={saving}
          className="rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground shadow-sm transition-all hover:bg-secondary/90 hover:shadow-md active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          {saving ? "Salvando…" : "Salvar e publicar"}
        </button>
        {status ? <span className="text-sm text-muted-foreground">{status}</span> : null}
      </div>
    </div>
  );
}

function FieldEditor({
  field,
  value,
  onChange,
}: {
  field: EditableField;
  value: string;
  onChange: (value: string) => void;
}) {
  const isUpload = field.kind === "file" || field.kind === "image";
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setUploadError(null);
    try {
      const buffer = await file.arrayBuffer();
      let binary = "";
      const bytes = new Uint8Array(buffer);
      for (let i = 0; i < bytes.length; i += 8192) {
        binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
      }
      const result = await uploadSiteFile({
        data: {
          name: file.name,
          contentType: file.type || "application/octet-stream",
          dataBase64: btoa(binary),
        },
      });
      onChange(result.url);
    } catch {
      setUploadError("Não foi possível enviar o arquivo. Tente um arquivo menor que 8 MB.");
    }
    setUploading(false);
  }

  if (isUpload) {
    return (
      <div className="grid gap-1.5 text-sm font-medium text-primary">
        <span>{field.label}</span>
        <input
          type="file"
          accept={field.kind === "image" ? "image/*" : "application/pdf,image/*"}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
          }}
          className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm font-normal text-foreground shadow-sm hover:border-primary/30 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
        />
        {uploading ? <span className="text-xs text-muted-foreground">Enviando…</span> : null}
        {uploadError ? <span className="text-xs text-destructive">{uploadError}</span> : null}
        {value ? (
          <span className="flex items-center gap-3 text-xs font-normal">
            <a href={value} target="_blank" rel="noopener noreferrer" className="text-secondary underline">
              Ver arquivo atual
            </a>
            <button type="button" onClick={() => onChange("")} className="text-destructive underline">
              Remover
            </button>
          </span>
        ) : (
          <span className="text-xs font-normal text-muted-foreground">Nenhum arquivo enviado.</span>
        )}
      </div>
    );
  }

  return (
    <label className="grid gap-1.5 text-sm font-medium text-primary">
      {field.label}
      {field.multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm font-normal text-foreground shadow-sm hover:border-primary/30 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm font-normal text-foreground shadow-sm hover:border-primary/30 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
        />
      )}
      {field.hint ? (
        <span className="text-xs font-normal text-muted-foreground">{field.hint}</span>
      ) : null}
    </label>
  );
}

function CustomTexts({ data }: { data: Record<string, string> }) {
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState<string | null>(null);

  const items = Object.entries(data)
    .filter(([key, value]) => key.startsWith("txt.") && value.trim())
    .map(([key, value]) => ({
      key,
      value,
      original: data[`src.${key.slice(4)}`] ?? "",
    }));

  async function reset(key: string) {
    setBusy(key);
    await supabase.from("site_content").upsert([{ key, value: "" }], { onConflict: "key" });
    await queryClient.invalidateQueries({ queryKey: ["site_content"] });
    setBusy(null);
  }

  if (items.length === 0) {
    return (
      <p className="mt-4 text-sm text-muted-foreground">
        Nenhum texto personalizado ainda. As alterações feitas na navegação aparecerão aqui.
      </p>
    );
  }

  return (
    <ul className="mt-4 grid gap-3">
      {items.map((item) => (
        <li key={item.key} className="rounded-xl border border-border bg-card p-4 shadow-sm">
          {item.original ? (
            <p className="text-xs text-muted-foreground line-through">{item.original}</p>
          ) : null}
          <p className="mt-1 text-sm text-foreground">{item.value}</p>
          <button
            type="button"
            disabled={busy === item.key}
            onClick={() => void reset(item.key)}
            className="mt-2 text-xs font-semibold text-destructive underline disabled:opacity-60"
          >
            {busy === item.key ? "Restaurando…" : "Restaurar texto original"}
          </button>
        </li>
      ))}
    </ul>
  );
}
