import Task from "@/model/Task"
import { NextRequest, NextResponse } from "next/server";
import { Eligibility } from "@/utils/mongo/eligibility";


interface TaskType {
    _id: string,
    name: string,
    task: string
}



export async function DELETE(req: NextRequest) {
    try {
        const cookie = req.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in as admin, editor or author' }, { status: 401 });

        const coll = await Eligibility(cookie.value)

        if (coll.role !== 'Admin' && coll.role !== 'Editor' && coll.role !== 'Author') return NextResponse.json({ error: 'Please log in as admin, editor or author' }, { status: 403 });

        const id = req.nextUrl.pathname.slice(10, req.nextUrl.pathname.length)

        await Task.findByIdAndDelete(id)

        return NextResponse.json({ success: 'Success' }, { status: 200 });
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const cookie = req.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in as admin, editor or author' }, { status: 401 });

        const coll = await Eligibility(cookie.value)

        if (coll.role !== 'Admin' && coll.role !== 'Editor' && coll.role !== 'Author') return NextResponse.json({ error: 'Please log in as admin, editor or author' }, { status: 403 });


        const id = req.nextUrl.pathname.slice(10, req.nextUrl.pathname.length)

        const task = await Task.findById(id);
        if (!task) return NextResponse.json({ error: 'The task does not exists' }, { status: 404 });

        if (!task.name) {
            const NewTask = await Task.findByIdAndUpdate(id, { name: coll.name })
        }
        else {
            if (task.name === coll.name) await Task.findByIdAndUpdate(id, { name: null })
        }

        return NextResponse.json({ success: 'Success' }, { status: 200 })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}