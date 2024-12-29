import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { connectToMongo } from "@/lib/mongo";
import Token from "@/model/Token";
import Admin from "@/model/Admin";
import jwt, { JwtPayload } from 'jsonwebtoken'

interface Decoded extends JwtPayload {
    id: string
}

export async function GET(request: NextRequest) {

    const Cookie = request.cookies.get('admin-log');

    if (Cookie) {
        try {
            await connectToMongo();

            const token = await Token.findOne({ token: Cookie.value });
            if (!token) return NextResponse.json({ error: 'Please log in' }, { status: 400 });


            const decoded = jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded
            if (!decoded) return NextResponse.json({ error: 'Please log in' }, { status: 400 });

            const account = await Admin.findById(decoded.id)

            if (!account) return NextResponse.json({ error: 'Please log in' }, { status: 400 });

            const article: PostgrestSingleResponse<{ id: string }[]> = await supabase.from('article').select('id', { count: 'exact' }).eq('locked', true)

            if (!article.data || article.data.length === 0) return NextResponse.json({ number: 0 }, { status: 200 });

            return NextResponse.json({ number: article.count }, { status: 200 });
        }
        catch (err) {
            return NextResponse.json({ error: 'Server error' }, { status: 500 });
        }
    }
    else {
        return NextResponse.json({ number: 0 }, { status: 200 });
    }
}