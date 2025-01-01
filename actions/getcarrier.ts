'use server'

import { connectToMongo } from "@/lib/mongo"
import Carrier from "@/model/Carrier"

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