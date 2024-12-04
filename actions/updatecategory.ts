'use server'

import Category from "@/model/Category"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { CategoryUpdateSchema } from "@/schema"
import * as z from 'zod'
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"

interface Decoded extends JwtPayload {
    id: string
}


export const updateCategoryDetail = async (category: z.infer<typeof CategoryUpdateSchema>) => {
    const Cookie = cookies().get('admin-log');
    if(!Cookie) return {error: 'Please log in'};

    try{
        const token = await Token.findOne({token: Cookie.value});
        if(!token) {
            
            return { error: 'Please log in' };
        }

        const decoded = await jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded;
        if(!decoded) {
            
            return { error: 'Please log in' };
        }

        const account = await Admin.findById(decoded.id);
        if(!account) {
            
            return { error: 'Please log in' };
        }

        const validatedFields = CategoryUpdateSchema.safeParse(category);
        if(validatedFields.error) return {failed: validatedFields.error.errors};

        await Category.findByIdAndUpdate(category.id, {name: category.name});
        
        return {success: 'Success'}
    }
    catch(err){
        console.log(err)
        return {error: 'Server error'}
    }
}