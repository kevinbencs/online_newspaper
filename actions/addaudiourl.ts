/*'use server'

import Audio from "@/model/Audio"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { AudioVideoUrlSchema } from "@/schema"
import * as z from 'zod'
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"

interface Decoded extends JwtPayload {
    id: string
}


export const addAudioUrl = async (audioData: z.infer<typeof AudioVideoUrlSchema>) => {
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

        if(account.role !== 'Admin' && account.role !== 'Editor'){

            return { error: 'Please log in' };
        }

        const validatedFields = AudioVideoUrlSchema.safeParse(audioData);
        if(validatedFields.error) return {failed: validatedFields.error.errors};

        const audio = await Audio.findOne({url: audioData.url})
        if(audio) {

            return {error: "Url is in the database"}
        }*/

        /*const date = new Date().getDate().toString();

        const NewVideoUrl = new Audio({
            url: audioData.url,
            title: audioData.title,
            date: date
        })

        await NewVideoUrl.save();*/

/*        return {success: 'Success'}
    }
    catch(err){
        return {error: 'Server error'}
    }
}*/