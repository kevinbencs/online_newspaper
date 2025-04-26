"use server"
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers';
import Token from '@/model/Token';

export async function logout() {
    try {
        const supabase = createClient()
        const { error } = await supabase.auth.signOut();
        const Cookie = cookies().get('user-log-2fa');

        if (Cookie) {
            await Token.deleteOne({ token: Cookie.value })
        }
        cookies().delete('user-log-2fa')
        if (!error) return true;
        else return false;
    } catch (error) {
        console.log(error);
        return false
    }


}