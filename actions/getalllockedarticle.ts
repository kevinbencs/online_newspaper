'use server'

import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";


interface Art {
    title: string,
    id: string,
    category: string,
    date: string
}



export const getAllLockedArticle = async () => {

    try {

        const article: PostgrestSingleResponse<Art[]> = await supabase.from('article').select('title, id, category, date').order('id', { ascending: false }).eq('locked', true)

        if (!article.data || article.data.length === 0) { return { none: 'No articles' } }

        return {
            data: article.data
        };
    }
    catch (err) {
        console.log(err)
        return {
            error: 'Server error'
        }
    }
}

