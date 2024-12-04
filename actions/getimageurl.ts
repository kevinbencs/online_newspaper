'use server'

import Image from "@/model/Image"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken";
import * as z from 'zod'
import { idSchema } from "@/schema"

interface Decoded extends JwtPayload {
    id: string
}

interface img {
    url: string,
    detail: string,
    alt: string,
    _id: string
}


export const getImageUrls = async () => {
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


        const image: img[] = await Image.find();
        
        return { success: JSON.parse(JSON.stringify(image)) }


    }
    catch (err) {
        console.log(err)
        return { error: 'Server error' }
    }
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