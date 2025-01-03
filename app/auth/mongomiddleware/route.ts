import mongoose from 'mongoose';
import Token from '@/model/Token';
import jwt, { JwtPayload } from "jsonwebtoken"
import { NextRequest, NextResponse, } from 'next/server';
import Admin from '@/model/Admin';
import { supabase } from '@/utils/supabase/article';
import { PostgrestSingleResponse } from '@supabase/supabase-js';


interface Art {
    title: string,
    author: string,
}


async function connectToMongo() {
    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(process.env.MONGODB_URI!,);
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
            url === '/writenewsletter' ||
            url.startsWith('/lockedarticle') ||
            url === '/writecarrier'
            
        )) {
            return NextResponse.json({ res: 'error' }, { status: 400 })
        }

        const decoded = jwt.verify(Cookie, process.env.SECRET_CODE!) as Decoded;

        if (!decoded && (
            url === '/createdadmin' ||
            url.startsWith('/dashboard') ||
            url === '/delete_data' ||
            url.startsWith('/editarticle') ||
            url === '/newarticle' ||
            url === '/writenewsletter' ||
            url.startsWith('/lockedarticle')||
            url === '/writecarrier'
        )) {
            return NextResponse.json({ res: 'error' }, { status: 400 })
        }

        const account = await Admin.findById(decoded.id)

        if (!account && (
            url === '/createdadmin' ||
            url.startsWith('/dashboard') ||
            url === '/delete_data' ||
            url.startsWith('/editarticle') ||
            url === '/newarticle' ||
            url === '/writenewsletter' ||
            url.startsWith('/lockedarticle')||
            url === '/writecarrier'
        )) { return NextResponse.json({ res: 'error' }, { status: 400 }) }

        if (account.role !== 'Admin' && (url === '/createdadmin' || url === '/writecarrier' || url ==='/dashboard/delete_user_article_colleague_carrier')) {
            return NextResponse.json({ res: 'error' }, { status: 400 })
        }

        if ((account.role !== 'Admin' && account.role !== 'Editor') && url.startsWith('/lockedarticle')) {
            return NextResponse.json({ res: 'error' }, { status: 400 })
        }

        if (url.startsWith('/editarticle') && account.role !== 'Author') {
            const first_slash_index = url.indexOf("/", 13);
            const second_slash_index = url.indexOf("/", first_slash_index + 1);
            const third_slash_index = url.indexOf("/", second_slash_index + 1);
            const fourth_slash_index = url.indexOf("/", third_slash_index + 1);
            const category = url.slice(13, first_slash_index);
            const year = url.slice(first_slash_index + 1, second_slash_index)
            const moth = url.slice(second_slash_index + 1, third_slash_index);
            const day = url.slice(third_slash_index + 1, fourth_slash_index);
            const title = url.slice(fourth_slash_index + 1, url.length);
            const date = year + '. ' + moth + '. ' + day + '.'
            const article: PostgrestSingleResponse<Art[]> = await supabase.from('article').select().eq('title', title.replaceAll('_', ' ')).eq('date', date);

            if (article.data) {
                if (account.name !== article.data[0].author) return NextResponse.json({ res: 'error' }, { status: 400 })
            }
            else { return NextResponse.json({ res: 'error' }, { status: 400 }) }


        }

        if (account && (
            url.startsWith('/signin') ||
            url === '/signup' ||
            url === '/dhdhdhsefgsgerhtrherwgerhagfws'
        )) {

            return NextResponse.json({ res: 'error' }, { status: 400 })
        }

        return NextResponse.json({ res: 'success' }, { status: 200 })
    }
    catch (err) {
        return NextResponse.json({ res: 'error' }, { status: 500 })
    }
}