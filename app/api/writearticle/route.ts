import { supabase } from "@/utils/supabase/article";
import { NewArticleSchema } from "@/schema";
import { getImageById } from "@/actions/getimageurl";
import { getVideoById } from "@/actions/getvideourl";
import { NextRequest, NextResponse } from "next/server";
import { chooseTypeOfTextItem, editImageIdToData, isValidYoutubeUrl, searchAudio, searchVideo } from "@/lib/checkArt";
import { Eligibility } from "@/utils/mongo/eligibility";
import { chooseTypeOfTextItemSearch } from "@/lib/makeSearchArt";


export async function POST(req: NextRequest) {


    try {
        const cookie = req.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in as admin or editor' }, { status: 401 });

        const coll = await Eligibility(cookie.value)

        if (coll.role !== 'Admin' && coll.role !== 'Editor') return NextResponse.json({ error: 'Please log in as admin or editor' }, { status: 401 });

        const body = await req.json();
        const value = NewArticleSchema.parse(body);
        const validatedFields = NewArticleSchema.safeParse(value);
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
                    textArra[i] = '<video id=(' + res.success.url + ';' + res.success._id + ';' + res.success.title + ')></video>'
                }
                else return NextResponse.json({ error: 'Video id is not in database' }, { status: 404 })
            }

            if (textArra[i].indexOf('<audio') === 0) {
                const res = await searchAudio(textArra[i]);

                if (res.success) {
                    textArra[i] = '<audio id=(' + res.success.url + ';' + res.success._id + ';' + res.success.title + ';' + res.success.date + ')></<audio>'
                }
                else return NextResponse.json({ error: 'Audio id is not in database' }, { status: 404 })
            }

            if (textArra[i].indexOf('<Image') === 0) {

                const res = await editImageIdToData(textArra[i]);

                if (res.success) {
                    textArra[i] = '<Image id=(' + res.success.url + ';' + res.success._id + ';' + res.success.detail + ')></<Image>'
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
                    paywallTextArr[i] = '<video id=(' + res.success.url + ';' + res.success._id + ';' + res.success.title + ')></video>'
                }
                else return NextResponse.json({ error: 'Video id is not in database' }, { status: 404 })
            }

            if (paywallTextArr[i].indexOf('<audio') === 0) {
                const res = await searchAudio(paywallTextArr[i]);

                if (res.success) {
                    paywallTextArr[i] = '<audio id=(' + res.success.url + ';' + res.success._id + ';' + res.success.title + ';' + res.success.date + ')></<audio>'
                }
                else return NextResponse.json({ error: 'Audio id is not in database' }, { status: 404 })
            }

            if (paywallTextArr[i].indexOf('<Image') === 0) {
                const res = await editImageIdToData(paywallTextArr[i]);

                if (res.success) {
                    paywallTextArr[i] = '<Image id=(' + res.success.url + ';' + res.success._id + ';' + res.success.detail + ')></<Image>'
                }
                else return NextResponse.json({ error: 'Image id is not in database' }, { status: 404 })
            }
        }


        const resImg = await getImageById({ id: value.cover_img_id })

        if (resImg.error) return NextResponse.json({ error: 'Cover image id is not in database' }, { status: 404 })
        const cover_img_id = resImg.success.url + ';' + resImg.success._id + ';' + resImg.success.detail;

        let resFirstElement;
        let firstElementUrl: string;

        if (value.first_element === 'Image') {
            resFirstElement = await getImageById({ id: value.first_element_url });

            if (resFirstElement?.error || resFirstElement.success === null) return NextResponse.json({ error: 'First element image id is not in database' }, { status: 404 })
            else { firstElementUrl = resFirstElement?.success.url + ';' + resFirstElement?.success.id + ';' + resFirstElement?.success.detail }
        }
        else if (value.first_element === 'Video') {
            resFirstElement = await getVideoById({ id: value.first_element_url });

            if (resFirstElement?.error || resFirstElement.success === null) return NextResponse.json({ error: 'First element video id is not in database' }, { status: 404 })
            else { firstElementUrl = resFirstElement?.success.url + ';' + resFirstElement?.success._id + ';' + resFirstElement?.success.title }
        }
        else if (value.first_element === 'Youtube') {
            resFirstElement = isValidYoutubeUrl(value.first_element_url)

            if (!resFirstElement) return NextResponse.json({ error: 'First element youtube url is not correct' }, { status: 400 })
            else { firstElementUrl = value.first_element_url; }
        }
        else {
            firstElementUrl = value.first_element_url;
        }

        const currentDate: string = new Date().toISOString().slice(0, 10).replaceAll('-', '. ') + '.';
        const currentTime: string = new Date().toISOString().slice(11, 19);

        const searchArt = [];

        for (let i = 0; i < textArra.length; i++) {
            searchArt.push(chooseTypeOfTextItemSearch(textArra[i]))
        }


        /* const { data, error } = await supabase.from('article').insert({
             date: currentDate,
             time: currentTime,
             text: textArra.join('$'),
             title: value.title,
             first_element: value.first_element,
             first_element_url: firstElementUrl,
             author: coll.name,
             category: value.category,
             important: value.important,
             paywall: value.paywall,
             paywall_text: paywallTextArr.join('$'),
             sidebar: value.sidebar,
             cover_img_id,
             keyword: value.keyword,
             detail: value.detail,
             search_art:searchArt.join(' ')
         })
 
         if (error) {
             console.log(error);
             return NextResponse.json({ error: 'Server error' }, { status: 500 });
         }
 
        */


        return NextResponse.json({ success: 'Success' }, { status: 200 })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}




