'use client'
import {useEffect} from 'react';
import { signIn, useSession } from "next-auth/react";

const Page = () => {
    const {data: session, status} = useSession();

    useEffect(() => {
        if(!(status === 'loading') && !session) void signIn("github");
        if (session) window.close();
    },[session, status])
  return (
    <div className='w-full flex justify-center items-center text-4xl font-bold h-screen'>Loading...</div>
  )
}

export default Page