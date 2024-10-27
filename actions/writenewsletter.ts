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
import facebook from '@/image/facebook.png';
import instagram from '@/image/instagram.png';
import youtube from '@/image/youtube.png';
import x from '@/image/logos.png';
import tiktok from '@/image/tik-tok(1).png'





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

        const admin = await Admin.findById(decoded.id);
        if (!admin) {
            await closeConnection();
            return { error: 'Please log in' };
        }

        const validatedFields = NewsletterSchema.safeParse(newsletter);
        if (validatedFields.error) return { failed: validatedFields.error.errors }

        const data = await supabase.from('newsletter').select();

        if (data.error) return { error: 'Server error' }


        
        
        sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

        let err: string = '';

        for (let i = 0; i < data.data.length && err === ''; i++) {
            const token = jwt.sign({email: data.data[i].email},process.env.SECRET_CODE!)
            const msg = {
                to: data.data[i].email,
                from: process.env.EMAIL!,
                subject: newsletter.subject,
                text: 'Email',
                html: `
                    <div style="width:100%;display:flex;justify-content: center;">
                        <div style="max-width:800px">
                            <h2 style="margin-bottom:20px">Dear ${data.data[i].name},</h2>
                            ${newsletter.text}
                            <footer style="background:black;margin-top:20px;color:white">
                                <ul style="display:flex;gap:5px">
                                    <li>
                                        <a href="https://www.facebook.com" target='_blank'>
                                            <img src=${facebook} alt='facebook icon'/>
                                            
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com" target='_blank'>
                                            <img src=${instagram} alt='instagram icon'/>
                                            
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com" target='_blank'>
                                            <img src=${youtube} alt='youtube icon'/>
                                            
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.x.com" target='_blank'>
                                            <img src=${x} alt='x icon'/>
                                            
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.tiktok.com" target='_blank'>
                                            <img src=${tiktok} alt='tiktok icon'/>
                                            
                                        </a>
                                    </li>
                                </ul>
                                <div>
                                    Want to stop getting emails from Wordtimes?
                                    <a href='http://localhost:3000/newsletter/unsubscribe/${token}' target='_blank' style="color:white">Unsubscribe</a>
                                </div>
                            </footer>
                        </div>
                    </div>
                    
                `,
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