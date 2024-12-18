import { supabase } from "@/utils/supabase/article";
import Category from "@/model/Category";
import Admin from "@/model/Admin";
import { connectToMongo } from "@/lib/mongo";
import { NextRequest, NextResponse, } from 'next/server';
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface Cat{
    name: string,
    _id: string
}

interface Author{
    _id: string,
    name: string,
}

interface Title{
    id: string,
    title: string,
    number: number
}

interface Theme{
    id: string,
    theme: string,
    number: number
}


export async function GET (request: NextRequest){

    try{
        await connectToMongo();
        const category: Cat[] = await Category.find({},{_id: 1, name: 1}).sort({name: 1});
        const author: Author[] = await Admin.find({},'_id name').sort({name: 1});
        const title: PostgrestSingleResponse<Title[]> = await supabase.from('titles').select('id, title, number').order('number', {ascending: false});
        const theme: PostgrestSingleResponse<Theme[]> = await supabase.from('themes').select('id, theme, number').order('number', {ascending: false});

        return NextResponse.json({res: {category, author, title:title.data, theme: theme.data}},{status: 200})
    }
    catch(err){
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
