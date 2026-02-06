import Career from "@/model/Career";
import { NextRequest, NextResponse } from "next/server";
import { deleteIdsSchema } from "@/schema";
import * as z from 'zod'
import { ObjectId } from "mongodb";
import { Eligibility } from "@/utils/mongo/eligibility";
import { revalidatePath,revalidateTag } from 'next/cache';



interface Carrie {
    _id: ObjectId,
    title: string,
}

type deleteSchema = z.infer<typeof deleteIdsSchema>

export async function GET(request: NextRequest) {
    try {
        const Car: Carrie[] = await Career.find({}, { id: 1, title: 1 }).sort({ title: 1 });

        const Car2: { _id: string, title: string, date: string }[] = [];

        for (let i of Car) {
            Car2.push({ _id: i._id.toString(), title: i.title, date: i._id.getTimestamp().toLocaleDateString() })
        }

        return NextResponse.json({ Car: Car2 }, { status: 200 })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest) {
    try {
        const cookie = request.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in as admin or editor' }, { status: 401 })

        const coll = await Eligibility(cookie.value)

        if (coll.role !== 'Admin' && coll.role !== 'Editor') return NextResponse.json({ error: 'Please log in as admin or editor' }, { status: 403 });

        const body = await request.json()

        const ids: deleteSchema = deleteIdsSchema.parse(body);

        const validateFields = deleteIdsSchema.safeParse(ids);
        if (validateFields.error) return NextResponse.json({ failed: validateFields.error.errors }, { status: 400 })

        /*for(let j of ids.ids){
            const item = await Career.findByIdAndDelete(j)
            revalidatePath(`/career/${item.title.replaceAll(' ','_')}`)
        }

        revalidatePath('/career')
        revalidateTag('careerTag')*/


        return NextResponse.json({ success: 'Careers are deleted' }, { status: 200 })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}