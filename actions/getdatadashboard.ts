'use server'

import { supabase_admin } from "@/utils/supabase/admin"
import { supabase } from "@/utils/supabase/article"
import Admin from "@/model/Admin";
import Token from "@/model/Token"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from "next/headers";

interface Decoded extends JwtPayload {
    id: string
}


export const getNumberOfUser = async () => {
    try {
        const Cookie = cookies().get('admin-log');

        if (!Cookie) return { error: 'Please log in' };

        const tokenRes = await Token.find({ token: Cookie.value });

        if (!tokenRes) return { error: 'Please log in' };

        const decoded = await jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded;

        if (!decoded.id) return { error: 'Please log in' };

        const account = await Admin.findById(decoded.id)

        if (!account) return { error: 'Please log in' };

        const res = await supabase_admin.auth.admin.listUsers();

        if (res.error) return { error: 'Server error' }

        return { numOfUser: res.data.users.length }
    } catch (error) {
        console.log(error)
        return { error: 'Server error' }
    }
}



export const getNumberOfSubscriber = async () => {
    try {
        const Cookie = cookies().get('admin-log');

        if (!Cookie) return { error: 'Please log in' };

        const tokenRes = await Token.find({ token: Cookie.value });

        if (!tokenRes) return { error: 'Please log in' };

        const decoded = await jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded;

        if (!decoded.id) return { error: 'Please log in' };

        const account = await Admin.findById(decoded.id)

        if (!account) return { error: 'Please log in' };

        const res = await supabase.from('newsletter').select("id", { count: 'exact' })

        if (res.error) return { error: 'Server error' }

        return { numOfSubscriber: res.count }
    } catch (error) {
        console.log(error)
        return { error: 'Server error' }
    }
}


export const getNumberOfDailyReadership = async () => {
    try {
        const Cookie = cookies().get('admin-log');

        if (!Cookie) return { error: 'Please log in' };

        const tokenRes = await Token.find({ token: Cookie.value });

        if (!tokenRes) return { error: 'Please log in' };

        const decoded = await jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded;

        if (!decoded.id) return { error: 'Please log in' };

        const account = await Admin.findById(decoded.id)

        if (!account) return { error: 'Please log in' };

        const year = new Date().getFullYear()

        const res = await supabase.rpc('get_number_daily_readership3', { year: year + '%' })

        if (res.error) return { error: 'Server error' }

        return { numOfUser: res.data }
    } catch (error) {
        console.log(error)
        return { error: 'Server error' }
    }
}


export const getNumberOfMonthlyReadership = async () => {
    try {
        const Cookie = cookies().get('admin-log');

        if (!Cookie) return { error: 'Please log in' };

        const tokenRes = await Token.find({ token: Cookie.value });

        if (!tokenRes) return { error: 'Please log in' };

        const decoded = await jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded;

        if (!decoded.id) return { error: 'Please log in' };

        const account = await Admin.findById(decoded.id)

        if (!account) return { error: 'Please log in' };

        const year = new Date().getFullYear()

        const res = await supabase.rpc('get_readership_per_month6', { year: year + '%' })

        if (res.error) return { error: 'Server error' }

        return { monthlyReadership: res.data }
    } catch (error) {
        console.log(error)
        return { error: 'Server error' }
    }
}


export const getPopularArtYear = async () => {
    try {
        const Cookie = cookies().get('admin-log');

        if (!Cookie) return { error: 'Please log in' };

        const tokenRes = await Token.find({ token: Cookie.value });

        if (!tokenRes) return { error: 'Please log in' };

        const decoded = await jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded;

        if (!decoded.id) return { error: 'Please log in' };

        const account = await Admin.findById(decoded.id)

        if (!account) return { error: 'Please log in' };

        const date = new Date().getFullYear() + '. 01. 01.';

        const res = await supabase.rpc('get_readership_article11', { click_date: String(date) })

        if (res.error) return { error: 'Server error' }

        return { Art: res.data }
    } catch (error) {
        console.log(error)
        return { error: 'Server error' }
    }
}


export const getPopularArtSevenDays = async () => {
    try {
        const Cookie = cookies().get('admin-log');

        if (!Cookie) return { error: 'Please log in' };

        const tokenRes = await Token.find({ token: Cookie.value });

        if (!tokenRes) return { error: 'Please log in' };

        const decoded = await jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded;

        if (!decoded.id) return { error: 'Please log in' };

        const account = await Admin.findById(decoded.id)

        if (!account) return { error: 'Please log in' };

        const date = new Date(new Date().getTime() - 604800000).toLocaleDateString();

        const res = await supabase.rpc('get_readership_article11', { click_date: String(date) })

        if (res.error) return { error: 'Server error' }

        return { Art: res.data }
    } catch (error) {
        console.log(error)
        return { error: 'Server error' }
    }
}




export const getNumberSource = async () => {
    try {
        const Cookie = cookies().get('admin-log');

        if (!Cookie) return { error: 'Please log in' };

        const tokenRes = await Token.find({ token: Cookie.value });

        if (!tokenRes) return { error: 'Please log in' };

        const decoded = await jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded;

        if (!decoded.id) return { error: 'Please log in' };

        const account = await Admin.findById(decoded.id)

        if (!account) return { error: 'Please log in' };

        const year = new Date().getFullYear()

        const res = await supabase.rpc('get_readership_article_source5', { year: year + '%' })

        if (res.error) return { error: 'Server error' }

        return { numOfUser: res.data }
    } catch (error) {
        console.log(error)
        return { error: 'Server error' }
    }
}




export const getNumberShare = async () => {
    try {
        const Cookie = cookies().get('admin-log');

        if (!Cookie) return { error: 'Please log in' };

        const tokenRes = await Token.find({ token: Cookie.value });

        if (!tokenRes) return { error: 'Please log in' };

        const decoded = await jwt.verify(Cookie.value, process.env.SECRET_CODE!) as Decoded;

        if (!decoded.id) return { error: 'Please log in' };

        const account = await Admin.findById(decoded.id)

        if (!account) return { error: 'Please log in' };

        const year = new Date().getFullYear()

        const res = await supabase.rpc('get_share_article4', { year: year + '%' })

        if (res.error) return { error: 'Server error' }

        return { numOfUser: res.data }
    } catch (error) {
        console.log(error)
        return { error: 'Server error' }
    }
}