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

async function closeConnection() {
  if (mongoose.connection.readyState !== 0) {
    try {
      await mongoose.connection.close();
    }
    catch (error) {
      console.error('Failed to close the connection:', error);
      throw new Error('Failed to close the connection');
  }
  }
}

export const adminSignUp = async (values: z.infer<typeof AdminRegisterShcema>) => {


  try {
    await connectToMongo();

    const Cookies = cookies().get('admin-log');
    if (!Cookies) return { error: 'Please sign in.' }

    const token = await Token.findOne({ token: Cookies.value })

    if (!token) {
      await closeConnection();
      return { error: "PLease log in" };
    }

    const decoded = jwt.verify(Cookies.value, process.env.SECRET_CODE!) as Decoded;

    if (!decoded) {
      await closeConnection();
      return { error: "PLease log in" };
    }

    const account = await Admin.findById(decoded.id)
    if (!account) {
      await closeConnection();
      return { error: "PLease log in" };
    }

    if (account.role === 'admin') {

      const validatedFields = AdminRegisterShcema.safeParse(values)

      if (!validatedFields.success) {
        await closeConnection();
        return { failed: validatedFields.error.errors };
      }

      const email = values.email;
      const password = values.password;
      const name = values.name;
      const role = values.role;

      const hashPassword = await hash(password, 12);
      const newAdmin = new Admin({ email, password: hashPassword, name, role });

      await newAdmin.save();
      await closeConnection();
      return { success: `${name} created successfully.` }
    }
    else {
      await closeConnection();
      return { error: 'You do not have admin privileges.' }
    }
  }
  catch (error) {
    return { error: 'server error' }
  }
}