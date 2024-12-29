'use server'

import { supabase } from "@/utils/supabase/article";
import * as z from 'zod'
import { createClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { tokenSchema } from "@/schema";



export const emailChange = async (value: z.infer<typeof tokenSchema>) => {

    try {
        const validatedFields = tokenSchema.safeParse(value);
        if(validatedFields.error) return {failed: validatedFields.error.errors}

        const token = value.token

        const data = await createClient().auth.verifyOtp({ token_hash: token, type: 'email_change' });
        const user: PostgrestSingleResponse<{email: string}[]> = await supabase.from('newsletter').select().eq('email', data.data.user?.id)
        await supabase.from('newsletter').update({email: data.data.user?.email}).eq('user_id', data.data.user?.id)
        if(user.data) await supabase.from('saveArticle').update({'user_email': data.data.user?.email}).eq('user_email', user.data[0].email)
        if(data.data.user?.id) return {success: 'Email changed.'}
        else return {error: 'Token error.'}
    }
    catch (err) {
        return { error: 'Server error' }
    }
}