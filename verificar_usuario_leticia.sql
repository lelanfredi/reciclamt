-- SQL para verificar o usuário leticialanfredi@gmail.com
-- Execute este SQL no SQL Editor do Supabase

-- 1. Verificar estrutura da tabela users
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;

-- 2. Verificar se o usuário existe
SELECT id, name, email, phone, points, avatar_seed, role, created_at 
FROM users 
WHERE email = 'leticialanfredi@gmail.com';

-- 3. Verificar todos os usuários para debug
SELECT id, name, email, phone, points, avatar_seed, role, created_at 
FROM users 
ORDER BY created_at DESC;

-- 4. Verificar se existe constraint única no email
SELECT constraint_name, constraint_type, column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_name = 'users' AND kcu.column_name = 'email';

-- 5. Se o usuário não existir, criar ele (sem ON CONFLICT por enquanto)
INSERT INTO users (id, name, email, phone, points, role, created_at) 
VALUES (
  gen_random_uuid(), 
  'leticia souza lanfredi', 
  'leticialanfredi@gmail.com', 
  '12996811965', 
  0, 
  'user', 
  NOW()
);
