-- ============================================================
-- ReciclaMT - Setup Completo do Banco de Dados
-- Execute este SQL no SQL Editor do Supabase
-- Projeto: https://hhpavmuiramxnbxeznfg.supabase.co
-- ============================================================

-- ============================================================
-- 1. TABELA: users
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  avatar_seed TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Qualquer usuário autenticado pode ler perfis
CREATE POLICY "Usuários podem ler perfis" ON users
  FOR SELECT USING (true);

-- Usuário pode atualizar seu próprio perfil
CREATE POLICY "Usuário atualiza próprio perfil" ON users
  FOR UPDATE USING (id = auth.uid());

-- Permitir insert para novos cadastros (via auth trigger ou app)
CREATE POLICY "Permitir insert de novos usuários" ON users
  FOR INSERT WITH CHECK (true);

-- Admin pode gerenciar todos os usuários
CREATE POLICY "Admin gerencia usuários" ON users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- ============================================================
-- 2. TABELA: recycling_activities
-- ============================================================
CREATE TABLE IF NOT EXISTS recycling_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  material_type TEXT NOT NULL,
  weight_kg NUMERIC(8,2) NOT NULL,
  points_earned INTEGER NOT NULL DEFAULT 0,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_recycling_user ON recycling_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_recycling_material ON recycling_activities(material_type);

ALTER TABLE recycling_activities ENABLE ROW LEVEL SECURITY;

-- Usuário vê suas próprias atividades
CREATE POLICY "Usuário vê suas atividades" ON recycling_activities
  FOR SELECT USING (user_id = auth.uid());

