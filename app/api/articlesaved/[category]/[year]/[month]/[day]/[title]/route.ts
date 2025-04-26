import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import Token from "@/model/Token";
import jwt,{JwtPayload} from 'jsonwebtoken'

interface Decoded extends JwtPayload{
    id: string
}

export async function GET(request: NextRequest) {
    try {
        const url = request.nextUrl.pathname.slice(18, request.nextUrl.pathname.length);
        const first_slash = url.indexOf('/', 0);
        const second_slash = url.indexOf('/', first_slash + 1);
        const third_slash = url.indexOf('/', second_slash + 1);
        const fourth_slash = url.indexOf('/', third_slash + 1);

        const title = url.slice(fourth_slash + 1, url.length)

        const supabase_user = createClient();
        const { data, error } = await supabase_user.auth.getUser();

        const Cookie = request.cookies.get('user-log-2fa');

        if (data.user?.app_metadata.twofa === 'true') {
            if (!Cookie) return NextResponse.json({ saved: false }, { status: 200 }) ;

            const tokenRes = await Token.find({ token: Cookie.value });

            if (!tokenRes) return NextResponse.json({ saved: false }, { status: 200 }) ;

            if (!process.env.TwoFA_URI) return NextResponse.json({ saved: false }, { status: 200 }) 

            const decoded = await jwt.verify(Cookie.value, process.env.TwoFA_URI!) as Decoded;

            if (decoded.id !== data.user.id) return NextResponse.json({ saved: false }, { status: 200 }) ;
        }

        if (error || !data || !data.user) NextResponse.json({ saved: false }, { status: 200 });

        const res: PostgrestSingleResponse<{ user_email: string }[]> = await supabase.from('saveArticle').select('user_email').eq('title', title.replaceAll('_', ' '))

        if (res.data && res.data[0] && res.data[0].user_email === data.user?.email) return NextResponse.json({ saved: true }, { status: 200 })


        return NextResponse.json({ saved: false }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}