-- Tabela para Armazenamento de Dispositivos e Inscrições Push (Web Push)
create table if not exists public.push_subscriptions (
  id bigserial primary key,
  endpoint text unique not null,
  subscription_data jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela para Configurações e Templates de Notificações
create table if not exists public.notification_settings (
  id integer primary key default 1,
  settings jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Adicionar tabelas à publicação em tempo real do Supabase
alter publication supabase_realtime add table public.push_subscriptions;
alter publication supabase_realtime add table public.notification_settings;
