'use server'

import { createClient } from "@/utils/supabase/server";
import { supabase } from "@/utils/supabase/article";
import { updateUserSchema } from "@/schema";
import * as z from 'zod'


export const updateUser = async (value: z.infer<typeof updateUserSchema>) => {
    try {
        const data = await createClient().auth.getUser();
        if (!data) return { error: 'Please log in' };

        const validatedFields = updateUserSchema.safeParse(value);
        if (validatedFields.error) return { failed: validatedFields.error.errors };

        const newsletter = await supabase.from('newsletter').select().eq('email', data.data.user?.email)
        if (value.newsletter && newsletter.data?.length === 0) await supabase.from('newsletter').insert({ email: data.data.user?.email, name: data.data.user?.user_metadata.name, user_id: data.data.user?.id })
        if (!value.newsletter && newsletter.data && newsletter.data?.length > 0) await supabase.from('newsletter').delete().eq('email', data.data.user?.email)

        if (data.data.user?.user_metadata.name !== value.name) {
            await createClient().auth.updateUser({ data: { name: value.name } })
            if (value.newsletter) await supabase.from('newsletter').update({ name: value.name }).eq('email', data.data.user?.email);
        }

        if (data.data.user?.email !== value.email) { const data2 = await createClient().auth.updateUser({ email: value.email }) 
            if(data2.error) return {error: `Already registered an account with ${value.email}.`}
        }

        return { success: data.data.user?.email !== value.email ? 'We sent a confirm email.' : 'Success' }

    }
    catch (err) {
        return { error: 'Server error' }
    }
}