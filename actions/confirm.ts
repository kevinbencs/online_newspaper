'use server'
import { createClient } from '@/utils/supabase/server';
import { supabase } from '@/utils/supabase/article';

export const Confirm = async (token_hash: string) => {

  if (token_hash) {
    try {
      const supabase = createClient()

      const { data, error } = await supabase.auth.verifyOtp({
        type: 'signup',
        token_hash,
      })
      if (error) {
        return { error: 'Error in the confirm' }
      }

      await supabase.from('newsletter').update({user_id: data.user?.id, name: data.user?.user_metadata.name}).eq('email', data.user?.email)

      return { success: 'Account is confirmed.' }
    }
    catch (err) {
      return { error: 'Server error' }
    }

  }
  else {
    return { error: 'Error in the link.' }
  }
}