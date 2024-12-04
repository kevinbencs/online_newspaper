'use server'

import { supabase } from "@/utils/supabase/article"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

interface Data {
    id: string,
    date: string,
    title: string,
    detail: string,
    cover_img_id: string
    author: string,
    category: string,
}

interface DataRightSide {
    id: string,
    title: string,
    cover_img_id: string,
    category: string,
    date:string
}

export const importantArticle = async (page: number | undefined) => {
    if (typeof page !== 'undefined') {
        const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id, date, title, detail, cover_img_id, author, category').neq('important', 'Not important').range((page-1)*20,page*20)

        if (res.error) return { error: 'Server error' }
        return { success: res.data }
    }

    const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id, date, title, detail, cover_img_id, author, category').neq('important', 'Not important').limit(20);

    if (res.error) return { error: 'Server error' }
    return { success: res.data }
}

export const numberOfImportantArticle = async () => {
    const res:number | null = (await supabase.from('article').select('*',{count: 'exact'}).neq('important', 'Not important')).count

    if(!res) return{error: 'Server error'}

    return {success: res};
}


export const importantNewsRightSide = async () => {
    const res: PostgrestSingleResponse<DataRightSide[]> = await supabase.from('article').select('title, cover_img_id, id, category, date').neq('important', 'Not important').limit(5);

    if(res.error) return {error: 'Server error'};

    return {success: res.data}
}