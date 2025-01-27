import { NextRequest, NextResponse } from "next/server";
import Token from "@/model/Token";
import Admin from "@/model/Admin";
import jwt, {JwtPayload} from 'jsonwebtoken'

import { deleteIdsSchema } from "@/schema";
import * as z from 'zod'


interface Decoded extends JwtPayload{
    id: string
}

interface Colleague{
    _id: string,
    namey: string,
    email: string,
}

type deleteSchema = z.infer<typeof deleteIdsSchema>

export async function GET(request: NextRequest) {
    try {
        const cookie = request.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })

        const Tok = await Token.find({token: cookie.value});
        if(!Tok) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })

            if (!process.env.SECRET_CODE) return NextResponse.json({ error: 'process.env.SECRET_CODE is missing' }, { status: 500 })

        const decoded = jwt.verify(cookie.value, process.env.SECRET_CODE!) as Decoded;

        if(!decoded) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const admin = await Admin.findById(decoded.id);

        if(!admin) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const Col: Colleague[] = await Admin.find({},{email: 1, name: 1, id:1}).sort({name: 1}) ;

        return NextResponse.json({Col}, {status: 200})


    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Server error'}, {status: 500});
    }
}


export async function DELETE(request: NextRequest) {
    try {
        const cookie = request.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })

        const Tok = await Token.find({token: cookie.value});
        if(!Tok) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })

            if (!process.env.SECRET_CODE) return NextResponse.json({ error: 'process.env.SECRET_CODE is missing' }, { status: 500 })

        const decoded = jwt.verify(cookie.value, process.env.SECRET_CODE!)

        if(!decoded) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const body = await request.json()

        const ids: deleteSchema = deleteIdsSchema.parse(body);

        const validateFields = deleteIdsSchema.safeParse(ids);
        if(validateFields.error) return NextResponse.json({failed: validateFields.error.errors},{status: 400})


        //await Admin.deleteMany({id:{$id: ids}})


        return NextResponse.json({success: 'Articles are deleted'},{status: 200})


    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Server error'}, {status: 500});
    }
}