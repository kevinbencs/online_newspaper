"use server"


import { createClient } from '@/utils/supabase/server'
import * as z from 'zod';
import { RegisterShcema } from '@/schema';

export const Register = async (values: z.infer<typeof RegisterShcema>) => {
  try {
    const validatedFields = RegisterShcema.safeParse(values);

    if (!validatedFields.success) return { error: validatedFields.error.errors }

    const supabase = createClient()

    const { data: user, error } = await supabase.auth.signUp({
      email: values.email, password: values.password, options: {
        data: {
          name: values.name
        }
      }
    })

    if (error) {
      return { failed: error.message }
    }

    return { success: 'Thank you for registering with us. We sent an email to confirm.' }
  } catch (error) {
    console.log(error);
    return {failed: 'Server error'}
  }

}
