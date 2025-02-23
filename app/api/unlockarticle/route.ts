import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { EditArticleSchema } from "@/schema";
import { getImageById } from "@/actions/getimageurl";
import { getVideoById } from "@/actions/getvideourl";
import SocketService from "@/service/socketService";
import { chooseTypeOfTextItem, editImageIdToData, isValidYoutubeUrl, searchAudio, searchVideo } from "@/lib/checkArt";
import { Eligibility } from "@/utils/mongo/eligibility";
import { chooseTypeOfTextItemSearch } from "@/lib/makeSearchArt";



interface DataMainPage {
    id: string,
    title: string,
    date: string,
    time: string,
    category: string,
    paywall: boolean
}


export async function POST(req: NextRequest) {


    try {
        const cookie = req.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in' }, { status: 401 });

        const coll = await Eligibility(cookie.value)

        if (coll.role === '') return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const body = await req.json();
        const value = EditArticleSchema.parse(body);
        const validatedFields = EditArticleSchema.safeParse(value);
        if (validatedFields.error) return NextResponse.json({ failed: validatedFields.error.errors }, { status: 400 });

        let res: string = 'ok';
        const textArra: string[] = value.text.split('$');
        const paywallTextArr: string[] = value.paywall_text.split('$');

        for (let i = 0; i < textArra.length && res === 'ok'; i++) {
            res = chooseTypeOfTextItem(textArra[i]);
            if (res !== 'ok') return NextResponse.json({ error: res }, { status: 400 })
            if (textArra[i].indexOf('<video') === 0) {
                const res = await searchVideo(textArra[i]);

                if (res.success) {
                    textArra[i] = `<video id=(${res.success.url};${res.success._id};${res.success.title})></video>`
                }
                else return NextResponse.json({ error: 'Video id is not in database' }, { status: 404 })
            }

            if (textArra[i].indexOf('<audio') === 0) {
                const res = await searchAudio(textArra[i]);

                if (res.success) {
                    textArra[i] = `<audio id=(${res.success.url};${res.success._id};${res.success.title};${res.success.date})></<audio>`
                }
                else return NextResponse.json({ error: 'Video id is not in database' }, { status: 404 })
            }

            if (textArra[i].indexOf('<Image') === 0) {

                const res = await editImageIdToData(textArra[i]);

                if (res.success) {
                    textArra[i] = `<Image id=(${res.success.url};${res.success._id};${res.success.detail})></<Image>`
                }
                else return NextResponse.json({ error: 'Image id is not in database' }, { status: 404 })
            }
        }


        for (let i = 0; i < paywallTextArr.length && res === 'ok'; i++) {
            res = chooseTypeOfTextItem(paywallTextArr[i]);
            if (res !== 'ok') return NextResponse.json({ error: res }, { status: 400 })
            if (paywallTextArr[i].indexOf('<video') === 0) {
                const res = await searchVideo(paywallTextArr[i]);

                if (res.success) {
                    paywallTextArr[i] = `<video id=(${res.success.url};${res.success._id};${res.success.title})></video>`
                }
                else return NextResponse.json({ error: 'Video id is not in database' }, { status: 400 })
            }

            if (paywallTextArr[i].indexOf('<audio') === 0) {
                const res = await searchAudio(paywallTextArr[i]);

                if (res.success) {
                    paywallTextArr[i] = `<audio id=(${res.success.url};${res.success._id};${res.success.title};${res.success.date})></<audio>`
                }
                else return NextResponse.json({ error: 'Video id is not in database' }, { status: 400 })
            }

            if (paywallTextArr[i].indexOf('<Image') === 0) {
                const res = await editImageIdToData(paywallTextArr[i]);

                if (res.success) {
                    paywallTextArr[i] = `<Image id=(${res.success.url};${res.success._id};${res.success.detail})></<Image>`
                }
                else return NextResponse.json({ error: 'Image id is not in database' }, { status: 400 })
            }
        }


        const resImg = await getImageById({ id: value.cover_img_id })

        if (resImg.error) return NextResponse.json({ error: 'Cover image id is not in database' }, { status: 400 });
        const cover_img_id = resImg.success.url + ';' + resImg.success._id + ';' + resImg.success.detail;

        let resFirstElement;
        let firstElementUrl: string;

        if (value.first_element === 'Image') {
            resFirstElement = await getImageById({ id: value.first_element_url });

            if (resFirstElement?.error || resFirstElement.success === null) return NextResponse.json({ error: 'First element image id is not in database' }, { status: 400 })
            else { firstElementUrl = resFirstElement?.success.url + ';' + resFirstElement?.success.id + ';' + resFirstElement?.success.detail }
        }
        else if (value.first_element === 'Video') {
            resFirstElement = await getVideoById({ id: value.first_element_url });

            if (resFirstElement?.error || resFirstElement.success === null) return NextResponse.json({ error: 'First element video id is not in database' }, { status: 400 });
            else { firstElementUrl = resFirstElement?.success.url + ';' + resFirstElement?.success._id + ';' + resFirstElement?.success.title }
        }
        else if (value.first_element === 'Youtube') {
            resFirstElement = isValidYoutubeUrl(value.first_element_url)

            if (!resFirstElement) return NextResponse.json({ error: 'First element youtube url is not correct' }, { status: 400 });
            else { firstElementUrl = value.first_element_url; }
        }
        else {
            firstElementUrl = value.first_element_url;
        }



        /*if (value.important === 'Second most important') {
            const Arts = await supabase.from('article').select().eq('important', 'Second most important').eq('locked', false);
            if (Arts.data?.length === 2) {
                const Update = await supabase.from('article').update({ 'important': 'Important' }).eq('important', 'Second most important').order('id').eq('locked', false).limit(1)
                console.log(Update.error)
            }
        }

        if (value.important === 'Most important') {
            const Arts = await supabase.from('article').select().eq('important', 'Second most important').eq('locked', false);
            if (Arts.data?.length === 2) {
                const Update = await supabase.from('article').update({ 'important': 'Important' }).eq('important', 'Second most important').eq('locked', false).order('id').limit(1)
                console.log(Update.error)
            }

            const Art2 = await supabase.from('article').update({ 'important': 'Second most important' }).eq('important', 'Most important').eq('locked', false);
            console.log(Art2.error)
        }*/

        const currentDate: string = new Date().toISOString().slice(0, 10).replaceAll('-', '. ') + '.';
        const currentTime: string = new Date().toISOString().slice(11, 19);

        const searchArt = [];

        for (let i = 0; i < textArra.length; i++) {
            searchArt.push(chooseTypeOfTextItemSearch(textArra[i]))
        }

        /*const { error } = await supabase.from('article').update({
            date: currentDate,
            time: currentTime,
            text: textArra.join('$'),
            title: value.title,
            first_element: value.first_element,
            first_element_url: firstElementUrl,
            category: value.category,
            important: value.important,
            paywall: value.paywall,
            paywall_text: paywallTextArr.join('$'),
            sidebar: value.sidebar,
            cover_img_id,
            keyword: value.keyword,
            detail: value.detail,
            locked: false,
            search_art:searchArt.join(' ')
        }).eq('title', value.lastTitle)

        if (error) {
            console.log(error);
            return NextResponse.json({ error: 'Server error' }, { status: 500 });
        }



        for (let i = 0; i < value.keyword.length; i++) {
            const res = await supabase.rpc('settheme', { p_theme: value.keyword[i] });
            if (res.error) console.log(res.error)
        }

        const Title: string[] = value.title.split(' ');

        for (let i = 0; i < Title.length; i++) {
            const res = await supabase.rpc('settitle', { p_title: Title[i].toLowerCase() })
            if (res.error) console.log(res.error)
        }

        const socketService = SocketService.getInstance();
        const article: PostgrestSingleResponse<DataMainPage[]> = await supabase.from('article').select('title, category, date, time, id, paywall').limit(6).eq('locked', false).order('id', { ascending: false })
        if (!article.error) {
            article.data.map(val => {
                val.date = val.date.replaceAll(' ', '').replaceAll('.', '-');
                if (val.time.length === 8) val.date = val.date.slice(0, -1) + 'T' + val.time + 'Z'
                else val.date = val.date.slice(0, -1) + 'T0' + val.time + 'Z'
            })

            socketService.emit('lastMainPage', { data: article.data })
        }


        const lockeddArticle: PostgrestSingleResponse<{ id: string }[]> = await supabase.from('article').select('id', { count: 'exact' }).eq('locked', true)
        if (!lockeddArticle.data || lockeddArticle.data.length === 0) {

            socketService.emit('unLockArticle', { data: 0 })
        }
        else {
            socketService.emit('unLockArticle', { data: lockeddArticle.count })
        }*/



        return NextResponse.json({ success: 'Success', date: currentDate }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

}

