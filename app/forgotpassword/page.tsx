'use client';

import {SyntheticEvent, useState} from 'react';

const Page = () => {
    const [email, setEmail] = useState<string>('')

    const handleSubmit = (e:SyntheticEvent) => {
        e.preventDefault();
    };

  return (
    <div className='flex  pt-[10vh] flex-col items-center pb-[20vh] h-[90vh]'>
        <h2 className='text-3xl mb-9'>Reset your password</h2>
        <form action='#' onSubmit={handleSubmit} className='flex  flex-col border p-10 rounded-lg border-slate-900 dark:border-slate-50 bg-gray-200 dark:bg-neutral'>
            <label className='flex flex-col mb-14'>
                Please enter your email, and we will send you a password reset link.
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className='p-1 dark:text-white block pl-2 mt-3 rounded-md  border-none focus-within:outline-none'/>
            </label>
            <input type="submit" value="Send password reset email" className='p-2 cursor-pointer bg-base-300 dark:bg-base-300 rounded-md hover:bg-base-100 dark:hover:bg-base-100 focus-within::outline' />
        </form>
    </div>
  )
}

export default Page;