
import { NextRequest, NextResponse, } from 'next/server';
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { AuthCache, CatCache, ThemCache, TitCache } from "@/cache/cache";


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

export const dynamic = 'force-dynamic'



export async function GET (request: NextRequest){

    try{
        const category: Cat[] = await CatCache();
        const author: Author[] = await AuthCache();
        const title: PostgrestSingleResponse<Title[]> = await TitCache();
        const theme: PostgrestSingleResponse<Theme[]> = await ThemCache();

        return NextResponse.json({res: {category, author, title:title.data, theme: theme.data}},{status: 200})
    }
    catch(err){
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
