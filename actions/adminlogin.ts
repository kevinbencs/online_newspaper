"use server"

import * as z from 'zod';
import { LoginShcema } from '@/schema';
import Admin from '@/model/Admin';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import Token from '@/model/Token';


export const adminLogin = async (values: z.infer<typeof LoginShcema>) => {

  try {
    const validatedFields = LoginShcema.safeParse(values)

    if (!validatedFields.success) { return { error: 'Invalid fields' } }

    const email = values.email;
    const password = values.password;

    if (!process.env.SECRET_CODE) return { error: 'process.env.SECRET_CODE is missing' }

    const admin = await Admin.findOne({ email });
    if (!admin || !admin.hired) {

      return { error: "Account does not exist" }
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {

      return { error: "Invalid email or password. Please try again with the correct credentials." };
    }

    const token = jwt.sign({
      id: admin.id.toString(),
    },
      process.env.SECRET_CODE!,
      { expiresIn: '1h' }
    )

    cookies().set({ name: 'admin-log', value: token, httpOnly: true, sameSite: 'strict', path: '/', secure: true, maxAge: 60 * 59 * 1000 })
    const newToken = new Token({ token });

    await newToken.save();


    return { name: admin.name, role: admin.role }
  }
  catch (error) {
    console.log(error)
    return { error: "Server error" }
  }
}