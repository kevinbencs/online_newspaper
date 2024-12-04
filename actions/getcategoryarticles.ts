'use server'

import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";


interface Data {
    id: string,
    date: string,
    title: string,
    detail: string,
    cover_img_id: string
    author: string
}

export const getCategoryArticle = async (page: number | undefined, name: string) => {
    if (typeof page !== 'undefined') {
        const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id,date,title,detail,cover_img_id,author').eq('category',`${name.slice(0,1).toUpperCase()+name.slice(1,name.length)}`).range((page - 1) * 20, page * 20);
        if (res.error) return { error: 'Server error' }
        return { success: res }
    }

    const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id,date,title,detail,cover_img_id,author').eq('category',`${name.slice(0,1).toUpperCase()+name.slice(1,name.length)}`).limit(20);
    if (res.error) return { error: 'Server error' }

    return { success: res }
}

export const numberOfCategoryArticle = async (name: string) => {
    const res: number|null = (await supabase.from('article').select('*',{count: 'exact'}).eq('category',`${name.slice(0,1).toUpperCase()+name.slice(1,name.length)}`)).count;

    return { success: res }
}