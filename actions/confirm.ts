'use server'
import { createClient } from '@/utils/supabase/server';
import * as z from 'zod'
import { tokenSchema } from '@/schema';

export const Confirm = async (value: z.infer<typeof tokenSchema>) => {

  try {

    const validateFields = tokenSchema.safeParse(value)
    if(validateFields.error) return {failed: validateFields.error.errors}

    const token_hash = value.token
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