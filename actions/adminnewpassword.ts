'use server'

import { NewPasswordSchema } from '@/schema'
import * as z from 'zod'
import mongoose from 'mongoose';
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"
import Admin from '@/model/Admin';
import { hash } from 'bcrypt'
import Token from '@/model/Token';

async function connectToMongo() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI!); // A Mongoose kapcsolat létrehozása
    }
}

interface Decoded extends JwtPayload {
    id: string
}


export const changeAdminPassword = async (values: z.infer<typeof NewPasswordSchema>) => {
    const validatedFields = NewPasswordSchema.safeParse(values);

    if (validatedFields.error) return { failed: validatedFields.error.errors };

    const newPassword = await hash(values.password, 12);



    try {
        await connectToMongo();

        const Cookies = cookies().get('admin-log');
        if(!Cookies) return {error: 'Please log in'};

        const token = await Token.findOne({token: Cookies.value});

        if(!token) return {error: "PLease log in"};

        const decoded = jwt.verify(token.token, process.env.SECRET_CODE!) as Decoded;

        if(!decoded) return {error: 'Token error'}

        const res = await Admin.findByIdAndUpdate(decoded.id,  {password: newPassword})
        if(!res) return {error: 'Token error'}
        
        return {success: 'Password changed.'}

    }
    catch (error) {
        return { error: 'Server error' }
    }



}