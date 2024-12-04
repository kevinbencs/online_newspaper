'use server'

import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";


interface Data {
    id: string,
    date: string,
    title: string,
    detail: string,
    category: string,
    cover_img_id: string
}

export const mainSection = async () => {
    const article1: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('title, date, id, category, detail, cover_img_id').eq('important', 'Most important');
    const article2: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('title, date, id, category, detail, cover_img_id').eq('important', 'Second most important');
    const article3: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('title, date, id, category, detail, cover_img_id').eq('important', 'important').limit(10);

    if (article1.error || article2.error || article3.error) return { error: 'Server error' };


    return { data: [...article1.data, ...article2.data, ...article3.data] };
}

export const sectionTwo = async () => {
    const articles: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('title, date, id, category, detail, cover_img_id').eq('important', 'important').limit(13);

    if (articles.error ) return { error: 'Server error' };

    return { data: articles.data };
}

