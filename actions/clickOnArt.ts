'use server'

import { getArtSchema } from "@/schema";
import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import * as z from 'zod'

export const clickOnArt = async (value: z.infer<typeof getArtSchema>) => {
    const currentDate = new Date().toISOString().slice(0, 10).replaceAll('-', '. ') + '.';

    const validatedFields = getArtSchema.safeParse(value);
    if (validatedFields.error) return { failed: validatedFields.error.errors }

    const Article = value.Article;
    const date = value.date;
    const source = value.source;

    const article: PostgrestSingleResponse<{title: string, locked: boolean, date: string}[]> = await supabase.from('article').select('title, date, locked').eq('title', Article).eq('date', date).eq('locked', false)

    if (!article.data || article.data.length === 0) { return { error: 'No article' } }

    const res = await supabase.from('numberclickarticle').insert({
        title: article.data[0].title,
        source: source,
        date: currentDate
    })

    return { success: 'success' }
}