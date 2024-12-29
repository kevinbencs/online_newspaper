'use server'

import { supabase } from "@/utils/supabase/article"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { pageSchema } from "@/schema";
import * as z from 'zod'

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

interface DataRightSide {
    id: string,
    title: string,
    cover_img_id: string,
    category: string,
    date:string,

}

export const importantArticle = async (value: z.infer<typeof pageSchema>) => {
    // disable cache for this server action
    const _cookie = cookies()

    const validatedFields = pageSchema.safeParse(value);
    if(validatedFields.error) return {failed: validatedFields.error.errors}

    const page = value.page
    if (typeof page !== 'undefined') {
        const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id, date, title, detail, cover_img_id, author, category, paywall, important').neq('important', 'Not important').range((page-1)*20,page*20).order('id',{ ascending: false })

        if (res.error) return { error: 'Server error' }
        return { success: res.data }
    }

    const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id, date, title, detail, cover_img_id, author, category, paywall, important').neq('important', 'Not important').limit(20).order('id',{ ascending: false });

    if (res.error) return { error: 'Server error' }
    return { success: res.data }
}

export const numberOfImportantArticle = async () => {
    const res:number | null = (await supabase.from('article').select('*',{count: 'exact'}).neq('important', 'Not important')).count

    if(!res) return{error: 'Server error'}

    return {success: res};
}


export const importantNewsRightSide = async () => {
    // disable cache for this server action
    const _cookie = cookies()
    
    const res: PostgrestSingleResponse<DataRightSide[]> = await supabase.from('article').select('title, cover_img_id, id, category, date, important').eq('important', 'Most important'); 
    const res2: PostgrestSingleResponse<DataRightSide[]> = await supabase.from('article').select('title, cover_img_id, id, category, date, important').eq('important', 'Second most important').order('id',{ ascending: false });
    const res3: PostgrestSingleResponse<DataRightSide[]> = await supabase.from('article').select('title, cover_img_id, id, category, date, important').eq('important', 'important').limit(2);

    if(res.error || res2.error) return {error: 'Server error'};

    return {success: [...res.data,...res2.data]}
}