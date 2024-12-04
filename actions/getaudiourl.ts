'use server'

import Audio from "@/model/Audio"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"
import * as z from 'zod'
import { idSchema } from "@/schema"

interface Decoded extends JwtPayload {
    id: string
}

interface audioUrl {
    _id: string,
    url: string,
    title: string,
    date: string,
}


export const getAudioUrl = async () => {
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

        const aud: audioUrl[] = await Audio.find();

        
        return {success: JSON.parse(JSON.stringify(aud))};
    }
    catch(err){
        return {error: 'Server error'}
    }
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