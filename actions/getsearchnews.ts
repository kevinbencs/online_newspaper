'use server'

import { supabase } from "@/utils/supabase/article"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { cookies } from "next/headers"

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

export const searchNews = async (
    category: string | undefined | null, text: string, date_from: string | undefined | null, date_to: string | undefined | null, author: string | undefined | null, page: number | undefined | null, filter: string | undefined | null
) => {
    // disable cache for this server action
    const _cookie = cookies()

    let queryTitle = supabase.from('article').select('id, date, title, detail, cover_img_id, author, category, paywall', { count: 'exact' }).ilike('title', `%${text}%`);
    let queryTheme = supabase.from('article').select('id, date, title, detail, cover_img_id, author, category, paywall', { count: 'exact' }).contains('keyword', [text]).not('title', 'like', `%${text}%`);

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
            queryTitle = queryTitle.range((page - 1) * 20, page * 20);
            queryTheme = queryTheme.limit(20);
        }
        else if (filter === 'theme') {
            queryTitle = queryTitle.limit(20);
            queryTheme = queryTheme.range((page - 1) * 20, page * 20);
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
    const resText: PostgrestSingleResponse<Data[]> = await supabase.rpc('select_article_by_text16', params)

    if (resText.error || resTheme.error || resTitle.error) return { error: 'Server error', filt: 'none', lastPage: 0 }

    if (resTheme.count) {
        if (filter === 'theme' && resTheme.count > 0) {
            return { success: { data: resTheme, resTitle: resTitle.data.length, resTheme: resTheme.data.length, resText: resText.data.length }, filt: 'theme', lastPage: Math.round(resTheme.count / 20) }
        }
    }


    if (filter === 'text' && resText.data.length > 0) {
        return { success: { data: resText, resTitle: resTitle.data.length, resTheme: resTheme.data.length, resText: resText.data.length }, filt: 'text', lastPage: Math.round(resText.data.length / 20) }
    }


    if (resTitle.count) {
        if (resTitle.count > 0) {
            return { success: { data: resTitle, resTitle: resTitle.data.length, resTheme: resTheme.data.length, resText: resText.data.length }, filt: 'title', lastPage: Math.round(resTitle.count / 20) }
        }
        else if (resTheme.count) {
            if (resTheme.count > 0) {
                return { success: { data: resTheme, resTitle: resTitle.data.length, resTheme: resTheme.data.length, resText: resText.data.length }, filt: 'theme', lastPage: Math.round(resTheme.count / 20) }
            }
            else if (resText.data.length > 0) {
                return { success: { data: resText, resTitle: resTitle.data.length, resTheme: resTheme.data.length, resText: resText.data.length }, filt: 'text', lastPage: Math.round(resText.data.length / 20) }
            }

        }
        else if (resText.data.length > 0) {
            return { success: { data: resText, resTitle: resTitle.data.length, resTheme: resTheme.data.length, resText: resText.data.length }, filt: 'text', lastPage: Math.round(resText.data.length / 20) }
        }
    }
    else if (resTheme.count) {
        if (resTheme.count > 0) {
            return { success: { data: resTheme, resTitle: resTitle.data.length, resTheme: resTheme.data.length, resText: resText.data.length }, filt: 'theme', lastPage: Math.round(resTheme.count / 20) }
        }
        else if (resText.data.length > 0) {
            return { success: { data: resText, resTitle: resTitle.data.length, resTheme: resTheme.data.length, resText: resText.data.length }, filt: 'text', lastPage: Math.round(resText.data.length / 20) }
        }

    }
    else if (resText.data.length > 0) {
        return { success: { data: resText, resTitle: resTitle.data.length, resTheme: resTheme.data.length, resText: resText.data.length }, filt: 'text', lastPage: Math.round(resText.data.length / 20) }
    }


    return { noData: 'No data', filt: 'none', lastPage: 0 }
}