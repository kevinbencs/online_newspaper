'use server'
import { createClient } from "@/utils/supabase/server";
import { EmailSchema } from "@/schema";
import * as z from 'zod'


export const forgotPasswordSendEmail = async (value: z.infer<typeof EmailSchema>) => {
    try {
        const validatedFields = EmailSchema.safeParse(value);
        if (validatedFields.error) return { failed: validatedFields.error.errors }

        const email = value.email

        const supabase = createClient();

        const { data, error } = await supabase.auth.resetPasswordForEmail(email)
        if (error) return { error: 'Server error' }

        return { success: 'We sent an email.' }
    } catch (error) {
        console.log(error);
        return {error: 'Server error'}
    }

}
