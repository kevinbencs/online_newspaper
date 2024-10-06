"use server"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import * as z from 'zod';
import { RegisterShcema } from '@/schema';

export const Register = async (values: z.infer<typeof RegisterShcema>) => {
    const validatedFields = RegisterShcema.safeParse(values);

    if (!validatedFields.success) return {error: validatedFields.error.errors}

    const supabase = createClient()

    const { error } = await supabase.auth.signUp({email: values.email, password: values.password, options:{ 
      data: {
        user_metadat:{
          name: values.name
        }
      }
    }})
  
    if (error) {
      return {failed: error.message}
    }

    return {success: 'Thank you for registering with us. Your account has been successfully created.'}
}




//export async function Register(data: {name: string, email: string, password: string, privacy: boolean}) {
    
  
    // type-casting here for convenience
    // in practice, you should validate your inputs
    /*const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }*/
  
    //const { error } = await supabase.auth.signUp(data)
  
   //if (error) {
     // return {error: error.message}
      //redirect('/error')
    //}

   // return {success: 'Thank you for registering with us. Your account has been successfully created.'}

    /*revalidatePath('/', 'layout')
    redirect('/')*/
 // }