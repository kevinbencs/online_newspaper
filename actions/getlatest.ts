'use server'

/*import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { pageSchema } from "@/schema";
import * as z from 'zod'
import { unstable_cache } from 'next/cache';

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

const getLatestNewsCache = unstable_cache(
    async (page: number | undefined) => page === undefined ?
        supabase.from('article').select('id, date, title, detail, cover_img_id, author, category, paywall').limit(20).order('id', { ascending: false }).eq('locked', false) :
        supabase.from('article').select('id, date, title, detail, cover_img_id, author, category, paywall').range((page - 1) * 20, page * 20 - 1).order('id', { ascending: false }).eq('locked', false),
    [`latestN`]
);

const getLatestNewsNumCache = unstable_cache(
    async () => supabase.from('article').select('*', { count: 'exact' }).eq('locked', false),
    [`latestNewNum`]
);



export const latestNews = async (value: z.infer<typeof pageSchema>) => {

    const validatedFields = pageSchema.safeParse(value);
    if (validatedFields.error) return { failed: validatedFields.error.errors }

    const page = value.page

    const res = await getLatestNewsCache(page)

    if (res.error) return { error: 'Server error' }
    return { success: res }
}


export const numberOfLatestNews = async () => {

    const res: number | null = (await getLatestNewsNumCache()).count

    if (!res) return { error: 'Server error' }
    return { success: res }
}*/