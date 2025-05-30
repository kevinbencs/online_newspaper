'use server'

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const loginGoogle = async () => {
    let Data;
    try {
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

        if (error) {
            throw new Error(error.message)
        }

        Data = data;

    } catch (error) {
        console.log(error)
        redirect(`/auth/auth-code-error`)
    }

    if (Data.url) {
        redirect(Data.url)
    }
    else {
        redirect(`/auth/auth-code-error`)
    }

}