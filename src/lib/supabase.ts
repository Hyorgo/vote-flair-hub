import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://psnxgyuomxstuzrqfcwy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzbnhneXVvbXhzdHV6cnFmY3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MzA5MzAsImV4cCI6MjA1MDIwNjkzMH0.mdJ2LsqiRlsU3ngJ69YWLiKe65hA9xDeejagwDzuJZs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
});