import { queryOptions } from "@tanstack/react-query";
import { supabase, tryGetSupabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Publicacao = Tables<"downloads_editais">;
export type PublicacaoStatus = Publicacao["status"];

export const publicacoesPublicadasQuery = queryOptions({
  queryKey: ["publicacoes", "publicadas"],
  queryFn: async (): Promise<Publicacao[]> => {
    try {
      const client = tryGetSupabase();
      if (!client) return [];
      const { data, error } = await client
        .from("downloads_editais")
        .select("*")
        .eq("status", "publicado")
        .order("data_publicacao", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    } catch (error) {
      console.error("[Supabase] Could not load public publications.", error);
      return [];
    }
  },
  staleTime: 60_000,
});

export const publicacoesAdminQuery = queryOptions({
  queryKey: ["publicacoes", "admin"],
  queryFn: async (): Promise<Publicacao[]> => {
    const { data, error } = await supabase
      .from("downloads_editais")
      .select("*")
      .order("data_publicacao", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
});

export function formatarDataPublicacao(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(
    new Date(`${value}T12:00:00Z`),
  );
}
