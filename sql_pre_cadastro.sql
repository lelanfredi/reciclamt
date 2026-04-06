-- SQL para criar a tabela pre_cadastro no Supabase
-- Execute este SQL no SQL Editor do seu projeto Supabase

-- Criar a tabela pre_cadastro
CREATE TABLE IF NOT EXISTS pre_cadastro (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    neighborhood VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'active'
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_pre_cadastro_status ON pre_cadastro(status);
CREATE INDEX IF NOT EXISTS idx_pre_cadastro_neighborhood ON pre_cadastro(neighborhood);
CREATE INDEX IF NOT EXISTS idx_pre_cadastro_created_at ON pre_cadastro(created_at);

-- Habilitar Row Level Security (RLS)
ALTER TABLE pre_cadastro ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir inserção de dados anônimos (para o formulário)
CREATE POLICY "Permitir inserção anônima" ON pre_cadastro
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Criar política para permitir leitura de dados (apenas para usuários autenticados)
CREATE POLICY "Permitir leitura para usuários autenticados" ON pre_cadastro
    FOR SELECT
    TO authenticated
    USING (true);

-- Comentários para documentar a tabela
COMMENT ON TABLE pre_cadastro IS 'Tabela para captura de leads do pré-lançamento do ReciclaMT';
COMMENT ON COLUMN pre_cadastro.name IS 'Nome completo do usuário';
COMMENT ON COLUMN pre_cadastro.phone IS 'Número de telefone/WhatsApp';
COMMENT ON COLUMN pre_cadastro.neighborhood IS 'Bairro de Cuiabá onde o usuário reside';
COMMENT ON COLUMN pre_cadastro.status IS 'Status do cadastro (active, inactive, etc.)';
COMMENT ON COLUMN pre_cadastro.created_at IS 'Data e hora do cadastro';

-- Inserir alguns dados de exemplo (opcional)
INSERT INTO pre_cadastro (name, phone, neighborhood, status) VALUES
    ('João Silva', '(65) 99999-1111', 'Centro', 'active'),
    ('Maria Santos', '(65) 99999-2222', 'Porto', 'active'),
    ('Pedro Costa', '(65) 99999-3333', 'Araés', 'active')
ON CONFLICT DO NOTHING;
