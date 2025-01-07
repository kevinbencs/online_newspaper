import { supabase } from "@/utils/supabase/article";
import { NextRequest, NextResponse, } from 'next/server';
import { PostgrestSingleResponse } from "@supabase/supabase-js";


interface Theme{
    theme: string,
}


export async function GET (request: NextRequest){

    try{
        const theme: PostgrestSingleResponse<Theme[]> = await supabase.from('themes').select('theme ').order('number', {ascending: false});

        return NextResponse.json({res:  theme.data},{status: 200})
    }
    catch(err){
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}