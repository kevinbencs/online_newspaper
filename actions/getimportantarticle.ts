'use server'

import { supabase } from "@/utils/supabase/article"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { unstable_cache } from "next/cache";

interface Data {
    id: string,
    date: string,
    title: string,
    detail: string,
    cover_img_id: string
    author: string,
    category: string,
    paywall: boolean
}

interface DataRightSide {
    id: string,
    title: string,
    cover_img_id: string,
    category: string,
    date:string,

}



const getImpNewsNumCache1 = unstable_cache(
  async () => supabase.from('article').select('title, cover_img_id, id, category, date, important').eq('important', 'Most important').eq('locked',false),
  [`impNewNumSidebar1`],
  { tags: ["impNewNumSidebar1tag"] }
)

const getImpNewsNumCache2 = unstable_cache(
    async () => supabase.from('article').select('title, cover_img_id, id, category, date, important').eq('important', 'Second most important').order('id',{ ascending: false }).eq('locked',false),
    [`impNewNumSidebar2`],
    { tags: ["impNewNumSidebar2tag"] }
  )

  const getImpNewsNumCache3 = unstable_cache(
    async () => supabase.from('article').select('title, cover_img_id, id, category, date, important').eq('important', 'Important').limit(2).order('id',{ ascending: false }).eq('locked',false),
    [`impNewNumSidebar3`],
    { tags: ["impNewNumSidebar3tag"] }
  )

export const importantNewsRightSide = async () => {
    
    const res: PostgrestSingleResponse<DataRightSide[]> = await getImpNewsNumCache1() 
    const res2: PostgrestSingleResponse<DataRightSide[]> = await getImpNewsNumCache2()
    const res3: PostgrestSingleResponse<DataRightSide[]> = await getImpNewsNumCache3();
    
    if(res.error || res2.error || res3.error) return {error: 'Server error'};

    return {success: [...res.data,...res2.data, ...res3.data]}
}