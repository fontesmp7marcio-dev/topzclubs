-- ====================================================================
-- SCRIPT SQL PARA O SUPABASE: BALANÇO FINANCEIRO (TOPZCLUBS)
-- Execute este script no SQL Editor do seu Supabase Dashboard
-- ====================================================================

-- 1. Criação da tabela de apostas (apostas)
CREATE TABLE IF NOT EXISTS public.apostas (
    id TEXT PRIMARY KEY,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    bookmaker TEXT NOT NULL DEFAULT 'Betano',
    title TEXT NOT NULL,
    odd NUMERIC(10, 3) NOT NULL DEFAULT 1.000,
    sport TEXT NOT NULL DEFAULT 'Futebol',
    status TEXT NOT NULL DEFAULT 'Pendente', -- 'Pendente', 'Ganha', 'Perdida', 'Reembolsada', 'Cancelada'
    format TEXT NOT NULL DEFAULT 'Simples',  -- 'Simples', 'Múltipla'
    amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    potential_return NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    profit NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para consultas rápidas por data e status
CREATE INDEX IF NOT EXISTS idx_apostas_date ON public.apostas (date DESC);
CREATE INDEX IF NOT EXISTS idx_apostas_status ON public.apostas (status);

-- 2. Criação da tabela de configuração de banca (banca_config)
CREATE TABLE IF NOT EXISTS public.banca_config (
    id TEXT PRIMARY KEY DEFAULT 'default',
    initial_capital NUMERIC(12, 2) NOT NULL DEFAULT 26.00,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Inserir valor padrão de banca caso não exista
INSERT INTO public.banca_config (id, initial_capital, updated_at)
VALUES ('default', 26.00, NOW())
ON CONFLICT (id) DO NOTHING;

-- 3. Habilitar RLS (Row Level Security) e permitir acesso com a chave Anon
ALTER TABLE public.apostas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banca_config ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso para tabela apostas
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'apostas' AND policyname = 'Apostas public select'
    ) THEN
        CREATE POLICY "Apostas public select" ON public.apostas FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'apostas' AND policyname = 'Apostas public insert'
    ) THEN
        CREATE POLICY "Apostas public insert" ON public.apostas FOR INSERT WITH CHECK (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'apostas' AND policyname = 'Apostas public update'
    ) THEN
        CREATE POLICY "Apostas public update" ON public.apostas FOR UPDATE USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'apostas' AND policyname = 'Apostas public delete'
    ) THEN
        CREATE POLICY "Apostas public delete" ON public.apostas FOR DELETE USING (true);
    END IF;
END $$;

-- Políticas de acesso para tabela banca_config
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'banca_config' AND policyname = 'Banca config public select'
    ) THEN
        CREATE POLICY "Banca config public select" ON public.banca_config FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'banca_config' AND policyname = 'Banca config public all'
    ) THEN
        CREATE POLICY "Banca config public all" ON public.banca_config FOR ALL USING (true);
    END IF;
END $$;
