import { NextRequest, NextResponse } from "next/server";
import Admin from "@/model/Admin";
import { deleteIdsSchema } from "@/schema";
import * as z from 'zod'
import { Eligibility } from "@/utils/mongo/eligibility";
import { revalidateTag } from "next/cache";


interface Colleague {
    _id: string,
    namey: string,
    email: string,
}

type deleteSchema = z.infer<typeof deleteIdsSchema>

export async function GET(request: NextRequest) {
    try {
        const cookie = request.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })

        const coll = await Eligibility(cookie.value)

        if (coll.role === '') return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const Col: Colleague[] = await Admin.find({}, { email: 1, name: 1, id: 1 }).sort({ name: 1 });

        return NextResponse.json({ Col }, { status: 200 })


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

        if (coll.role === '') return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const body = await request.json()

        const ids: deleteSchema = deleteIdsSchema.parse(body);

        const validateFields = deleteIdsSchema.safeParse(ids);
        if (validateFields.error) return NextResponse.json({ failed: validateFields.error.errors }, { status: 400 })


        //await Admin.deleteMany({id:{$id: ids}})

        //revalidateTag('authCacheSearchTag')


        return NextResponse.json({ success: 'Articles are deleted' }, { status: 200 })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}