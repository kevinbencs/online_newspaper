'use server'

import Video from "@/model/Video"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { AudioVideoImageCategoryDeleteUrlSchema } from "@/schema"
import * as z from 'zod'
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"

interface Decoded extends JwtPayload {
    id: string
}


export const deleteVideoUrl = async (videoData: z.infer<typeof AudioVideoImageCategoryDeleteUrlSchema>) => {
    const Cookie = cookies().get('admin-log');
    if(!Cookie) return {error: 'Please log in'};

    try{
        const token = await Token.findOne({token: Cookie.value});
        if(!token) {
            
            return { error: 'Please log in' };
        }

        const decoded = await jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded;
        if(!decoded) {
            
            return { error: 'Please log in' };
        }

        const account = await Admin.findById(decoded.id);
        if(!account) {
            
            return { error: 'Please log in' };
        }

        const validatedFields = AudioVideoImageCategoryDeleteUrlSchema.safeParse(videoData);
        if(validatedFields.error) return {failed: validatedFields.error.errors};

        await Video.findByIdAndDelete(videoData.Id)
        
        return {success: 'Success'}
    }
    catch(err){
        return {error: 'Server error'}
    }
}