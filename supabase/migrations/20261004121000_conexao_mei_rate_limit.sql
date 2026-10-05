-- Contador atômico de tentativas públicas. A função só é chamada pelo servidor.
CREATE TABLE public.conexao_mei_rate_limits (
  scope text NOT NULL,
  subject_hash text NOT NULL,
  minute_bucket timestamptz NOT NULL,
  attempts integer NOT NULL DEFAULT 1,
  PRIMARY KEY (scope, subject_hash, minute_bucket)
);
ALTER TABLE public.conexao_mei_rate_limits ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.conexao_mei_rate_limits TO service_role;

CREATE OR REPLACE FUNCTION public.conexao_mei_allow_attempt(
  p_scope text, p_subject_hash text, p_limit integer
) RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE current_attempts integer;
BEGIN
  IF p_limit < 1 OR p_limit > 100 OR length(p_scope) > 40 OR length(p_subject_hash) > 128 THEN
    RETURN false;
  END IF;
  INSERT INTO public.conexao_mei_rate_limits (scope, subject_hash, minute_bucket, attempts)
  VALUES (p_scope, p_subject_hash, date_trunc('minute', now()), 1)
  ON CONFLICT (scope, subject_hash, minute_bucket)
  DO UPDATE SET attempts = conexao_mei_rate_limits.attempts + 1
  RETURNING attempts INTO current_attempts;
  RETURN current_attempts <= p_limit;
END;
$$;
REVOKE ALL ON FUNCTION public.conexao_mei_allow_attempt(text, text, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.conexao_mei_allow_attempt(text, text, integer) TO service_role;
