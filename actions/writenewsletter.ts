'use server'

import mongoose from "mongoose"
import Admin from "@/model/Admin"
import Token from "@/model/Token"
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from "jsonwebtoken"
import * as z from 'zod';
import { NewsletterSchema } from "@/schema";
import sgMail from '@sendgrid/mail';
import { supabase } from "@/utils/supabase/article";
import fs from 'fs';
import path from 'path';





interface Decoded extends JwtPayload {
    id: string
}

async function connectToMongo() {
    if (mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(process.env.MONGODB_URI!,); // A Mongoose kapcsolat létrehozása
        }
        catch (error) {
            console.error('Failed to connect to MongoDB:', error);
            throw new Error('MongoDB connection failed');
        }
    }
}

async function closeConnection() {
    if (mongoose.connection.readyState !== 0) {
        try {
            await mongoose.connection.close();
        }
        catch (error) {
            console.error('Failed to close the connection:', error);
            throw new Error('Failed to close the connection');
        }
    }
}

export const writeNewsletter = async (newsletter: z.infer<typeof NewsletterSchema>) => {
    const cookie = cookies().get('admin-log');
    if (!cookie) return { error: 'Please log in' }
    try {
        await connectToMongo();
        const token = await Token.findOne({ token: cookie.value });
        if (!token) {
            await closeConnection();
            return { error: 'Please log in' };
        }

        const decoded = jwt.verify(token.token, process.env.SECRET_CODE!) as Decoded;
        if (!decoded) {
            await closeConnection();
            return { error: 'Please log in' };
        }

        console.log(decoded.id)

        const admin = await Admin.findById(decoded.id);
        if (!admin) {
            await closeConnection();
            return { error: 'Please log in' };
        }

        const validatedFields = NewsletterSchema.safeParse(newsletter);
        if (validatedFields.error) return { failed: validatedFields.error.errors }

        const data = await supabase.from('newsletter').select();

        if (data.error) return { error: 'Server error' }

        const facebookImage = fs.readFileSync(path.join(process.cwd(), 'image/facebook.png')).toString('base64');
        const instagramImage = fs.readFileSync(path.join(process.cwd(), 'image/instagram.png')).toString('base64');
        const youtubeImage = fs.readFileSync(path.join(process.cwd(), 'image/youtube.png')).toString('base64');
        const xImage = fs.readFileSync(path.join(process.cwd(), 'image/logos.png')).toString('base64');
        const tiktokImage = fs.readFileSync(path.join(process.cwd(), 'image/tik-tok(1).png')).toString('base64');
        const logoImage = fs.readFileSync(path.join(process.cwd(), 'image/email.png')).toString('base64');


        sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

        let err: string = '';

        const dayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDate: string = new Date().toLocaleDateString();
        const day: number = new Date().getDay();

        const emailTextArray = newsletter.text.split('\n').filter(item => item !== '').map(item => chooseTypeOfTextItem(item))

        for (let i = 0; i < data.data.length && err === ''; i++) {
            const token = jwt.sign({ email: data.data[i].email }, process.env.SECRET_CODE!)
            const msg = {
                to: data.data[i].email,
                from: process.env.EMAIL!,
                subject: newsletter.subject,
                text: 'Email',
                html: `
                     <!DOCTYPE html>
                     <html lang="en">
                     <head>
                         <meta charset="UTF-8">
                         <meta name="viewport" content="width=device-width, initial-scale=1.0">
                     </head>
                     <body>
                         <div style="background: whitesmoke ; padding: 8px">
                             <div style="max-width:1000px; margin: 0 auto; background:white; font-size:17px">
                                <div style="padding-left:8px;margin-bottom:8px">
                                    <img src="cid:logoImage" alt="logo image" style="width:32px">
                                </div>
                                <div style="padding-left:8px;margin-bottom:40px"> ${currentDate} ${dayArray[day]}</div>
                                <div style="margin-bottom:40px; font-size:30px; line-height: 36px; font-weight: 700; padding-left: 8px">${newsletter.title}</div>
                                <div style="margin-bottom:20px; padding-left: 8px;">Dear ${data.data[i].name},</div>
                                ${emailTextArray.join('')}
                                <footer style="background:black; margin-top:20px; color:white; padding: 8px;">
                                     <ul style="display:flex; gap:10px; list-style:none; margin-bottom:40px;margin-top:8px; padding-left:0">
                                         <li>
                                             <a href="https://www.facebook.com" target='_blank' style="color:white">
                                                 <img src="cid:facebookImage" alt='facebook icon' width={20} style="width:20px;"/>
                                                 
                                             </a>
                                         </li>
                                         <li>
                                             <a href="https://www.instagram.com" target='_blank' style="color:white">
                                                 <img src="cid:instagramImage" alt='instagram icon' width={20} style="width:20px;"/>
                                                 
                                             </a>
                                         </li>
                                         <li>
                                             <a href="https://www.youtube.com" target='_blank' style="color:white">
                                                 <img src="cid:youtubeImage" alt='youtube icon' width={20} style="width:20px;"/>
                                                 
                                             </a>
                                         </li>
                                         <li>
                                             <a href="https://www.x.com" target='_blank' style="color:white">
                                                 <img src="cid:xImage"  alt='x icon' width={20} style="width:20px;"/>
                                                 
                                             </a>
                                         </li>
                                         <li>
                                             <a href="https://www.tiktok.com" target='_blank' style="color:white">
                                                 <img src="cid:tiktokImage" alt='tiktok icon' width={20} style="width:20px;"/>
                                                 
                                             </a>
                                         </li>
                                     </ul>
                                     <div style="margin-bottom:16px">
                                         Want to stop getting emails from Wordtimes?
                                         <a href='http://localhost:3000/newsletter/unsubscribe/${token}' target='_blank' style="color:white"> Unsubscribe</a>
                                     </div>
                                 </footer>
                             </div>
                         </div>
                     </body>
                     </html>
                     
                     
                 `,
                attachments: [
                    {
                        content: facebookImage, // base64 encoding
                        filename: 'facebook.png',
                        type: 'image/png',
                        disposition: 'inline',
                        content_id: 'facebookImage'
                    },
                    {
                        content: instagramImage,
                        filename: 'instagram.png',
                        type: 'image/png',
                        disposition: 'inline',
                        content_id: 'instagramImage'
                    },
                    {
                        content: youtubeImage,
                        filename: 'youtube.png',
                        type: 'image/png',
                        disposition: 'inline',
                        content_id: 'youtubeImage'
                    },
                    {
                        content: xImage,
                        filename: 'x.png',
                        type: 'image/png',
                        disposition: 'inline',
                        content_id: 'xImage'
                    },
                    {
                        content: tiktokImage,
                        filename: 'tiktok.png',
                        type: 'image/png',
                        disposition: 'inline',
                        content_id: 'tiktokImage'
                    },
                    {
                        content: logoImage,
                        filename: 'email.png',
                        type: 'image/png',
                        disposition: 'inline',
                        content_id: 'logoImage'
                    }
                ]
            }
            await sgMail
                .send(msg)
                .then(() => {
                    console.log('Email sent');
                })
                .catch((error) => {
                    err = 'err'
                    console.error(error);
                })

        }

        if (err !== '') return { error: 'Server error' }
        return { success: 'Success' }

    }
    catch (err) {
        console.error(err);
        return { error: 'Server error' }
    }
}




