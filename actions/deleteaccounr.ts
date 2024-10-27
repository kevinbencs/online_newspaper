'use server'

import { createClient } from "@/utils/supabase/server";

export const deleteAccount = async () => {
    try{
        const supabase = createClient();
        const data = await supabase.auth.getUser()
        if(data.data.user) {
            await supabase.auth.signOut();
            await supabase.auth.admin.deleteUser(data.data.user.id);
            return {success: 'Success'};
        }
        else return {error: 'Please log in'}
    }
    catch(err){
        return {error: 'Server error'}
    }
}