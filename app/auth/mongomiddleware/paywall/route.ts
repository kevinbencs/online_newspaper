import { NextRequest, NextResponse } from "next/server";
import { Eligibility } from "@/utils/mongo/eligibility";

interface RequestBody {
    cookie: string
}

export async function POST(req: NextRequest) {
    const body = await req.json() as RequestBody;

    const Cookie = body.cookie;

    const res = await Eligibility(Cookie)
    return NextResponse.json({res}, {status: 200})
}