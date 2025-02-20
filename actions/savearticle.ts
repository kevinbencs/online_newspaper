'use server'

import { supabase } from "@/utils/supabase/article"
import { createClient } from "@/utils/supabase/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { cookies } from "next/headers";
import Token from "@/model/Token";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { urlPathnameSchema} from "@/schema";
import * as z from 'zod'



interface Decoded extends JwtPayload {
    id: string
}


export const saveArticle = async (value: z.infer<typeof urlPathnameSchema>) => {
    try {
        const validateFields = urlPathnameSchema.safeParse(value);
        if(validateFields.error) return({failed: validateFields.error.errors})

        const url = value.url;
        const supabase_user = createClient()
        const { data, error } = await supabase_user.auth.getUser();

        if (error || !data || !data.user) return { error: 'Please log in' }

        const Cookie = cookies().get('user-log-2fa');

        if (data.user?.app_metadata.twofa === 'true') {
            if (!Cookie) return { error: 'Please log in' };

            const tokenRes = await Token.find({ token: Cookie.value });

            if (!tokenRes) return { error: 'Please log in' };

            if (!process.env.TwoFA_URI) return { error: 'process.env.TwoFA_URI is missing' }

            const decoded = await jwt.verify(Cookie.value, process.env.TwoFA_URI!) as Decoded;

            if (decoded.id !== data.user.id) return { error: 'Please log in' };
        }

        const first_slash = url.indexOf('/', 0);
        const second_slash = url.indexOf('/', first_slash + 1);
        const third_slash = url.indexOf('/', second_slash + 1);
        const fourth_slash = url.indexOf('/', third_slash + 1);

        const title = url.slice(fourth_slash + 1, url.length);

        const email = data.user.email;

        const Art = await supabase.from('saveArticle').select('*', { count: 'exact' }).eq('user_email', data.user.email);

        if (Art.error) {
            console.log(Art.error)
            return { error: 'Server error' }
        }

        if (Art.count === 20) {
            return { failed: 'You have already had 20 favorite article.' }
        }

        const saveArt = await supabase.from('saveArticle').insert({
            user_email: email,
            title: title.replaceAll('_', ' ').replaceAll('nb20','?'),
            url
        })

        if (saveArt.error) {
            console.log(saveArt.error)
            return { error: 'Server error' }
        }

        return { success: 'success' }

    } catch (error) {
        console.log(error)
        return { error: 'Server error' }
    }
}


export const deleteArticle = async (value: z.infer<typeof urlPathnameSchema>) => {
    try {

        const validateFields = urlPathnameSchema.safeParse(value);
        if(validateFields.error) return({failed: validateFields.error.errors})

        const url = value.url;

        const supabase_user = createClient()
        const { data, error } = await supabase_user.auth.getUser();

        if (error || !data || !data.user) return { error: 'Please log in' }

        const Cookie = cookies().get('user-log-2fa');

        if (data.user?.app_metadata.twofa === 'true') {
            if (!Cookie) return { error: 'Please log in' };

            const tokenRes = await Token.find({ token: Cookie.value });

            if (!tokenRes) return { error: 'Please log in' };

            if (!process.env.TwoFA_URI) return { error: 'process.env.TwoFA_URI is missing' }

            const decoded = await jwt.verify(Cookie.value, process.env.TwoFA_URI!) as Decoded;

            if (decoded.id !== data.user.id) return { error: 'Please log in' };
        }

        const first_slash = url.indexOf('/', 0);
        const second_slash = url.indexOf('/', first_slash + 1);
        const third_slash = url.indexOf('/', second_slash + 1);
        const fourth_slash = url.indexOf('/', third_slash + 1);

        const title = url.slice(fourth_slash + 1, url.length);

        const email = data.user.email;
        const delArt = await supabase.from('saveArticle').delete().eq('title', title.replaceAll('_', ' ').replaceAll('nb20','?')).eq('user_email', email)

        if (delArt.error) {
            console.log(delArt.error)
            return { error: 'Server error' }
        }

        return { success: 'success' }

    } catch (error) {
        console.log(error)
        return { error: 'Server error' }
    }
}


export const getAllSaveArticle = async () => {
    const Cookie = cookies()
    try {
        const supabase_user = createClient();
        const { data, error } = await supabase_user.auth.getUser();

        if (error) {
            console.log(error)
            return { Error: 'Server error' }
        }

        if (!data || !data.user) { return { Error: 'Please log in' } }

        const Cookie = cookies().get('user-log-2fa');

        if (data.user?.app_metadata.twofa === 'true') {
            if (!Cookie) return { error: 'Please log in' };

            const tokenRes = await Token.find({ token: Cookie.value });

            if (!tokenRes) return { error: 'Please log in' };

            if (!process.env.TwoFA_URI) return { error: 'process.env.TwoFA_URI is missing' }

            const decoded = await jwt.verify(Cookie.value, process.env.TwoFA_URI!) as Decoded;

            if (decoded.id !== data.user.id) return { error: 'Please log in' };
        }

        const res: PostgrestSingleResponse<{ title: string, url: string,  }[]> = await supabase.from('saveArticle').select('title, url').eq('user_email', data.user.email);

        if (res.error) {
            console.log(res.error)
            return { Error: 'Server error' }
        }

        return { data: res.data }

    } catch (error) {
        console.log(error)
        return { Error: 'Server error' }
    }
}

