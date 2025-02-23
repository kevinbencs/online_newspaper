'use server'

import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { getCatArtSchema } from "@/schema";
import * as z from 'zod'


interface Data {
    id: string,
    date: string,
    title: string,
    detail: string,
    cover_img_id: string
    author: string,
    paywall: boolean
}

export const getCategoryArticle = async (value: z.infer<typeof getCatArtSchema>) => {

    const validateFields = getCatArtSchema.safeParse(value);
    if(validateFields.error) return {failed: validateFields.error.errors};

    const page = value.page;
    const name = value.name


    if (typeof page !== 'undefined') {
        const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id,date,title,detail,cover_img_id,author, paywall').eq('category', `${name.slice(0, 1).toUpperCase() + name.slice(1, name.length)}`).range((page - 1) * 20, page * 20).order('id',{ascending: false}).eq('locked',false);
        if (res.error) return { error: 'Server error' }
        return { success: res }
    }

    const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id,date,title,detail,cover_img_id,author, paywall').eq('category', `${name.slice(0, 1).toUpperCase() + name.slice(1, name.length)}`).limit(20).order('id', {ascending: false}).eq('locked',false);
    if (res.error) return { error: 'Server error' }

    return { success: res }
}

export const numberOfCategoryArticle = async (name: string) => {

    const res: number | null = (await supabase.from('article').select('*', { count: 'exact' }).eq('category', `${name.slice(0, 1).toUpperCase() + name.slice(1, name.length)}`).eq('locked',false)).count;

    if (!res) return { error: 'Server error' }

    return { success: res }
}