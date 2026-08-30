import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type NoticiaPublicada = Tables<"noticias">;
export type NoticiaStatus = NoticiaPublicada["status"];

export const noticiasPublicadasQuery = queryOptions({
  queryKey: ["noticias", "publicadas"],
  queryFn: async (): Promise<NoticiaPublicada[]> => {
    const { data, error } = await supabase
      .from("noticias")
      .select("*")
      .eq("status", "publicado")
      .order("data_noticia", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
  staleTime: 60_000,
});

export const noticiasAdminQuery = queryOptions({
  queryKey: ["noticias", "admin"],
  queryFn: async (): Promise<NoticiaPublicada[]> => {
    const { data, error } = await supabase
      .from("noticias")
      .select("*")
      .order("data_noticia", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
});

export function noticiaPublicadaPorSlugQuery(slug: string) {
  return queryOptions({
    queryKey: ["noticias", "publicadas", slug],
    queryFn: async (): Promise<NoticiaPublicada | null> => {
      const { data, error } = await supabase
        .from("noticias")
        .select("*")
        .eq("slug", slug)
        .eq("status", "publicado")
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 60_000,
  });
}

export function formatarDataNoticia(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(
    new Date(`${value}T12:00:00Z`),
  );
}

export function slugifyNoticia(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 140);
}

export function parseFonteLinks(value: string) {
  const links = value
    .split(/\r?\n/)
    .map((link) => link.trim())
    .filter(Boolean);

  for (const link of links) {
    let url: URL;
    try {
      url = new URL(link);
    } catch {
      throw new Error(`Link de fonte inválido: ${link}`);
    }
    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error(`O link de fonte deve começar com http:// ou https://: ${link}`);
    }
  }

  return [...new Set(links)];
}

export function fonteLabel(link: string) {
  try {
    return new URL(link).hostname.replace(/^www\./, "");
  } catch {
    return link;
  }
}

export function isSafeFonteLink(link: string) {
  try {
    return ["http:", "https:"].includes(new URL(link).protocol);
  } catch {
    return false;
  }
}
