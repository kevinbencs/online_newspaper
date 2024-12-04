'use server'

import Category from "@/model/Category"

interface Cat{
    name: string,
    _id: string
}

export const getCategory = async () => {

    try{
        const category: Cat[] = await Category.find();

        return {success: JSON.parse(JSON.stringify(category.sort(compareNumbers)))}
    }
    catch(err){
        console.log(err)
        return {error: 'Server error'}
    }
}

const compareNumbers = (a: Cat, b: Cat) => {
    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;

    return 0
}