-- Usuário pode registrar atividades
CREATE POLICY "Usuário registra atividade" ON recycling_activities
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Admin pode ver todas as atividades
CREATE POLICY "Admin vê todas atividades" ON recycling_activities
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- ============================================================
-- 3. TABELA: rewards
-- ============================================================
CREATE TABLE IF NOT EXISTS rewards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  points_required INTEGER NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  available TEXT DEFAULT 'true' CHECK (available IN ('true', 'false', 'soon')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

-- Todos podem ver recompensas
CREATE POLICY "Recompensas visíveis para todos" ON rewards
  FOR SELECT USING (true);

-- Admin gerencia recompensas
CREATE POLICY "Admin gerencia recompensas" ON rewards
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- ============================================================
-- 4. TABELA: reward_redemptions
-- ============================================================
CREATE TABLE IF NOT EXISTS reward_redemptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reward_id UUID NOT NULL REFERENCES rewards(id) ON DELETE CASCADE,
  points_used INTEGER NOT NULL,
  redemption_code TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_redemptions_user ON reward_redemptions(user_id);
CREATE INDEX IF NOT EXISTS idx_redemptions_reward ON reward_redemptions(reward_id);
CREATE INDEX IF NOT EXISTS idx_redemptions_status ON reward_redemptions(status);

ALTER TABLE reward_redemptions ENABLE ROW LEVEL SECURITY;

-- Usuário vê suas próprias resgates
CREATE POLICY "Usuário vê seus resgates" ON reward_redemptions
  FOR SELECT USING (user_id = auth.uid());

-- Usuário pode criar resgate
CREATE POLICY "Usuário cria resgate" ON reward_redemptions
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Admin gerencia todos os resgates
CREATE POLICY "Admin gerencia resgates" ON reward_redemptions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- ============================================================
-- 5. TABELA: ecopoints
-- ============================================================
CREATE TABLE IF NOT EXISTS ecopoints (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude NUMERIC(10,6) NOT NULL,
  longitude NUMERIC(10,6) NOT NULL,
  accepted_materials TEXT[] DEFAULT '{}',
  operating_hours TEXT,
  contact_info TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ecopoints_active ON ecopoints(active);

ALTER TABLE ecopoints ENABLE ROW LEVEL SECURITY;

-- Todos podem ver ecopontos ativos
CREATE POLICY "Ecopontos visíveis para todos" ON ecopoints
  FOR SELECT USING (true);

-- Admin gerencia ecopontos
CREATE POLICY "Admin gerencia ecopontos" ON ecopoints
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- ============================================================
-- 6. TABELA: pre_cadastro
-- ============================================================
CREATE TABLE IF NOT EXISTS pre_cadastro (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'active'
);

ALTER TABLE pre_cadastro ENABLE ROW LEVEL SECURITY;

-- Qualquer um pode se pré-cadastrar
CREATE POLICY "Qualquer um faz pré-cadastro" ON pre_cadastro
  FOR INSERT WITH CHECK (true);

-- Admin pode ver pré-cadastros
CREATE POLICY "Admin vê pré-cadastros" ON pre_cadastro
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- ============================================================
-- 7. TABELA: campaigns
-- ============================================================
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

ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Campanhas visíveis para todos
CREATE POLICY "Campanhas visíveis para todos" ON campaigns
  FOR SELECT USING (true);

-- Admin gerencia campanhas
CREATE POLICY "Admin gerencia campanhas" ON campaigns
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- ============================================================
-- 8. TABELA: campaign_submissions
-- ============================================================
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

CREATE INDEX IF NOT EXISTS idx_submissions_campaign ON campaign_submissions(campaign_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user ON campaign_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON campaign_submissions(status);

ALTER TABLE campaign_submissions ENABLE ROW LEVEL SECURITY;

-- Usuário vê suas próprias submissions
CREATE POLICY "Usuário vê suas submissions" ON campaign_submissions
  FOR SELECT USING (user_id = auth.uid());

-- Usuário pode criar submission
CREATE POLICY "Usuário cria submission" ON campaign_submissions
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Admin gerencia todas as submissions
CREATE POLICY "Admin gerencia submissions" ON campaign_submissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- ============================================================
-- 9. FUNÇÃO RPC: increment_user_points
-- Usada pelo admin ao aprovar submissions de campanha
-- ============================================================
CREATE OR REPLACE FUNCTION increment_user_points(target_user_id UUID, points_to_add INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE users
  SET points = points + points_to_add,
      updated_at = now()
  WHERE id = target_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- 10. STORAGE BUCKET: campaign-photos
-- Para fotos enviadas via WhatsApp/Botpress
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('campaign-photos', 'campaign-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Política: qualquer um autenticado pode fazer upload
CREATE POLICY "Upload de fotos de campanha" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'campaign-photos');

-- Política: fotos são públicas para leitura
CREATE POLICY "Fotos de campanha públicas" ON storage.objects
  FOR SELECT USING (bucket_id = 'campaign-photos');

-- ============================================================
-- 11. SEED DATA
-- ============================================================

-- Seed: Campanha Lixo Eletrônico
INSERT INTO campaigns (name, description, slug, points_per_kg, status, materials_accepted, image_url)
VALUES (
  'Campanha Lixo Eletrônico',
  'Descarte seus eletrônicos de forma correta e ganhe pontos extras! Celulares, tablets, notebooks, carregadores, cabos, pilhas, baterias, fones de ouvido e monitores.',
  'lixo-eletronico',
  25,
  'active',
  ARRAY['Celulares', 'Tablets', 'Notebooks', 'Carregadores', 'Cabos', 'Pilhas', 'Baterias', 'Fones de ouvido', 'Monitores'],
  '/images/campanha-ewaste.png'
)
ON CONFLICT (slug) DO NOTHING;

-- Seed: Recompensas
INSERT INTO rewards (name, description, points_required, category, image_url, available) VALUES
  ('Desconto em Supermercado', 'Cupom de 10% de desconto em compras acima de R$100 no Supermercado Verde', 500, 'Descontos', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80', 'true'),
  ('Ingresso para Cinema', 'Um ingresso para qualquer sessão no CineMT', 800, 'Entretenimento', 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&q=80', 'true'),
  ('Muda de Árvore Nativa', 'Uma muda de árvore nativa do cerrado para plantar', 300, 'Sustentabilidade', 'https://images.unsplash.com/photo-1636826874099-8f5f3af30d3c?w=400&q=80', 'true'),
  ('Curso de Compostagem', 'Acesso ao curso online de compostagem doméstica', 450, 'Educação', 'https://images.unsplash.com/photo-1582560475093-ba66accbc095?w=400&q=80', 'true'),
  ('Garrafa Reutilizável', 'Garrafa de água ecológica feita de materiais reciclados', 600, 'Produtos', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80', 'true'),
  ('Voucher para Restaurante', 'Voucher de R$50 para o Restaurante Sustentável', 1000, 'Alimentação', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80', 'true')
ON CONFLICT DO NOTHING;

-- Seed: Ecopontos
INSERT INTO ecopoints (name, address, latitude, longitude, accepted_materials, operating_hours, contact_info, active) VALUES
  ('Ecoponto Piloto - Câmara Municipal de Cuiabá', 'Praça Barão de Melgaço, s/n - Centro, Cuiabá - MT, 78020-400', -15.6014, -56.0979, ARRAY['Plástico', 'Papel', 'Vidro', 'Metal'], 'Segunda a Sexta: 8h às 17h', 'Telefone: (65) 3313-6000', true),
  ('Ecoponto Shopping Cuiabá', 'Av. Miguel Sutil, 8000 - Consil, Cuiabá - MT', -15.5989, -56.0949, ARRAY['Plástico', 'Papel', 'Eletrônicos'], 'Segunda a Sábado: 10h às 22h, Domingo: 14h às 20h', 'Telefone: (65) 3027-8000', true),
  ('Ecoponto Pantanal Shopping', 'Av. Fernando Corrêa da Costa, 1555 - Boa Esperança, Cuiabá - MT', -15.5611, -56.0731, ARRAY['Plástico', 'Papel', 'Vidro', 'Metal', 'Eletrônicos'], 'Segunda a Sábado: 10h às 22h, Domingo: 14h às 20h', 'Telefone: (65) 3025-2000', true)
ON CONFLICT DO NOTHING;

-- ============================================================
-- PRONTO! Todas as tabelas, políticas, funções e dados iniciais
-- foram criados com sucesso.
-- ============================================================
