'use server'

import { createClient } from "@/utils/supabase/server";
import { supabase_admin } from "@/utils/supabase/admin";
import { supabase } from "@/utils/supabase/article";

export const deleteAccount = async () => {
    try{
        const supabase_user = createClient();
        const data = await supabase_user.auth.getUser()
        if(data.data.user) {
            await supabase_user.auth.signOut();
            await supabase.from('nesletter').update({user_id: ''}).eq('email', data.data.user.email)
            await supabase_admin.auth.admin.deleteUser(data.data.user.id);
            return {success: 'Success'};
        }
        else return {error: 'Please log in'}
    }
    catch(err){
        return {error: 'Server error'}
    }
}