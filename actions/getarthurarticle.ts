'use server'

import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface Data {
    id: string,
    title: string,
    detail: string,
    cover_img_id: string,
    category: string,
    date: string
}

export const authorArticle = async (author: string, page: number | undefined) => {
    if (typeof page !== 'undefined') {
        const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id, title, detail, cover_img_id, category, date, category').eq('author', author).range((page - 1) * 20, page * 20)

        if (res.error) return { error: 'Server error' }
        return { success: res.data }
    }

    const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id, title, detail, cover_img_id, category, date, category').eq('author', author).limit(20)

    if (res.error) return { error: 'Server error' }
    return { success: res.data }
}

export const numberOfAuthorArticle = async (author:string) => {
    const res: number |null = (await supabase.from('article').select('*',{count: 'exact'}).eq('auhot', author)).count;

    if(!res) return {error: 'Server error'}
    return {success: res};
}