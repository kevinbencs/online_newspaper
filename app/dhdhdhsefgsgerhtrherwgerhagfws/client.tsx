'use client'

import { useState, useTransition, SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { adminLogin } from '@/actions/adminlogin'
import { useLogged } from '../_components/islogged/isloggedprovider'

const Client = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { push } = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('')
    const { setLogged, setRole } = useLogged();

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        startTransition(() => {
            adminLogin({ email, password })
                .then(res => {
                    setError(res.error);
                    if (res.name) {
                        setLogged(res.name);
                        setRole(res.role)
                        push('/');
                    }
                })
                .catch(error =>{
                    console.log(error);
                    setError('Something went wrong, please try again')
                })
        })
    }

    return (
        <div className='flex items-center flex-col min-h-[90vh] pt-[10vh]'>
            <div className='w-80'>
                <h1 className='text-center mb-5 text-3xl'>Sign in to Word Times</h1>
                <form action="#" className='dark:bg-neutral bg-gray-200 border-gray-800 rounded-lg p-[5%] pt-6 pb-6 mb-10 border dark:border-slate-400' onSubmit={handleSubmit}>

                    {error &&
                        <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 rounded-lg mb-5 text-center p-2'>{error}</div>
                    }
                    {success &&
                        <div className='text-green-600 bg-green-600/15 p-2 text-center rounded-lg mb-5 font-bold'>{success}</div>
                    }

                    <label className='text-sm'>
                        Email address
                        <input type="email" name="email" disabled={isPending} className='block w-[100%] pl-2 rounded-md mt-1 pt-1 pb-1 focus-within:outline-none' required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <div className='relative mt-6 mb-6'>
                        <Link href='/forgotpassword' className='absolute right-0 text-xs dark:text-slate-400 text-slate-800'>Forgot password?</Link>
                        <label className='text-sm'>
                            Password
                            <input type="password" disabled={isPending} name='password' minLength={8} maxLength={16} required className='block w-[100%] focus-within:outline-none pl-2 mt-1 rounded-md pt-1 pb-1' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </div>
                    <input type="submit" value="Sign in" disabled={isPending} className='block w-[100%] rounded-lg   p-2 cursor-pointer  dark:bg-base-300 bg-slate-400 hover:bg-slate-100  dark:hover:bg-base-100' />
                </form>
            </div>
            <section className='max-w-[600px] mt-20 mb-32 flex flex-col items-start gap-5'>
                <ul>
                    <li>
                        Email: admin@admin.com
                    </li>
                    <li>
                        Password: Admin1234*
                    </li>
                    <li>
                        Can do: create new articles, admins, editors, authors, edit articles, delete articles, editors, authors, admins and write newsletters.
                    </li>
                </ul>
                <ul>
                    <li>
                        Email: editor@editor.hu
                    </li>
                    <li>
                        Password: Admin1234*
                    </li>
                    <li>
                        Can do: create, edit, delete articles, and write newsletters.
                    </li>
                </ul>
                <ul>
                    <li>
                        Email: author@author.hu
                    </li>
                    <li>
                        Password: Admin1234*
                    </li>
                    <li>
                        Can do: create articles, edit, delete own articles, and write newsletters.
                    </li>
                </ul>
            </section>

        </div>
    )
}

export default Client