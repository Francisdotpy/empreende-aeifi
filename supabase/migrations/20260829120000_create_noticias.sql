CREATE TABLE public.noticias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  titulo text NOT NULL CHECK (length(trim(titulo)) BETWEEN 1 AND 180),
  subtitulo text NOT NULL CHECK (length(trim(subtitulo)) BETWEEN 1 AND 320),
  capa_url text NOT NULL,
  texto text NOT NULL CHECK (length(trim(texto)) BETWEEN 1 AND 50000),
  fontes text[] NOT NULL DEFAULT '{}',
  data_noticia date NOT NULL DEFAULT current_date,
  categoria text NOT NULL CHECK (length(trim(categoria)) BETWEEN 1 AND 80),
  status text NOT NULL DEFAULT 'rascunho' CHECK (status IN ('publicado', 'rascunho')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX noticias_publicacao_idx
  ON public.noticias (data_noticia DESC, created_at DESC);

GRANT SELECT ON public.noticias TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.noticias TO authenticated;
GRANT ALL ON public.noticias TO service_role;

ALTER TABLE public.noticias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published noticias are publicly visible"
ON public.noticias FOR SELECT TO anon, authenticated
USING (status = 'publicado');

CREATE POLICY "Admins can view all noticias"
ON public.noticias FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert noticias"
ON public.noticias FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update noticias"
ON public.noticias FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete noticias"
ON public.noticias FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER noticias_updated_at
BEFORE UPDATE ON public.noticias
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
