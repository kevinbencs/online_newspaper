'use client';

import { forgotPasswordSendEmail } from '@/actions/forgotpasswordSendEmail';
import { SyntheticEvent, useState, useTransition } from 'react';


const Client = () => {
    const [email, setEmail] = useState<string>('')
    const [success, setSuccess] = useState<string | undefined>('');
    const [error, setError] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition()

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        startTransition(() => {
            forgotPasswordSendEmail({ email })
                .then(res => {
                    setSuccess(res.success);
                    if (res.success) setEmail('');
                    setError(res.error)
                })
                .catch(error => {
                    setError(error)
                })
        })
    };

    return (
        <div className='flex  pt-[10vh] flex-col items-center pb-[20vh] h-[90vh]'>
            <div className='max-w-[600px]'>
                <h2 className='text-3xl mb-9 text-center'>Reset your password</h2>
                {success &&
                    <div className='text-green-600 bg-green-600/15 p-2 text-center rounded-lg mb-5 font-bold w-full'>{success}</div>
                }
                {error &&
                    <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 rounded-lg mb-5 text-center p-2 w-full'>{error}</div>
                }
                <form action='#' onSubmit={handleSubmit} className='flex  flex-col border p-10 rounded-lg border-slate-900 dark:border-slate-50 bg-gray-200 dark:bg-neutral'>
                    <label className='flex flex-col mb-14'>
                        Please enter your email, and we will send you a password reset link.
                        <input type="email" disabled={isPending} autoComplete='email' name="email" value={email} onChange={(e) => { setEmail(e.target.value); setSuccess('') }} className='p-1 dark:text-white block pl-2 mt-3 rounded-md  border-none focus-within:outline-none' />
                    </label>
                    <input type="submit" disabled={isPending} value="Send password reset email" className='p-2 cursor-pointer bg-slate-400 hover:bg-slate-100 dark:bg-base-300 rounded-md dark:hover:bg-base-100 focus-within::outline' />
                </form>
            </div>

        </div>
    )
}

export default Client