'use server'

import Admin from "@/model/Admin";

interface author{
    _id: string,
    name: string,
    image: string,
    role: string
}


export const getAuthor = async () => {
    try {
        const res: author[] = await Admin.find({},'_id name image role').sort({importance: 1, name: 1});
        return {success: JSON.parse(JSON.stringify(res))}

    } catch (error) {
        console.log(error)
        return {error: 'Server error'}
    }
}
