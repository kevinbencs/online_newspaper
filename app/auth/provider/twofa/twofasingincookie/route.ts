import { NextResponse, NextRequest } from "next/server";
import jwt, {JwtPayload} from 'jsonwebtoken';
import Token from "@/model/Token";

interface Body{
    token: string,
    id: string
}

interface Decoded extends JwtPayload{
    id: string
}

export async function POST(request: NextRequest) {
    try {
        const body: Body = await request.json();

        const Tok = await Token.find({token: body.token})
        if(!Tok) return NextResponse.json({res: false}, {status:500})

        const decoded = await jwt.verify(body.token, process.env.TwoFaSingIn_Uri!) as Decoded;
        if(decoded.id === body.id) {
            return NextResponse.json({res: true}, {status: 200})
        }
        else return NextResponse.json({res: false}, {status:500})
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({res: false}, {status:500})
    }
}