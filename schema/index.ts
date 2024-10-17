
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