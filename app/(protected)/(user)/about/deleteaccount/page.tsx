'use client'
import { deleteAccount } from '@/actions/deleteaccount';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useLogged } from '@/app/_components/islogged/isloggedprovider';

const Page = () => {
    const [error, setError] = useState<string | undefined>('');
    const { setLogged, setRole } = useLogged();
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const { push } = useRouter();

    const handleClickShowPopup = () => {
        setShowPopup(true);
    }

    const handleClickHidePopup = () => {
        setShowPopup(false);
    }

    const handleDelete = () => {
        deleteAccount()
            .then((err) => {
                if (err.success) {
                    setLogged('');
                    setRole('');
                    push('/');
                }
                setError(err.error);
                setShowPopup(false);
            })
    }
    return (
        <div className='lg:w-[calc(100%-140px-12rem)]'>
            <h2 className='text-3xl mb-5 text-center lg:text-start'>Delete account</h2>
            {error &&
                <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 rounded-lg mb-5  p-2'>
                    {error}
                </div>
            }
            <p className='mb-10 text-center lg:text-start'>Do you want to delete this account?</p>
            <div className='text-end'>
                <button onClick={handleClickShowPopup} className='bg-slate-600 text-white cursor-pointer hover:bg-slate-400 rounded p-1 min-w-24 mt-10'>Delete</button>
            </div>


            {showPopup &&
                <div className='fixed w-[100vw] h-[100vh] flex top-0 left-0 justify-center items-center  bg-[rgba(0,0,0,0.5)] z-[1000]'>
                    <div className='w-[98%] max-w-[600px]  bg-black text-white rounded-md p-5 h-44'>
                        <p className='mb-20'>To confirm, click delete.</p>
                        <div className='flex justify-between'>
                            <button onClick={handleClickHidePopup}>Cancel</button>
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>


            }

        </div>
    )
}

export default Page