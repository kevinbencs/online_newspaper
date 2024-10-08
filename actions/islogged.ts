'use server'

import { createClient } from "@/utils/supabase/server"

export const isLogged = async () => {
    const supabase = createClient();

    const {data, error} = await supabase.auth.getUser();

    if(data.user) return true;

    return false
}