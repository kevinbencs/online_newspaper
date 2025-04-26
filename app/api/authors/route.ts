import { NextRequest, NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongo";
import Admin from "@/model/Admin";

interface author{
    name: string,
    _id: string
}


export async function GET(request: NextRequest) {
    try {
        await connectToMongo()
        const res: author[] = await Admin.find({},'_id name').sort({name: 1});
        
        return NextResponse.json({res}, {status: 200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Server error'}, {status: 500});
    }
}