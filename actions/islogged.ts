'use server'

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import Token from "@/model/Token";
import Admin from "@/model/Admin";
import mongoose from "mongoose";

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


export const isLogged = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (data.user) return { role: 'user', name: '' };

    const Cookie = cookies().get('admin-log');

    if (Cookie) {
        try {
            await connectToMongo();

            const token = await Token.findOne({ token: Cookie.value });
            if (!token) {
                await closeConnection();
                return { role: '', name: '' };
            }

            const decoded = jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded
            if (!decoded) {
                await closeConnection();
                return { role: '', name: '' };
            }

            const account = await Admin.findById(decoded.id)

            await closeConnection();

            if (!account) return { role: '', name: '' };

            return { role: account.role , name: account.name };
        }
        catch (err) {
            return { role: '', name: '' }
        }
    }

    return { role: '', name: '' };
}