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
        try {
            await mongoose.connect(process.env.MONGODB_URI!);
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

interface Decoded extends JwtPayload {
    id: string
}


export const changeAdminPassword = async (values: z.infer<typeof NewPasswordSchema>) => {

    try {
        const Cookies = cookies().get('admin-log');
        if (!Cookies) return { error: 'Please log in' };

        await connectToMongo();

        const token = await Token.findOne({ token: Cookies.value });

        if (!token) {
            await closeConnection();
            return { error: "PLease log in" };
        }

        const decoded = jwt.verify(token.token, process.env.SECRET_CODE!) as Decoded;

        if (!decoded) {
            await closeConnection(); 
            return { error: 'Please log in' };
        }

        const validatedFields = NewPasswordSchema.safeParse(values);

        if (validatedFields.error) {
            await closeConnection();
            return { failed: validatedFields.error.errors };
        }

        const newPassword = await hash(values.password, 12);

        const res = await Admin.findByIdAndUpdate(decoded.id, { password: newPassword })
        await closeConnection();
        if (!res) return { error: 'Please log in' };

        return { success: 'Password changed.' }

    }
    catch (error) {
        return { error: 'Server error' }
    }
}