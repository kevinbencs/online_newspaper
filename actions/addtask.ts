'use server'

import Task from "@/model/Task"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"
import { taskSchema } from "@/schema";
import * as z from 'zod'
import SocketService from "@/service/socketService";

interface Decoded extends JwtPayload {
    id: string
}

interface TaskType {
    _id: string,
    name: string,
    task: string
}


export const AddTask = async (value: z.infer<typeof taskSchema>) => {
    const cookie = cookies().get('admin-log');
    if (!cookie) return { error: 'Please log in' };

    try {
        const token = await Token.findOne({ token: cookie.value });
        if (!token) {

            return { error: 'Please log in' };
        }

        const decoded = jwt.verify(token.token, process.env.SECRET_CODE!) as Decoded;
        if (!decoded) {

            return { error: 'Please log in' };
        }

        const account = await Admin.findById(decoded.id);
        if (!account) {

            return { error: 'Please log in' };
        }

        const validatedFields = taskSchema.safeParse(value);
        if (validatedFields.error) return { failed: validatedFields.error.errors }

        const inputValue = value.task;

        const task = new Task({ task: inputValue });

        await task.save();

        const tasks = await Task.find() as TaskType[];

        const socketService = SocketService.getInstance();
        socketService.emit('addTask', { tasks: JSON.parse(JSON.stringify(tasks)) })


        return { success: 'Success' };
    }
    catch (err) {
        return { error: 'Server error' }
    }
}