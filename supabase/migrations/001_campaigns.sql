-- ============================================================
-- ReciclaMT - Campanhas e Submissions
-- Migração para ser executada quando o Supabase estiver ativo
-- ============================================================

-- Tabela de campanhas (ex: Lixo Eletrônico, Plástico do Verão, etc.)
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE NOT NULL,
  points_per_kg INTEGER NOT NULL DEFAULT 25,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'finished')),
  materials_accepted TEXT[] DEFAULT '{}',
  start_date TIMESTAMPTZ DEFAULT now(),
  end_date TIMESTAMPTZ,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de submissions (fotos enviadas pelos usuários)
CREATE TABLE IF NOT EXISTS campaign_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  description TEXT,
  estimated_weight_kg NUMERIC(6,2),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  points_awarded INTEGER DEFAULT 0,
  rejection_reason TEXT,
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_submissions_campaign ON campaign_submissions(campaign_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user ON campaign_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON campaign_submissions(status);

-- Seed da primeira campanha: Lixo Eletrônico
INSERT INTO campaigns (name, description, slug, points_per_kg, status, materials_accepted, image_url)
VALUES (
  'Campanha Lixo Eletrônico',
  'Descarte seus eletrônicos de forma correta e ganhe pontos extras! Celulares, tablets, notebooks, carregadores, cabos, pilhas, baterias, fones de ouvido e monitores.',
  'lixo-eletronico',
  25,
  'active',
  ARRAY['Celulares', 'Tablets', 'Notebooks', 'Carregadores', 'Cabos', 'Pilhas', 'Baterias', 'Fones de ouvido', 'Monitores'],
  '/images/campanha-ewaste.png'
);

-- RLS (Row Level Security)
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_submissions ENABLE ROW LEVEL SECURITY;

-- Políticas: campanhas visíveis para todos
CREATE POLICY "Campanhas visíveis para todos" ON campaigns
  FOR SELECT USING (true);

-- Políticas: admin pode gerenciar campanhas
CREATE POLICY "Admin gerencia campanhas" ON campaigns
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );

-- Políticas: usuário pode ver suas próprias submissions
CREATE POLICY "Usuário vê suas submissions" ON campaign_submissions
  FOR SELECT USING (user_id = auth.uid());

-- Políticas: usuário pode criar submissions
CREATE POLICY "Usuário cria submission" ON campaign_submissions
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Políticas: admin pode ver e gerenciar todas as submissions
CREATE POLICY "Admin gerencia submissions" ON campaign_submissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'admin'
    )
  );
