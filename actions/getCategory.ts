import Category from "@/model/Category"
import { connectToMongo } from "@/lib/mongo";


interface Cat {
    name: string,
    _id: string
}


export async function getCategory() {

    try {
        await connectToMongo();
        const category: Cat[] = await Category.find({}, { _id: 1, name: 1 }).sort({ name: 1 });

        return { success: category }
    }
    catch (err) {
        console.log(err)
        return { error: 'Server error' }
    }
}