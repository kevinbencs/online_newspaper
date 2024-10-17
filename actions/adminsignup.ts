"use server"

import * as z from 'zod'
import { AdminRegisterShcema } from '@/schema'
import Admin from '@/model/Admin'
import { hash } from 'bcrypt'
import mongoose from 'mongoose'
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"
import Token from '@/model/Token'

interface Decoded extends JwtPayload {
  id: string
}

async function connectToMongo() {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(process.env.MONGODB_URI!,); // A Mongoose kapcsolat létrehozása
    }
    catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw new Error('MongoDB connection failed');
    }
  }
}

export const adminSignUp = async (values: z.infer<typeof AdminRegisterShcema>) => {
  const validatedFields = AdminRegisterShcema.safeParse(values)

  if (!validatedFields.success) return { failed: validatedFields.error.errors }

  const email = values.email;
  const password = values.password;
  const name = values.name;
  const role = values.role;

  try {
    await connectToMongo();

    const Cookies = cookies().get('admin-log');

    if (!Cookies) return { error: 'Please sign in.' }

    const token = await Token.findOne({ token: Cookies.value })

    if (!token) return { error: 'Please sign in.' }

    const decoded = jwt.verify(Cookies.value, process.env.SECRET_CODE!) as Decoded;

    if (!decoded) return { error: 'Token error' }

    const account = await Admin.findById(decoded.id)

    if (account.role === 'admin') {

      const hashPassword = await hash(password, 12);

      const newAdmin = new Admin({ email, password: hashPassword, name, role });

      await newAdmin.save();

      return { success: `${name} created successfully.` }
    }
    else {
      return { error: 'You do not have admin privileges.' }
    }
  }
  catch (error) {

    return { error: 'server error' }
  }

}