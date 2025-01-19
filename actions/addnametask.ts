'use server'

import Task from "@/model/Task"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken";
import { idSchema } from "@/schema";
import * as z from 'zod'
import SocketService from "@/service/socketService";

interface TaskType {
    _id: string,
    name: string,
    task: string
}


interface Decoded extends JwtPayload {
    id: string
}


export const AddName = async (value: z.infer<typeof idSchema>) => {
    const cookie = cookies().get('admin-log');
    if (!cookie) return { error: 'Please log in' };

    try {

        const token = await Token.findOne({ token: cookie.value });
        if (!token) return { error: 'Please log in' };

        const decoded = jwt.verify(token.token, process.env.SECRET_CODE!) as Decoded;
        if (!decoded) return { error: 'Token error' };

        const account = await Admin.findById(decoded.id);
        if (!account) return { error: 'Token error' };

        const validatedFields = idSchema.safeParse(value)
        if(validatedFields.error) return {failed: validatedFields.error.errors};

        const id=value.id

        const task = await Task.findById(id);
        if (!task) return { error: 'Server errors' };

        if (!task.name) {
            const NewTask = await Task.findByIdAndUpdate(id, { name: account.name })
            if (!NewTask) return { error: 'Task deleted' }
        }
        else{
            if(task.name === account.name) await Task.findByIdAndUpdate(id, { name: null })
        }

        const tasks = await Task.find() as TaskType[];

        const socketService = SocketService.getInstance();
        socketService.emit('setNameForTask', { tasks: JSON.parse(JSON.stringify(tasks)) })

        return { success: 'Success' }
    }
    catch (err) {
        return { error: 'Server error' }
    }
}