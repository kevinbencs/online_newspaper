"use server"

import * as z from 'zod'
import { LoginShcema } from '@/schema'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export const login = async (values: z.infer<typeof LoginShcema>) => {
    const validatedFields = LoginShcema.safeParse(values)
    const supabase = createClient()

    if(!validatedFields.success) return {error: 'Invalid fields'}

    const { error } = await supabase.auth.signInWithPassword({email: values.email, password: values.password})

  if (error) {
    return {error: error.message}
  }

    return {success: 'Sent email'}
}



//export async function login(data: {email: string, password: string}) {
  

  // type-casting here for convenience
  // in practice, you should validate your inputs
  /*const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }*/

  
  /*revalidatePath('/', 'layout')
  redirect('/')*/
//}

