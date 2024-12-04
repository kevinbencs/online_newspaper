'use server'

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import Token from "@/model/Token";
import Admin from "@/model/Admin";

interface Decoded extends JwtPayload {
    id: string
}



export const isLogged = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (data.user) return { role: 'user', name: '' };

    const Cookie = cookies().get('admin-log');

    if (Cookie) {
        try {

            const token = await Token.findOne({ token: Cookie.value });
            if (!token) {
                
                return { role: '', name: '' };
            }

            const decoded = jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded
            if (!decoded) {
                
                return { role: '', name: '' };
            }

            const account = await Admin.findById(decoded.id)

            

            if (!account) return { role: '', name: '' };

            return { role: account.role , name: account.name };
        }
        catch (err) {
            return { role: '', name: '' }
        }
    }

    return { role: '', name: '' };
}