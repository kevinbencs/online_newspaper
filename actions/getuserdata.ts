'use server'

import { createClient } from "@/utils/supabase/server";
import { supabase } from "@/utils/supabase/article";
import { cookies } from "next/headers";
import jwt, {JwtPayload} from 'jsonwebtoken';
import Token from "@/model/Token";

interface Decoded extends JwtPayload {
    id: string
}

export const getUserData = async () => {
    try {
        const data = await createClient().auth.getUser();
        if (!data) return { error: 'Please sign in.' }

        const Cookie = cookies().get('user-log-2fa');

        if (data.data.user?.app_metadata.twofa === 'true') {
            if (!Cookie) return { error: 'Please log in' };

            const tokenRes = await Token.find({ token: Cookie.value });

            if (!tokenRes) return { error: 'Please log in' };

            if (!process.env.TwoFA_URI) return { error: 'process.env.TwoFA_URI is missing' }

            const decoded = await jwt.verify(Cookie.value, process.env.TwoFA_URI!) as Decoded;

            if (decoded.id !== data.data.user.id) return { error: 'Please log in' };
        }

        const newsletter = await supabase.from('newsletter').select().eq('email', data.data.user?.email)

        return { name: data.data.user?.user_metadata.name, email: data.data.user?.email, subscribe: newsletter.data?.length !== 0 ? true : false };
    }
    catch (err) {
        return { error: 'Server error' }
    }
}