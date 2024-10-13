'use server'

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Token from "@/model/Token";


export const isLogged = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (data.user) return { role: 'user', name: '' };

    const Cookie = cookies().get('admin-log');

    if (Cookie) {
        const decoded = jwt.verify(Cookie.value, process.env.SECRET_CODE!)
        if (!decoded) return { role: '', name: '' };

        const token = await Token.findOne({ token: Cookie.value })
        if (!token) return { role: '', name: '' };
        
        return { role: 'admin', name: 'admin' };
    }

    return { role: '', name: '' };
}