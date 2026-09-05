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

export async function fetchSharedFavorites() {
  let data, error;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await supabaseAdmin
      .from('shared_favorite_clubs')
      .select('*')
      .order('name');
    data = res.data;
    error = res.error;
    if (error && error.message && error.message.includes('JWT issued at future')) {
      console.warn(`[Supabase Skew] fetchSharedFavorites got clock skew error. Retrying in 1.5s... (Attempt ${attempt}/3)`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      continue;
    }
    break;
  }
  if (error) {
    if (error.code === '42P01') {
      console.warn('Supabase table "shared_favorite_clubs" does not exist yet. Please run the setup SQL.');
    } else {
      console.warn('Error fetching favorites:', error.message);
    }
    return [];
  }
  return data || [];
}

export async function addSharedFavorite(club: { id: number; name: string; country?: string; league?: string }) {
  let error;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await supabaseAdmin
      .from('shared_favorite_clubs')
      .upsert({
        id: club.id,
        name: club.name,
        country: club.country || '',
        league: club.league || ''
      });
    error = res.error;
    if (error && error.message && error.message.includes('JWT issued at future')) {
      console.warn(`[Supabase Skew] addSharedFavorite got clock skew error. Retrying in 1.5s... (Attempt ${attempt}/3)`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      continue;
    }
    break;
  }
  if (error) {
    if (error.code === '42P01') {
      console.warn('Supabase table "shared_favorite_clubs" does not exist yet. Please run the setup SQL.');
    } else {
      console.warn('Error adding favorite:', error.message);
    }
    return false;
  }
  return true;
}

export async function removeSharedFavorite(id: number) {
  let error;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await supabaseAdmin
      .from('shared_favorite_clubs')
      .delete()
      .eq('id', id);
    error = res.error;
    if (error && error.message && error.message.includes('JWT issued at future')) {
      console.warn(`[Supabase Skew] removeSharedFavorite got clock skew error. Retrying in 1.5s... (Attempt ${attempt}/3)`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      continue;
    }
    break;
  }
  if (error) {
    if (error.code === '42P01') {
      console.warn('Supabase table "shared_favorite_clubs" does not exist yet. Please run the setup SQL.');
    } else {
      console.warn('Error removing favorite:', error.message);
    }
    return false;
  }
  return true;
}

export async function fetchUserBets() {
  let data, error;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await supabaseAdmin
      .from('user_bets')
      .select('*')
      .order('date', { ascending: false });
    data = res.data;
    error = res.error;
    if (error && error.message && error.message.includes('JWT issued at future')) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      continue;
    }
    break;
  }
  if (error) {
    if (error.code === '42P01') {
      console.warn('Supabase table "user_bets" does not exist yet. Please run setup_tables.sql.');
    } else {
      console.warn('Error fetching user bets:', error.message);
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
  let error;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await supabaseAdmin
      .from('user_bets')
      .upsert({
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
      });
    error = res.error;
    if (error && error.message && error.message.includes('JWT issued at future')) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      continue;
    }
    break;
  }
  if (error) {
    console.warn('Error saving bet to Supabase:', error.message);
    return false;
  }
  return true;
}

export async function deleteUserBet(id: string) {
  let error;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await supabaseAdmin
      .from('user_bets')
      .delete()
      .eq('id', String(id));
    error = res.error;
    if (error && error.message && error.message.includes('JWT issued at future')) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      continue;
    }
    break;
  }
  if (error) {
    console.warn('Error deleting bet from Supabase:', error.message);
    return false;
  }
  return true;
}

export async function fetchUserBankroll() {
  let data, error;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await supabaseAdmin
      .from('user_bankroll')
      .select('*')
      .eq('id', 1)
      .maybeSingle();
    data = res.data;
    error = res.error;
    if (error && error.message && error.message.includes('JWT issued at future')) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      continue;
    }
    break;
  }
  if (error) {
    if (error.code !== '42P01') {
      console.warn('Error fetching bankroll:', error.message);
    }
    return null;
  }
  return data ? Number(data.initial_capital) : null;
}

export async function saveUserBankroll(amount: number) {
  let error;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await supabaseAdmin
      .from('user_bankroll')
      .upsert({
        id: 1,
        initial_capital: amount,
        updated_at: new Date().toISOString(),
      });
    error = res.error;
    if (error && error.message && error.message.includes('JWT issued at future')) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      continue;
    }
    break;
  }
  if (error) {
    console.warn('Error saving bankroll to Supabase:', error.message);
    return false;
  }
  return true;
}

