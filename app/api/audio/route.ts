import Audio from "@/model/Audio"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";
import { AudioVideoUrlSchema } from "@/schema"
import * as z from 'zod'
import { AudioVideoImageCategoryDeleteUrlSchema } from "@/schema"
import { AudioVideoUrlUpdateSchema } from "@/schema"


interface Decoded extends JwtPayload {
    id: string
}

interface audioUrl {
    _id: string,
    url: string,
    title: string,
    date: string,
}

type audioData = z.infer<typeof AudioVideoUrlSchema>
type audio = z.infer<typeof AudioVideoImageCategoryDeleteUrlSchema>
type audioUpdate = z.infer<typeof AudioVideoUrlUpdateSchema>


export async function GET(request: NextRequest) {

    const Cookie = cookies().get('admin-log');
    if (!Cookie) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });;

    try {

        const token = await Token.findOne({ token: Cookie.value });
        if (!token) {

            return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });;
        }

        const decoded = await jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded;
        if (!decoded) {

            return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });;
        }

        const account = await Admin.findById(decoded.id);
        if (!account) {

            return NextResponse.json({ error: 'Please log in' }, { status: 401 });
        }

        const aud: audioUrl[] = await Audio.find();

        return NextResponse.json({ success: aud }, { status: 200 });
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}


export async function POST(request: NextRequest) {

    const Cookie = request.cookies.get('admin-log');
    if (!Cookie) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })

    try {

        const token = await Token.findOne({ token: Cookie.value });
        if (!token) {
            return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })
        }

        const decoded = await jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded;
        if (!decoded) {
            return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })
        }

        const account = await Admin.findById(decoded.id);
        if (!account) {
            return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })
        }

        if (account.role !== 'Admin' && account.role !== 'Editor') {
            return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })
        }

        const body = await request.json()
        const audioData: audioData = AudioVideoUrlSchema.parse(body);
        const validatedFields = AudioVideoUrlSchema.safeParse(audioData);
        if (validatedFields.error) return NextResponse.json({ failed: validatedFields.error.errors }, { status: 400 });

        const aud = await Audio.findOne({ url: audioData.url });

        if (aud) return NextResponse.json({ error: 'This url is in the database.' }, { status: 400 })

        const date = new Date().getDate().toString();


        const NewVideoUrl = new Audio({
            url: audioData.url,
            title: audioData.title,
            date: date
        })

        await NewVideoUrl.save();

        return NextResponse.json({ success: 'Success' }, { status: 200 })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}



export async function DELETE(request: NextRequest) {

    const Cookie = request.cookies.get('admin-log');
    if (!Cookie) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

    try {
        const token = await Token.findOne({ token: Cookie.value });
        if (!token) {

            return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })
        }

        const decoded = await jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded;
        if (!decoded) {

            return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })
        }

        const account = await Admin.findById(decoded.id);
        if (!account) {

            return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })
        }

        if (account.role !== 'Admin' && account.role !== 'Editor') {
            return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })
        }

        const body = await request.json();
        const audio: audio = AudioVideoImageCategoryDeleteUrlSchema.parse(body)
        const validatedFields = AudioVideoImageCategoryDeleteUrlSchema.safeParse(audio);
        if (validatedFields.error) return NextResponse.json({ failed: validatedFields.error.errors }, { status: 400 });

        await Audio.findByIdAndDelete(audio.Id)

        return NextResponse.json({ success: 'Success' }, { status: 200 })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}


export async function PUT(request: NextRequest) {

    const Cookie = request.cookies.get('admin-log');
    if (!Cookie) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });;

    try {
        const token = await Token.findOne({ token: Cookie.value });
        if (!token) {

            return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })
        }

        const decoded = await jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded;
        if (!decoded) {

            return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })
        }

        const account = await Admin.findById(decoded.id);
        if (!account) {

            return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })
        }
        const body = await request.json()
        const audio: audioUpdate = AudioVideoUrlUpdateSchema.parse(body)
        const validatedFields = AudioVideoUrlUpdateSchema.safeParse(audio);
        if (validatedFields.error) return NextResponse.json({ failed: validatedFields.error.errors }, { status: 400 });

        const cate = await Audio.findById(audio.id);

        if (cate.error) {
            console.log(cate.error);
            if (cate.error.name === 'CastError') return NextResponse.json({ error: 'Id is not valid.' }, { status: 400 })
            else return NextResponse.json({ error: 'Server error' }, { status: 400 })
        }

        if (audio.title) await Audio.findByIdAndUpdate(audio.id, { title: audio.title });
        if (audio.url) await Audio.findByIdAndUpdate(audio.id, { url: audio.url });

        return NextResponse.json({ success: 'Success' }, { status: 200 })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
