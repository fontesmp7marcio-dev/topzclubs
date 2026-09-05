-- Tabela para os Favoritos Compartilhados
create table if not exists public.shared_favorite_clubs (
  id bigint primary key,
  name text not null,
  country text,
  league text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela para o Balanço Financeiro / Entradas (Apostas)
create table if not exists public.user_bets (
  id text primary key,
  date text not null,
  bookmaker text not null,
  title text not null,
  odd numeric not null default 1.0,
  sport text default 'Futebol',
  status text not null default 'Pendente',
  format text default 'Simples',
  amount numeric not null default 0,
  potential_return numeric default 0,
  profit numeric default 0,
  legs jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tabela para o Capital Inicial da Banca
create table if not exists public.user_bankroll (
  id integer primary key default 1,
  initial_capital numeric not null default 26.00,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Inserir capital inicial padrão se não existir
insert into public.user_bankroll (id, initial_capital)
values (1, 26.00)
on conflict (id) do nothing;

-- Adicionar tabelas à publicação em tempo real do Supabase
alter publication supabase_realtime add table public.shared_favorite_clubs;
alter publication supabase_realtime add table public.user_bets;
alter publication supabase_realtime add table public.user_bankroll;

