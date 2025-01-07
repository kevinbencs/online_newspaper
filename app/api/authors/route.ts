import { NextRequest, NextResponse } from "next/server";
import Admin from "@/model/Admin";
import { connectToMongo } from "@/lib/mongo";

interface author{
    name: string,
}


export async function GET(request: NextRequest) {
    try {
        await connectToMongo()
        const res: author[] = await Admin.find({},{name: 1, _id: 0}).sort({importance: 1, name: 1});
        
        return NextResponse.json({res}, {status: 200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Server error'}, {status: 500});
    }
}