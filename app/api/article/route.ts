import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/article";
import Token from "@/model/Token";
import Admin from "@/model/Admin";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { deleteIdsSchema } from "@/schema";
import * as z from 'zod'


interface Decoded extends JwtPayload {
    id: string
}

interface Art {
    id: number,
    category: string,
    date: string,
    title: string
}

type deleteSchema = z.infer<typeof deleteIdsSchema>

export async function GET(request: NextRequest) {
    try {

        const { data, error }: PostgrestSingleResponse<Art[]> = await supabase.from('article').select('title, id, category, date').eq('locked',false).order('title')

        if (error) {
            console.log(error)
            return NextResponse.json({ error: 'Server error' }, { status: 500 });
        }

        return NextResponse.json({ art: data }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest) {
    try {
        const cookie = request.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })

        const Tok = await Token.find({ token: cookie.value });
        if (!Tok) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })

        if (!process.env.SECRET_CODE) return NextResponse.json({ error: 'process.env.SECRET_CODE is missing' }, { status: 500 })

        const decoded = jwt.verify(cookie.value, process.env.SECRET_CODE!) as Decoded;

        if (!decoded) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const admin = await Admin.findById(decoded.id) 

        if (!admin) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const body = await request.json()

        const ids: deleteSchema = deleteIdsSchema.parse(body);

        const validateFields = deleteIdsSchema.safeParse(ids);
        if (validateFields.error) return NextResponse.json({ failed: validateFields.error.errors }, { status: 400 })

        /*for (let i of ids.ids) {
            const { error } = await supabase.from('article').delete().eq('id', i);

            if (error) {
                console.log(error);
                return NextResponse.json({ error: 'Server error' }, { status: 500 });
            }
        }*/

        return NextResponse.json({ success: 'Articles are deleted' }, { status: 200 })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}