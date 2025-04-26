'use server'

import { searchArtSchema } from "@/schema";
import { supabase } from "@/utils/supabase/article"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
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

export const searchNews = async (value: z.infer<typeof searchArtSchema>) => {
    try {
        const validateFields = searchArtSchema.safeParse(value);
        if (validateFields.error) return { failed: validateFields.error.errors }

        const category = value.category
        const text = value.text
        const date_from = value.date_from
        const date_to = value.date_to
        const author = value.author
        const page = value.page
        const filter = value.filter

        let queryTitle = supabase.from('article').select('id, date, title, detail, cover_img_id, author, category, paywall', { count: 'exact' }).ilike('title', `%${text}%`).order('id', { ascending: false }).eq('locked', false);
        let queryTheme = supabase.rpc('select_article_by_theme', { search_text: text }).not('title', 'ilike', `%${text}%`).order('id', { ascending: false }).eq('locked', false);

        if (page && page > 0) {
            queryTitle = queryTitle.range((page - 1) * 20, page * 20 - 1)
            queryTheme = queryTheme.range((page - 1) * 20, page * 20 - 1)
        }
        else {
            queryTitle = queryTitle.limit(20)
            queryTheme = queryTheme.limit(20)
        }

        if (category) {
            queryTitle = queryTitle.eq('category', category.replaceAll('-', ' & ').slice(0, 1).toUpperCase() + category.slice(1, category.length));
            queryTheme = queryTheme.eq('category', category.replaceAll('-', ' & ').slice(0, 1).toUpperCase() + category.slice(1, category.length));
        }

        if (date_from) {
            queryTitle = queryTitle.gte('date', date_from.replaceAll('-', '. ') + '.');
            queryTheme = queryTheme.gte('date', date_from.replaceAll('-', '. ') + '.');
        }

        if (date_to) {
            queryTitle = queryTitle.lte('date', date_to.replaceAll('-', '. ') + '.');
            queryTheme = queryTheme.lte('date', date_to.replaceAll('-', '. ') + '.');
        }

        if (author) {
            queryTitle = queryTitle.eq('author', author.replaceAll('_', ' '));
            queryTheme = queryTheme.eq('author', author.replaceAll('_', ' '));
        }



        if (page && page > 0) {
            if (filter === 'title') {
                queryTitle = queryTitle.range((page - 1) * 20, page * 20 - 1);
                queryTheme = queryTheme.limit(20);
            }
            else if (filter === 'theme') {
                queryTitle = queryTitle.limit(20);
                queryTheme = queryTheme.range((page - 1) * 20, page * 20 - 1);
            }
            else if (filter === 'text') {
                queryTitle = queryTitle.limit(20);
                queryTheme = queryTheme.limit(20);
            }
            else {
                queryTitle = queryTitle.limit(20);
                queryTheme = queryTheme.limit(20);
            }

        }
        else {
            queryTitle = queryTitle.limit(20);
            queryTheme = queryTheme.limit(20);
        }

        let cat2 = null
        if (category) {
            cat2 = category.replaceAll('-', ' & ')?.slice(0, 1).toUpperCase() + category.slice(1, category.length);
        }

        const params = {
            start_date: (date_from === '' || date_from === undefined) ? null : date_from?.replaceAll('-', '. ') + '.',
            end_date: (date_to === '' || typeof date_to === undefined) ? null : date_to?.replaceAll('-', '. ') + '.',
            author_filter: (author === '' || author === undefined) ? null : author?.replaceAll('_', ' '),
            search_text: text,
            page: (typeof page === 'number' && filter === 'text') ? page : null,
            category_filter: (category === '' || category === undefined) ? null : cat2
        }

        const resTitle: PostgrestSingleResponse<Data[]> = await queryTitle;
        const resTheme: PostgrestSingleResponse<Data[]> = await queryTheme;
        const resText: PostgrestSingleResponse<Data[]> = await supabase.rpc('select_article_by_text19', params).order('id', { ascending: false }).eq('locked', false)


        if (resText.error || resTheme.error || resTitle.error) return { error: 'Server error', filt: 'none', lastPage: 0 }

        if (resTheme.data) {
            if (filter === 'theme' && resTheme.data.length > 0) {
                return { success: { data: resTheme, resTitle: resTitle.data.length, resTheme: resTheme.data.length, resText: resText.data.length }, filt: 'theme', lastPage: Math.ceil(resTheme.data.length / 20) }
            }
        }


        if (filter === 'text' && resText.data.length > 0) {
            return { success: { data: resText, resTitle: resTitle.data.length, resTheme: resTheme.data.length, resText: resText.data.length }, filt: 'text', lastPage: Math.ceil(resText.data.length / 20) }
        }


        if (resTitle.count) {
            if (resTitle.count > 0) {
                return { success: { data: resTitle, resTitle: resTitle.data.length, resTheme: resTheme.data.length, resText: resText.data.length }, filt: 'title', lastPage: Math.ceil(resTitle.count / 20) }
            }
            else if (resTheme.data) {
                if (resTheme.data.length > 0) {
                    return { success: { data: resTheme, resTitle: resTitle.data.length, resTheme: resTheme.data.length, resText: resText.data.length }, filt: 'theme', lastPage: Math.ceil(resTheme.data.length / 20) }
                }
                else if (resText.data.length > 0) {
                    return { success: { data: resText, resTitle: resTitle.data.length, resTheme: resTheme.data.length, resText: resText.data.length }, filt: 'text', lastPage: Math.ceil(resText.data.length / 20) }
                }

            }
            else if (resText.data.length > 0) {
                return { success: { data: resText, resTitle: resTitle.data.length, resTheme: 0, resText: resText.data.length }, filt: 'text', lastPage: Math.ceil(resText.data.length / 20) }
            }
        }
        else if (resTheme.data) {
            if (resTheme.data.length > 0) {
                return { success: { data: resTheme, resTitle: resTitle.data.length, resTheme: resTheme.data.length, resText: resText.data.length }, filt: 'theme', lastPage: Math.ceil(resTheme.data.length / 20) }
            }
            else if (resText.data.length > 0) {
                return { success: { data: resText, resTitle: resTitle.data.length, resTheme: resTheme.data.length, resText: resText.data.length }, filt: 'text', lastPage: Math.ceil(resText.data.length / 20) }
            }

        }
        else if (resText.data.length > 0) {
            return { success: { data: resText, resTitle: resTitle.data.length, resTheme: 0, resText: resText.data.length }, filt: 'text', lastPage: Math.ceil(resText.data.length / 20) }
        }


        return { noData: 'No data', filt: 'none', lastPage: 0 }
    } catch (error) {
        console.log(error)
        return { error: 'Server error' }
    }


}