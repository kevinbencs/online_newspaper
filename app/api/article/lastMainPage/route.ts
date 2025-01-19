import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface DataMainPage {
    id: string,
    title: string,
    date: string,
    time: string,
    category: string,
    paywall: boolean
}


export async function GET(req: NextRequest,) {
    try {
        /*const stream = new ReadableStream({
            start(controller) {
                const encoder = new TextEncoder();

                const sendEvent = (data: PostgrestSingleResponse<DataMainPage[]>) => {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify( data.data )}\n\n`));
                };
                
                const subScription = supabase.channel('article').on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'article' }, async () => {

                    const article = await supabase.from('article').select('title, category, date, time, id, paywall').eq('important', 'Not important').limit(6).eq('locked', false).order('id', {ascending: false})

                    //2024-08-20T14:30:00Z
                    if (article.data)
                        article.data.map(val => {
                            val.date = val.date.replaceAll(' ', '').replaceAll('.', '-');
                            if (val.time.length === 8) val.date = val.date.slice(0, -1) + 'T' + val.time + 'Z'
                            else val.date = val.date.slice(0, -1) + 'T0' + val.time + 'Z'
                        })

                    sendEvent(article);

                }).subscribe()

                
                req.signal.addEventListener("abort", () => {
                    supabase.removeChannel(subScription);
                    controller.close();
                });
            },
        });

        
        return new NextResponse(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        });*/

        return NextResponse.json({ error: 'Server error' }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}