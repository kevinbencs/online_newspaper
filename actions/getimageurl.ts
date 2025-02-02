'use server'

import Image from "@/model/Image"
import * as z from 'zod'
import { idSchema } from "@/schema"


interface img {
    url: string,
    detail: string,
    alt: string,
    _id: string
}

export const getImageById = async (value: z.infer<typeof idSchema>) => {
    
    try {
        const image: img | null = await Image.findById(value.id);
        
        return { success: JSON.parse(JSON.stringify(image)) }
    }
    catch (err) {
        return { error: 'Server error' }
    }
}