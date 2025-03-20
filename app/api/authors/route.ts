import { NextRequest, NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongo";
import { CatCache } from "@/cache/cache";

interface author{
    name: string,
}

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    try {
        await connectToMongo()
        const res: author[] = await CatCache();
        
        return NextResponse.json({res}, {status: 200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: 'Server error'}, {status: 500});
    }
}