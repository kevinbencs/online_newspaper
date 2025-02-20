/*'use server'

import { chooseTypeOfTextItemSearch } from "@/lib/makeSearchArt"
import { supabase } from "@/utils/supabase/article"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

export const getsearchArt = async () => {
    const res: PostgrestSingleResponse<{ text: string, title: string }[]> = await supabase.from('article').select('text, title')
    console.log(res)

    if (res.data)
        for (let i = 0; i < res.data.length; i++) {
            await supabase.from('article').update({
                search_art: res.data[i].text.split('$').map(item => chooseTypeOfTextItemSearch(item)).join(' ')
            }).eq('title',res.data[i].title)
        }

    
}*/