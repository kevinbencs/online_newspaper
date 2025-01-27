import Video from "@/model/Video"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"
import { NextResponse, NextRequest } from "next/server";
import * as z from 'zod'
import { AudioVideoUrlSchema } from "@/schema"
import { AudioVideoImageCategoryDeleteUrlSchema } from "@/schema"
import { AudioVideoUrlUpdateSchema } from "@/schema";

interface Decoded extends JwtPayload {
    id: string
}

interface videoUrl {
    _id: string,
    url: string,
    title: string
}


type videoData = z.infer<typeof AudioVideoUrlSchema>
type video = z.infer<typeof AudioVideoImageCategoryDeleteUrlSchema>
type videoUpdate = z.infer<typeof AudioVideoUrlUpdateSchema>



export async function GET() {
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

            return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });;
        }

        const video: videoUrl[] = await Video.find();

        return NextResponse.json({ success: video }, { status: 200 });
    }
    catch (err) {
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
        const body = await request.json()
        const videoData: videoData = AudioVideoUrlSchema.parse(body);
        const validatedFields = AudioVideoUrlSchema.safeParse(videoData);
        if (validatedFields.error) return NextResponse.json({ failed: validatedFields.error.errors }, { status: 400 });

        const res = await Video.findOne({ url: videoData.url });

        if (res) return NextResponse.json({ error: 'This category is in the database.' }, { status: 400 })

        /*const NewVideoUrl = new Video({
            url: videoData.url,
            title: videoData.title
        })

        await NewVideoUrl.save();*/

        return NextResponse.json({ success: 'Success' }, { status: 200 })
    }
    catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}



export async function DELETE(request: NextRequest) {

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
        const body = await request.json();
        const vid: video = AudioVideoImageCategoryDeleteUrlSchema.parse(body)
        const validatedFields = AudioVideoImageCategoryDeleteUrlSchema.safeParse(vid);
        if (validatedFields.error) return NextResponse.json({ failed: validatedFields.error.errors }, { status: 400 });

        /*await Video.findByIdAndDelete(vid.Id)*/

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
        const video: videoUpdate = AudioVideoUrlUpdateSchema.parse(body)
        const validatedFields = AudioVideoUrlUpdateSchema.safeParse(video);
        if (validatedFields.error) return NextResponse.json({ failed: validatedFields.error.errors }, { status: 400 });

        const res = await Video.findById(video.id);

        if (res.error) {
            console.log(res.error);
            if (res.error.name === 'CastError') return NextResponse.json({ error: 'Id is not valid.' }, { status: 400 })
            else return NextResponse.json({ error: 'Server error' }, { status: 500 })
        }

        /*if (video.title) await Video.findByIdAndUpdate(video.id, { title: video.title });
        if (video.url) await Video.findByIdAndUpdate(video.id, { url: video.url });*/

        return NextResponse.json({ success: 'Success' }, { status: 200 })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
