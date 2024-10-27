'use server'

import { supabase } from "@/utils/supabase/article";
import * as z from 'zod';
import { SubscribeSchema } from "@/schema";
import { createClient } from "@/utils/supabase/server";


export const subscribe = async (value: z.infer<typeof SubscribeSchema> ) => {
    const validatedFields = SubscribeSchema.safeParse(value);
    if(validatedFields.error) return {error: validatedFields.error.errors};

    try{
        const {data, error} = await supabase.from('newsletter').insert({
            email: value.email,
            name: value.name
        })

        if (error) return {failed: 'Server error.'}

        return {success: 'Success'}
    }
    catch(err){
        return {failed: 'Server error.'}
    }
}



export const subscribeUser = async () => {

    try{
        const dataUser = await createClient().auth.getUser();

        if(!dataUser) return {failed: 'Please sign in.'};

        const {data, error} = await supabase.from('newsletter').insert({
            email: dataUser.data.user?.email,
            name: dataUser.data.user?.user_metadata.name
        })

        if (error) return {failed: 'Server error.'}

        return {success: 'Success'}
    }
    catch(err){
        return {failed: 'Server error.'}
    }
}