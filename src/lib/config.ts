function requireEnv(name: string, value: string | undefined): string {
  if (!value || value.trim().length === 0) {
    throw new Error(`[config] Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  get supabaseUrl() {
    return requireEnv('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL);
  },
  get supabaseAnonKey() {
    return requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  },
  get appUrl() {
    return process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  },
};

export function getSupabaseServiceRoleKey(): string {
  return requireEnv('SUPABASE_SERVICE_ROLE_KEY', process.env.SUPABASE_SERVICE_ROLE_KEY);
}
