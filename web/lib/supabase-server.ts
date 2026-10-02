// Server-only Supabase client (uses the secret service_role key).
// NEVER import this file from a "use client" component.
import "server-only";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

// Works with both naming styles: manual (SUPABASE_SERVICE_ROLE_KEY) and the
// Supabase↔Vercel integration (SUPABASE_SECRET_KEY / SUPABASE_URL).
export function serverKey(): string | undefined {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
}
function supabaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl() && serverKey());
}

export function db(): SupabaseClient {
  if (client) return client;
  const url = supabaseUrl();
  const key = serverKey();
  if (!url || !key) {
    throw new Error(
      "SUPABASE_NOT_CONFIGURED: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SECRET_KEY) in .env.local and in Vercel → Settings → Environment Variables"
    );
  }
  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
