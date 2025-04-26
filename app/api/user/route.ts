import { NextRequest, NextResponse } from "next/server";
import { supabase_admin } from "@/utils/supabase/admin";
import { deleteIdsStringSchema } from "@/schema";
import * as z from 'zod'
import { supabase } from "@/utils/supabase/article";
import { Eligibility } from "@/utils/mongo/eligibility";




type deleteSchema = z.infer<typeof deleteIdsStringSchema>

export async function GET(request: NextRequest) {
    try {
        const cookie = request.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in as admin, editor or author' }, { status: 401 })

        const coll = await Eligibility(cookie.value)

        if (coll.role !== 'Admin' && coll.role !== 'Editor' && coll.role !== 'Author') return NextResponse.json({ error: 'Please log in as admin, editor or author' }, { status: 401 });

        const { data, error } = await supabase_admin.auth.admin.listUsers()

        if (error) {
            console.log(error)
            NextResponse.json({ error: 'Server error' }, { status: 500 });
        }

        return NextResponse.json({ users: data.users }, { status: 200 })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest) {
    try {
        const cookie = request.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })

        const coll = await Eligibility(cookie.value)

        if (coll.role !== 'Admin') return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const body = await request.json()

        const ids: deleteSchema = deleteIdsStringSchema.parse(body);

        const validateFields = deleteIdsStringSchema.safeParse(ids);
        if (validateFields.error) return NextResponse.json({ failed: validateFields.error.errors }, { status: 400 })

        /*for(let i of ids.ids){
           const {data, error} = await supabase_admin.auth.admin.deleteUser(i)
           const res = await supabase.from('saveArticle').delete().eq('user_email', data.user?.email)
           if(error || res.error) {
            console.log(error);
            NextResponse.json({error: 'Server error'}, {status: 500});
           }
        }*/

        return NextResponse.json({ success: 'Users are deleted' }, { status: 200 })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}