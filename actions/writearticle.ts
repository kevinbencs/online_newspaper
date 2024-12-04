'use server'

import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"
import { supabase } from "@/utils/supabase/article";
import { NewArticleSchema } from "@/schema";
import * as z from 'zod'

interface Decoded extends JwtPayload {
    id: string
}


export const WriteArticle = async (value: z.infer<typeof NewArticleSchema>) => {
    const cookie = cookies().get('admin-log');
    if (!cookie) return { error: 'Please log in' };

    try {

        const token = await Token.findOne({ token: cookie.value });
        if (!token) {
            
            return { error: 'Please log in' };
        }

        const decoded = jwt.verify(token.token, process.env.SECRET_CODE!) as Decoded;
        if (!decoded) {
            
            return { error: 'Please log in' };
        }

        const account = await Admin.findById(decoded.id);
        if (!account) {
            
            return { error: 'Please log in' };
        }

        const validatedFields = NewArticleSchema.safeParse(value);
        if (validatedFields.error) return { failed: validatedFields.error.errors };

        const currentDate: string = new Date().toLocaleDateString();
        const currentTime: string = new Date().toLocaleTimeString();

        if(value.important === 'Second most important') {
            const Arts = await supabase.from('article').select().eq('important', 'Second most important');
            if (Arts.data?.length === 2) {
                const Update = await supabase.from('article').update({ 'important': 'Second most important' }).eq('important', 'important').order('id').limit(1)
                console.log(Update.error)
            }
        }

        if(value.important === 'Most important') {
            const Arts = await supabase.from('article').select().eq('important', 'Second most important');
            if (Arts.data?.length === 2) {
                const Update = await supabase.from('article').update({ 'important': 'important' }).eq('important', 'Second most important').order('id').limit(1)
                console.log(Update.error)
            }

            const Art2 = await supabase.from('article').update({ 'important': 'Second most important' }).eq('important', 'Most important');
            console.log(Art2.error)
        }

        const { data, error } = await supabase.from('article').insert({
            date: currentDate,
            time: currentTime,
            text: value.text,
            title: value.title,
            first_element: value.first_element,
            first_element_url: value.first_element_url,
            author: account.name,
            category: value.category,
            important: value.important,
            paywall: value.paywall,
            paywall_text: value.paywall_text,
            sidebar: value.sidebar,
            themes: value.themes,
            cover_img_id: value.cover_img_id,
            keyword: value.keyword,
            detail: value.detail
        })

        if (error) {
            console.log(error);
            return { error: 'Server error' }
        }

        return { success: 'Success' }
    }
    catch (err) {
        console.log(err)
        return { error: 'Server error' }
    }
}