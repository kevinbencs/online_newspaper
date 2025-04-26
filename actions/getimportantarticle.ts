'use server'

import { supabase } from "@/utils/supabase/article"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

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
  date: string,

}



export const importantNewsRightSide = async () => {
  try {
    const res: PostgrestSingleResponse<DataRightSide[]> = await supabase.from('article').select('title, cover_img_id, id, category, date, important').eq('important', 'Most important').eq('locked', false);
    const res2: PostgrestSingleResponse<DataRightSide[]> = await supabase.from('article').select('title, cover_img_id, id, category, date, important').eq('important', 'Second most important').order('id', { ascending: false }).eq('locked', false)
    const res3: PostgrestSingleResponse<DataRightSide[]> = await supabase.from('article').select('title, cover_img_id, id, category, date, important').eq('important', 'Important').limit(2).order('id', { ascending: false }).eq('locked', false);

    if (res.error || res2.error || res3.error) return { error: 'Server error' };

    return { success: [...res.data, ...res2.data, ...res3.data] }
  } catch (error) {
    console.log(error)
    return { error: 'Supabase error' }
  }


}



export const impArt = async (page: number) => {
  try {
    const res: PostgrestSingleResponse<Data[]> = await supabase.from('article').select('id, date, title, detail, cover_img_id, author, category, paywall').neq('important', 'Not important').range((page - 1) * 20, page * 20 - 1).order('id', { ascending: false }).eq('locked', false)

    return { res }
  } catch (error) {
    console.log(error)
    return { error: 'Supabase error' }
  }

}


export const impArtNum = async () => {
  try {
    const res: number | null = (await supabase.from('article').select('*', { count: 'exact' }).neq('important', 'Not important').eq('locked', false)).count;

    if (res === null) return { numb: 0 }

    return { numb: res }
  } catch (error) {
    console.log(error)
    return { error: 'Supabase error' }
  }

}