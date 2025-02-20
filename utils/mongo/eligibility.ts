import Admin from "@/model/Admin"
import Token from "@/model/Token"
import jwt, { JwtPayload } from 'jsonwebtoken'

interface Decoded extends JwtPayload {
    id: string
}


export const Eligibility = async (cookie: string | undefined) => {
    try {

        if (!cookie) return { role: '', email: '', name: '' };

        const token = await Token.find({ token: cookie })

        if (!token) return { role: '', email: '', name: '' };

        if (!process.env.SECRET_CODE) {
            console.log('process.env.SECRET_CODE is missing');
            return { role: '', email: '', name: '' };
        }

        const decoded = jwt.verify(cookie, process.env.SECRET_CODE!) as Decoded

        if (!decoded) return { role: '', email: '', name: '' };

        const coll = await Admin.findById(decoded.id);

        if (!coll) return { role: '', email: '', name: '' };

        return { role: coll.role, email: coll.email, name: coll.name }

    } catch (error) {
        console.log(error)
        return { role: '', email: '', name: '' };
    }
}