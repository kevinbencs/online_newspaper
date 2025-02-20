import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
    try {
        
        const path = req.nextUrl.pathname.split('/');
        for(let i = 0; i < 4; i++){
            path.shift();
        }

        const {data} = await supabase.from('article').select('paywall').eq('title',path[4].replaceAll('_',' ').replaceAll('nb20','?')).eq('date',`${path[1]}. ${path[2]}. ${path[3]}.`)
        if(data) return NextResponse.json({res: data[0].paywall}, {status:200})
        else return NextResponse.json({res: false}, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({res: false},{status:500})
    }
}