const chooseTypeOfTextItem = (s: string) => {
    let TextArray: string = '';
    if (s.indexOf('<Image') === 0) { TextArray = createImg(s) }
    else if (s.indexOf('<highlight>') === 0) { TextArray = createHighlight(s) }
    else { TextArray = createParagh(s); }

    return TextArray;
}



const createParagh = (s: string) => {
    return (
        `<p  style="margin-bottom:40px;padding-left:8px" >
            ${jsxInText(s)}
            </p>`
    )
}



const jsxInText = (s: string) => {
    const textArray: string[] = [];

    let index1: number = 0
    let index2: number | string = s.indexOf('<')
    let error: string = '';
    let result: number | string = '';


    while (index2 > -1) {

        if (s.indexOf('<anchor', index1) === index2 && index2 > -1) {
            textArray.push(s.slice(index1, index2));
            result = createAnchor(s.slice(index2, s.indexOf('</anchor_link>', index2) + 14));
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = s.indexOf('</anchor_link>', index2) + 14;
                index2 = s.indexOf('<', index1);
            }

        }
        else if (s.indexOf('<bold', index1) === index2 && index2 > -1) {
            textArray.push(s.slice(index1, index2));
            result = createStrong(s.slice(index2, s.indexOf('</bold>', index2) + 7));
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = s.indexOf('</bold>', index2) + 7;
                index2 = s.indexOf('<', index1);
            }

        }
        else if (s.indexOf('<italic', index1) === index2 && index2 > -1) {
            textArray.push(s.slice(index1, index2));
            result = createEm(s.slice(index2, s.indexOf('</italic', index2) + 9));
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = s.indexOf('</italic', index2) + 9;
                index2 = s.indexOf('<', index1);
            }

        }
        else {
            error = 'error';
            index2 = -1;
        }
        if (typeof (result) === 'number') {
            error = 'error';
            index2 = -1;
        }
    }

    if (error === '') textArray.push(s.slice(index1, s.length));

    return textArray.join('');
}


