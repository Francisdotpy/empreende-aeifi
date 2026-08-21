-- 1) has_role passa a SECURITY INVOKER (usa RLS do próprio usuário)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

-- 2) claim_admin deixa de ser exposto na API (passa a ser feito no servidor)
DROP FUNCTION IF EXISTS public.claim_admin();

-- 3) função de trigger não deve ser executável por clientes
REVOKE ALL ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;

-- 4) políticas explícitas no bucket privado "arquivos" (somente admin)
CREATE POLICY "Admins manage arquivos objects"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'arquivos' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'arquivos' AND public.has_role(auth.uid(), 'admin'));