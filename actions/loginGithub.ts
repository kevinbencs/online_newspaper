'use server'

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const loginGithub = async () => {
  const supabase = createClient();

  const redirectUrl = 'https://online-newspaper.vercel.app/auth/callback';

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
      redirectTo: redirectUrl,
    },
  })

  if (data.url) {
    redirect(data.url) 
  }
}