'use server'

import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import * as z from 'zod';
import { getArtSchema } from "@/schema";


interface Art {
    title: string,
    date: string,
    text: string,
    first_element: string,
    first_element_url: string,
    author: string,
    category: string,
    paywall: boolean,
    sidebar: boolean,
    cover_img_id: string,
    keyword: string[],
    time: string,
    id: string,
    paywall_text: string,
    updated: boolean
}



export const getArticle = async (value: z.infer<typeof getArtSchema>) => {

    try {
        const validatedFields = getArtSchema.safeParse(value);
        if (validatedFields.error) return { failed: validatedFields.error.errors }

        const Article = value.Article;
        const date = value.date;

        const article: PostgrestSingleResponse<Art[]> = await supabase.from('article').select().eq('title', Article).eq('date', date).eq('locked', false)

        if (!article.data || article.data.length === 0) { return { error: 'No article' } }

        if (!article.data[0].paywall) {
            return {
                data: {
                    title: article.data[0].title,
                    date: article.data[0].date,
                    text: article.data[0].text,
                    first_element: article.data[0].first_element,
                    first_element_url: article.data[0].first_element_url,
                    author: article.data[0].author,
                    category: article.data[0].category,
                    paywall: false,
                    sidebar: article.data[0].sidebar,
                    cover_img_id: article.data[0].cover_img_id,
                    keyword: article.data[0].keyword,
                    time: article.data[0].time,
                    id: article.data[0].id,
                    updated: article.data[0].updated
                }
            }
        }

        return {
            data: {
                title: article.data[0].title,
                date: article.data[0].date,
                text: article.data[0].paywall_text,
                first_element: article.data[0].first_element,
                first_element_url: article.data[0].first_element_url,
                author: article.data[0].author,
                category: article.data[0].category,
                paywall: true,
                sidebar: article.data[0].sidebar,
                cover_img_id: article.data[0].cover_img_id,
                keyword: article.data[0].keyword,
                time: article.data[0].time,
                id: article.data[0].id,
                updated: article.data[0].updated
            }
        };
    } catch (error) {
        console.log(error);
        return { error: 'Server error' }
    }


}




export const getPaywallArticle = async (value: z.infer<typeof getArtSchema>) => {

    try {
        const validatedFields = getArtSchema.safeParse(value);
        if (validatedFields.error) return { failed: validatedFields.error.errors }

        const Article = value.Article;
        const date = value.date;

        const article: PostgrestSingleResponse<Art[]> = await supabase.from('article').select().eq('title', Article).eq('date', date).eq('locked', false).eq('paywall', true)

        if (!article.data || article.data.length === 0) { return { error: 'No article' } }

        return {
            data: {
                title: article.data[0].title,
                date: article.data[0].date,
                text: article.data[0].text,
                first_element: article.data[0].first_element,
                first_element_url: article.data[0].first_element_url,
                author: article.data[0].author,
                category: article.data[0].category,
                paywall: false,
                sidebar: article.data[0].sidebar,
                cover_img_id: article.data[0].cover_img_id,
                keyword: article.data[0].keyword,
                time: article.data[0].time,
                id: article.data[0].id,
                updated: article.data[0].updated
            }
        }

    } catch (error) {
        console.log(error);
        return { error: 'Server error' }
    }


}