import { createClient } from '@supabase/supabase-js';

import type { Database } from '@/types/supabase';
import { env, getSupabaseServiceRoleKey } from '@/lib/config';

export function createAdminClient() {
  return createClient<Database>(env.supabaseUrl, getSupabaseServiceRoleKey(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
