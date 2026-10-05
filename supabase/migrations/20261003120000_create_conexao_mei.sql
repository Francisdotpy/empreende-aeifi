CREATE TABLE public.conexao_mei_config (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  destinatario text NOT NULL CHECK (char_length(destinatario) <= 254),
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.conexao_mei_config (id, destinatario)
VALUES (true, 'aeififoz@gmail.com');

CREATE TRIGGER conexao_mei_config_updated_at
BEFORE UPDATE ON public.conexao_mei_config
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

ALTER TABLE public.conexao_mei_config ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE ON public.conexao_mei_config TO authenticated;
GRANT ALL ON public.conexao_mei_config TO service_role;
CREATE POLICY "Admins can read Conexao MEI settings" ON public.conexao_mei_config
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert Conexao MEI settings" ON public.conexao_mei_config
FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update Conexao MEI settings" ON public.conexao_mei_config
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.conexao_mei_manifestacoes (
  id uuid PRIMARY KEY,
  nome text NOT NULL,
  empresa text NOT NULL,
  telefone text NOT NULL,
  email text NOT NULL,
  cidade_uf text NOT NULL,
  modalidade text NOT NULL,
  mensagem text NOT NULL,
  destinatario text NOT NULL,
  status text NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'enviado', 'falhou')),
  resend_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX conexao_mei_manifestacoes_created_at_idx
ON public.conexao_mei_manifestacoes (created_at DESC);
CREATE TRIGGER conexao_mei_manifestacoes_updated_at
BEFORE UPDATE ON public.conexao_mei_manifestacoes
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

ALTER TABLE public.conexao_mei_manifestacoes ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.conexao_mei_manifestacoes TO authenticated;
GRANT ALL ON public.conexao_mei_manifestacoes TO service_role;
CREATE POLICY "Admins can read Conexao MEI submissions" ON public.conexao_mei_manifestacoes
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
