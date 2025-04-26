'use client'
import { adminSignUp } from '@/actions/adminsignup';
import { SyntheticEvent, useState, useRef, KeyboardEvent, useTransition } from 'react'
import { ZodIssue } from 'zod';
import { v4 as uuid } from 'uuid';

const Page = () => {
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [role, setRole] = useState<string>('')
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [optClass, setOptClass] = useState<string>('h-0');
    const [showPassword, setShowPassword] = useState<string>('password')
    const roleRef = useRef<null | HTMLInputElement>(null);
    const [isPending, startTransition] = useTransition();
    const [failed, setFailed] = useState<ZodIssue[] | undefined>([]);
    const [imageUrl, setImageUrl] = useState<string>('')

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setSuccess('');
        setError('');
        setFailed([]);
        startTransition(() => {
            adminSignUp({ name, password, email, role, imageUrl })
                .then(res => {
                    setError(res.error);
                    setFailed(res.failed)
                    if (res.success) {
                        setName('');
                        setEmail('');
                        setPassword('');
                        setRole('');
                        setImageUrl('');
                        setSuccess(res.success);
                    }
                })
                .catch(error =>{
                    console.log(error);
                    setError('Something went wrong, please try again')
                })
        })
    }

    const Role: string[] = [
        'Admin',
        'Author',
        'Editor'
    ]

    const handleClick = (s: string) => {
        setRole(s);
        setTimeout(() => {
            roleRef.current?.blur();
        }, 0);
    };

    const handlePassword = () => {
        if (showPassword === 'password') setShowPassword('text');
        else setShowPassword('password');
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>, s: string) => {
        if (e.code === 'Enter' || e.code === 'Space') handleClick(s);
    }

    return (
        <div className='md:flex md:justify-center mt-32 h-screen  '>
            <form className='flex flex-col md:w-[80%] ml-3 md:ml-0 lg:w-[50%] w-[95%]' onSubmit={handleSubmit}>
                <h1 className='text-3xl mb-8'>Create new account</h1>
                {error &&
                    <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 rounded-lg mb-5 text-center p-2'>{error}</div>
                }
                {(failed && failed.length > 0) &&
                    <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 rounded-lg mb-5  p-2'>
                        {failed.map(e => <p key={uuid()}>{e.message}</p>)}
                    </div>}
                {success &&
                    <div className='text-green-600 bg-green-600/15 p-2 text-center rounded-lg mb-5 font-bold'>{success}</div>
                }
                <label className='mb-8'>
                    <input disabled={isPending} type="text" name='name' required className='border-0 border-b-2 w-full border-base-content p-1 pl-2 bg-transparent focus-visible:outline-none dark:text-white' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label className='mb-8'>
                    <input disabled={isPending} type="text" name='image_url' required className='border-0 border-b-2 w-full border-base-content p-1 pl-2 bg-transparent focus-visible:outline-none dark:text-white' placeholder='Image url' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                </label>
                <label className='mb-8'>
                    <input disabled={isPending} type="email" name='email' required className='border-0 border-b-2 w-full border-base-content p-1 pl-2 bg-transparent focus-visible:outline-none dark:text-white' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className='mb-8 flex justify-end'>
                    <input disabled={isPending} type={showPassword} required name='password' maxLength={16} className='border-0 border-b-2 w-full border-base-content p-1 pl-2 bg-transparent focus-visible:outline-none dark:text-white' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label className={`swap swap-rotate absolute `}>
                        <input type="checkbox" name="showPassword" onChange={handlePassword} />

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 swap-on">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 swap-off">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </label>
                </label>
                <label className='mb-8'>
                    <input type="text" disabled={isPending} ref={roleRef} required name='role' onFocus={() => setOptClass('h-36')} onBlur={() => setOptClass('h-0')} className='dark:text-white border-0 border-b-2 w-full border-base-content p-1 pl-2 bg-transparent focus-visible:outline-none' placeholder='Role' value={role} readOnly />
                    <ul className={`${optClass} overflow-y-scroll sidebar absolute md:w-[80%] max-w-[600px] lg:w-[50%] w-[95%] dark:bg-neutral bg-base-200 duration-100 pl-2`}>
                        {Role.map((item) => <li tabIndex={0} onFocus={() => setOptClass(`h-36`)} onBlur={() => setOptClass(`h-0`)} key={item} onClick={() => handleClick(item)} onKeyDown={(e) => handleKeyDown(e, item)}>{item} </li>)}
                    </ul>
                </label>
                <input type="submit" disabled={isPending} value="Create new account" className='p-1 border-2 border-base-content cursor-pointer bg-base-300 dark:bg-gray-400 hover:bg-base-100 dark:hover:bg-gray-500 dark:text-white' />
            </form>
        </div>
    )
}

export default Page