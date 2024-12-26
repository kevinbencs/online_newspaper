'use server'
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { cookies } from 'next/headers';
import { createClient } from "@/utils/supabase/server";
import { supabase_admin } from "@/utils/supabase/admin";
import jwt, { JwtPayload } from 'jsonwebtoken';
import Token from '@/model/Token';

interface Decoded extends JwtPayload {
    id: string
}

export const registry = async () => {
    const Cookie = cookies();
    try {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();
        const Cookie = cookies().get('user-log-2fa');

        if (error) return { error: 'Server error' }

        if (!data.user) return { error: 'Please log in' }
        else {

            const id = data.user.id

            if (data.user.app_metadata.twofa === 'true') {

                if (Cookie) return { have: "You have already set up the 2FA" }
                else return { error: 'Please log in' }
            }
            const secret = speakeasy.generateSecret({
                name: 'Word-Times'
            });

            await supabase_admin.auth.admin.updateUserById(id, {
                app_metadata: {
                    twofa: 'false',
                    twofaId: secret.base32,
                }
            })

            //const user = await supabase_admin.auth.admin.getUserById(id)

            const url = speakeasy.otpauthURL({
                secret: secret.base32,
                label: `Word-Times (${data.user.email})`,
                issuer: 'Word-Times',
                encoding: 'base32'
            })

            const codeNumber = speakeasy.totp({
                secret: secret.base32,
                encoding: 'base32',
                digits: 6,
            })

            const qrcode = await QRCode.toDataURL(url)

            return { qr: qrcode, codeNumber }

        }
    }
    catch (err) {
        console.log(err);
        return { error: 'Server error' }
    }

}

export const verifyRegistry2FA = async (code: string) => {
    try {

        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();

        if (!data.user) return { error: 'Please log in' }

        const id = data.user.id;

        if (id) {
            const secret = await supabase_admin.auth.admin.getUserById(id)

            const verified = speakeasy.totp.verify({
                secret: secret.data.user?.app_metadata.twofaId,
                encoding: 'base32',
                token: code,
                time: Date.now() / 1000,
            });
            if (verified) {

                if (!process.env.TwoFA_URI) return { error: 'process.env.TwoFA_URI is missing' }

                await supabase_admin.auth.admin.updateUserById(id, {
                    app_metadata: {
                        twofa: 'true'
                    }
                })

                const token = jwt.sign({
                    id,
                },
                    process.env.TwoFA_URI!
                )

                cookies().set({ name: 'user-log-2fa', value: token, httpOnly: true, sameSite: 'strict', path: '/' })

                const newToken = new Token({ token });

                await newToken.save();
                return { success: 'success' }
            }
            else {
                return { error: 'Error in verified' }
            }
        }
        else {
            return { error: 'Please log in' }
        }
    }
    catch (err) {
        console.log(err);
        return { error: 'Server error' }
    }

}

export const verifySingIn2FA = async (token: string) => {
    try {

        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();

        if (!data.user) return { error: 'Please log in' }

        const id = data.user.id;

        if (id) {

            const TWOFA = cookies().get('singTwoFA')

            if (!TWOFA) {
                await supabase.auth.signOut();

                return { error: 'Token expired. Please log in' }
            }

            const token2 = await Token.find({ token: TWOFA.value });

            if (!token2) {
                await supabase.auth.signOut();

                return { error: 'Please log in' }
            }

            const decoded = jwt.verify(TWOFA.value, process.env.TwoFaSingIn_Uri!) as Decoded;

            if (!decoded) {
                await supabase.auth.signOut();

                return { error: 'Please log in' }
            }

            if (decoded.id !== id) {
                await supabase.auth.signOut();

                return { error: 'Please log in' }
            }

            const secret = await supabase_admin.auth.admin.getUserById(id)

            const verified = speakeasy.totp.verify({
                secret: secret.data.user?.app_metadata.twofaId,
                encoding: 'base32',
                token,
                time: Date.now() / 1000,
            });

            if (verified) {
                cookies().delete('singTwoFA')
                await Token.deleteOne({ token: TWOFA.value })

                const newToken = jwt.sign({id}, process.env.TwoFA_URI!)

                const newTok = new Token({ token: newToken });

                await newTok.save();

                cookies().set({ name: 'user-log-2fa', value: newToken, httpOnly: true, sameSite: 'strict', path: '/' })

                return { success: 'success' }
            }
            else {
                return { error: 'Error in verify' }
            }
        }
        else {
            return { error: 'Server error' }
        }
    }
    catch (err) {
        console.log(err)
        return { error: 'Serever error' }
    }
}


export const TurnOffTwoFA = async (Delete: boolean) => {
    try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();

        if (!data.user) return { error: 'Please sign in' }

        if (data.user.app_metadata.twofa === 'false' || !data.user.app_metadata.twofa) return { error: 'You did not set up 2FA.' }

        const Cookie = cookies().get('user-log-2fa');

        if (!Cookie) return { error: 'Please log in' }

        const token = await Token.find({ token: Cookie.value });

        if (!token) return { error: 'Please log in' }

        if (!process.env.TwoFA_URI) return { error: 'process.env.TwoFA_URI is missing' }

        const decoded = jwt.verify(Cookie.value, process.env.TwoFA_URI!) as Decoded

        if (!decoded) return { error: 'Please log in' }

        if (decoded.id !== data.user.id) return { error: 'Please log in' }

        if (Delete) {
            await supabase_admin.auth.admin.updateUserById(data.user.id, {
                app_metadata: {
                    twofa: 'false',
                }
            })
            await Token.deleteOne({ token: Cookie.value });
            cookies().delete('user-log-2fa');
            return { success: 'success' }
        }
        else {
            return { error: 'Delete must be true' }
        }

    }
    catch (err) {
        console.log(err)
        return { error: 'Server error' }
    }
}

