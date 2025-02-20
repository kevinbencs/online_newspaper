'use server'

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const loginGoogle = async () => {
    const supabase = createClient();

    const redirectUrl = `${process.env.URL}/auth/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
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