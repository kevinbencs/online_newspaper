'use server'

import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import * as z from 'zod'
import { getEditArtSchema } from "@/schema";



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
    important: string,
    detail: string
}



export const getEditArticle = async (value: z.infer<typeof getEditArtSchema>) => {

    try {

        const validateFields = getEditArtSchema.safeParse(value);
        if (validateFields.error) return { failed: validateFields.error.errors }

        const title = value.title;
        const date = value.date

        const article: PostgrestSingleResponse<Art[]> = await supabase.from('article').select().eq('title', title).eq('date', date)

        if (!article.data || article.data.length === 0) { return { error: 'No article' } }

        const TextArr = article.data[0].text.split('$');

        const PaywallTextArr = article.data[0].paywall_text.split('$');


        for (let i = 0; i < TextArr.length; i++) {
            if (TextArr[i].indexOf('<video') === 0) {
                const index1 = TextArr[i].indexOf('(');
                const index2 = TextArr[i].indexOf(')');
                const s = TextArr[i].slice(index1 + 1, index2)
                TextArr[i] = `<video id=(${s.split(';')[1]})></video>`
            }

            if (TextArr[i].indexOf('<audio') === 0) {
                const index1 = TextArr[i].indexOf('(');
                const index2 = TextArr[i].indexOf(')');
                const s = TextArr[i].slice(index1 + 1, index2)
                TextArr[i] = `<audio id=(${s.split(';')[1]})></<audio>`
            }

            if (TextArr[i].indexOf('<Image') === 0) {
                const index1 = TextArr[i].indexOf('(');
                const index2 = TextArr[i].indexOf(')');
                const s = TextArr[i].slice(index1 + 1, index2)
                TextArr[i] = `<Image id=(${s.split(';')[1]})/>`
            }
        }


        for (let i = 0; i < PaywallTextArr.length; i++) {
            if (PaywallTextArr[i].indexOf('<video') === 0) {
                const index1 = TextArr[i].indexOf('(');
                const index2 = TextArr[i].indexOf(')');
                const s = TextArr[i].slice(index1 + 1, index2)
                PaywallTextArr[i] = `<video id=(${s.split(';')[1]})></video>`
            }

            if (PaywallTextArr[i].indexOf('<audio') === 0) {
                const index1 = TextArr[i].indexOf('(');
                const index2 = TextArr[i].indexOf(')');
                const s = TextArr[i].slice(index1 + 1, index2)
                PaywallTextArr[i] = `<audio id=(${s.split(';')[1]})></<audio>`
            }

            if (PaywallTextArr[i].indexOf('<Image') === 0) {
                const index1 = TextArr[i].indexOf('(');
                const index2 = TextArr[i].indexOf(')');
                const s = TextArr[i].slice(index1 + 1, index2)
                PaywallTextArr[i] = `<Image id=(${s.split(';')[1]})/>`
                console.log(PaywallTextArr[i])
            }
        }

        let firstElUrl: string;

        if (article.data[0].first_element === 'Image' || article.data[0].first_element === 'Video') firstElUrl = article.data[0].first_element_url.split(';')[1];
        else firstElUrl = article.data[0].first_element_url




        return {
            data: {
                title: article.data[0].title,
                text: TextArr.join('$'),
                first_element: article.data[0].first_element,
                first_element_url: firstElUrl,
                category: article.data[0].category,
                paywall: false,
                sidebar: article.data[0].sidebar,
                cover_img_id: article.data[0].cover_img_id.split(';')[1],
                keyword: article.data[0].keyword,
                id: article.data[0].id,
                paywall_text: PaywallTextArr.join('$'),
                important: article.data[0].important,
                detail: article.data[0].detail
            }
        };
    }
    catch (err) {
        return {
            error: 'Server error'
        }
    }

}