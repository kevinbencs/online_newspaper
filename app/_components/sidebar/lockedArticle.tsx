'use client'

import Link from "next/link";
import { Dispatch, SetStateAction} from "react";
import useSWR from 'swr'

type Dispatcher<T> = Dispatch<SetStateAction<T>>



const fetcherSWR = async (url: string): Promise<{number: number }> => {
    try {
        const res = await fetch(url)

        if (!res.ok) {
            const error = new Error('An error occurred while fetching the data.')
            error.cause = res.json().then((data: { error: string }) => data.error)
            console.log(error.cause)

            throw error;
        }
        return res.json()
    } catch (error) {
        console.error(error)
        throw new Error('Api error')
    }

}

const LockedArticle = (props: { setCheckboxValue: Dispatcher<boolean> }) => {

    const {data, error, isLoading } = useSWR('/api/lockedarticlenumber', fetcherSWR, {refreshInterval: 5000})



    const checked = () => {
        props.setCheckboxValue(false);
    }
    return (
        <li><Link onClick={checked} href='/lockedarticle/allarticles' className='pt-1 pb-1 bg-neutral text-neutral-content mt-2 ml-2 mr-2 md:text-xl text-base  rounded-[4px] hover:bg-slate-100 hover:text-black flex justify-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            Locked article ({data?.number}{isLoading && <span className="loading loading-spinner loading-xs"></span>})
            {error &&
                <div>
                    {error}
                </div>
            }
        </Link></li>
    )
}

export default LockedArticle