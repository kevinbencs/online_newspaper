import { tokenSchema } from "@/schema";
import jwt from "jsonwebtoken"
import { NextResponse, NextRequest } from "next/server"
import * as z from 'zod';


type token = z.infer<typeof tokenSchema>

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const token: token  = tokenSchema.parse(body);
        const validatedFields = tokenSchema.safeParse(tokenSchema);
        if (validatedFields.error) return NextResponse.json({ res: 'false' }, { status: 200 }) ;
        const decoded = await jwt.verify(token.token, process.env.Link_Code!)
        return NextResponse.json({ res: 'true' }, { status: 200 })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ res: 'false' }, { status: 200 })
    }

}

