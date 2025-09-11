-- SQL para verificar e corrigir usuários na tabela
-- Execute este SQL no SQL Editor do Supabase

-- Verificar usuários existentes
SELECT id, name, email, phone, points, avatar_seed, role, created_at 
FROM users 
ORDER BY created_at DESC;

-- Se necessário, atualizar usuários existentes para garantir que tenham IDs consistentes
-- (Execute apenas se os usuários não tiverem IDs válidos)

-- Exemplo de como inserir usuários com IDs específicos se necessário:
-- DELETE FROM users WHERE email IN ('reciclamt.projeto@gmail.com', 'admin@example.com', 'teste@reciclamt.com');

-- INSERT INTO users (id, name, email, phone, points, role, created_at) 
-- VALUES 
--   (gen_random_uuid(), 'Admin ReciclaMT', 'reciclamt.projeto@gmail.com', '65999999999', 0, 'admin', NOW()),
--   (gen_random_uuid(), 'Admin Teste', 'admin@example.com', '65999999998', 0, 'admin', NOW()),
--   (gen_random_uuid(), 'Usuário Teste', 'teste@reciclamt.com', '65999999997', 100, 'user', NOW())
-- ON CONFLICT (email) DO UPDATE SET 
--   role = EXCLUDED.role,
--   phone = EXCLUDED.phone,
--   points = EXCLUDED.points;

