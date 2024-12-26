'use server'
import { createClient } from '@/utils/supabase/server';

export const Confirm = async (token_hash: string, ) => {

  try {
    const supabase = createClient()
    if (token_hash) {
      const { data, error } = await supabase.auth.verifyOtp({
        type: 'signup',
        token_hash,
      })
      if (error) {
        return { error: 'Error in the confirm' }
      }

      await supabase.from('newsletter').update({ user_id: data.user?.id, name: data.user?.user_metadata.name }).eq('email', data.user?.email)

      return { success: 'Account is confirmed.' }

    }
    else { return { error: 'Error in the link.' } }

  }
  catch (err) {
    return { error: 'Server error' }
  }


}