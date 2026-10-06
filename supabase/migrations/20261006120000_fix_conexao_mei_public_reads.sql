-- Anonymous visitors may read only visible content; admin-only reads remain authenticated.
DROP POLICY "Read public or admin Conexao MEI documents" ON public.conexao_mei_documentos;
CREATE POLICY "Anonymous reads visible Conexao MEI documents" ON public.conexao_mei_documentos
FOR SELECT TO anon USING (visivel);
CREATE POLICY "Authenticated reads public or admin Conexao MEI documents" ON public.conexao_mei_documentos
FOR SELECT TO authenticated USING (visivel OR public.has_role(auth.uid(), 'admin'));

DROP POLICY "Read public or admin Conexao MEI partners" ON public.conexao_mei_parceiros;
CREATE POLICY "Anonymous reads visible Conexao MEI partners" ON public.conexao_mei_parceiros
FOR SELECT TO anon USING (visivel);
CREATE POLICY "Authenticated reads public or admin Conexao MEI partners" ON public.conexao_mei_parceiros
FOR SELECT TO authenticated USING (visivel OR public.has_role(auth.uid(), 'admin'));

DROP POLICY "Read public or admin Conexao MEI exhibitors" ON public.conexao_mei_expositores;
CREATE POLICY "Anonymous reads confirmed Conexao MEI exhibitors" ON public.conexao_mei_expositores
FOR SELECT TO anon USING (status = 'Confirmado');
CREATE POLICY "Authenticated reads public or admin Conexao MEI exhibitors" ON public.conexao_mei_expositores
FOR SELECT TO authenticated USING (status = 'Confirmado' OR public.has_role(auth.uid(), 'admin'));