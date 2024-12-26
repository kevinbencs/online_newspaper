import { createClient } from "@/utils/supabase/server";

export const resetPassword = async (password: string) => {
    const supabase = createClient()
    const {data, error} = await supabase.auth.updateUser({
        password: password
    })
}