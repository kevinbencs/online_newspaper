'use server'

import Video from "@/model/Video"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import mongoose from "mongoose"
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

export const getVideoUrl = async () => {
    const Cookie = cookies().get('admin-log');
    if(!Cookie) return {error: 'Please log in'};

    try{
        await connectToMongo();
        const token = await Token.findOne({token: Cookie.value});
        if(!token) {
            await closeConnection();
            return { error: 'Please log in' };
        }

        const decoded = await jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded;
        if(!decoded) {
            await closeConnection();
            return { error: 'Please log in' };
        }

        const account = await Admin.findById(decoded.id);
        if(!account) {
            await closeConnection();
            return { error: 'Please log in' };
        }

        const video = await Video.find();
        await closeConnection();
        return {success: video};
    }
    catch(err){
        return {error: 'Server error'}
    }
}

export const getVideoById =async (value: z.infer<typeof idSchema>) => {
    try {
        await connectToMongo();

        const vid: videoUrl | null = await Video.findById(value.id);

        await closeConnection();
        return { success: vid }
    }
    catch (err) {
        return { error: 'Server error' }
    }
}