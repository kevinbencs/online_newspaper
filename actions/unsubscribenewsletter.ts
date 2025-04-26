'use server'

import jwt, { JwtPayload } from "jsonwebtoken";
import { supabase } from "@/utils/supabase/article";
import { EmailSchema } from "@/schema";
import * as z from 'zod'

interface Decoded extends JwtPayload {
    email: string
}


export const unsubscribeEmail = async (value: z.infer<typeof EmailSchema>) => {


    try {
        const validatedFields = EmailSchema.safeParse(value);
        if (validatedFields.error) return { error: validatedFields.error.errors };
        await supabase.from('newsletter').delete().eq('email', value.email)

        return { success: 'You unsubscribed from newsletters.' }
    }
    catch (err) {
        console.log(err)
        return { failed: 'Server error' };
    }
}

export const unsubscribeToken = async (value: string) => {

    try {
        const decoded = jwt.verify(value, process.env.SECRET_CODE!) as Decoded

        if (!decoded) return { failed: 'Url error' }

        await supabase.from('newsletter').delete().eq('email', decoded.email)

        return { success: 'You unsubscribed from newsletters.' }
    }
    catch (err) {
        console.log(err)
        return { failed: 'Server error' }
    }
}

