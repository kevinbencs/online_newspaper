import { supabase } from "@/utils/supabase/article";
import Category from "@/model/Category";
import Admin from "@/model/Admin";
import { connectToMongo } from "@/lib/mongo";
import { NextRequest, NextResponse, } from 'next/server';
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

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

const CatCache = unstable_cache(
    async () => Category.find({},{_id: 1, name: 1}).sort({name: 1}),
    ["catCacheSearch"],
    {tags: ["catCacheSearch"]}
)

const AuthCache = unstable_cache(
    async () => Admin.find({},'_id name').sort({name: 1}),
    ["authCacheSearch"],
    {tags: ["authCacheSearch"]}
)

const TitCache = unstable_cache(
    async () => supabase.from('titles').select('id, title, number').order('number', {ascending: false}),
    ["titCacheSearch"],
    {tags: ["titCacheSearch"]}
)

const ThemCache = unstable_cache(
    async () => supabase.from('themes').select('id, theme, number').order('number', {ascending: false}),
    ["themCacheSearch"],
    {tags: ["themCacheSearch"]}
)


export async function GET (request: NextRequest){

    try{
        await connectToMongo();
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
