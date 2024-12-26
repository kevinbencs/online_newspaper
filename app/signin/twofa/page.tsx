'use client'
import { useState, useTransition, useEffect, SyntheticEvent } from 'react'
import { useLogged } from '../../_components/islogged/isloggedprovider';
import { useRouter } from 'next/navigation'
import { verifySingIn2FA } from '@/actions/twofa';

const Page =  () => {
    const [error, setError] = useState<string | undefined>('');
    const [code, setCode] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();
    const { RoleLogged, setRole } = useLogged();
    const { push } = useRouter();

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (code && code !== '') {
            startTransition(() => {
                verifySingIn2FA(code)
                    .then(res => {
                        if (!res) push('/signin')
                        else {
                            if (res.success) setRole('user')
                            if (res.error) setError(res.error)
                        }

                    })
            })
        }
    }

    


    useEffect(() => {
        if (RoleLogged !== '')
            push('/');
    }, [RoleLogged])

    return (
        <div className='flex justify-center min-h-[90vh] pt-[10vh] mb-10'>
            <div>
                {error &&
                    <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 rounded-lg mb-5 text-center p-2'>{error}</div>
                }

                <form action="#" className='dark:bg-neutral block max-h-40 bg-gray-200 border-gray-800 rounded-lg p-[5%] pt-6 pb-6 mb-10 border dark:border-slate-400' onSubmit={handleSubmit}>
                    <label className='text-sm mb-5 block text-center'>
                        2FA Code
                        <input type="text" name="code" disabled={isPending} className='dark:text-white block w-[100%] pl-2 rounded-md dark:bg-[#121212] mt-1 pt-1 pb-1 focus-within:outline-none' required value={code} onChange={(e) => setCode(e.target.value)} />
                    </label>
                    <input type="submit" value="Sign in" disabled={isPending} className='block w-[100%] rounded-lg dark:bg-base-300 bg-slate-400 hover:bg-slate-100 p-2 cursor-pointer dark:hover:bg-base-100' />
                </form>
            </div>

        </div>
    )
}

export default Page