'use server'
import { createClient } from "@/utils/supabase/server";

export const resetPassword = async (password: string, confirmPassword: string) => {
    const supabase = createClient()
    const {data, error} = await supabase.auth.updateUser({
        password: password
    })
    console.log(data)
    if(error) {
        console.log(error)
        return{error: 'Server error'}
    }
    return{ success: 'Password changed'}
}