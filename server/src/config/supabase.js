import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseUrl.startsWith('https://') &&
  supabaseKey &&
  supabaseKey !== 'your-supabase-service-role-key' &&
  supabaseKey !== 'your-supabase-anon-key'
);

export let supabase = null;

if (isSupabaseConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    console.log('✅ Connecté avec succès à la base Supabase PostgreSQL');
  } catch (error) {
    console.warn('⚠️ Erreur lors de l\'initialisation de Supabase client:', error.message);
  }
} else {
  console.log('ℹ️ Supabase non configuré dans .env. Mode démo actif (données en mémoire avec persistance locale).');
}
