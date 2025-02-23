'use server'

import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

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
    time: string,
    category: string,
    paywall: boolean
}

export const latestNewsMainPage = async () => {
    const article: PostgrestSingleResponse<DataMainPage[]> = await supabase.from('article').select('title, category, date, time, id, paywall').limit(6).eq('locked',false).order('id',{ascending: false})

    if (article.error) return { error: 'Server error' };
    

    article.data.map(val => {
        val.date = val.date.replaceAll(' ', '').replaceAll('.', '-');
        if (val.time.length === 8) val.date = val.date.slice(0, -1) + 'T' + val.time + 'Z'
        else val.date = val.date.slice(0, -1) + 'T0' + val.time + 'Z'
    })

    return { data: article.data };
}

const getLatestNewsCache1 = unstable_cache(
  async () => supabase.from('article').select('title, cover_img_id, id, category, date').eq('important', 'Not important').limit(5).eq('locked',false).order('id',{ascending: false}),
  [`latestNewSidebar1`],
  { tags: ["latestNewSidebar1tag"] }
)

export const latestNewsRightSide = async () => {
    const article: PostgrestSingleResponse<DataRightSide[]> = await getLatestNewsCache1();
    if (article.error) return { error: 'Server error' };

    return { success: article.data };
}