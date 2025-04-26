import Admin from "@/model/Admin"
import Token from "@/model/Token"
import jwt, { JwtPayload } from 'jsonwebtoken'

interface Decoded extends JwtPayload {
    id: string
}

interface Admin{
    name: string,
    role: string,
    email: string,
    hired: boolean
}

export const Eligibility = async (cookie: string | undefined) => {
    try {

        if (!cookie) return { role: '', email: '', name: '', id:'' };

        const token = await Token.find({ token: cookie })

        if (!token) return { role: '', email: '', name: '', id:'' };

        if (!process.env.SECRET_CODE) {
            console.log('process.env.SECRET_CODE is missing');
            return { role: '', email: '', name: '', id:'' };
        }

        const decoded = jwt.verify(cookie, process.env.SECRET_CODE!) as Decoded

        if (!decoded) return { role: '', email: '', name: '', id:'' };

        const coll = await Admin.findById(decoded.id) as Admin;

        if (!coll) return { role: '', email: '', name: '', id:'' };

        if(!coll.hired) return { role: '', email: '', name: '', id:'' };

        return { role: coll.role, email: coll.email, name: coll.name, id: decoded.id }

    } catch (error) {
        console.log(error)
        return { role: '', email: '', name: '', id:'' };
    }
}