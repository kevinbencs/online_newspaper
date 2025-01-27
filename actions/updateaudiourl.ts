'use server'

import Audio from "@/model/Audio"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import {  AudioVideoUrlUpdateSchema } from "@/schema"
import * as z from 'zod'
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"

interface Decoded extends JwtPayload {
    id: string
}


export const updateAudioUrl = async (videoData: z.infer<typeof AudioVideoUrlUpdateSchema>) => {
    const Cookie = cookies().get('admin-log');
    if (!Cookie) return { error: 'Please log in' };

    try {
        const token = await Token.findOne({ token: Cookie.value });
        if (!token) {
            
            return { error: 'Please log in' };
        }

        const decoded = await jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded;
        if (!decoded) {
            
            return { error: 'Please log in' };
        }

        const account = await Admin.findById(decoded.id);
        if (!account) {
            
            return { error: 'Please log in' };
        }

        const validatedFields = AudioVideoUrlUpdateSchema.safeParse(videoData);
        if (validatedFields.error) {
            
            return { failed: validatedFields.error.errors };
        }

        if (!videoData.title && !videoData.url) {
            
            return { error: 'One information is required for update' };
        }

        /*if (videoData.title) await Audio.findByIdAndUpdate(videoData.id, { detail: videoData.title });
        if (videoData.url) await Audio.findByIdAndUpdate(videoData.id, { detail: videoData.url });*/


        
        return { success: 'Success' }
    }
    catch (err) {
        return { error: 'Server error' }
    }
}