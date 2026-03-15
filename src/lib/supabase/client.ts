import { createBrowserClient } from '@supabase/ssr';

import type { Database } from '@/types/supabase';
import { env } from '@/lib/config';

export function createClient() {
  return createBrowserClient<Database>(env.supabaseUrl, env.supabaseAnonKey);
}
