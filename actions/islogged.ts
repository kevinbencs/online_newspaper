'use server'

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import Token from "@/model/Token";
import Admin from "@/model/Admin";
import { getNumberSaveArticle } from "./savearticle";

interface Decoded extends JwtPayload {
    id: string
}



export const isLogged = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    const TwoFA = cookies().get('user-log-2fa');

    if (data.user && (data.user?.app_metadata.twofa === 'false' || !data.user?.app_metadata.twofa)) {
        const res = await getNumberSaveArticle()
        return { role: 'user', name: '', number: res.count };
    }

    if (data.user?.app_metadata.twofa === 'true' && TwoFA) {

        const tokenRes = await Token.find({ token: TwoFA.value });

        if (!tokenRes) return { role: '', name: '',number: 0 };;

        if (!process.env.TwoFA_URI) return { role: '', name: '',number: 0 };

        const decoded = await jwt.verify(TwoFA.value, process.env.TwoFA_URI!) as Decoded;

        if (decoded.id !== data.user.id) return { role: '', name: '',number: 0 };

        const res = await getNumberSaveArticle()

        return { role: 'user', name: '', number: res.count };
    }

    const Cookie = cookies().get('admin-log');

    if (Cookie) {
        try {

            const token = await Token.findOne({ token: Cookie.value });
            if (!token) {

                return { role: '', name: '',number: 0 };
            }

            const decoded = jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded
            if (!decoded) {

                return { role: '', name: '',number: 0 };
            }

            const account = await Admin.findById(decoded.id, { role: 1, name: 1 })



            if (!account) return { role: '', name: '', number: 0 };

            return { role: account.role, name: account.name,number: 0 };
        }
        catch (err) {
            return { role: '', name: '', number: 0 }
        }
    }

    return { role: '', name: '', number: 0 };
}