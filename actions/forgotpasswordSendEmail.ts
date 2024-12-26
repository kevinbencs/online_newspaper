import { createClient } from "@/utils/supabase/server"


export const forgotPasswordSendEmail = async (email: string) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/resetpassword',
      })
    if(error) return {error: 'Server error'}

    return {success: 'We sent an email.'}
}
