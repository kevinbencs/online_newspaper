import { NextRequest, NextResponse, } from 'next/server';
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase/article";
import Admin from "@/model/Admin";

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
        const author: Author[] = await Admin.find({},'_id name').sort({name: 1});
        const title: PostgrestSingleResponse<Title[]> = await supabase.from('titles').select('id, title, number').order('number', {ascending: false});
        const theme: PostgrestSingleResponse<Theme[]> = await supabase.from('themes').select('id, theme, number').order('number', {ascending: false});

        return NextResponse.json({res: {author, title:title.data, theme: theme.data}},{status: 200})
    }
    catch(err){
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}
