'use server'

import { supabase } from "@/utils/supabase/article"
import { PostgrestSingleResponse } from "@supabase/supabase-js";


export const getArtUrl = async () => {
    const {data}: PostgrestSingleResponse<{title: string, date: string, category: string}[]> = await supabase.from('article').select('title, category, date, locked').eq('locked', false);

    return {data}
}


export const getPaywallArtUrl = async () => {
    const {data}: PostgrestSingleResponse<{title: string, date: string, category: string}[]> = await supabase.from('article').select('title, category, date, locked').eq('locked', false).eq('paywall',true);

    return {data}
}