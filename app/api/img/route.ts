import Image from "@/model/Image"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { ImageUrlSchema } from "@/schema"
import * as z from 'zod'
import { AudioVideoImageCategoryDeleteUrlSchema } from "@/schema"
import { ImageUrlUpdateSchema } from "@/schema"

interface Decoded extends JwtPayload {
    id: string
}

interface img {
    url: string,
    detail: string,
    _id: string
}


type imageoData = z.infer<typeof ImageUrlSchema>
type image = z.infer<typeof AudioVideoImageCategoryDeleteUrlSchema>
type imageUpdate = z.infer<typeof ImageUrlUpdateSchema>



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

            return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });;
        }


        const image: img[] = await Image.find();

        return NextResponse.json({ success: image }, { status: 200 })


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
        const body = await request.json()
        const imageoData: imageoData = ImageUrlSchema.parse(body);
        const validatedFields = ImageUrlSchema.safeParse(imageoData);
        if (validatedFields.error) return NextResponse.json({ failed: validatedFields.error.errors }, { status: 400 });

        const cate = await Image.findOne({ url: imageoData.url });

        if (cate) return NextResponse.json({ error: 'This category is in the database.' }, { status: 400 })

        const NewImageUrl = new Image({
            url: imageoData.url,
            detail: imageoData.detail
        })

        await NewImageUrl.save();

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
        const img: image = AudioVideoImageCategoryDeleteUrlSchema.parse(body)
        const validatedFields = AudioVideoImageCategoryDeleteUrlSchema.safeParse(img);
        if (validatedFields.error) return NextResponse.json({ failed: validatedFields.error.errors }, { status: 400 });

        await Image.findByIdAndDelete(img.Id)

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
        const img: imageUpdate = ImageUrlUpdateSchema.parse(body)
        const validatedFields = ImageUrlUpdateSchema.safeParse(img);
        if (validatedFields.error) return NextResponse.json({ failed: validatedFields.error.errors }, { status: 400 });

        const res = await Image.findById(img.id);

        if (res.error) {
            console.log(res.error);
            if (res.error.name === 'CastError') return NextResponse.json({ error: 'Id is not valid.' }, { status: 400 })
            else return NextResponse.json({ error: 'Server error' }, { status: 500 })
        }

        if (img.detail) await Image.findByIdAndUpdate(img.id, { detail: img.detail });
        if (img.url) await Image.findByIdAndUpdate(img.id, { detail: img.url });

        return NextResponse.json({ success: 'Success' }, { status: 200 })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

