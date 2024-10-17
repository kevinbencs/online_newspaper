'use server'

import Task from "@/model/Task"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import mongoose from "mongoose"
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"

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

export const AddTask = async (inputValue: string) => {
    const cookie = cookies().get('admin-log');
    if (!cookie) return { error: 'Please log in' };

    try {
        await connectToMongo();

        const token = await Token.findOne({ token: cookie.value });
        if (!token) return { error: 'Please log in' };

        const decoded = jwt.verify(token.token, process.env.SECRET_CODE!) as Decoded;
        if (!decoded) return { error: 'Token error' };

        const account = await Admin.findById(decoded.id);
        if (!account) return { error: 'Token error' };

        const task = new Task({ task: inputValue });

        await task.save();

        return { success: 'Success' };
    }
    catch (err) {
        return { error: 'Server error' }
    }
}