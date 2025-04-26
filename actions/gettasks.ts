'use server'

import Task from "@/model/Task"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"

interface Decoded extends JwtPayload {
    id: string
}

interface TaskType{
    _id: string,
    name: string,
    task: string
}


export const GetTask = async () => {
    const cookie = cookies().get('admin-log');
    if (!cookie) return { error: 'Please log in' };

    try {

        const token = await Token.findOne({token: cookie.value})
        if(!token) {
            
            return { error: "PLease log in" };
        }

        const decoded = jwt.verify(token.token, process.env.SECRET_CODE!) as Decoded;
        if(!decoded) {
            
            return { error: "PLease log in" };
        }

        const account = await Admin.findById(decoded.id);
        if(!account) {
            
            return { error: "PLease log in" };
        }

        const tasks = await Task.find() as TaskType[];

        

        return {tasks: JSON.parse(JSON.stringify(tasks))};
    }
    catch (err) {
        console.log(err)
        return { error: 'Server error' }
    }
}