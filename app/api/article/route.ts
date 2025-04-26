import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { deleteIdsSchema } from "@/schema";
import * as z from 'zod'
import { Eligibility } from "@/utils/mongo/eligibility";

interface Art {
    id: number,
    category: string,
    date: string,
    title: string
}

type deleteSchema = z.infer<typeof deleteIdsSchema>

export async function GET(request: NextRequest) {
    try {

        const { data, error }: PostgrestSingleResponse<Art[]> = await supabase.from('article').select('title, id, category, date').eq('locked',false).order('id', {ascending: false})

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
        if (!cookie) return NextResponse.json({ error: 'Please log in as admin/editor' }, { status: 401 })

        const coll = await Eligibility(cookie.value)

        if(coll.role !== 'Editor' && coll.role !== 'Admin') return NextResponse.json({ error: 'Please log in as admin/editor' }, { status: 401 });

        const body = await request.json()

        const ids: deleteSchema = deleteIdsSchema.parse(body);

        const validateFields = deleteIdsSchema.safeParse(ids);
        if (validateFields.error) return NextResponse.json({ failed: validateFields.error.errors }, { status: 400 })

        /*for (let i of ids.ids) {
            const { error } = await supabase.from('article').delete().eq('id', Number(i));

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