import { NextResponse, NextRequest } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken'
import Token from "@/model/Token";
import * as z from 'zod'
import { twoFaTokenIdeSchema } from "@/schema";



type twoFAToken = z.infer<typeof twoFaTokenIdeSchema>

interface Decoded extends JwtPayload {
    id: string
}

export async function POST(request: NextRequest) {
    try {

        const body = await request.json();
        const Body: twoFAToken = twoFaTokenIdeSchema.parse(body);
        const validatedFields = twoFaTokenIdeSchema.safeParse(Body)
        if (validatedFields.error) return NextResponse.json({ res: false }, { status: 200 })
        const Tok = Body.token

        const Toke = await Token.find({ token: Tok })
        if (!Toke) return NextResponse.json({ res: false }, { status: 200 })
            
        const decoded = await jwt.verify(Tok, process.env.TwoFA_URI!) as Decoded;

        if (decoded.id === Body.id) return NextResponse.json({ res: true }, { status: 200 })
        else return NextResponse.json({ res: false }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ res: false }, { status: 200 })
    }
}