'use client'
import { useLogged } from "../islogged/isloggedprovider";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import useSWR from 'swr'

type Dispatcher<T> = Dispatch<SetStateAction<T>>

const fetcher = async (url: string): Promise<{number: number}> => {
    const res = await fetch(url)

    if(!res.ok){
        const error = new Error('An error occurred while fetching the data.')
        error.cause = res.json().then((data: { error: string }) => data.error)
        console.error(error.cause)

        throw error
    }

    return res.json()
}

const UserElement = (props: { setCheckboxValue: Dispatcher<boolean> }) => {
    const { WhoLogged, RoleLogged } = useLogged();
    const {data, error, } = useSWR('/api/lockedarticlenumber', fetcher/*,{ refreshInterval: 10000 }*/);

    const checked = () => {
        props.setCheckboxValue(false);
    }

    if (RoleLogged === '') return (
        <>
            <li><Link onClick={checked} href='/newsletter' className="pt-1 bg-neutral text-neutral-content pb-1 md:text-xl text-base ml-2 mr-2 rounded-[4px] hover:bg-slate-100 hover:text-black flex justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                Newsletter
            </Link></li>
            <>
                <li><Link onClick={checked} href='/signin' className='pt-1 pb-1 bg-neutral text-neutral-content mt-2 ml-2 mr-2 md:text-xl text-base  rounded-[4px] hover:bg-slate-100 hover:text-black flex justify-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    Sign in
                </Link></li>
                <li><Link onClick={checked} href='/signup' className='pt-1 pb-1 bg-neutral text-neutral-content mt-2 ml-2 mr-2 md:text-xl text-base  rounded-[4px] hover:bg-slate-100 hover:text-black flex justify-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                    Sign up
                </Link></li>
            </>
        </>
    )

    if (RoleLogged === 'user') return (
        <>
            <li><Link onClick={checked} href='/newsletter' className="pt-1 bg-neutral text-neutral-content pb-1 md:text-xl text-base ml-2 mr-2 rounded-[4px] hover:bg-slate-100 hover:text-black flex justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                Newsletter
            </Link></li>
            <li><Link onClick={checked} href='/about' className='pt-1 pb-1 bg-neutral text-neutral-content mt-2 ml-2 mr-2 md:text-xl text-base  rounded-[4px] hover:bg-slate-100 hover:text-black flex justify-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                About
            </Link></li>


        </>
    )

    return (
        <>
            {(RoleLogged === 'Admin' || RoleLogged === 'Editor') &&
                <li><Link onClick={checked} href='/lockedarticle/allarticles' className='pt-1 pb-1 bg-neutral text-neutral-content mt-2 ml-2 mr-2 md:text-xl text-base  rounded-[4px] hover:bg-slate-100 hover:text-black flex justify-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    Locked article ({data && <>{data.number}</>}{!data && <>0</>})
                </Link></li>}
            <li><Link onClick={checked} href='/writenewsletter' className="pt-1 bg-neutral text-neutral-content mt-2 pb-1 md:text-xl text-base ml-2 mr-2 rounded-[4px] hover:bg-slate-100 hover:text-black flex justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                Write newsletter
            </Link></li>

            {RoleLogged === 'Admin' &&
                <li><Link onClick={checked} href='/createdadmin' className='pt-1 pb-1 bg-neutral text-neutral-content mt-2 ml-2 mr-2 md:text-xl text-base  rounded-[4px] hover:bg-slate-100 hover:text-black flex justify-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                    Create account
                </Link></li>
            }

            <li><Link onClick={checked} href='/dashboard' className='pt-1 pb-1 bg-neutral text-neutral-content mt-2 ml-2 mr-2 md:text-xl text-base  rounded-[4px] hover:bg-slate-100 hover:text-black flex justify-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                Dashboard
            </Link></li>


            <li><Link onClick={checked} href='/newarticle' className='pt-1 pb-1 bg-neutral text-neutral-content mt-2 ml-2 mr-2 md:text-xl text-base  rounded-[4px] hover:bg-slate-100 hover:text-black flex justify-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>

                New article
            </Link></li>
            <li><Link onClick={checked} href={`/authors/${WhoLogged.replaceAll(' ', '_')}`} className='pt-1 pb-1 bg-neutral text-neutral-content mt-2 ml-2 mr-2 md:text-xl text-base  rounded-[4px] hover:bg-slate-100 hover:text-black flex justify-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                </svg>

                My article
            </Link></li>


        </>
    )
}

export default UserElement