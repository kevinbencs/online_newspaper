'use server'

import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface DataRightSide {
    id: string,
    title: string,
    cover_img_id: string,
    category: string,
    date: string
}

interface DataMainPage {
    id: string,
    title: string,
    date: string,
    time: string,
    category: string,
    paywall: boolean,
}


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


export const latestNewsMainPage = async () => {
    try {
        const article: PostgrestSingleResponse<DataMainPage[]> = await supabase.from('article').select('title, category, date, time, id, paywall').limit(6).eq('locked', false).order('id', { ascending: false })

        if (article.error) return { error: 'Server error' };


        article.data.map(val => {
            val.date = val.date.replaceAll(' ', '').replaceAll('.', '-');
            if (val.time.length === 8) val.date = val.date.slice(0, -1) + 'T' + val.time + 'Z'
            else val.date = val.date.slice(0, -1) + 'T0' + val.time + 'Z'
        })

        return { data: article.data };
    } catch (error) {
        console.log(error)
        return { error: 'Supabase error' }
    }

}



export const latestNewsRightSide = async () => {
    try {
        const article: PostgrestSingleResponse<DataRightSide[]> = await supabase.from('article').select('title, cover_img_id, id, category, date').eq('important', 'Not important').limit(5).eq('locked', false).order('id', { ascending: false });
        if (article.error) return { error: 'Server error' };

        return { success: article.data };
    } catch (error) {
        console.log(error)
        return { error: 'Supabase error' }
    }

}


export const LatestArt = async (page: number) => {
    try {
        const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id, date, title, detail, cover_img_id, author, category, paywall').range((page - 1) * 20, page * 20 - 1).order('id', { ascending: false }).eq('locked', false);

        return { res }
    } catch (error) {
        console.log(error)
        return { error: 'Supabase error' }
    }

}

export const LatestArtNum = async () => {
    try {
        const res = (await supabase.from('article').select('*', { count: 'exact' }).eq('locked', false)).count;

        if (res === null) return { res: 0 }
        return { res }
    } catch (error) {
        console.log(error)
        return { error: 'Supabase error' }
    }

}