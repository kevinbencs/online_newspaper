import { NextResponse, NextRequest } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
import Token from "@/model/Token";
import * as z from 'zod'
import { twoFaTokenIdeSchema } from "@/schema";

type twoFAToken = z.infer<typeof twoFaTokenIdeSchema>

interface Body {
    token: string,
    id: string
}

interface Decoded extends JwtPayload {
    id: string
}

export async function POST(request: NextRequest) {
    try {
        const body: Body = await request.json();
        const Body: twoFAToken = twoFaTokenIdeSchema.parse(body);
        const validatedFields = twoFaTokenIdeSchema.safeParse(Body)
        if (validatedFields.error) return NextResponse.json({ res: false }, { status: 400 })

        const Tok = await Token.find({ token: Body.token })
        if (!Tok) return NextResponse.json({ res: false }, { status: 404 })

        const decoded = await jwt.verify(Body.token, process.env.TwoFaSingIn_Uri!) as Decoded;
        if (decoded.id === Body.id) {
            return NextResponse.json({ res: true }, { status: 200 })
        }
        else return NextResponse.json({ res: false }, { status: 400 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ res: false }, { status: 500 })
    }
}