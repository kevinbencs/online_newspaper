
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
    imageUrl: z.string().min(1, { message: 'Image url is required.' })
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
    confirmPassword: z.string()
}).refine((data) => data.confirmPassword === data.password, { message: "PasswordConfirm and password have to be equal.", path: ["passwordConfirm"] });


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
    name: z.string().min(1, { message: 'New category is required' })
})

export const AudioVideoImageCategoryDeleteUrlSchema = z.object({
    Id: z.string().min(1, { message: 'Id is required' }),
})

export const CategorySchema = z.object({
    name: z.string().min(1, { message: 'Category is required' }),
})

export const NewsletterSchema = z.object({
    text: z.string().min(1, { message: 'Text is required' }),
    subject: z.string().min(1, { message: 'Subject is required' }),
    title: z.string().min(1, { message: 'Title is required' })
})

export const NewArticleSchema = z.object({
    text: z.string().min(1, { message: 'Text is required' }),
    title: z.string().min(1, { message: 'Title is required' }),
    first_element: z.string(),
    first_element_url: z.string(),
    category: z.string().min(1, { message: 'Category is required' }),
    important: z.string().min(1, { message: 'Important is required' }),
    paywall: z.boolean({ message: 'Paywall is required' }),
    sidebar: z.boolean({ message: 'Sidebar is required' }),
    cover_img_id: z.string().min(1, { message: 'Cover image is required' }),
    keyword: z.array(z.string().min(1, { message: 'Themes are required' })),
    paywall_text: z.string(),
    detail: z.string().min(1, { message: 'Detail is required' })
})

export const EmailSchema = z.object({
    email: z.string().email({ message: 'Email is required' })
})

export const SubscribeSchema = z.object({
    email: z.string().email({ message: 'Email is required' }),
    name: z.string().min(1, { message: 'Name is required' }),
    privacy: z.boolean().refine((val) => val === true, { message: 'You must agree to privacy notice.' })
})

export const updateUserSchema = z.object({
    name: z.string().min(1, { message: 'Name is require' }),
    email: z.string().email({ message: 'Email is required' }),
    newsletter: z.boolean(),
    articles: z.object({ title: z.string() }).array()
})

export const urlSchema = z.object({
    url: z.string().url({ message: 'Url is required' })
})

export const urlPathnameSchema = z.object({
    url: z.string({ message: 'Url pathname is required' })
})

export const idSchema = z.object({
    id: z.string().min(1, { message: 'Id is required' })
})

export const taskSchema = z.object({
    task: z.string().min(1, { message: 'Task is required' })
})

export const tokenSchema = z.object({
    token: z.string().min(1, { message: 'Token is required' })
})

export const authorArt = z.object({
    author: z.string().min(1, { message: 'Author is required' }),
    page: z.union([z.number(), z.undefined()]),
})

export const authorArtNumber = z.object({
    author: z.string().min(1, { message: 'Author is required' }),
})


export const EditArticleSchema = z.object({
    lastTitle: z.string().min(1, { message: 'Last title is required' }),
    text: z.string().min(1, { message: 'Text is required' }),
    title: z.string().min(1, { message: 'Title is required' }),
    first_element: z.string(),
    first_element_url: z.string(),
    category: z.string().min(1, { message: 'Category is required' }),
    important: z.string().min(1, { message: 'Important is required' }),
    paywall: z.boolean({ message: 'Paywall is required' }),
    sidebar: z.boolean({ message: 'Sidebar is required' }),
    cover_img_id: z.string().min(1, { message: 'Cover image is required' }),
    keyword: z.array(z.string().min(1, { message: 'Themes are required' })),
    paywall_text: z.string(),
    detail: z.string().min(1, { message: 'Detail is required' })
})

export const getArtSchema = z.object({
    Article: z.string().min(1, { message: 'Titlte is required.' }),
    date: z.string().min(1, { message: 'Date is required.' }),
    source: z.union([z.string(), z.undefined()])
})

export const pageSchema = z.object({
    page: z.union([z.number({ message: 'Page must be number or undefined' }), z.undefined({ message: 'Page must be number or undefined' })])
})


export const getLockArtSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    date: z.string().min(1, { message: 'Date is required' })
})

export const getEditArtSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    date: z.string().min(1, { message: 'Date is required' })
})


export const codeSchema = z.object({
    code: z.string().min(1, { message: 'Code is required' }),
})

export const getCatArtSchema = z.object({
    name: z.string().min(1, { message: 'Category is required' }),
    page: z.union([z.number(), z.undefined()]),
})

export const searchArtSchema = z.object({
    category: z.union([z.string(), z.undefined(), z.null()]),
    text: z.string().min(1, { message: 'Text is required' }),
    date_from: z.union([z.string(), z.undefined(), z.null()]),
    date_to: z.union([z.string(), z.undefined(), z.null()]),
    author: z.union([z.string(), z.undefined(), z.null()]),
    page: z.union([z.number(), z.undefined(), z.null()]),
    filter: z.union([z.string(), z.undefined(), z.null()])
})


export const twoFaTokenIdeSchema = z.object({
    token: z.string().min(1, { message: 'Token is required' }),
    id: z.string().min(1, { message: 'Id is required' })
})

export const deleteIdsSchema = z.object({
    ids: z.string({message: 'Id is required'}).array().length(1,{message: 'Ids is required'})
})

export const deleteIdsStringSchema = z.object({
    ids: z.string().min(1,{message: 'Id is required'}).array().length(1,{message: 'Ids is required'})
})


export const  WriteCareerSchema = z.object({
    text: z.string().min(1, { message: 'Text is required' }),
    title: z.string().min(1, { message: 'Title is required' }),
    
})

export const  EditCareerSchema = z.object({
    text: z.string().min(1, { message: 'Text is required' }),
    title: z.string().min(1, { message: 'Title is required' }),
    _id: z.string({message: 'Id is required'}),
    lastUrl:  z.string().min(1, { message: 'Last url is required' }),
    
})


export const titleSchema = z.object({
    title: z.string().min(1,{ message: 'Title is required' })
})


export const shareSchema = z.object({
    share: z.string().min(1, {message: 'Share is required'}).refine((value) => value === 'facebook' || value === 'x', {message: 'Share must be facebook or X'}),
    url: z.string().min(1, {message: 'Url is required'})
}) 