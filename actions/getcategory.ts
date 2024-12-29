'use server'

import Category from "@/model/Category"

interface Cat{
    name: string,
    _id: string
}

export const getCategory = async () => {

    try{
        const category: Cat[] = await Category.find().sort({name: 1});

        return {success: JSON.parse(JSON.stringify(category))}
    }
    catch(err){
        console.log(err)
        return {error: 'Server error'}
    }
}

