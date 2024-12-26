import jwt from "jsonwebtoken"
import { NextResponse, NextRequest } from "next/server"

interface Body {
    search: string
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { search } = body as Body;
        const decoded = await jwt.verify(search, process.env.Link_Code!)
        return NextResponse.json({ res: 'true' }, { status: 200 })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ res: 'false' }, { status: 200 })
    }

}

