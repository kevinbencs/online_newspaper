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


export const isLogged = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (data.user) return { role: 'user', name: '' };

    const Cookie = cookies().get('admin-log');

    if (Cookie) {
        try {
            await connectToMongo();
            const token = await Token.findOne({ token: Cookie.value });

            if (!token) return { role: '', name: '' };
            const decoded = jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded
            if (!decoded) return { role: '', name: '' };

            const account = await Admin.findById(decoded.id)

            if (!account) return { role: '', name: '' };

            return { role: decoded.role, name: decoded.name };
        }
        catch (err) {
            return { role: '', name: '' }
        }
    }

    return { role: '', name: '' };
}