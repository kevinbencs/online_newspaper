import { NextRequest, NextResponse } from "next/server";
import { supabase_admin } from "@/utils/supabase/admin";
import Token from "@/model/Token";
import Admin from "@/model/Admin";
import jwt, {JwtPayload} from 'jsonwebtoken'
import { deleteIdsStringSchema } from "@/schema";
import * as z from 'zod'
import { supabase } from "@/utils/supabase/article";


interface Decoded extends JwtPayload{
    id: string
}



type deleteSchema = z.infer<typeof deleteIdsStringSchema>

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

        const {data, error} = await supabase_admin.auth.admin.listUsers()

        if(error) {
            console.log(error)
            NextResponse.json({error: 'Server error'}, {status: 500});
        }

        return NextResponse.json({users: data.users },{status: 200})


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

        const ids: deleteSchema = deleteIdsStringSchema.parse(body);

        const validateFields = deleteIdsStringSchema.safeParse(ids);
        if(validateFields.error) return NextResponse.json({failed: validateFields.error.errors},{status: 400})

        for(let i of ids.ids){
           const {data, error} = await supabase_admin.auth.admin.deleteUser(i)
           const res = await supabase.from('saveArticle').delete().eq('user_email', data.user?.email)
           if(error || res.error) {
            console.log(error);
            NextResponse.json({error: 'Server error'}, {status: 500});
           }
        }

        return NextResponse.json({success: 'Articles are deleted'},{status: 200})


    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Server error'}, {status: 500});
    }
}