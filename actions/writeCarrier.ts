'use server'

import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"
import * as z from 'zod'
import { WriteCarrierSchema } from "@/schema";
import Carrier from "@/model/Carrier";

interface Decoded extends JwtPayload {
    id: string
}


export const WriteCarrier = async (value: z.infer<typeof WriteCarrierSchema>) => {
    const cookie = cookies().get('admin-log');
    if (!cookie) return { error: 'Please log in' };

    try {

        const token = await Token.findOne({ token: cookie.value });
        if (!token) {

            return { error: 'Please log in' };
        }

        const decoded = jwt.verify(token.token, process.env.SECRET_CODE!) as Decoded;
        if (!decoded) {

            return { error: 'Please log in' };
        }

        const account = await Admin.findById(decoded.id);
        if (!account) {

            return { error: 'Please log in' };
        }

        const validatedFields = WriteCarrierSchema.safeParse(value);
        if (validatedFields.error) return { failed: validatedFields.error.errors };

        let res: string = 'ok';
        const textArra: string[] = value.text.split('$');

        for (let i = 0; i < textArra.length && res === 'ok'; i++) {
            res = chooseTypeOfTextItem(textArra[i]);
            if (res !== 'ok') return { error: res }
        }

        /*const newCarrier = new Carrier({
            title: value.title,
            text: textArra.join('$'),
        })

        await newCarrier.save()*/

        return { success: 'Success' }
    }
    catch (err) {
        console.log(err)
        return { error: 'Server error' }
    }
}


function chooseTypeOfTextItem(s: string) {
    let res: string = 'ok';
    if (s.indexOf('<ul>') === 0) { res = createList(s) }
    else if (s.indexOf('<title>') === 0) { res = createTitlte(s) }
    else if (s.indexOf('<highlight>') === 0) { res = createHighlight(s) }
    else { res = jsxInText(s); }

    return res;
}


const jsxInText = (s: string) => {
    let index1: number = 0
    let index2: number = s.indexOf('<')
    let result: string = '';

    while (index2 > -1) {
        if (s.indexOf('<bold', index1) === index2 && index2 > -1) {
            result = createStrong(s.slice(index2, s.indexOf('</bold>', index2) + 7));
            if (result.indexOf('Error') > -1) return result
            else {
                index1 = s.indexOf('</bold>', index2) + 7;
                index2 = s.indexOf('<', index1);
            }

        }
        else if (s.indexOf('<italic', index1) === index2 && index2 > -1) {
            result = createEm(s.slice(index2, s.indexOf('</italic', index2) + 9));
            if (result.indexOf('Error') > -1) return result
            else {
                index1 = s.indexOf('</italic', index2) + 9;
                index2 = s.indexOf('<', index1);
            }

        }
        else {
            return 'Error in simple text'
        }
    }

    return 'ok'
}


const createStrong = (s: string) => {
    const indexHrefEnd = s.indexOf('>');
    const indexTextEnd = s.indexOf('</bold', 1);
    const index = s.indexOf('<', 1);
    const emIndex = s.indexOf('<italic');

    if (indexHrefEnd !== 5 || indexTextEnd === -1 || (index !== indexTextEnd && index !== emIndex)) {
        return 'Error in bold'
    }

    const text = s.slice(indexHrefEnd + 1, indexTextEnd);
    let index1: number = 0
    let index3: number = text.indexOf('<');
    let result: string = '';

    while (index3 > -1) {
        if (text.indexOf('<italic') === index3 && index3 > -1) {

            result = createEmText(text.slice(index3, text.indexOf('</italic>', index3) + 9));
            if (result === 'Error in italic') {
                return result
            }
            else {
                index1 = text.indexOf('</italic>', index3) + 9;
                index3 = text.indexOf('<', index1);
            }
        }
        else {
            return 'Error in bold';
        }
    }

    return 'ok'
}


const createStrongText = (s: string) => {
    const indexHrefEnd = s.indexOf('>');
    const indexTextEnd = s.indexOf('</bold', 1);
    const index = s.indexOf('<', 1);
    if (indexHrefEnd !== 5 || indexTextEnd === -1 || index !== indexTextEnd) {
        return 'Error in bold'
    }

    return 'ok'
}


const createEm = (s: string) => {
    const indexHrefEnd = s.indexOf('>');
    const indexTextEnd = s.indexOf('</italic');
    const index = s.indexOf('<', 1);
    const strongIndex = s.indexOf('<bold');

    if (indexHrefEnd !== 7 || indexTextEnd === -1 || (index !== indexTextEnd && index !== strongIndex)) {
        return 'Error in italic'
    }
    const text = s.slice(indexHrefEnd + 1, indexTextEnd);

    let index1: number = 0
    let index3: number = text.indexOf('<');
    let result: string = ''

    while (index3 > -1) {
        if (text.indexOf('<bold') === index3 && index3 > -1) {
            result = createStrongText(text.slice(index3, text.indexOf('</bold>', index3) + 7));

            if (result === 'Error in bold') {
                return result
            }
            else {
                index1 = text.indexOf('</bold>', index3) + 7;
                index3 = text.indexOf('<', index1);
            }
        }
        else {
            return 'Error in italic'
        }
    }
    return 'ok'
}


const createEmText = (s: string) => {
    const indexHrefEnd = s.indexOf('>');
    const indexTextEnd = s.indexOf('</italic');
    const index = s.indexOf('<', 1);

    if (indexHrefEnd !== 7 || indexTextEnd === -1 || index !== indexTextEnd) {
        return 'Error in italic'
    }
    return 'ok'
}


const createList = (s: string) => {
    const index1 = s.indexOf('<ul>');
    const index2 = s.indexOf('</ul>');
    if (index1 !== 0 || index2 === -1 || s.length !== index2 + 5) {
        return 'Error in list'
    }

    const List = s.slice(index1 + 4, index2);

    const arr = List.split('<list>');

    for (let i = 0; i < arr.length; i++) {
        const res = jsxInText(arr[i]);

        if (res.indexOf('Error') > -1) return res
    }

    return 'ok'
}


const createTitlte = (s: string) => {
    const index1 = s.indexOf('<title>');
    const index2 = s.indexOf('</title>');

    if (index1 !== 0 || index2 === -1 || s.length !== index2 + 8) {
        return 'Error in title'
    }

    return 'ok'
}


const createHighlight = (s: string) => {
    const index1 = s.indexOf('<highlight>');
    const index2 = s.indexOf('</highlight>');

    if (index1 !== 0 || index2 === -1 || s.length !== index2 + 12) {
        return 'Error in highlight'
    }

    return 'ok'
}
