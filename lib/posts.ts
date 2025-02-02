import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface Art {
    id: number,
    category: string,
    date: string,
    title: string,
    detail: string
}

export async function getPosts() {
    try {
        const { data, error }: PostgrestSingleResponse<Art[]> = await supabase.from('article').select('title, id, category, date, detail').eq('locked', false).order('id', {ascending: false}).limit(20)

        if (error) {
            console.log(error)
            return []
        }

        return data
    } catch (error) {
        return [];
    }

}