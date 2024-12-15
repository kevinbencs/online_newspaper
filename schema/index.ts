
import * as z from 'zod';

export const LoginShcema = z.object({
    email: z.string().email({ message: 'Email is required.' }),
    password: z.string().min(1, { message: 'Password is required.' })
})


export const RegisterShcema = z.object({
    email: z.string().email({ message: 'Email is required.' }),
    password: z.string()
        .refine((val) => {
            const lowercase = /[a-z]/.test(val);
            const uppercase = /[A-Z]/.test(val);
            const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(val);
            const passwordLength = val.length > 8

            return lowercase && uppercase && specialCharacter && passwordLength

        }, { message: "Password must be at least 8 characters and contain 1 lowercase, 1 uppercase, 1 number and 1 special character." }),
    name: z.string().min(1, { message: 'Name is required' }),
    privacy: z.boolean().refine((val) => val === true, { message: 'You must accept the privacy policy.' })
})

export const AdminRegisterShcema = z.object({
    email: z.string().email({ message: 'Email is required.' }),
    password: z.string()
        .refine((val) => {
            const lowercase = /[a-z]/.test(val);
            const uppercase = /[A-Z]/.test(val);
            const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(val);
            const passwordLength = val.length > 8

            return lowercase && uppercase && specialCharacter && passwordLength

        }, { message: "Password must be at least 8 characters and contain 1 lowercase, 1 uppercase, 1 number and 1 special character." }),
    name: z.string().min(1, { message: 'Name is required' }),
    role: z.string().min(1, { message: 'Role is required' }),
    imageUrl: z.string().min(1, {message: 'Image url is required.'})
})

export const NewPasswordSchema = z.object({
    password: z.string()
        .refine((val) => {
            const lowercase = /[a-z]/.test(val);
            const uppercase = /[A-Z]/.test(val);
            const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(val);
            const passwordLength = val.length > 8

            return lowercase && uppercase && specialCharacter && passwordLength

        }, { message: "Password must be at least 8 characters and contain 1 lowercase, 1 uppercase, 1 number and 1 special character." }),
    passwordConfirm: z.string()
}).refine((data) => data.passwordConfirm === data.password, { message: "PasswordConfirm and password have to be equal.", path: ["passwordConfirm"] });


export const ImageUrlSchema = z.object({
    url: z.string().min(1, { message: 'Url is required' }),
    detail: z.string().min(1, { message: 'Detail is required' })
})

export const AudioVideoUrlSchema = z.object({
    url: z.string().min(1, { message: 'Url is required' }),
    title: z.string().min(1, { message: 'Title is required' })
})


export const ImageUrlUpdateSchema = z.object({
    id: z.string().min(1, { message: 'Id is required' }),
    url: z.string(),
    detail: z.string()
})

export const AudioVideoUrlUpdateSchema = z.object({
    id: z.string().min(1, { message: 'Id is required' }),
    title: z.string(),
    url: z.string(),
})

export const CategoryUpdateSchema = z.object({
    id: z.string().min(1, { message: 'Id is required' }),
    name: z.string().min(1,{ message: 'New category is required'})
})

export const AudioVideoImageCategoryDeleteUrlSchema = z.object({
    Id: z.string().min(1, { message: 'Id is required' }),
})

export const CategorySchema = z.object({
    name: z.string().min(1, { message: 'Category is required' }),
})

export const NewsletterSchema = z.object({
    text: z.string().min(1, { message: 'Text is required' }),
    subject: z.string().min(1, {message: 'Subject is required'}),
    title: z.string().min(1, {message: 'Title is required'})
})

export const NewArticleSchema = z.object({
    text: z.string().min(1, { message: 'Text is required' }),
    title: z.string().min(1, { message: 'Title is required' }),
    first_element: z.string(),
    first_element_url: z.string(),
    category: z.string().min(1, { message: 'Category is required' }),
    important: z.string().min(1, { message: 'Important is required' }),
    paywall: z.boolean({message: 'Paywall is required'}),
    sidebar: z.boolean({message: 'Sidebar is required'}),
    cover_img_id: z.string().min(1, {message: 'Cover image is required'}),
    keyword: z.array(z.string().min(1, {message:'Themes are required'})),
    paywall_text: z.string(),
    detail: z.string().min(1, {message:'Detail is required'})
})

export const EmailSchema = z.object({
    email: z.string().email({message: 'Email is required'})
})

export const SubscribeSchema = z.object({
    email: z.string().email({message: 'Email is required'}),
    name: z.string().min(1, {message: 'Name is required'}),
    privacy: z.boolean().refine((val) => val === true,{message: 'You must agree to privacy notice.'})
})

export const updateUserSchema = z.object({
    name: z.string().min(1, {message: 'Name is require'}),
    email: z.string().email({message: 'Email is required'}),
    newsletter: z.boolean(),
    articles: z.string()
})

export const urlSchema = z.object({
    url: z.string().url({message: 'Url error'})
})

export const idSchema = z.object({
    id: z.string({message: 'Id error'})
})