const createAnchor = (s: string) => {
    const indexHref: number = s.indexOf('(');
    const indexHrefEnd: number = s.indexOf(')');
    const indexTextEnd: number = s.indexOf('</anchor', 1);
    const emIndex: number = s.indexOf('<italic');
    const strongIndex: number = s.indexOf('<bold');
    const index: number = s.indexOf('<', 1);
    if (indexHref === -1 || indexHrefEnd === -1 || indexTextEnd === -1 || (index !== emIndex && index !== strongIndex && index !== indexTextEnd)) {

        return -1;
    }
    ///Fixed the +2 error link kinézet miatt {} >///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const text = s.slice(indexHrefEnd + 2, indexTextEnd);
    const textArray: (string)[] = [];
    let index1: number = 0
    let index3: number = text.indexOf('<');
    let result: number | string = '';

    while (index3 > -1) {
        if (text.indexOf('<italic') === index3 && index3 > -1) {

            textArray.push(text.slice(index1, index3));
            result = createEm(text.slice(index3, text.indexOf('</italic>', index3) + 9));
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = text.indexOf('</italic', index3) + 9;
                index3 = text.indexOf('<', index1);
            }

        }
        else if (text.indexOf('<bold') === index3 && index3 > -1) {
            textArray.push(text.slice(index1, index3));
            result = createStrong(text.slice(index3, text.indexOf('</bold>', index3) + 7));
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = text.indexOf('</bold>', index3) + 7;
                index3 = text.indexOf('<', index1);
            }

        }
        else {
            return -1;
        }
        if (typeof (result) === 'number') {
            return -1;
        }
    }
    textArray.push(text.slice(index1, text.length))

    return (
        `<a target='_blank' href = ${ s.slice(indexHref + 1, indexHrefEnd) } style="color:black"> ${textArray.join('')} </a>`
    )
}


