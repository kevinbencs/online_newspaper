import { createClient } from '@supabase/supabase-js';

export const supabase_admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SEBASE_ROLE!, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})