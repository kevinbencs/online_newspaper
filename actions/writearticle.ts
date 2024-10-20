'use server'

import mongoose from "mongoose"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"
import { supabase } from "@/utils/supabase/article";

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




export const WriteArticle = async () => {
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

        const currentDate: string = new Date().toLocaleDateString();
        const currentTime: string = new Date().toLocaleTimeString();

        const {data, error} = await supabase.from('article').insert({
            date: currentDate,
            time: currentTime,
            text: 'fa',
            title: 'e',
            first_element: 'wf',
            first_element_url:'fsa',
            author: 'afe',
            category: 'fa',
            important: 'ad',
            paywall: false,
            sidebar: false,
            themes: 'fa'
        })

        await closeConnection()

        return { success: 'Success' }
    }
    catch (err) {
        return { error: 'Server error' }
    }
}