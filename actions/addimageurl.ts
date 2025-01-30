/*'use server'

import Image from "@/model/Image"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { ImageUrlSchema } from "@/schema"
import * as z from 'zod'
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"

interface Decoded extends JwtPayload {
    id: string
}

export const addImageUrl = async (imageoData: z.infer<typeof ImageUrlSchema>) => {
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

        const validatedFields = ImageUrlSchema.safeParse(imageoData);
        if(validatedFields.error) return {failed: validatedFields.error.errors};

        const data = await Image.findOne({url: imageoData.url});

        if(data) return {error: `Url is in database. Detail: ${data.detail}`}
*/
        /*const NewImageUrl = new Image({
            url: imageoData.url,
            detail: imageoData.detail
        })

        await NewImageUrl.save();*/

     /*   return {success: 'Success'}
    }
    catch(err){
        return {error: 'Server error'}
    }
}*/