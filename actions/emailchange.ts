'use server'

import { EmailSchema } from "@/schema";
import { supabase } from "@/utils/supabase/article";
import * as z from 'zod'
import { createClient } from "@/utils/supabase/server";



export const emailChange = async (value: string) => {

    try {
        const data = await createClient().auth.verifyOtp({ token_hash: value, type: 'email_change' });

        await supabase.from('newsletter').update({email: data.data.user?.email}).eq('user_id', data.data.user?.id)

        if(data.data.user?.id) return {success: 'Email changed.'}
        else return {error: 'Token error.'}
    }
    catch (err) {
        return { error: 'Server error' }
    }
}