'use server'

import mongoose from "mongoose"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"
import { supabase } from "@/utils/supabase/article";
import { NewArticleSchema } from "@/schema";
import * as z from 'zod'

interface Decoded extends JwtPayload {
    id: string
}

async function connectToMongo() {
    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(process.env.MONGODB_URI!,); // A Mongoose kapcsolat létrehozása
        }
        catch (error) {
            console.error('Failed to connect to MongoDB:', error);
            throw new Error('MongoDB connection failed');
        }
    }
}

async function closeConnection() {
    if (mongoose.connection.readyState !== 0) {
        try {
            await mongoose.connection.close(); 
        }
        catch (error) {
            console.error('Failed to close the connection:', error);
            throw new Error('Failed to close the connection');
        }
    }
}




export const WriteArticle = async (value: z.infer<typeof NewArticleSchema>) => {
    const cookie = cookies().get('admin-log');
    if (!cookie) return { error: 'Please log in' };

    try {
        await connectToMongo();

        const token = await Token.findOne({ token: cookie.value });
        if (!token) {
            await closeConnection();
            return { error: 'Please log in' };
        }

        const decoded = jwt.verify(token.token, process.env.SECRET_CODE!) as Decoded;
        if (!decoded) {
            await closeConnection();
            return { error: 'Please log in' };
        }

        const account = await Admin.findById(decoded.id);
        if (!account) {
            await closeConnection();
            return { error: 'Please log in' };
        }

        await closeConnection()

        const validatedFields = NewArticleSchema.safeParse(value);
        if(validatedFields.error) return {failed: validatedFields.error.errors};

        const currentDate: string = new Date().toLocaleDateString();
        const currentTime: string = new Date().toLocaleTimeString();

        const {data, error} = await supabase.from('article').insert({
            date: currentDate,
            time: currentTime,
            text: value.text,
            title: value.title,
            first_element: value.first_element,
            first_element_url: value.first_element_url,
            author: account.name,
            category: value.category,
            important: value.important,
            paywall: value.paywall,
            sidebar: value.sidebar,
            themes: value.themes,
        })

        if(error) return{error: 'Server error'}

        return { success: 'Success' }
    }
    catch (err) {
        return { error: 'Server error' }
    }
}