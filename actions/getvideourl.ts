'use server'

import Video from "@/model/Video"
import { idSchema } from "@/schema"
import * as z from 'zod'

interface videoUrl {
    _id: string,
    url: string,
    title: string
}


export const getVideoById =async (value: z.infer<typeof idSchema>) => {
    try {
        const vid: videoUrl | null = await Video.findById(value.id);
        
        return { success: JSON.parse(JSON.stringify(vid)) }
    }
    catch (err) {
        return { error: 'Server error' }
    }
}