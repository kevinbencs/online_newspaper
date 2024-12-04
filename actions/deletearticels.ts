'use server'

import { supabase } from "@/utils/supabase/article"

export const deleteArticle = async () => {
    const deleteArt = await supabase.from('article').delete().in('id',[1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19, 20])

    return {res: 'Ok'}
}