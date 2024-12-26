'use server'

import { createClient } from "@/utils/supabase/server";
import { supabase } from "@/utils/supabase/article";
import { NewPasswordSchema, updateUserSchema } from "@/schema";
import * as z from 'zod';
import { cookies } from "next/headers";
import jwt, {JwtPayload} from 'jsonwebtoken';
import Token from "@/model/Token";

interface Decoded extends JwtPayload {
    id: string
}

export const updateUser = async (value: z.infer<typeof updateUserSchema>) => {
    try {
        const data = await createClient().auth.getUser();
        if (!data) return { error: 'Please log in' };
        const Cookie = cookies().get('user-log-2fa');

        if(data.data.user?.app_metadata.twofa === 'true'){
            if(!Cookie) return {error: 'Please log in'};

            const tokenRes = await Token.find({token: Cookie.value});

            if(!tokenRes) return {error: 'Please log in'};

            if(!process.env.TwoFA_URI) return {error: 'process.env.TwoFA_URI is missing'}

            const decoded = await jwt.verify(Cookie.value, process.env.TwoFA_URI!) as Decoded;

            if(decoded.id !== data.data.user.id) return {error: 'Please log in'};
        }

        const validatedFields = updateUserSchema.safeParse(value);
        if (validatedFields.error) return { failed: validatedFields.error.errors };

        const newsletter = await supabase.from('newsletter').select().eq('email', data.data.user?.email)
        if (value.newsletter && newsletter.data?.length === 0) await supabase.from('newsletter').insert({ email: data.data.user?.email, name: data.data.user?.user_metadata.name, user_id: data.data.user?.id })
        if (!value.newsletter && newsletter.data && newsletter.data?.length > 0) await supabase.from('newsletter').delete().eq('email', data.data.user?.email)

        if (data.data.user?.user_metadata.name !== value.name) {
            await createClient().auth.updateUser({ data: { name: value.name } })
            if (value.newsletter) await supabase.from('newsletter').update({ name: value.name }).eq('email', data.data.user?.email);
        }

        if (data.data.user?.email !== value.email) {
            const data2 = await createClient().auth.updateUser({ email: value.email })
            if (data2.error) return { error: `Already registered an account with ${value.email}.` }
        }

        return { success: data.data.user?.email !== value.email ? 'We sent a confirm email.' : 'Success' }

    }
    catch (err) {
        return { error: 'Server error' }
    }
}

export const changePassword = async (value: z.infer<typeof NewPasswordSchema>) => {
    try {
        const data = await createClient().auth.getUser();
        if (!data) return { error: 'Please log in' };

        const Cookie = cookies().get('user-log-2fa');

        if(data.data.user?.app_metadata.twofa === 'true'){
            if(!Cookie) return {error: 'Please log in'};

            const tokenRes = await Token.find({token: Cookie.value});

            if(!tokenRes) return {error: 'Please log in'};

            if(!process.env.TwoFA_URI) return {error: 'process.env.TwoFA_URI is missing'}

            const decoded = await jwt.verify(Cookie.value, process.env.TwoFA_URI!) as Decoded;

            if(decoded.id !== data.data.user.id) return {error: 'Please log in'};
        }

        const validatedFields = NewPasswordSchema.safeParse(value);
        if (validatedFields.error) return { failed: validatedFields.error.errors };
        
        await createClient().auth.updateUser({password: value.password})

        return {success: 'Password changed'}
    }
    catch (err) {
        return { error: 'Server error' }
    }
}