import Career from "@/model/Career";
import { NextRequest, NextResponse } from "next/server";
import Token from "@/model/Token";
import Admin from "@/model/Admin";
import jwt, {JwtPayload} from 'jsonwebtoken'

import { deleteIdsSchema } from "@/schema";
import * as z from 'zod'
import { ObjectId } from "mongodb";


interface Decoded extends JwtPayload{
    id: string
}

interface Carrie{
    _id: ObjectId,
    title: string,
}

type deleteSchema = z.infer<typeof deleteIdsSchema>

export async function GET(request: NextRequest) {
    try {
        const Car: Carrie[] = await Career.find({},{id:1, title: 1}).sort({title: 1}) ;

        const Car2: {_id: string, title: string, date: string}[] = [];

        for(let i of Car){
            Car2.push({_id: i._id.toString(),title: i.title, date: i._id.getTimestamp().toLocaleDateString()})
        }

        return NextResponse.json({Car: Car2}, {status: 200})


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

        const decoded = jwt.verify(cookie.value, process.env.SECRET_CODE!) as Decoded;

        if(!decoded) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const admin = await Admin.findById(decoded.id);

        if(!admin) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const body = await request.json()

        const ids: deleteSchema = deleteIdsSchema.parse(body);

        const validateFields = deleteIdsSchema.safeParse(ids);
        if(validateFields.error) return NextResponse.json({failed: validateFields.error.errors},{status: 400})


        //await Career.deleteMany({id:{$id: ids}})


        return NextResponse.json({success: 'Careers are deleted'},{status: 200})


    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Server error'}, {status: 500});
    }
}