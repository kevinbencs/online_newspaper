'use server'

import { supabase } from "@/utils/supabase/article"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { cookies } from "next/headers";
import Token from "@/model/Token";
import jwt, { JwtPayload } from 'jsonwebtoken';
import Admin from "@/model/Admin";


interface Decoded extends JwtPayload {
    id: string
}


/*export const getAFavArticle = async () => {
    const Cookie = cookies()
    try {
        const Cookie = cookies().get('admin-log');

        if (!Cookie) return { error: 'Please log in' };

        const tokenRes = await Token.find({ token: Cookie.value });

        if (!tokenRes) return { error: 'Please log in' };

        const decoded = await jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded;

        if (!decoded.id) return { error: 'Please log in' };

        const account = await Admin.findById(decoded.id)

        if (!account) return { error: 'Please log in' };

        const res: PostgrestSingleResponse<{ title: string, date:string, id: string, category: string }[]> = await supabase.from('article').select('title, date, id, category').limit(3)

        if (res.error) {
            console.log(res.error)
            return { Error: 'Server error' }
        }

        return { data: res.data }

    } catch (error) {
        console.log(error)
        return { Error: 'Server error' }
    }
}*/