'use server'

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import Token from "@/model/Token";
import Admin from "@/model/Admin";
import { connectToMongo } from "@/lib/mongo";
import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import * as z from 'zod';
import { getArtSchema } from "@/schema";

interface Decoded extends JwtPayload {
    id: string
}

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

    const validatedFields = getArtSchema.safeParse(value);
    if(validatedFields.error) return {failed: validatedFields.error.errors}

    const Article = value.Article;
    const date = value.date;
    const source = value.source;

    const article: PostgrestSingleResponse<Art[]> = await supabase.from('article').select().eq('title', Article).eq('date', date)

    if (!article.data || article.data.length === 0) { return { error: 'No article' } }

    const currentDate = new Date().toLocaleDateString();

    const res = await supabase.from('numberclickarticle').insert({
        title: article.data[0].title,
        source: source,
        date: currentDate
    })



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

    const supabaseUser = createClient();

    const { data, error } = await supabaseUser.auth.getUser();

    if (data.user) return {
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
    };



    const Cookie = cookies().get('admin-log');

    if (Cookie) {
        try {
            await connectToMongo();

            const token = await Token.findOne({ token: Cookie.value });
            if (!token) {
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
            }

            const decoded = jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded
            if (!decoded) {
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
            }

            const account = await Admin.findById(decoded.id)


            if (!account) return {
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
            };
        }
        catch (err) {
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
}