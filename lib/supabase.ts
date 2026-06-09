import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  )
}

// SQL para criar a tabela de vendas no Supabase:
// CREATE TABLE vendas (
//   id TEXT PRIMARY KEY,
//   valor NUMERIC NOT NULL,
//   campanha_id TEXT NOT NULL,
//   conjunto_id TEXT NOT NULL,
//   anuncio_id TEXT NOT NULL,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
