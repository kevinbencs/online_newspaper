import Task from "@/model/Task"
import { idSchema, taskSchema } from "@/schema";
import SocketService from "@/service/socketService";
import { NextRequest, NextResponse } from "next/server";
import { Eligibility } from "@/utils/mongo/eligibility";



interface TaskType {
    _id: string,
    name: string,
    task: string
}


export async function POST(req: NextRequest) {
    try {
        const cookie = req.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in' }, { status: 401 });

        const coll = await Eligibility(cookie.value)

        if (coll.role === '') return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const body = await req.json()
        const value = taskSchema.parse(body)
        const validatedFields = taskSchema.safeParse(value);
        if (validatedFields.error) return NextResponse.json({ failed: validatedFields.error.errors }, { status: 400 })

        const inputValue = value.task;

        const task = new Task({ task: inputValue });

        await task.save();

        const tasks = await Task.find() as TaskType[];

        const socketService = SocketService.getInstance();
        socketService.emit('addTask', { tasks: JSON.parse(JSON.stringify(tasks)) })


        return NextResponse.json({ success: 'Success' }, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}



export async function DELETE(req: NextRequest) {

    try {
        const cookie = req.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in' }, { status: 401 });

        const coll = await Eligibility(cookie.value)

        if (coll.role === '') return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const body = await req.json()
        const value = idSchema.parse(body);
        const validatedFields = idSchema.safeParse(value)
        if (validatedFields.error) return NextResponse.json({ failed: validatedFields.error.errors }, { status: 400 });

        const id = value.id

        await Task.findByIdAndDelete(id)

        const tasks = await Task.find() as TaskType[];

        const socketService = SocketService.getInstance();
        socketService.emit('deleteTask', { tasks: JSON.parse(JSON.stringify(tasks)) })


        return NextResponse.json({ success: 'Success' }, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}