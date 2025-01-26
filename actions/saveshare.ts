'use server'

import { shareSchema } from "@/schema"
import * as z from 'zod'
import { createClient } from "@/utils/supabase/server";

export const saveShare = async (value: z.infer<typeof shareSchema>) => {
    try {
        const validateFields = shareSchema.safeParse(value);
        if (validateFields.error) return { failed: validateFields.error.errors }

        const supabase = createClient();

        const date = new Date().toLocaleDateString();
        const res = await supabase.from('share').insert({
            url: value.url,
            share: value.share,
            date: date
        })


        if(res.error) return {error: 'Server error'}

        return {success: 'success'}
    } catch (error) {
        console.log(error);
        return {error: 'Server error'}
    }
};

