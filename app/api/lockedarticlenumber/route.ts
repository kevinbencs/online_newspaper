import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Eligibility } from "@/utils/mongo/eligibility";


export async function GET(request: NextRequest) {

    const Cookie = request.cookies.get('admin-log');

    if (Cookie) {
        try {

            const coll = await Eligibility(Cookie.value)

            if (coll.role !== 'Admin' && coll.role !== 'Editor') return NextResponse.json({ number: 0 }, { status: 200 });

            const article: PostgrestSingleResponse<{ id: string }[]> = await supabase.from('article').select('id', { count: 'exact' }).eq('locked', true)

            if (!article.data || article.data.length === 0) return NextResponse.json({ number: 0 }, { status: 200 });

            return NextResponse.json({ number: article.count }, { status: 200 });
        }
        catch (err) {
            console.log(err)
            return NextResponse.json({ number: 0 }, { status: 500 });
        }
    }
    else {
        return NextResponse.json({ number: 0 }, { status: 200 });
    }
}