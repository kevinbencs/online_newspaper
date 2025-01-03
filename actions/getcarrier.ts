'use server'

import { connectToMongo } from "@/lib/mongo"
import Carrier from "@/model/Carrier"
import { titleSchema } from "@/schema"
import { cookies } from "next/headers"
import * as z from "zod"


interface Car{
    _id: string,
    title: string
}

export const getCarriers =  async () => {
    try {
        await connectToMongo()
        const res = await Carrier.find({},{id:1, title: 1});

        return {success: JSON.parse(JSON.stringify(res))}

    } catch (error) {
        console.log(error)
        return{ error: 'Server error'}
    }
}

export const getCarrierByTitle =  async (value: z.infer<typeof titleSchema>) => {
    try {
        const Cookkie = cookies()
        const validateFields = titleSchema.safeParse(value)
        if(validateFields.error) return {failed: validateFields.error.errors}
        
        await connectToMongo()
        
        const res = await Carrier.findOne({title: value.title},{text: 1, title: 1});
        
        return {success: res}

    } catch (error) {
        console.log(error)
        return{ error: 'Server error'}
    }
}