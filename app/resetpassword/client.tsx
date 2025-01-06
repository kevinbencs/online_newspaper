'use client'

import { resetPassword } from '@/actions/resetPassword';
import { SyntheticEvent, useRef, useState, useTransition } from 'react'

const Client = () => {
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [error, setError] = useState<string | undefined>('');
    const [inputType, setInputType] = useState<string>('password');
    const [isPending, startTransition] = useTransition();

    const checkboxRef = useRef<null | HTMLInputElement>(null)

    const handlePassword = () => {
        if (inputType === 'password') setInputType('text')
        else setInputType('password');
    }

    const handleSubmit = (e: SyntheticEvent) => {
        setError('')
        setSuccess('')
        e.preventDefault();
        startTransition(() => {
            resetPassword({ password, confirmPassword })
                .then(res => {
                    if (res.success) {
                        setSuccess(res.success);
                        setPassword('');
                        setConfirmPassword('');
                        if (checkboxRef.current) checkboxRef.current.checked = false;
                    }
                    setError(res.error)
                })
                .catch(err => {
                    setError(err)
                })
        })
    }

    return (
        <div className='flex justify-center min-h-screen pt-10 '>
            <div className='w-80'>
                <h2 className='text-center text-3xl mb-10'>Reset your password</h2>
                {success &&
                    <div className='text-green-600 bg-green-600/15 p-2 text-center rounded-lg mb-5 font-bold'>{success}</div>
                }
                {error &&
                    <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 rounded-lg mb-5 text-center p-2'>{error}</div>
                }
                <form action="#" onSubmit={handleSubmit} className='dark:bg-neutral bg-gray-200 border-gray-800 rounded-lg p-[5%] pt-6 pb-6 mb-10 border dark:border-slate-400 flex flex-col'>
                    <label className='text-sm mb-4'>
                        Password
                        <input type={inputType} name='password' required minLength={8} maxLength={16} disabled={isPending} onChange={(e) => { setPassword(e.target.value); setSuccess('') }} value={password} className='dark:text-white block w-[100%] pl-2 rounded-md dark:bg-[#121212] mt-1 pt-1 pb-1 focus-within:outline-none' />
                    </label>
                    <label className='text-sm mb-4'>
                        Confirm password
                        <input type={inputType} name='confirmPassword' required minLength={8} maxLength={16} disabled={isPending} onChange={(e) => { setConfirmPassword(e.target.value); setSuccess('') }} value={confirmPassword} className='dark:text-white block w-[100%] pl-2 rounded-md dark:bg-[#121212] mt-1 pt-1 pb-1 focus-within:outline-none' />
                    </label>
                    <label className='cursor-pointer mb-8 flex items-center'>
                        <label className='swap swap-rotate mr-2'>
                            <input type="checkbox" ref={checkboxRef} name="showPassword" onChange={handlePassword} disabled={isPending} />

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 swap-on">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 swap-off">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </label>
                        Show password
                    </label>
                    <input type="submit" name='submit' value='Reset' disabled={isPending} className='block w-[100%] rounded-lg dark:bg-base-300 bg-slate-400 hover:bg-slate-100 p-2 cursor-pointer dark:hover:bg-base-100' />
                </form>
            </div>

        </div>
    )
}

export default Client