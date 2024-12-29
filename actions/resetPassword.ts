'use server'
import { NewPasswordSchema } from "@/schema";
import { createClient } from "@/utils/supabase/server";
import * as z from 'zod'


export const resetPassword = async (value: z.infer<typeof NewPasswordSchema>) => {

    const validateFields = NewPasswordSchema.safeParse(value);
    if(validateFields.error) return {failed: validateFields.error.errors}

    const password = value.password

    const supabase = createClient()
    const {data, error} = await supabase.auth.updateUser({
        password: password
    })
    console.log(data)
    if(error) {
        console.log(error)
        return{error: 'Server error'}
    }
    return{ success: 'Password changed'}
}