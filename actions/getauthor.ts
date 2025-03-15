'use server'

import Admin from "@/model/Admin";
import { connectToMongo } from "@/lib/mongo";
import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface author{
    _id: string,
    name: string,
    image: string,
    role: string
}

interface Data {
    id: string,
    date: string,
    title: string,
    detail: string,
    cover_img_id: string
    category: string,
    paywall: boolean,
    author: string
}


export const getAuthor = async () => {
    try {
        await connectToMongo()
        const res: author[] = await Admin.find({},'_id name image role').sort({importance: 1, name: 1});
        return {success: JSON.parse(JSON.stringify(res))}

    } catch (error) {
        console.log(error)
        return {error: 'Server error'}
    }
}

export const AuthArt = async (page:number, name: string) => {
    const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id, author, title, detail, cover_img_id, category, date, category, paywall').eq('author', name).range((page - 1) * 20, page * 20).order('id', { ascending: false }).eq('locked', false)

    return {res}
}

export const AuthArtNum = async ( name: string) => {
    const res = (await supabase.from('article').select('id, author', { count: 'exact' }).eq('author', name).eq('locked', false)).count;

    if(res === null) return {res: 0}

    return {res}
}
