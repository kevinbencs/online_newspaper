"use server"

import * as z from 'zod';
import { LoginShcema } from '@/schema';
import Admin from '@/model/Admin';
import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import Token from '@/model/Token';


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

export const adminLogin = async (values: z.infer<typeof LoginShcema>) => {
  const validatedFields = LoginShcema.safeParse(values)

  if (!validatedFields.success) return { error: 'Invalid fields' }

  const email = values.email;
  const password = values.password;

  if (!process.env.SECRET_CODE) return { error: 'process.env.SECRET_CODE is missing' }

  try {
    await connectToMongo();

    const admin = await Admin.findOne({ email });
    if (!admin) return { error: "Account does not exist" }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) return { error: "Invalid email or password. Please try again with the correct credentials." }

    const token = jwt.sign({
      id: admin.id.toString(),
    },
      process.env.SECRET_CODE!)

    cookies().set({ name: 'admin-log', value: token, httpOnly: true, sameSite: 'lax', path: '/' })
    const newToken = new Token({ token });

    await newToken.save();

    return { name: admin.name, role: admin.role }
  }
  catch (error) {
    console.log(error)
    return { error: "Server error" }
  }
}