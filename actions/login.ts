"use server"

import * as z from 'zod'
import { LoginShcema } from '@/schema';
import { cookies } from 'next/headers';
import Token from '@/model/Token';
import jwt from 'jsonwebtoken';

import { createClient } from '@/utils/supabase/server'
import { getAllSaveArticle } from './savearticle';

export const login = async (values: z.infer<typeof LoginShcema>) => {
  try {
    const validatedFields = LoginShcema.safeParse(values)

    const supabase = createClient();

    if (!validatedFields.success) return { error: 'Invalid fields' }

    const { data, error } = await supabase.auth.signInWithPassword({ email: values.email, password: values.password })

    if (error) {
      return { error: error.message }
    }

    if (data.user?.app_metadata.twofa === 'true') {

      if (!process.env.TwoFA_URI) return { error: 'Missing process.env.TwoFA_URI' }

      const token = jwt.sign({
        id: data.user.id.toString(),
      },
        process.env.TwoFaSingIn_Uri!,
        { expiresIn: '2m' }
      )

      const newToken = new Token({ token })

      await newToken.save()

      cookies().set({ name: 'singTwoFA', value: token, httpOnly: true, sameSite: 'strict', path: '/', secure: true, maxAge: 2 * 60 })
      return { redirect: '2FA' };
    }

    const res = await getAllSaveArticle()
    const newsletter = await supabase.from('newsletter').select().eq('email', data.user?.email)

    return {success: { name: data.user?.user_metadata.name, email: data.user.email || '', saveArt: res.data || [], subscribe: newsletter.data?.length !== 0 ? true : false }}
  }
  catch (err) {
    console.log(err);
    return { error: 'Server error' }
  }
}


