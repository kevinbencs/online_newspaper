'use server'

import { NewPasswordSchema } from '@/schema'
import * as z from 'zod'
import { cookies } from 'next/headers';
import Admin from '@/model/Admin';
import { hash } from 'bcrypt'
import { Eligibility } from "@/utils/mongo/eligibility";


export const changeAdminPassword = async (values: z.infer<typeof NewPasswordSchema>) => {

    try {
        const Cookies = cookies().get('admin-log');

        const coll = await Eligibility(Cookies?.value)

        if (coll.role === '') return { error: 'Please log in as admin, author, editor' };
        

        const validatedFields = NewPasswordSchema.safeParse(values);

        if (validatedFields.error) {
            
            return { failed: validatedFields.error.errors };
        }

        /*const newPassword = await hash(values.password, 12);

        const res = await Admin.findByIdAndUpdate(coll.id, { password: newPassword })
        
        if (!res) return { error: 'Please log in' };*/

        return { success: 'Password changed.' }

    }
    catch (error) {
        return { error: 'Server error' }
    }
}