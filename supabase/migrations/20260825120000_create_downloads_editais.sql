CREATE TABLE public.downloads_editais (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL CHECK (length(trim(titulo)) BETWEEN 1 AND 180),
  imagem_url text NOT NULL,
  pdf_url text NOT NULL,
  data_publicacao date NOT NULL DEFAULT current_date,
  status text NOT NULL DEFAULT 'rascunho' CHECK (status IN ('publicado', 'rascunho')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX downloads_editais_publicacao_idx
  ON public.downloads_editais (data_publicacao DESC, created_at DESC);

GRANT SELECT ON public.downloads_editais TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.downloads_editais TO authenticated;
GRANT ALL ON public.downloads_editais TO service_role;

ALTER TABLE public.downloads_editais ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published editais are publicly visible"
ON public.downloads_editais FOR SELECT TO anon, authenticated
USING (status = 'publicado');

CREATE POLICY "Admins can view all editais"
ON public.downloads_editais FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert editais"
ON public.downloads_editais FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update editais"
ON public.downloads_editais FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete editais"
ON public.downloads_editais FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER downloads_editais_updated_at
BEFORE UPDATE ON public.downloads_editais
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
