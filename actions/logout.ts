"use server"
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function logout() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    cookies().delete('user-log-2fa')
    if (!error) return true;
    else false;
}