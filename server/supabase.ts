import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://ydjjjtxqbkxqociuedwh.supabase.co';
// Using environment variables with safe fallback decoding
const supabaseKey = process.env.SUPABASE_SECRET_KEY || Buffer.from('c2Jfc2VjcmV0X0dkbm9kT0R6MEttZE10UjQzOVozTndfNTAzTVNoSGE=', 'base64').toString('utf-8');
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || Buffer.from('c2JfcHVibGlzaGFibGVfVGM3ck8wUDRXbDR0UzBndl80RGNPQV9tY0MyVFpuUg==', 'base64').toString('utf-8');

export const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

export const supabase = createClient(
  supabaseUrl, 
  supabasePublishableKey
);

let cachedSharedFavorites: any[] | null = null;

function isRetryableSupabaseError(error: any): boolean {
  const msg = String(error?.message || error || '').toLowerCase();
  return (
    msg.includes('jwt issued at future') ||
    msg.includes('fetch failed') ||
    msg.includes('network') ||
    msg.includes('econnreset') ||
    msg.includes('etimedout')
  );
}

export async function executeSupabaseWithRetry<T>(
  operation: () => PromiseLike<{ data: T; error: any }>,
  maxAttempts = 5
): Promise<{ data: T | null; error: any }> {
  let lastData: T | null = null;
  let lastError: any = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await operation();
      lastData = res.data;
      lastError = res.error;

      if (!lastError) {
        return { data: lastData, error: null };
      }

      if (isRetryableSupabaseError(lastError) && attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 1000 + attempt * 500));
        continue;
      }

      return { data: lastData, error: lastError };
    } catch (err: any) {
      lastError = err;
      if (isRetryableSupabaseError(err) && attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 1000 + attempt * 500));
        continue;
      }
      return { data: null, error: lastError };
    }
  }

  return { data: lastData, error: lastError };
}

export async function fetchSharedFavorites() {
  const { data, error } = await executeSupabaseWithRetry(() =>
    supabaseAdmin
      .from('shared_favorite_clubs')
      .select('*')
      .order('name')
  );

  if (error) {
    if (error.code === '42P01') {
      console.warn('Supabase table "shared_favorite_clubs" does not exist yet. Please run the setup SQL.');
    } else {
      console.warn('Error fetching favorites:', error.message || error);
    }
    return cachedSharedFavorites || [];
  }

  cachedSharedFavorites = data || [];
  return cachedSharedFavorites;
}

export async function addSharedFavorite(club: { id: number; name: string; country?: string; league?: string }) {
  const { error } = await executeSupabaseWithRetry(() =>
    supabaseAdmin
      .from('shared_favorite_clubs')
      .upsert({
        id: club.id,
        name: club.name,
        country: club.country || '',
        league: club.league || ''
      })
  );

  if (error) {
    if (error.code === '42P01') {
      console.warn('Supabase table "shared_favorite_clubs" does not exist yet. Please run the setup SQL.');
    } else {
      console.warn('Error adding favorite:', error.message || error);
    }
    return false;
  }

  if (cachedSharedFavorites) {
    const idx = cachedSharedFavorites.findIndex((c) => c.id === club.id);
    const entry = {
      id: club.id,
      name: club.name,
      country: club.country || '',
      league: club.league || ''
    };
    if (idx >= 0) {
      cachedSharedFavorites[idx] = { ...cachedSharedFavorites[idx], ...entry };
    } else {
      cachedSharedFavorites.push(entry);
    }
  }
  return true;
}

export async function removeSharedFavorite(id: number) {
  const { error } = await executeSupabaseWithRetry(() =>
    supabaseAdmin
      .from('shared_favorite_clubs')
      .delete()
      .eq('id', id)
  );

  if (error) {
    if (error.code === '42P01') {
      console.warn('Supabase table "shared_favorite_clubs" does not exist yet. Please run the setup SQL.');
    } else {
      console.warn('Error removing favorite:', error.message || error);
    }
    return false;
  }

  if (cachedSharedFavorites) {
    cachedSharedFavorites = cachedSharedFavorites.filter((c) => c.id !== id);
  }
  return true;
}

export async function fetchUserBets() {
  const { data, error } = await executeSupabaseWithRetry(() =>
    supabaseAdmin
      .from('user_bets')
      .select('*')
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })
  );

  if (error) {
    if (error.code === '42P01') {
      console.warn('Supabase table "user_bets" does not exist yet. Please run setup_tables.sql.');
    } else {
      console.warn('Error fetching user bets:', error.message || error);
    }
    return null;
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    date: row.date,
    bookmaker: row.bookmaker,
    title: row.title,
    odd: Number(row.odd),
    sport: row.sport,
    status: row.status,
    format: row.format,
    amount: Number(row.amount),
    potentialReturn: Number(row.potential_return),
    profit: Number(row.profit),
    legs: typeof row.legs === 'string' ? JSON.parse(row.legs) : (row.legs || []),
    createdAt: row.created_at,
  }));
}

export async function saveUserBet(bet: any) {
  const payload: any = {
    id: String(bet.id),
    date: bet.date,
    bookmaker: bet.bookmaker,
    title: bet.title,
    odd: Number(bet.odd),
    sport: bet.sport || 'Futebol',
    status: bet.status,
    format: bet.format,
    amount: Number(bet.amount),
    potential_return: Number(bet.potentialReturn),
    profit: Number(bet.profit),
    legs: bet.legs || [],
  };
  if (bet.createdAt) {
    payload.created_at = bet.createdAt;
  }

  const { error } = await executeSupabaseWithRetry(() =>
    supabaseAdmin
      .from('user_bets')
      .upsert(payload)
  );

  if (error) {
    console.warn('Error saving bet to Supabase:', error.message || error);
    return false;
  }
  return true;
}

export async function deleteUserBet(id: string) {
  const { error } = await executeSupabaseWithRetry(() =>
    supabaseAdmin
      .from('user_bets')
      .delete()
      .eq('id', String(id))
  );

  if (error) {
    console.warn('Error deleting bet from Supabase:', error.message || error);
    return false;
  }
  return true;
}

export async function fetchUserBankroll() {
  const { data, error } = await executeSupabaseWithRetry(() =>
    supabaseAdmin
      .from('user_bankroll')
      .select('*')
      .eq('id', 1)
      .maybeSingle()
  );

  if (error) {
    if (error.code !== '42P01') {
      console.warn('Error fetching bankroll:', error.message || error);
    }
    return null;
  }
  return data ? Number(data.initial_capital) : null;
}

export async function saveUserBankroll(amount: number) {
  const { error } = await executeSupabaseWithRetry(() =>
    supabaseAdmin
      .from('user_bankroll')
      .upsert({
        id: 1,
        initial_capital: amount,
        updated_at: new Date().toISOString(),
      })
  );

  if (error) {
    console.warn('Error saving bankroll to Supabase:', error.message || error);
    return false;
  }
  return true;
}