const createStrong = (s: string,) => {
    const indexHrefEnd = s.indexOf('>');
    const indexTextEnd = s.indexOf('</bold', 1);
    const index = s.indexOf('<', 1);
    const emIndex = s.indexOf('<italic');
    if (indexHrefEnd === -1 || indexTextEnd === -1 || (index !== indexTextEnd && index !== emIndex)) {
        return -1;
    }

    const text = s.slice(indexHrefEnd + 1, indexTextEnd);
    const textArray: (string)[] = [];
    let index1: number = 0
    let index3: number = text.indexOf('<');
    let result: number | string = '';

    while (index3 > -1) {
        if (text.indexOf('<italic') === index3 && index3 > -1) {

            textArray.push(text.slice(index1, index3));
            result = createEmText(text.slice(index3, text.indexOf('</italic>', index3) + 9));
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = text.indexOf('</italic>', index3) + 9;
                index3 = text.indexOf('<', index1);
            }
        }
        else {
            return -1;
        }
        if (typeof (result) === 'number') {
            return -1;
        }
    }
    textArray.push(text.slice(index1, text.length))

    return (
        `<strong> ${textArray.join('')} </strong>`
    )
}

const createStrongText = (s: string) => {
    const indexHrefEnd = s.indexOf('>');
    const indexTextEnd = s.indexOf('</bold', 1);
    const index = s.indexOf('<', 1);
    if (indexHrefEnd === -1 || indexTextEnd === -1 || index !== indexTextEnd) {
        return -1;
    }

    const text = s.slice(indexHrefEnd + 1, indexTextEnd);

    return (
        `<strong > ${text} </strong>`
    )
}



const createEm = (s: string) => {
    const indexHrefEnd = s.indexOf('>');
    const indexTextEnd = s.indexOf('</italic');
    const index = s.indexOf('<', 1);
    const strongIndex = s.indexOf('<bold');

    if (indexHrefEnd === -1 || indexTextEnd === -1 || (index !== indexTextEnd && index !== strongIndex)) {
        return -1;
    }
    const text = s.slice(indexHrefEnd + 1, indexTextEnd);

    const textArray: (string | JSX.Element)[] = [];
    let index1: number = 0
    let index3: number = text.indexOf('<');
    let result: number | string = '';

    while (index3 > -1) {
        if (text.indexOf('<bold') === index3 && index3 > -1) {
            textArray.push(text.slice(index1, index3));
            result = createStrongText(text.slice(index3, text.indexOf('</bold>', index3) + 7));

            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = text.indexOf('</bold>', index3) + 7;
                index3 = text.indexOf('<', index1);
            }
        }
        else {
            return -1;
        }
        if (typeof (result) === 'number') {
            return -1;
        }
    }
    textArray.push(text.slice(index1, text.length))
    return (
        `<em > ${textArray.join('')} </em>`
    )
}


const createEmText = (s: string) => {
    const indexHrefEnd = s.indexOf('>');
    const indexTextEnd = s.indexOf('</italic');
    const index = s.indexOf('<', 1);

    if (indexHrefEnd === -1 || indexTextEnd === -1 || index !== indexTextEnd) {
        return -1;
    }
    const text = s.slice(indexHrefEnd + 1, indexTextEnd);
    return (
        `<em> ${text} </em>`
    )
}


/************************************************************************************************
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */


const createImg = (s: string) => {
    const index1: number = s.indexOf('(');
    const index2: number = s.indexOf(')');
    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);

    if (BeginOfText.length !== 12 || EndOfText.length !== 3) {

        return '';
    }

    return `<div><img src=${ s.slice(index1 + 1, index2) } alt = 'edfeff' style="display:block; max-width:550px; margin:0 auto 40px;"  width = { 600} height = { 337.5} /> </div>`
}


const createHighlight = (s: string) => {
    const index1 = s.indexOf('<highlight>');
    const index2 = s.indexOf('</highlight>');

    if (index1 !== 0 || index2 === -1 || s.length !== index2 + 12) {

        return '';
    }

    const text = s.slice(11, index2);

    return (
        `<div style="margin-left:2px;border-color: black;border-left: 4px solid;padding-left: 1rem;margin-bottom: 2.5rem"><span style="color: white;background-color: black; display: inline-block;padding: 0.25rem;font-weight: 700;"> ${text} </span></div >`
    )
}