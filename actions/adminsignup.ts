"use server"

import * as z from 'zod'
import { AdminRegisterShcema } from '@/schema'
import Admin from '@/model/Admin'
import { hash } from 'bcrypt'
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"
import Token from '@/model/Token'

interface Decoded extends JwtPayload {
  id: string
}

export const adminSignUp = async (values: z.infer<typeof AdminRegisterShcema>) => {


  try {

    const Cookies = cookies().get('admin-log');
    if (!Cookies) return { error: 'Please sign in.' }

    const token = await Token.findOne({ token: Cookies.value })

    if (!token) {
      
      return { error: "PLease log in" };
    }

    const decoded = jwt.verify(Cookies.value, process.env.SECRET_CODE!) as Decoded;

    if (!decoded) {
      
      return { error: "PLease log in" };
    }

    const account = await Admin.findById(decoded.id,{role: 1})
    if (!account) {
      
      return { error: "PLease log in" };
    }

    if (account.role === 'Admin') {

      const validatedFields = AdminRegisterShcema.safeParse(values)

      if (!validatedFields.success) {
        
        return { failed: validatedFields.error.errors };
      }

      if(values.role !== 'Admin' && values.role !== 'Author' && values.role !== 'Editor') {
        return {error: 'Role must be Admin, Author or Editor.'}
      }

      const email = values.email;
      const password = values.password;
      const name = values.name;
      const role = values.role;
      const image = values.imageUrl

      /*let importance: number = 0;

      if(role === 'Admin') {
        importance = 1;
      }
      if(role === 'Editor'){
        importance = 2;
      }

      if(role === 'Author'){
        importance = 3;
      }

      const hashPassword = await hash(password, 12);
      const newAdmin = new Admin({ email, password: hashPassword, name, role, image, importance });

      await newAdmin.save();*/
      
      return { success: `${name} created successfully.` }
    }
    else {
      
      return { error: 'You do not have admin privileges.' }
    }
  }
  catch (error) {
    console.log(error)
    return { error: 'server error' }
  }
}