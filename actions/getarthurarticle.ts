'use server'

import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { cookies } from "next/headers";

interface Data {
    id: string,
    title: string,
    detail: string,
    cover_img_id: string,
    category: string,
    date: string,
    paywall: boolean
}

export const authorArticle = async (author: string, page: number | undefined) => {
    // disable cache for this server action
    const _cookie = cookies()
    if (typeof page !== 'undefined') {
        const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id, title, detail, cover_img_id, category, date, category, paywall').eq('author', author).range((page - 1) * 20, page * 20).order('id',{ ascending: false })

        if (res.error) return { error: 'Server error' }
        return { success: res.data }
    }

    const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id, title, detail, cover_img_id, category, date, category, paywall').eq('author', author).limit(20).order('id',{ ascending: false })

    if (res.error) return { error: 'Server error' }
    return { success: res.data }
}

export const numberOfAuthorArticle = async (author:string) => {
    // disable cache for this server action
    const _cookie = cookies()
    const res: number |null = (await supabase.from('article').select('*',{count: 'exact'}).eq('auhot', author)).count;

    if(!res) return {error: 'Server error'}
    return {success: res};
}