-- SQL para inserir usuários de teste no Supabase
-- Execute este SQL no SQL Editor do seu projeto Supabase

-- Inserir usuários de teste
INSERT INTO users (name, email, phone, points, role, created_at) 
VALUES 
  ('Admin ReciclaMT', 'reciclamt.projeto@gmail.com', '65999999999', 0, 'admin', NOW()),
  ('Admin Teste', 'admin@example.com', '65999999998', 0, 'admin', NOW()),
  ('Usuário Teste', 'teste@reciclamt.com', '65999999997', 100, 'user', NOW())
ON CONFLICT (email) DO UPDATE SET 
  role = EXCLUDED.role,
  phone = EXCLUDED.phone,
  points = EXCLUDED.points;

-- Verificar se os usuários foram inseridos
SELECT name, email, phone, role, points FROM users WHERE email IN (
  'reciclamt.projeto@gmail.com', 
  'admin@example.com', 
  'teste@reciclamt.com'
);

