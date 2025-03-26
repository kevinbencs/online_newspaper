import Task from "@/model/Task"
import SocketService from "@/service/socketService";
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
        if (!cookie) return NextResponse.json({ error: 'Please log in' }, { status: 401 });

        const coll = await Eligibility(cookie.value)

        if (coll.role === '') return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const id = req.nextUrl.pathname.slice(10, req.nextUrl.pathname.length)

        await Task.findByIdAndDelete(id)

        const tasks = await Task.find() as TaskType[];

        /*const socketService = SocketService.getInstance();
        socketService.emit('deleteTask', { tasks: JSON.parse(JSON.stringify(tasks)) })*/


        return NextResponse.json({ success: 'Success' }, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const cookie = req.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in' }, { status: 401 });

        const coll = await Eligibility(cookie.value)

        if (coll.role === '') return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });


        const id = req.nextUrl.pathname.slice(10, req.nextUrl.pathname.length)

        const task = await Task.findById(id);
        if (!task) return NextResponse.json({ error: 'Server errors' }, { status: 500 });

        if (!task.name) {
            const NewTask = await Task.findByIdAndUpdate(id, { name: coll.name })
            if (!NewTask) return NextResponse.json({ error: 'Task deleted' }, { status: 500 })
        }
        else {
            if (task.name === coll.name) await Task.findByIdAndUpdate(id, { name: null })
        }

        const tasks = await Task.find() as TaskType[];

        /*const socketService = SocketService.getInstance();
        socketService.emit('setNameForTask', { tasks: JSON.parse(JSON.stringify(tasks)) })*/

        return NextResponse.json({ success: 'Success' }, { status: 200 })
    }
    catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}