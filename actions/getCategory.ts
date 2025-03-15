import Category from "@/model/Category"
import { connectToMongo } from "@/lib/mongo";
import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";


interface Cat {
    name: string,
    _id: string
}


interface Data {
    id: string,
    date: string,
    title: string,
    detail: string,
    cover_img_id: string
    paywall: boolean,
    author: string,
    category: string
}

export async function getCategory() {

    try {
        await connectToMongo();
        const category: Cat[] = await Category.find({}, { _id: 1, name: 1 }).sort({ name: 1 });

        return { success: JSON.parse(JSON.stringify(category)) }
    }
    catch (err) {
        console.log(err)
        return { error: 'Server error' }
    }
}

export const catArt = async (page: number, name: string) => {
    const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id, title, category, detail, cover_img_id, date, author, paywall').eq('category', name).range((page - 1) * 20, page * 20).order('id', { ascending: false }).eq('locked', false)

    return { res }
}

export const catArtNum = async (name: string) => {
    const res = (await supabase.from('article').select('id', { count: 'exact' }).eq('category', `${name.slice(0, 1).toUpperCase() + name.slice(1, name.length)}`).eq('locked', false)).count;

    if (res === null) return { res: 0 }

    return { res }
}