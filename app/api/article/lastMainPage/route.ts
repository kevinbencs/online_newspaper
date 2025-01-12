import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface DataMainPage {
    id: string,
    title: string,
    date: string,
    time: string,
    category: string,
    paywall: boolean
}

export async function GET(request: NextRequest) {
    try {

        const article: PostgrestSingleResponse<DataMainPage[]> = await supabase.from('article').select('title, category, date, time, id, paywall').eq('important', 'Not important').limit(6).eq('locked', false)
        
        if (article.error) return NextResponse.json({ error: 'Server error' }, { status: 500 });
        //2024-08-20T14:30:00Z

        article.data.map(val => {
            val.date = val.date.replaceAll(' ', '').replaceAll('.', '-');
            if (val.time.length === 8) val.date = val.date.slice(0, -1) + 'T' + val.time + 'Z'
            else val.date = val.date.slice(0, -1) + 'T0' + val.time + 'Z'
        })

        return NextResponse.json({ data: article.data }, { status: 200 })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}