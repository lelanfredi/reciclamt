-- ============================================================
-- Migration: Campanha de Lixo Eletrônico - ewaste_submissions
-- Rodar no Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. Criar tabela de submissions de e-waste
CREATE TABLE IF NOT EXISTS public.ewaste_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_phone TEXT NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  photo_url TEXT NOT NULL,
  material_description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  points_awarded INTEGER NOT NULL DEFAULT 0,
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  campaign TEXT NOT NULL DEFAULT 'eletronicos-marco-2026',
  bot_conversation_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Índices para consultas frequentes
CREATE INDEX idx_ewaste_status ON public.ewaste_submissions(status);
CREATE INDEX idx_ewaste_user_phone ON public.ewaste_submissions(user_phone);
CREATE INDEX idx_ewaste_user_id ON public.ewaste_submissions(user_id);
CREATE INDEX idx_ewaste_campaign ON public.ewaste_submissions(campaign);
CREATE INDEX idx_ewaste_created_at ON public.ewaste_submissions(created_at DESC);

-- 3. RLS (Row Level Security)
ALTER TABLE public.ewaste_submissions ENABLE ROW LEVEL SECURITY;

-- Política: qualquer um pode inserir (para o webhook do Botpress via anon key)
CREATE POLICY "ewaste_insert_policy"
  ON public.ewaste_submissions
  FOR INSERT
  WITH CHECK (true);

-- Política: usuários autenticados podem ver suas próprias submissions
CREATE POLICY "ewaste_select_own"
  ON public.ewaste_submissions
  FOR SELECT
  USING (
    user_id = auth.uid()
    OR user_phone IN (SELECT phone FROM public.users WHERE id = auth.uid())
  );

-- Política: admins podem ver e atualizar tudo
-- (Nota: como não temos roles no auth, usamos a lista de emails admin)
-- Alternativa simples: permitir SELECT e UPDATE para authenticated
CREATE POLICY "ewaste_select_all_authenticated"
  ON public.ewaste_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "ewaste_update_authenticated"
  ON public.ewaste_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 4. Storage bucket para fotos (opcional - rodar se quiser usar Supabase Storage)
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('ewaste-photos', 'ewaste-photos', true)
-- ON CONFLICT (id) DO NOTHING;

-- 5. Comentários na tabela
COMMENT ON TABLE public.ewaste_submissions IS 'Registros de entrega de lixo eletrônico para validação';
COMMENT ON COLUMN public.ewaste_submissions.status IS 'pending = aguardando validação, approved = aprovado, rejected = rejeitado';
COMMENT ON COLUMN public.ewaste_submissions.campaign IS 'Identificador da campanha (ex: eletronicos-marco-2026)';
