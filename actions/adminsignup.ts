"use server"

import * as z from 'zod'
import { AdminRegisterShcema } from '@/schema'
import Admin from '@/model/Admin'
import { hash } from 'bcrypt'
import mongoose from 'mongoose'


async function connectToMongo() {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI!); // A Mongoose kapcsolat létrehozása
  }
}

export const adminSignUp = async (values: z.infer<typeof AdminRegisterShcema>) => {
  const validatedFields = AdminRegisterShcema.safeParse(values)

  if (!validatedFields.success) return { failed:  validatedFields.error.errors}

  const email = values.email;
  const password = values.password;
  const name = values.name;
  const role = values.role;

  try {
    await connectToMongo();

    const exitingAdmin = await Admin.findOne({ email });
    if (exitingAdmin) return { error: "Admin already exits." };

    const hashPassword = await hash(password, 12);

    const newAdmin = new Admin({ email, password: hashPassword, name, role });

    await newAdmin.save();

    return { success: `${role} created successfully.` }
  }
  catch (error) {
    
    return { error: 'server error' }
  }

}