'use client'

import { SyntheticEvent, useState, useTransition, } from 'react';
import { verifyRegistry2FA } from '@/actions/twofa';

const TwoFA = () => {
    const [code, setCode] = useState<string>('');
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string>('')

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        if (code && code !== '') {
            startTransition(() => {
                verifyRegistry2FA({ code })
                    .then(res => {
                        if (res.error) setError(res.error)
                    })
                    .catch(error => {
                        console.log(error);
                        setError('Something went wrong, please try again')
                    })
            })
        }
    }
    return (
        <form action="#" onSubmit={handleSubmit} className='dark:bg-neutral block lg:max-w-96 w-full  bg-gray-200 border-gray-800 rounded-lg p-[5%] pt-6 pb-6 mb-10 border dark:border-slate-400'>
            <div className='text-red-700 text-2xl'>{error}</div>
            <label className='text-sm mb-5 block text-center'>
                2FA Code
                <input type="text" name="code" disabled={isPending} className='dark:text-white block w-[100%] pl-2 rounded-md dark:bg-[#121212] mt-1 pt-1 pb-1 focus-within:outline-none' required value={code} onChange={(e) => setCode(e.target.value)} />
            </label>
            <input type="submit" value="Save" disabled={isPending} className='block w-[100%] rounded-lg dark:bg-base-300 bg-slate-400 hover:bg-slate-100 p-2 cursor-pointer dark:hover:bg-base-100' />
        </form>
    )
}

export default TwoFA