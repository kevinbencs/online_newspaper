import { supabase } from '@/utils/supabase/article';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { NextRequest, NextResponse, } from 'next/server';

interface DataMainPage {
    id: string,
    title: string,
    date: string,
    time: string,
    category: string,
    paywall: boolean,
}

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    try {


        const article: PostgrestSingleResponse<DataMainPage[]> = await supabase.from('article').select('title, category, date, time, id, paywall').limit(6).eq('locked', false).order('id', { ascending: false })

        if (article.error) return NextResponse.json({ error: 'Server error' }, { status: 500 })

        if (!article.data || article.data.length === 0) {
            return NextResponse.json({ data: [] }, { status: 200 });
        }

        article.data.map(val => {
            val.date = val.date.replaceAll(' ', '').replaceAll('.', '-');
            if (val.time.length === 8) val.date = val.date.slice(0, -1) + 'T' + val.time + 'Z'
            else val.date = val.date.slice(0, -1) + 'T0' + val.time + 'Z'
        })

        const latestDate = new Date(
            article.data
                .map((item) => new Date(item.date))
                .sort((a, b) => b.getTime() - a.getTime())[0]
        );


        return  NextResponse.json({ data: article.data }, { status: 200 });


    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}