'use server'

import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { cookies } from "next/headers";

interface Data {
    id: string,
    date: string,
    title: string,
    detail: string,
    cover_img_id: string
    author: string,
    category: string,
    paywall: boolean
}

export const latestNews = async (page: number | undefined) => {
    // disable cache for this server action
    const _cookie = cookies()

    if (typeof page !== 'undefined') {
        const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id, date, title, detail, cover_img_id, author, category, paywall').range((page - 1) * 20, page * 20).order('id', { ascending: false })

        if (res.error) return { error: 'Server error' }
        return { success: res }
    }

    const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id, date, title, detail, cover_img_id, author, category, paywall').limit(20).order('id', { ascending: false })
    if (res.error) return { error: 'Server error' }
    return { success: res }
}


export const numberOfLatestNews = async () => {
    // disable cache for this server action
    const _cookie = cookies()
    
    const res: number | null = (await supabase.from('article').select('*', { count: 'exact' })).count

    if (!res) return { error: 'Server error' }
    return { success: res }
}