'use server'

import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import Token from "@/model/Token";
import Admin from "@/model/Admin";
import { connectToMongo } from "@/lib/mongo";
import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface Decoded extends JwtPayload {
    id: string
}

interface Art {
    title: string,
    id: string,
    category: string,
    date: string
}



export const getAllLockedArticle = async () => {

    const Cookie = cookies().get('admin-log');

    if (Cookie) {
        try {
            await connectToMongo();

            const token = await Token.findOne({ token: Cookie.value });
            if (!token) return {
                error: 'Please log in'
            };


            const decoded = jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded
            if (!decoded) return {
                error: 'Please log in'
            };

            const account = await Admin.findById(decoded.id)

            if (!account) return {
                error: 'Please log in'
            };

            const article: PostgrestSingleResponse<Art[]> = await supabase.from('article').select('title, id, category, date').order('id',{ ascending: false }).eq('locked',true)

            if (!article.data || article.data.length === 0) { return { none: 'No articles' } }

            return {
                data: article.data
            };
        }
        catch (err) {
            return {
                error: 'Server error'
            }
        }
    }
    else {
        return { error: 'Please log in' }
    }
}
