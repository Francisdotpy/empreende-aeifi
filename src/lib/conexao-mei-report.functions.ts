import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getConexaoMeiReport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: unknown) =>
    z
      .object({
        etapa: z.string().regex(/^[a-z0-9-]{2,40}$/),
        filtro: z.enum(["todos", "presentes", "pendentes"]),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    const { data: admin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!admin) throw new Error("Acesso administrativo necessário.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { decryptConexaoMeiCpf } = await import("./conexao-mei-inscricoes.functions");
    const { data: stage, error: stageError } = await supabaseAdmin
      .from("conexao_mei_etapas")
      .select("cidade,data")
      .eq("slug", data.etapa)
      .single();
    if (stageError || !stage) throw new Error("Etapa não encontrada.");
    type Row = {
      id: string;
      nome: string;
      cpf_cifrado: string;
      whatsapp: string;
      created_at: string;
      presenca_confirmada: boolean;
    };
    const rows: Row[] = [];
    for (let offset = 0; ; offset += 1000) {
      let query = supabaseAdmin
        .from("conexao_mei_inscricoes")
        .select("id,nome,cpf_cifrado,whatsapp,created_at,presenca_confirmada")
        .eq("etapa_slug", data.etapa)
        .order("created_at", { ascending: true })
        .order("id")
        .range(offset, offset + 999);
      if (data.filtro !== "todos")
        query = query.eq("presenca_confirmada", data.filtro === "presentes");
      const result = await query;
      if (result.error) throw new Error("Não foi possível gerar o relatório.");
      rows.push(...(result.data ?? []));
      if (!result.data || result.data.length < 1000) break;
    }
    return {
      stage,
      rows: await Promise.all(
        rows.map(async (row) => ({
          id: row.id,
          nome: row.nome,
          cpf: await decryptConexaoMeiCpf(row.cpf_cifrado),
          whatsapp: row.whatsapp,
          createdAt: row.created_at,
          presente: row.presenca_confirmada,
        })),
      ),
    };
  });
