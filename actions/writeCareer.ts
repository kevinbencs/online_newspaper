'use server'


import * as z from 'zod'
import { WriteCareerSchema } from "@/schema";
import Carrier from "@/model/Career";
import { cookies } from "next/headers";
import { Eligibility } from "@/utils/mongo/eligibility";
import { chooseTypeOfTextItem } from '@/lib/checkCar';
import { revalidatePath, revalidateTag } from 'next/cache';


export const WriteCareer = async (value: z.infer<typeof WriteCareerSchema>) => {

    try {

        const Cookie = cookies().get('admin-log');

        const coll = await Eligibility(Cookie?.value)

        if (coll.role === '') return { error: 'Please log in as admin' };

        const validatedFields = WriteCareerSchema.safeParse(value);
        if (validatedFields.error) return { failed: validatedFields.error.errors };

        let res: string = 'ok';
        const textArra: string[] = value.text.split('$');

        for (let i = 0; i < textArra.length && res === 'ok'; i++) {
            res = chooseTypeOfTextItem(textArra[i]);
            if (res !== 'ok') return { error: res }
        }

        /*const newCarrier = new Carrier({
            title: value.title,
            text: textArra.join('$'),
        })

        await newCarrier.save()
        revalidatePath('/career')
        revalidateTag('careerTag')
        */

        return { success: 'Success' }
    }
    catch (err) {
        console.log(err)
        return { error: 'Server error' }
    }
}


