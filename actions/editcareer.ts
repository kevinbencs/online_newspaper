'use server'


import * as z from 'zod'
import { EditCareerSchema, } from "@/schema";
import Carrier from "@/model/Career";
import { cookies } from "next/headers";
import { Eligibility } from "@/utils/mongo/eligibility";
import { chooseTypeOfTextItem } from '@/lib/checkCar';
import { revalidatePath } from 'next/cache';


export const EditCareer = async (value: z.infer<typeof EditCareerSchema>) => {

    try {

        const Cookie = cookies().get('admin-log');

        const coll = await Eligibility(Cookie?.value)

        if (coll.role === '') return { error: 'Please log in as admin' };

        const validatedFields = EditCareerSchema.safeParse(value);
        if (validatedFields.error) return { failed: validatedFields.error.errors };

        let res: string = 'ok';
        const textArra: string[] = value.text.split('$');

        for (let i = 0; i < textArra.length && res === 'ok'; i++) {
            res = chooseTypeOfTextItem(textArra[i]);
            if (res !== 'ok') return { error: res }
        }

        await Carrier.findByIdAndUpdate(value._id,{text: value.text, title: value.title})
        revalidatePath('/career')
        revalidatePath(`/career/${value.lastUrl}`)



        return { success: 'Success' }
    }
    catch (err) {
        console.log(err)
        return { error: 'Server error' }
    }
}


