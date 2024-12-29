'use server'

import Task from "@/model/Task"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"
import { idSchema } from "@/schema";
import * as z from 'zod'

interface Decoded extends JwtPayload {
    id: string
}

export const DeleteTask = async (value: z.infer<typeof idSchema>) => {
    const cookie = cookies().get('admin-log');
    if (!cookie) return { error: 'Please log in' };

    try{

        const token = await Token.findOne({token: cookie.value});
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

        const validatedFields = idSchema.safeParse(value)
        if(validatedFields.error) return {failed: validatedFields.error.errors};

        const id=value.id

        await Task.findByIdAndDelete(id)

        
        return {success: 'Success'};
    }
    catch(err){
        return {error: 'Server error'}
    }
}