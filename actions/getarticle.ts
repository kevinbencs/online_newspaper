'use server'

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import Token from "@/model/Token";
import Admin from "@/model/Admin";
import mongoose from "mongoose";
import { supabase } from "@/utils/supabase/article";

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


export const getArticle = async (Article: string, date: string) => {

    const article = await supabase.from('article').select().eq('title', Article).eq('date',date)

    if (!article.data || article.data.length === 0) { return { error: 'No article' } }

    if (!article.data[0].paywall) {
        return {
            data: {
                title: article.data[0].title,
                date: article.data[0].date,
                text: article.data[0].text,
                first_element: article.data[0].first_element,
                first_element_url: article.data[0].first_element_url,
                author: article.data[0].author,
                category: article.data[0].category,
                paywall: false,
                sidebar: article.data[0].sidebar,
                themes: article.data[0].themes,
                cover_img_id: article.data[0].cover_img_id,
                keyword: article.data[0].keyword,
                time: article.data[0].time,
            }
        }
    }

    const supabaseUser = createClient();

    const { data, error } = await supabaseUser.auth.getUser();

    if (data.user) return {
        data: {
            title: article.data[0].title,
            date: article.data[0].date,
            text: article.data[0].text,
            first_element: article.data[0].first_element,
            first_element_url: article.data[0].first_element_url,
            author: article.data[0].author,
            category: article.data[0].category,
            paywall: false,
            sidebar: article.data[0].sidebar,
            themes: article.data[0].themes,
            cover_img_id: article.data[0].cover_img_id,
            keyword: article.data[0].keyword,
            time: article.data[0].time
        }
    };



    const Cookie = cookies().get('admin-log');

    if (Cookie) {
        try {
            await connectToMongo();

            const token = await Token.findOne({ token: Cookie.value });
            if (!token) {
                await closeConnection();
                return {
                    data: {
                        title: article.data[0].title,
                        date: article.data[0].date,
                        text: article.data[0].paywall_text,
                        first_element: article.data[0].first_element,
                        first_element_url: article.data[0].first_element_url,
                        author: article.data[0].author,
                        category: article.data[0].category,
                        paywall: true,
                        sidebar: article.data[0].sidebar,
                        themes: article.data[0].themes,
                        cover_img_id: article.data[0].cover_img_id,
                        keyword: article.data[0].keyword,
                        time: article.data[0].time
                    }
                };
            }

            const decoded = jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded
            if (!decoded) {
                await closeConnection();
                return {
                    data: {
                        title: article.data[0].title,
                        date: article.data[0].date,
                        text: article.data[0].paywall_text,
                        first_element: article.data[0].first_element,
                        first_element_url: article.data[0].first_element_url,
                        author: article.data[0].author,
                        category: article.data[0].category,
                        paywall: true,
                        sidebar: article.data[0].sidebar,
                        themes: article.data[0].themes,
                        cover_img_id: article.data[0].cover_img_id,
                        keyword: article.data[0].keyword,
                        time: article.data[0].time
                    }
                };
            }

            const account = await Admin.findById(decoded.id)

            await closeConnection();

            if (!account) return {
                data: {
                    title: article.data[0].title,
                    date: article.data[0].date,
                    text: article.data[0].paywall_text,
                    first_element: article.data[0].first_element,
                    first_element_url: article.data[0].first_element_url,
                    author: article.data[0].author,
                    category: article.data[0].category,
                    paywall: true,
                    sidebar: article.data[0].sidebar,
                    themes: article.data[0].themes,
                    cover_img_id: article.data[0].cover_img_id,
                    keyword: article.data[0].keyword,
                    time: article.data[0].time
                }
            };

            return {
                data: {
                    title: article.data[0].title,
                    date: article.data[0].date,
                    text: article.data[0].text,
                    first_element: article.data[0].first_element,
                    first_element_url: article.data[0].first_element_url,
                    author: article.data[0].author,
                    category: article.data[0].category,
                    paywall: false,
                    sidebar: article.data[0].sidebar,
                    themes: article.data[0].themes,
                    cover_img_id: article.data[0].cover_img_id,
                    keyword: article.data[0].keyword,
                    time: article.data[0].time
                }
            };
        }
        catch (err) {
            return {
                data: {
                    title: article.data[0].title,
                    date: article.data[0].date,
                    text: article.data[0].paywall_text,
                    first_element: article.data[0].first_element,
                    first_element_url: article.data[0].first_element_url,
                    author: article.data[0].author,
                    category: article.data[0].category,
                    paywall: true,
                    sidebar: article.data[0].sidebar,
                    themes: article.data[0].themes,
                    cover_img_id: article.data[0].cover_img_id,
                    keyword: article.data[0].keyword,
                    time: article.data[0].time
                }
            }
        }
    }

    return {
        data: {
            title: article.data[0].title,
            date: article.data[0].date,
            text: article.data[0].paywall_text,
            first_element: article.data[0].first_element,
            first_element_url: article.data[0].first_element_url,
            author: article.data[0].author,
            category: article.data[0].category,
            paywall: true,
            sidebar: article.data[0].sidebar,
            themes: article.data[0].themes,
            cover_img_id: article.data[0].cover_img_id,
            keyword: article.data[0].keyword,
            time: article.data[0].time
        }
    };
}