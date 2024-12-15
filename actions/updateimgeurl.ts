'use server'

import Image from "@/model/Image"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import {  ImageUrlUpdateSchema } from "@/schema"
import * as z from 'zod'
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"

interface Decoded extends JwtPayload {
    id: string
}

export const updateImageUrl = async (imageData: z.infer<typeof ImageUrlUpdateSchema>) => {
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

        const validatedFields = ImageUrlUpdateSchema.safeParse(imageData);
        if (validatedFields.error) {
            
            return { failed: validatedFields.error.errors };
        }

        if (!imageData.detail && !imageData.url) {
            
            return { error: 'One information is required for update' };
        }

        if (imageData.detail) await Image.findByIdAndUpdate(imageData.id, { detail: imageData.detail });
        if (imageData.url) await Image.findByIdAndUpdate(imageData.id, { detail: imageData.url });
        
        return { success: 'Success' }
    }
    catch (err) {
        return { error: 'Server error' }
    }
}