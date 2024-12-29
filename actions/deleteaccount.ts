'use server'

import { createClient } from "@/utils/supabase/server";
import { supabase_admin } from "@/utils/supabase/admin";
import { supabase } from "@/utils/supabase/article";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from 'jsonwebtoken';
import Token from "@/model/Token";

interface Decoded extends JwtPayload {
    id: string
}

export const deleteAccount = async () => {
    try {
        const supabase_user = createClient();
        const data = await supabase_user.auth.getUser()
        if (data.data.user) {
            const Cookie = cookies().get('user-log-2fa');

            if (data.data.user?.app_metadata.twofa === 'true') {
                if (!Cookie) return { error: 'Please log in' };

                const tokenRes = await Token.find({ token: Cookie.value });

                if (!tokenRes) return { error: 'Please log in' };

                if (!process.env.TwoFA_URI) return { error: 'process.env.TwoFA_URI is missing' }

                const decoded = await jwt.verify(Cookie.value, process.env.TwoFA_URI!) as Decoded;

                if (decoded.id !== data.data.user.id) return { error: 'Please log in' };
            }
            
            await supabase_user.auth.signOut();
            await supabase.from('newsletter').update({ user_id: '' }).eq('email', data.data.user.email)
            await supabase.from('saveArticle').delete().eq('user_email', data.data.user.email)
            await supabase_admin.auth.admin.deleteUser(data.data.user.id);
            return { success: 'Success' };
        }
        else return { error: 'Please log in' }
    }
    catch (err) {
        return { error: 'Server error' }
    }
}