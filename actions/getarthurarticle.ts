'use server'

import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { authorArt } from "@/schema";
import { authorArtNumber } from "@/schema";
import * as z from 'zod'

interface Data {
    id: string,
    title: string,
    detail: string,
    cover_img_id: string,
    category: string,
    date: string,
    paywall: boolean
}

export const authorArticle = async (value: z.infer<typeof authorArt>) => {
    // disable cache for this server action
    const _cookie = cookies();

    const validatedFields = authorArt.safeParse(value);
    if(validatedFields.error) return{failed: validatedFields.error.errors}

    const author = value.author;
    const page = value.page;

    if (typeof page !== 'undefined') {
        const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id, title, detail, cover_img_id, category, date, category, paywall').eq('author', author).range((page - 1) * 20, page * 20).order('id',{ ascending: false })

        if (res.error) return { error: 'Server error' }
        return { success: res.data }
    }

    const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id, title, detail, cover_img_id, category, date, category, paywall').eq('author', author).limit(20).order('id',{ ascending: false })

    if (res.error) return { error: 'Server error' }
    return { success: res.data }
}

export const numberOfAuthorArticle = async (value: z.infer<typeof authorArtNumber>) => {
    // disable cache for this server action
    const _cookie = cookies();

    const validatedFields = authorArtNumber.safeParse(value);
    if(validatedFields.error) return {failed: validatedFields.error.errors}

    const author = value.author;

    const res: number |null = (await supabase.from('article').select('*',{count: 'exact'}).eq('author', author)).count;

    if(!res) return {error: 'Server error'}
    return {success: res};
}