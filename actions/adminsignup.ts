"use server"

import * as z from 'zod'
import { AdminRegisterShcema } from '@/schema'
import Admin from '@/model/Admin'
import { hash } from 'bcrypt'
import { cookies } from 'next/headers';
import { Eligibility } from "@/utils/mongo/eligibility";
import { revalidateTag, revalidatePath } from 'next/cache'


export const adminSignUp = async (values: z.infer<typeof AdminRegisterShcema>) => {
  try {

    const Cookie = cookies().get('admin-log');

    const coll = await Eligibility(Cookie?.value)

    if (coll.role !== 'Admin') return { error: 'Please log in as admin' };

    const validatedFields = AdminRegisterShcema.safeParse(values)

    if (!validatedFields.success) {

      return { failed: validatedFields.error.errors };
    }

    if (values.role !== 'Admin' && values.role !== 'Author' && values.role !== 'Editor') {
      return { error: 'Role must be Admin, Author or Editor.' }
    }

    const email = values.email;
    const password = values.password;
    const name = values.name;
    const role = values.role;
    const image = values.imageUrl

    /*const user = await Admin.find({ email });

    let importance: number = 0;

    if (role === 'Admin') {
      importance = 1;
    }
    if (role === 'Editor') {
      importance = 2;
    }

    if (role === 'Author') {
      importance = 3;
    }

    const hashPassword = await hash(password, 12);

    if (user.length === 0) {

      const newAdmin = new Admin({ email, password: hashPassword, name, role, image, importance, hired: true });

      await newAdmin.save();
      revalidateTag('authorsTag')
      revalidatePath('/authors')
    }
    else {
      await Admin.findByIdAndUpdate(user[0]._id, {password: hashPassword, role, importance, hired: true})
    }*/







    return { success: name + ' created successfully.' }

  }
  catch (error) {
    console.log(error)
    return { error: 'server error' }
  }
}