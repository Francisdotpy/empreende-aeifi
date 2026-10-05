-- Conteúdo público e inscrições do Conexão MEI. Não altera as manifestações existentes.
CREATE TABLE public.conexao_mei_evento (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  data_destaque text NOT NULL DEFAULT '24 JUL',
  cidade_destaque text NOT NULL DEFAULT 'Foz do Iguaçu',
  ano_destaque text NOT NULL DEFAULT '2027',
  local_nome text NOT NULL DEFAULT '',
  local_endereco text NOT NULL DEFAULT '',
  local_complemento text NOT NULL DEFAULT '',
  exibir_local boolean NOT NULL DEFAULT true,
  whatsapp_numero text NOT NULL DEFAULT '',
  whatsapp_mensagem text NOT NULL DEFAULT 'Olá, quero informações sobre o Conexão MEI 2027',
  whatsapp_ativo boolean NOT NULL DEFAULT false,
  modulos jsonb NOT NULL DEFAULT '{"documentos":true,"parceiros":true,"expositores":true,"interesse":true}'::jsonb,
  assinante_nome text NOT NULL DEFAULT '',
  assinante_cargo text NOT NULL DEFAULT '',
  coordenador_nome text NOT NULL DEFAULT '',
  coordenador_cargo text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO public.conexao_mei_evento (id) VALUES (true);
CREATE TRIGGER conexao_mei_evento_updated_at BEFORE UPDATE ON public.conexao_mei_evento
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
ALTER TABLE public.conexao_mei_evento ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.conexao_mei_evento TO anon, authenticated;
GRANT UPDATE ON public.conexao_mei_evento TO authenticated;
GRANT ALL ON public.conexao_mei_evento TO service_role;
CREATE POLICY "Public reads Conexao MEI event" ON public.conexao_mei_evento
FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins update Conexao MEI event" ON public.conexao_mei_evento
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.conexao_mei_etapas (
  slug text PRIMARY KEY CHECK (slug ~ '^[a-z0-9-]+$'),
  ordem smallint NOT NULL UNIQUE,
  cidade text NOT NULL,
  rotulo text NOT NULL,
  data date NOT NULL,
  local_nome text NOT NULL DEFAULT '',
  endereco text NOT NULL DEFAULT '',
  programacao text NOT NULL DEFAULT '',
  inscricoes_abertas boolean NOT NULL DEFAULT false,
  certificados_liberados boolean NOT NULL DEFAULT false,
  carga_horaria text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO public.conexao_mei_etapas (slug, ordem, cidade, rotulo, data) VALUES
('missal', 1, 'Missal', '1ª etapa municipal', '2027-02-27'),
('itaipulandia', 2, 'Itaipulândia', '2ª etapa municipal', '2027-03-20'),
('medianeira', 3, 'Medianeira', '3ª etapa municipal', '2027-04-24'),
('saomiguel', 4, 'São Miguel do Iguaçu', '4ª etapa municipal', '2027-05-29'),
('santaterezinha', 5, 'Santa Terezinha de Itaipu', '5ª etapa municipal', '2027-06-26'),
('foz', 6, 'Foz do Iguaçu', 'Encontro Regional', '2027-07-24');
CREATE TRIGGER conexao_mei_etapas_updated_at BEFORE UPDATE ON public.conexao_mei_etapas
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
ALTER TABLE public.conexao_mei_etapas ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.conexao_mei_etapas TO anon, authenticated;
GRANT UPDATE ON public.conexao_mei_etapas TO authenticated;
GRANT ALL ON public.conexao_mei_etapas TO service_role;
CREATE POLICY "Public reads Conexao MEI stages" ON public.conexao_mei_etapas
FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins update Conexao MEI stages" ON public.conexao_mei_etapas
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.conexao_mei_inscricoes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  etapa_slug text NOT NULL REFERENCES public.conexao_mei_etapas(slug),
  nome text NOT NULL,
  cpf_hash text NOT NULL,
  cpf_cifrado text NOT NULL,
  whatsapp text NOT NULL,
  consentimento_em timestamptz NOT NULL,
  presenca_confirmada boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (etapa_slug, cpf_hash)
);
CREATE INDEX conexao_mei_inscricoes_etapa_idx ON public.conexao_mei_inscricoes (etapa_slug, created_at DESC);
CREATE TRIGGER conexao_mei_inscricoes_updated_at BEFORE UPDATE ON public.conexao_mei_inscricoes
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
ALTER TABLE public.conexao_mei_inscricoes ENABLE ROW LEVEL SECURITY;
GRANT SELECT, UPDATE, DELETE ON public.conexao_mei_inscricoes TO authenticated;
GRANT ALL ON public.conexao_mei_inscricoes TO service_role;
CREATE POLICY "Admins read Conexao MEI registrations" ON public.conexao_mei_inscricoes
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update Conexao MEI registrations" ON public.conexao_mei_inscricoes
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete Conexao MEI registrations" ON public.conexao_mei_inscricoes
FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.conexao_mei_documentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  tipo text NOT NULL,
  data_publicacao date,
  arquivo_path text NOT NULL,
  arquivo_nome text NOT NULL,
  visivel boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.conexao_mei_parceiros (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  categoria text NOT NULL CHECK (categoria IN ('realizacao','parceiro','apoio')),
  link text NOT NULL DEFAULT '',
  logo_path text NOT NULL,
  etapa_slug text REFERENCES public.conexao_mei_etapas(slug),
  visivel boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.conexao_mei_expositores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  segmento text NOT NULL,
  cidade text NOT NULL DEFAULT '',
  link text NOT NULL DEFAULT '',
  logo_path text NOT NULL,
  status text NOT NULL DEFAULT 'Pendente' CHECK (status IN ('Confirmado','Pendente','Oculto')),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.conexao_mei_documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conexao_mei_parceiros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conexao_mei_expositores ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.conexao_mei_documentos, public.conexao_mei_parceiros, public.conexao_mei_expositores TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.conexao_mei_documentos, public.conexao_mei_parceiros, public.conexao_mei_expositores TO authenticated;
GRANT ALL ON public.conexao_mei_documentos, public.conexao_mei_parceiros, public.conexao_mei_expositores TO service_role;
CREATE POLICY "Read public or admin Conexao MEI documents" ON public.conexao_mei_documentos
FOR SELECT TO anon, authenticated USING (visivel OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage Conexao MEI documents" ON public.conexao_mei_documentos
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Read public or admin Conexao MEI partners" ON public.conexao_mei_parceiros
FOR SELECT TO anon, authenticated USING (visivel OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage Conexao MEI partners" ON public.conexao_mei_parceiros
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Read public or admin Conexao MEI exhibitors" ON public.conexao_mei_expositores
FOR SELECT TO anon, authenticated USING (status = 'Confirmado' OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage Conexao MEI exhibitors" ON public.conexao_mei_expositores
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
