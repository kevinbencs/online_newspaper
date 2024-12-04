'use server'

import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface DataRightSide {
    id: string,
    title: string,
    cover_img_id: string,
    category: string,
    date:string
}

interface DataMainPage {
    id: string,
    title: string,
    date: string,
    time: string
}

export const latestNewsMainPage = async () => {
    const article: PostgrestSingleResponse<DataMainPage[]> = await supabase.from('article').select('title, date, time, id').eq('important', 'Not important').limit(6)

    if (article.error) return { error: 'Server error' };
    //2024-08-20T14:30:00Z

    article.data.map(val => {
        val.date = val.date.replaceAll(' ', '').replaceAll('.', '-');
        if (val.time.length === 8) val.date = val.date.slice(0, -1) + 'T' + val.time + 'Z'
        else val.date = val.date.slice(0, -1) + 'T0' + val.time + 'Z'
    })

    return { data: article.data };
}

export const latestNewsRightSide = async () => {
    const article: PostgrestSingleResponse<DataRightSide[]> = await supabase.from('article').select('title, cover_img_id, id, category, date').eq('important', 'Not important').limit(5)

    if (article.error) return { error: 'Server error' };

    return { success: article.data };
}