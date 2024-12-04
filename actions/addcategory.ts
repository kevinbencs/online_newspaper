'use server'

import Category from "@/model/Category"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { CategorySchema } from "@/schema"
import * as z from 'zod'
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"

interface Decoded extends JwtPayload {
    id: string
}



export const addNewCategory = async (categoryData: z.infer<typeof CategorySchema>) => {
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

        const validatedFields = CategorySchema.safeParse(categoryData);
        if(validatedFields.error) return {failed: validatedFields.error.errors};

        const cate = await Category.findOne({name: categoryData.name});

        if(cate) return {error: 'This category is in the database.'}

        const NewCategory = new Category({
            name: categoryData.name,
        })

        await NewCategory.save();

        return {success: 'Success'}
    }
    catch(err){
        return {error: 'Server error'}
    }
}