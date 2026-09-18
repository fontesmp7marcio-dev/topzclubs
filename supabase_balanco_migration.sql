-- ====================================================================
-- MIGRATION SQL FINAL E SEGURA: BALANÇO FINANCEIRO (TOPZCLUBS)
-- TABELA OFICIAL ÚNICA: public.user_bets e public.user_bankroll
-- NÃO UTILIZA DROP TABLE / NÃO UTILIZA TRUNCATE / NÃO APAGA DADOS
-- ====================================================================

-- 1. Garantir que a tabela oficial única (user_bets) exista
CREATE TABLE IF NOT EXISTS public.user_bets (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    date TEXT NOT NULL,
    bookmaker TEXT NOT NULL DEFAULT 'Betano',
    title TEXT NOT NULL,
    odd NUMERIC(10, 3) NOT NULL DEFAULT 1.000,
    sport TEXT NOT NULL DEFAULT 'Futebol',
    status TEXT NOT NULL DEFAULT 'Pendente',
    format TEXT NOT NULL DEFAULT 'Simples',
    amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    potential_return NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    profit NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    legs JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Garantir existência e compatibilidade da coluna legs JSONB
ALTER TABLE public.user_bets ADD COLUMN IF NOT EXISTS legs JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.user_bets ADD COLUMN IF NOT EXISTS user_id TEXT;
ALTER TABLE public.user_bets ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- 3. Índices de alta performance para busca e filtros rápidos
CREATE INDEX IF NOT EXISTS idx_user_bets_date ON public.user_bets (date DESC);
CREATE INDEX IF NOT EXISTS idx_user_bets_status ON public.user_bets (status);
CREATE INDEX IF NOT EXISTS idx_user_bets_user_id ON public.user_bets (user_id);

-- 4. Tabela de configuração do Capital da Banca (user_bankroll)
CREATE TABLE IF NOT EXISTS public.user_bankroll (
    id INTEGER PRIMARY KEY DEFAULT 1,
    initial_capital NUMERIC(12, 2) NOT NULL DEFAULT 26.00,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Inserir valor inicial padrão caso a tabela esteja vazia
INSERT INTO public.user_bankroll (id, initial_capital, updated_at)
VALUES (1, 26.00, NOW())
ON CONFLICT (id) DO NOTHING;

-- 5. Migração segura de dados da tabela legada "apostas" para "user_bets" (caso ela exista)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'apostas') THEN
        INSERT INTO public.user_bets (
            id, date, bookmaker, title, odd, sport, status, format, 
            amount, potential_return, profit, legs, created_at, updated_at
        )
        SELECT 
            id, 
            date::text, 
            bookmaker, 
            title, 
            odd, 
            sport, 
            status, 
            format, 
            amount, 
            potential_return, 
            profit, 
            COALESCE(legs, '[]'::jsonb), 
            created_at, 
            updated_at
        FROM public.apostas
        ON CONFLICT (id) DO UPDATE SET
            legs = EXCLUDED.legs,
            status = EXCLUDED.status,
            profit = EXCLUDED.profit,
            updated_at = NOW();
    END IF;
END $$;

-- 6. Configuração de RLS (Row Level Security) Segura e Não-Bloqueante
ALTER TABLE public.user_bets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bankroll ENABLE ROW LEVEL SECURITY;

-- Políticas de Acesso para public.user_bets (suporta auth ou anon sem travar)
DO $$
BEGIN
    DROP POLICY IF EXISTS "user_bets_select_policy" ON public.user_bets;
    DROP POLICY IF EXISTS "user_bets_insert_policy" ON public.user_bets;
    DROP POLICY IF EXISTS "user_bets_update_policy" ON public.user_bets;
    DROP POLICY IF EXISTS "user_bets_delete_policy" ON public.user_bets;

    CREATE POLICY "user_bets_select_policy" ON public.user_bets
        FOR SELECT
        USING (
            (auth.uid() IS NULL) OR 
            (user_id IS NULL) OR 
            (user_id = auth.uid()::text)
        );

    CREATE POLICY "user_bets_insert_policy" ON public.user_bets
        FOR INSERT
        WITH CHECK (
            (auth.uid() IS NULL) OR 
            (user_id IS NULL) OR 
            (user_id = auth.uid()::text)
        );

    CREATE POLICY "user_bets_update_policy" ON public.user_bets
        FOR UPDATE
        USING (
            (auth.uid() IS NULL) OR 
            (user_id IS NULL) OR 
            (user_id = auth.uid()::text)
        );

    CREATE POLICY "user_bets_delete_policy" ON public.user_bets
        FOR DELETE
        USING (
            (auth.uid() IS NULL) OR 
            (user_id IS NULL) OR 
            (user_id = auth.uid()::text)
        );
END $$;

-- Políticas de Acesso para public.user_bankroll
DO $$
BEGIN
    DROP POLICY IF EXISTS "user_bankroll_select_policy" ON public.user_bankroll;
    DROP POLICY IF EXISTS "user_bankroll_all_policy" ON public.user_bankroll;

    CREATE POLICY "user_bankroll_select_policy" ON public.user_bankroll
        FOR SELECT USING (true);

    CREATE POLICY "user_bankroll_all_policy" ON public.user_bankroll
        FOR ALL USING (true);
END $$;

-- 7. Adicionar tabelas à publicação Realtime do Supabase de forma segura
DO $$
BEGIN
    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.user_bets;
    EXCEPTION WHEN duplicate_object THEN
        -- já está na publicação
    END;

    BEGIN
        ALTER PUBLICATION supabase_realtime ADD TABLE public.user_bankroll;
    EXCEPTION WHEN duplicate_object THEN
        -- já está na publicação
    END;
END $$;

