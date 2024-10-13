"use server"

import * as z from 'zod'
import { LoginShcema } from '@/schema'

import { createClient } from '@/utils/supabase/server'

export const login = async (values: z.infer<typeof LoginShcema>) => {
  const validatedFields = LoginShcema.safeParse(values)
  
  const supabase = createClient();

  if(!validatedFields.success) return {error: 'Invalid fields'}

  const {data, error } = await supabase.auth.signInWithPassword({email: values.email, password: values.password})

  if (error) {
    return {error: error.message}
  }

  return {success: 'Sent email.'}

}


