'use server'

import Video from "@/model/Video"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"
import { idSchema } from "@/schema"
import * as z from 'zod'

interface Decoded extends JwtPayload {
    id: string
}

interface videoUrl {
    _id: string,
    url: string,
    title: string
}



export const getVideoUrl = async () => {
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

        const video = await Video.find();
        
        return {success: JSON.parse(JSON.stringify(video))};
    }
    catch(err){
        return {error: 'Server error'}
    }
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