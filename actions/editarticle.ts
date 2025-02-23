'use server'

import { supabase } from "@/utils/supabase/article";
import { EditArticleSchema } from "@/schema";
import * as z from 'zod'
import { getImageById } from "./getimageurl";
import { getVideoById } from "./getvideourl";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { chooseTypeOfTextItem, editImageIdToData, isValidYoutubeUrl, searchAudio, searchVideo } from "@/lib/checkArt";
import { chooseTypeOfTextItemSearch } from "@/lib/makeSearchArt";
import { cookies } from "next/headers";
import { Eligibility } from "@/utils/mongo/eligibility";

interface Theme {
    id: string,
    theme: string,
    number: number
}

interface Title {
    id: string,
    title: string,
    number: number
}

export const editArticle = async (value: z.infer<typeof EditArticleSchema>) => {
    try {

        const Cookie = cookies().get('admin-log');

        const coll = await Eligibility(Cookie?.value)

        if (coll.role === '') return { error: 'Please log in as admin' };

        const validatedFields = EditArticleSchema.safeParse(value);
        if (validatedFields.error) return { failed: validatedFields.error.errors };

        let res: string = 'ok';
        const textArra: string[] = value.text.split('$');
        const paywallTextArr: string[] = value.paywall_text.split('$');

        for (let i = 0; i < textArra.length && res === 'ok'; i++) {
            res = chooseTypeOfTextItem(textArra[i]);
            if (res !== 'ok') return { error: res }
            if (textArra[i].indexOf('<video') === 0) {
                const res = await searchVideo(textArra[i]);

                if (res.success) {
                    textArra[i] = `<video id=(${res.success.url};${res.success._id};${res.success.title})></video>`
                }
                else return { error: 'Video id is not in database' }
            }

            if (textArra[i].indexOf('<audio') === 0) {
                const res = await searchAudio(textArra[i]);

                if (res.success) {
                    textArra[i] = `<audio id=(${res.success.url};${res.success._id};${res.success.title};${res.success.date})></<audio>`
                }
                else return { error: 'Video id is not in database' }
            }

            if (textArra[i].indexOf('<Image') === 0) {

                const res = await editImageIdToData(textArra[i]);

                if (res.success) {
                    textArra[i] = `<Image id=(${res.success.url};${res.success._id};${res.success.detail})></<Image>`
                }
                else return { error: 'Image id is not in database' }
            }
        }


        for (let i = 0; i < paywallTextArr.length && res === 'ok'; i++) {
            res = chooseTypeOfTextItem(paywallTextArr[i]);
            if (res !== 'ok') return { error: res }
            if (paywallTextArr[i].indexOf('<video') === 0) {
                const res = await searchVideo(paywallTextArr[i]);

                if (res.success) {
                    paywallTextArr[i] = `<video id=(${res.success.url};${res.success._id};${res.success.title})></video>`
                }
                else return { error: 'Video id is not in database' }
            }

            if (paywallTextArr[i].indexOf('<audio') === 0) {
                const res = await searchAudio(paywallTextArr[i]);

                if (res.success) {
                    paywallTextArr[i] = `<audio id=(${res.success.url};${res.success._id};${res.success.title};${res.success.date})></<audio>`
                }
                else return { error: 'Video id is not in database' }
            }

            if (paywallTextArr[i].indexOf('<Image') === 0) {
                const res = await editImageIdToData(paywallTextArr[i]);

                if (res.success) {
                    paywallTextArr[i] = `<Image id=(${res.success.url};${res.success._id};${res.success.detail})></<Image>`
                }
                else return { error: 'Image id is not in database' }
            }
        }


        const resImg = await getImageById({ id: value.cover_img_id })

        if (resImg.error) return { error: 'Cover image id is not in database' }
        const cover_img_id = resImg.success.url + ';' + resImg.success._id + ';' + resImg.success.detail;

        let resFirstElement;
        let firstElementUrl: string;

        if (value.first_element === 'Image') {
            resFirstElement = await getImageById({ id: value.first_element_url });

            if (resFirstElement?.error || resFirstElement.success === null) return { error: 'First element image id is not in database' }
            else { firstElementUrl = resFirstElement?.success.url + ';' + resFirstElement?.success.id + ';' + resFirstElement?.success.detail }
        }
        else if (value.first_element === 'Video') {
            resFirstElement = await getVideoById({ id: value.first_element_url });

            if (resFirstElement?.error || resFirstElement.success === null) return { error: 'First element video id is not in database' }
            else { firstElementUrl = resFirstElement?.success.url + ';' + resFirstElement?.success.id + ';' + resFirstElement?.success.title }
        }
        else if (value.first_element === 'Youtube') {
            resFirstElement = isValidYoutubeUrl(value.first_element_url)

            if (!resFirstElement) return { error: 'First element youtube url is not correct' }
            else { firstElementUrl = value.first_element_url; }
        }
        else {
            firstElementUrl = value.first_element_url;
        }



        const searchArt = [];

        for (let i = 0; i < textArra.length; i++) {
            searchArt.push(chooseTypeOfTextItemSearch(textArra[i]))
        }




        /*if (value.important === 'Second most important') {
            const Arts = await supabase.from('article').select().eq('important', 'Second most important');
            if (Arts.data?.length === 2) {
                const Update = await supabase.from('article').update({ 'important': 'Second most important' }).eq('important', 'important').order('id').limit(1)
                console.log(Update.error)
            }
        }

        if (value.important === 'Most important') {
            const Arts = await supabase.from('article').select().eq('important', 'Second most important');
            if (Arts.data?.length === 2) {
                const Update = await supabase.from('article').update({ 'important': 'important' }).eq('important', 'Second most important').order('id').limit(1)
                console.log(Update.error)
            }

            const Art2 = await supabase.from('article').update({ 'important': 'Second most important' }).eq('important', 'Most important');
            console.log(Art2.error)
        }

        const lastArticle = await supabase.from('article').select('keyword').eq('title', value.lastTitle)

        const { data, error } = await supabase.from('article').update({
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
            updated: true,
            search_art:searchArt.join(' ')
        }).eq('title', value.lastTitle)

        if (error) {
            console.log(error);
            return { error: 'Server error' }
        }


        if (lastArticle.data) {
            for (let i = 0; i < value.keyword.length; i++) {
                if (!(value.keyword[i] in lastArticle.data[0].keyword)) {
                    const res = await supabase.rpc('settheme', { p_theme: value.keyword[i] });
                    if (res.error) console.log(res.error)
                }
            }

            for (let i = 0; i < lastArticle.data[0].keyword.length; i++) {
                if (!(lastArticle.data[0].keyword[i] in value.keyword)) {
                    const res: PostgrestSingleResponse<Theme[]> = await supabase.from('themes').select().eq('theme', lastArticle.data[0].keyword[i])
                    if (res.data) {
                        if (res.data[0].number > 1) {
                            const Res = await supabase.from('themes').update({
                                number: res.data[0].number - 1
                            }).eq('theme', lastArticle.data[0].keyword[i])

                            if (Res.error) console.log(Res.error);
                        }
                        else {
                            const Res = await supabase.from('themes').delete().eq('theme', lastArticle.data[0].keyword[i]);
                            if (Res.error) console.log(Res.error);
                        }
                    }
                    if (res.error) console.log(res.error)
                }
            }
        }

        if (value.title !== value.lastTitle) {
            const Title: string[] = value.title.split(' ');
            const LastTitle: string[] = value.lastTitle.split(' ');

            for (let i = 0; i < Title.length; i++) {
                if (!(Title[i] in LastTitle)) {
                    const res = await supabase.rpc('settitle', { p_title: Title[i].toLowerCase() })
                    if (res.error) console.log(res.error)
                }
            }

            for (let i = 0; i < LastTitle.length; i++) {
                if(!(LastTitle[i] in Title)){
                    const res: PostgrestSingleResponse<Title[]> = await supabase.from('titles').select().eq('title',LastTitle[i]);
                    if(res.data){
                        if(res.data[0].number > 1){
                            const Res = await supabase.from('titles').update({number: res.data[0].number - 1}).eq('title',LastTitle[i]);
                            if (Res.error) console.log(Res.error);
                        }
                        else{
                            const Res = await supabase.from('titles').delete().eq('title',LastTitle[i]);
                            if (Res.error) console.log(Res.error);
                        }
                    }
                    if (res.error) console.log(res.error)
                }
            }
        }*/


        return { success: 'Success' }
    }
    catch (err) {
        console.log(err)
        return { error: 'Server error' }
    }
}


