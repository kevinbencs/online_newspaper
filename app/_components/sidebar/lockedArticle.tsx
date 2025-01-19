'use client'

import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSocket } from "../socketProvider";

type Dispatcher<T> = Dispatch<SetStateAction<T>>

const fetcher = async (url: string) => {
    try {
        const res = await fetch(url)
        const resJson = await res.json() as { number: number | undefined, error: string | undefined }
        if (res.status === 200) return resJson.number
        else {
            return resJson.error
        }
    } catch (error) {
        console.error(error)
        return 'Error in get request'
    }

}

const LockedArticle = (props: { setCheckboxValue: Dispatcher<boolean> }) => {
    const [number, setNumber] = useState<number>(0);
    const [Error, setError] = useState<string | undefined>('')
    const { sidebarNotification } = useSocket();

    useEffect(() => {
        (async () => {
            const res = await fetcher('/api/lockedarticlenumber')
            if (typeof res === 'number') setNumber(res)
            else setError(res)
        })()

    }, [])

    useEffect(() => {
        if(typeof sidebarNotification === 'number') setNumber(sidebarNotification)
    },[sidebarNotification])

    
    const checked = () => {
        props.setCheckboxValue(false);
    }
    return (
        <li><Link onClick={checked} href='/lockedarticle/allarticles' className='pt-1 pb-1 bg-neutral text-neutral-content mt-2 ml-2 mr-2 md:text-xl text-base  rounded-[4px] hover:bg-slate-100 hover:text-black flex justify-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            Locked article ({number})
            {Error &&
                <div>
                    {Error}
                </div>
            }
        </Link></li>
    )
}

export default LockedArticle