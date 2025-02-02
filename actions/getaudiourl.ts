'use server'

import Audio from "@/model/Audio"
import * as z from 'zod'
import { idSchema } from "@/schema"

interface audioUrl {
    _id: string,
    url: string,
    title: string,
    date: string,
}



export const getAudioById = async (value: z.infer<typeof idSchema>) => {

    try {
        const audio: audioUrl | null = await Audio.findById(value.id);

        return { success: JSON.parse(JSON.stringify(audio)) }
    }
    catch (err) {
        return { error: 'Server error' }
    }
}