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
    first_element: string,
    first_element_url: string,
    author: string,
    category: string,
    cover_img_id: string,
    keyword: string[],
    detail: string
}



export const getArticleMetadata = async (value: z.infer<typeof getArtSchema>) => {

    const validatedFields = getArtSchema.safeParse(value);
    if(validatedFields.error) return {failed: validatedFields.error.errors}

    const Article = value.Article;
    const date = value.date;
 

    const article: PostgrestSingleResponse<Art[]> = await supabase.from('article').select().eq('title', Article).eq('date', date)

    if (!article.data || article.data.length === 0) { return { error: 'No article' } }


    return {
        data: {
            title: article.data[0].title,
            date: article.data[0].date,
            first_element: article.data[0].first_element,
            first_element_url: article.data[0].first_element_url,
            author: article.data[0].author,
            category: article.data[0].category,
            cover_img_id: article.data[0].cover_img_id,
            keyword: article.data[0].keyword,
            description: article.data[0].detail
        }
    }
    

 
    
}