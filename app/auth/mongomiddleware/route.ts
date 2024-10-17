import mongoose from 'mongoose';
import Token from '@/model/Token';
import jwt, { JwtPayload } from "jsonwebtoken"
import { NextRequest, NextResponse, } from 'next/server';
import Admin from '@/model/Admin';

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

interface Decoded extends JwtPayload {
    id: string
}


interface RequestBody {
    url: string;
    cookie: string
}


export async function POST(request: NextRequest) {


    const body = await request.json() as RequestBody;
    const { url } = body;
    const Cookie = body.cookie;

    try {
        await connectToMongo();
        const token = await Token.findOne({ token: Cookie })
        if (!token && (
            url === '/createdadmin' ||
            url.startsWith('/dashboard') ||
            url === '/delete_data' ||
            url.startsWith('/editarticle') ||
            url === '/newarticle' ||
            url === '/writenewsletter'
        )) {
            return NextResponse.json({ res: 'error' }, { status: 200 })
        }

        const decoded = jwt.verify(Cookie, process.env.SECRET_CODE!) as Decoded;

        if (!decoded && (
            url === '/createdadmin' ||
            url.startsWith('/dashboard') ||
            url === '/delete_data' ||
            url.startsWith('/editarticle') ||
            url === '/newarticle' ||
            url === '/writenewsletter'
        )) {
            return NextResponse.json({ res: 'error' }, { status: 200 })
        }

        const account = await Admin.findById(decoded.id)

        if (!account) { return NextResponse.json({ res: 'error' }, { status: 200 }) }

        if (account.role !== 'Admin' && url === '/createdadmin') {
            return NextResponse.json({ res: 'error' }, { status: 200 })
        }

        if (account && (
            url === '/signin' ||
            url === '/signup' ||
            url === '/dhdhdhsefgsgerhtrherwgerhagfws'
        )) {

            return NextResponse.json({ res: 'error' }, { status: 200 })
        }

        return NextResponse.json({ res: 'success' }, { status: 200 })
    }
    catch (err) {
        return NextResponse.json({ res: 'error' }, { status: 200 })
    }
}