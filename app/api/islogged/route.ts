import { createClient } from "@/utils/supabase/server"
import jwt, { JwtPayload } from "jsonwebtoken";
import Token from "@/model/Token";
import { getAllSaveArticle } from "@/actions/savearticle";
import { NextRequest, NextResponse } from "next/server";
import { Eligibility } from "@/utils/mongo/eligibility";

interface Decoded extends JwtPayload {
    id: string
}



export async function GET(req: NextRequest) {
    try {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();

        const TwoFA = req.cookies.get('user-log-2fa');

        if (data.user && (data.user?.app_metadata.twofa === 'false' || !data.user?.app_metadata.twofa)) {
            const newsletter = await supabase.from('newsletter').select().eq('email', data.user?.email)
            const res = await getAllSaveArticle()
            return NextResponse.json({ role: 'user', name: data.user?.user_metadata.name, email: data.user.email, saveArt: res.data, subscribe: newsletter.data?.length !== 0 ? true : false }, { status: 200 });
        }

        if (data.user?.app_metadata.twofa === 'true' && TwoFA) {

            const tokenRes = await Token.find({ token: TwoFA.value });

            if (!tokenRes) return NextResponse.json({ role: '', name: '', email: '', saveArt: [], subscribe: false }, { status: 200 });

            if (!process.env.TwoFA_URI) return NextResponse.json({ role: '', name: '', email: '', saveArt: [], subscribe: false }, { status: 200 });

            const decoded = await jwt.verify(TwoFA.value, process.env.TwoFA_URI!) as Decoded;

            if (decoded.id !== data.user.id) return NextResponse.json({ role: '', name: '', email: '', saveArt: [], subscribe: false }, { status: 200 });

            const res = await getAllSaveArticle()
            const newsletter = await supabase.from('newsletter').select().eq('email', data.user?.email)

            return NextResponse.json({ role: 'user', name: data.user?.user_metadata.name, email: data.user.email, saveArt: res.data, subscribe: newsletter.data?.length !== 0 ? true : false }, { status: 200 });
        }

        const Cookie = req.cookies.get('admin-log');

        if (Cookie) {

            const coll = await Eligibility(Cookie.value)

            if (coll.role === '') return NextResponse.json({ role: '', name: '', email: '', saveArt: [], subscribe: false }, { status: 200 });

            return NextResponse.json({ role: coll.role, name: coll.name, email: '', saveArt: [], subscribe: false }, { status: 200 });


        }

        return NextResponse.json({ role: '', name: '', email: '', saveArt: [], subscribe: false }, { status: 200 });

    }

    catch (err) {
        return NextResponse.json({ role: '', name: '', email: '', saveArt: [], subscribe: false }, { status: 500 });
    }
}