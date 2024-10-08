import { type EmailOtpType } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server'

export const Confirm = async (token_hash: string, type2: string) => {
    const type = type2 as EmailOtpType | null;

    if (token_hash && type) {
        const supabase = createClient()
    
        const { error } = await supabase.auth.verifyOtp({
          type,
          token_hash,
        })
        if (!error) {
          
          return {error: 'Error in the confirm'}
        }

        return{success: 'Account is confirmed.'}
    }
    else{
        return {error: 'Error in the link.'}
    }
}