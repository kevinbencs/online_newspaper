'use server'

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const loginFacebook = async () => {
    const supabase = createClient();

    const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
            queryParams: {
              access_type: 'offline',
              prompt: 'consent',
            },
            redirectTo: 'http://localhost:3000/auth/callback',
          },
    })

    if (data.url) {
      redirect(data.url) // use the redirect API for your server framework
    }
}