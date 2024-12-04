'use server'

import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface Data {
    id: string,
    date: string,
    title: string,
    detail: string,
    cover_img_id: string
    author: string,
    category: string,
}

export const latestNews = async (page: number | undefined) => {
    if (typeof page !== 'undefined') {
        const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id, date, title, detail, cover_img_id, author, category').range((page - 1) * 20, page * 20).order('id')

        

        if (res.error) return { error: 'Server error' }
        return { success: res }
    }

    const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id, date, title, detail, cover_img_id, author, category').limit(20).order('id')
    if (res.error) return { error: 'Server error' }
    return { success: res }
}


export const numberOfLatestNews = async () => {
    const res: number | null = (await supabase.from('article').select('*',{count: 'exact'})).count

    if (!res) return { error: 'Server error' }
    return { success: res }
}