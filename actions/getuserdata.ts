'use server'

import { createClient } from "@/utils/supabase/server";
import { supabase } from "@/utils/supabase/article";

export const getUserData = async () => {
    try{
        const data = await createClient().auth.getUser();
        if(!data) return {error: 'Please sign in.'}

        const newsletter =  await supabase.from('newsletter').select().eq('email', data.data.user?.email)
        
        return {name: data.data.user?.user_metadata.name, email: data.data.user?.email, subscribe: newsletter.data?.length !== 0 ? true : false};
    }
    catch(err){
        return {error: 'Server error'}
    }
}