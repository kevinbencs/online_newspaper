'use server'

import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";


interface Data {
    id: string,
    date: string,
    title: string,
    detail: string,
    category: string,
    cover_img_id: string,
    paywall: boolean
}

export const mainSection = async () => {
    try {
        const article1: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('title, date, id, category, detail, cover_img_id, paywall, important').eq('important', 'Most important').eq('locked', false);
        const article2: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('title, date, id, category, detail, cover_img_id, paywall, important').eq('important', 'Second most important').limit(2).order('id', { ascending: false }).eq('locked', false);
        const article3: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('title, date, id, category, detail, cover_img_id, paywall, important').eq('important', 'Important').limit(10).order('id', { ascending: false }).eq('locked', false);

        if (article1.error || article2.error || article3.error) return { error: 'Server error' };

        return { data: [...article1.data, ...article2.data, ...article3.data] };
    } catch (error) {
        console.log(error)
        return { error: 'Supabase error' }
    }

}

export const sectionTwo = async () => {
    try {
        const articles: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('title, date, id, category, detail, cover_img_id, paywall').eq('important', 'Not important').eq('locked', false).order('id', { ascending: false }).limit(13);

        if (articles.error) return { error: 'Server error' };

        return { data: articles.data };
    } catch (error) {
        console.log(error)
        return { error: 'Supabase error' }
    }

}


export const sectionVideo = async () => {
    try {
        const articles: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('title, date, id, category, detail, cover_img_id, paywall').eq('category', 'Video').eq('locked', false).order('id', { ascending: false }).limit(2);

        if (articles.error) return { error: 'Server error' };

        return { data: articles.data };
    } catch (error) {
        console.log(error)
        return { error: 'Supabase error' }
    }

}


