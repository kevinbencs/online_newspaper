import Category from "@/model/Category"
import { connectToMongo } from "@/lib/mongo";
import { NextRequest, NextResponse, } from 'next/server';
import { CategorySchema, CategoryUpdateSchema } from "@/schema"
import * as z from 'zod'
import { AudioVideoImageCategoryDeleteUrlSchema } from "@/schema"
import { Eligibility } from "@/utils/mongo/eligibility";


interface Cat {
    name: string,
    _id: string
}


type categoryData = z.infer<typeof CategorySchema>
type category = z.infer<typeof AudioVideoImageCategoryDeleteUrlSchema>
type categoryUpdate = z.infer<typeof CategoryUpdateSchema>

export async function GET(request: NextRequest) {

    try {
        await connectToMongo();
        const category: Cat[] = await Category.find({}, { _id: 1, name: 1 }).sort({ name: 1 });

        return NextResponse.json({ success: category }, { status: 200 })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const Cookie = request.cookies.get('admin-log');
        if (!Cookie) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 })

        const coll = await Eligibility(Cookie.value)

        if (coll.role === '') return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const body = await request.json()
        const categoryData: categoryData = CategorySchema.parse(body);
        const validatedFields = CategorySchema.safeParse(categoryData);
        if (validatedFields.error) return NextResponse.json({ failed: validatedFields.error.errors }, { status: 400 });

        const cate = await Category.findOne({ name: categoryData.name });

        if (cate) return NextResponse.json({ error: 'This category is in the database.' }, { status: 400 })

        /*const NewCategory = new Category({
            name: categoryData.name,
        })

        await NewCategory.save();*/

        return NextResponse.json({ success: 'Success' }, { status: 200 })
    }
    catch (err) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}



export async function DELETE(request: NextRequest) {
    try {
        const Cookie = request.cookies.get('admin-log');
        if (!Cookie) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });
        const coll = await Eligibility(Cookie.value)

        if (coll.role === '') return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const body = await request.json();
        const category: category = AudioVideoImageCategoryDeleteUrlSchema.parse(body)
        const validatedFields = AudioVideoImageCategoryDeleteUrlSchema.safeParse(category);
        if (validatedFields.error) return NextResponse.json({ failed: validatedFields.error.errors }, { status: 400 });

        //await Category.findByIdAndDelete(category.Id)

        return NextResponse.json({ success: 'Success' }, { status: 200 })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}


export async function PUT(request: NextRequest) {
    try {

        const Cookie = request.cookies.get('admin-log');
        if (!Cookie) return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const coll = await Eligibility(Cookie.value)

        if (coll.role === '') return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const body = await request.json()
        const category: categoryUpdate = CategoryUpdateSchema.parse(body)
        const validatedFields = CategoryUpdateSchema.safeParse(category);
        if (validatedFields.error) return NextResponse.json({ failed: validatedFields.error.errors }, { status: 400 });

        /*const cate = await Category.findByIdAndUpdate(category.id, { name: category.name });

        if(cate.error) {
            console.log(cate.error);
            if(cate.error.name === 'CastError') return NextResponse.json({ error: 'Id is not valid.' },{status: 400})
            else return NextResponse.json({ error: 'Server error' },{status: 400})
        }*/

        return NextResponse.json({ success: 'Success' }, { status: 200 })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
