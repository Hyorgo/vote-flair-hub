import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://psnxgyuomxstuzrqfcwy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzbnhneXVvbXhzdHV6cnFmY3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjI0MDAsImV4cCI6MjAyNTM5ODQwMH0.7kC1HH_jjVRKBMB4OMtI4YTxG4FhQWxgWZz_LHW4QcE';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey
  });
  throw new Error('Les informations de connexion Supabase sont manquantes. Veuillez vérifier les secrets du projet.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);