//'use client'
import { getUserData } from "@/actions/getuserdata";
import Link from "next/link"
//import { useEffect, useState } from "react"

const Page = async ({ searchParams }: { searchParams: { message: string } }) => {


  const { name, email, subscribe, error } = await getUserData();


  return (
    <div className="w-full lg:w-[60%]">
      <div className="ml-3 lg:ml-0">
        {searchParams.message &&
          <div className='text-green-600 bg-green-600/15 p-2 text-center rounded-lg mb-5 font-bold'>
            {searchParams.message.replaceAll('-', ' ')}
          </div>
        }

        <h2 className="mb-5 text-2xl border-b dark:border-white border-black font-bold">Profile</h2>
        <h3 className="pl-2 flex gap-2 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          Name
        </h3>
        <p className="mb-5 border-b input-bordered p-2">{name}</p>

        <h3 className="pl-2 flex gap-2 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
          </svg>
          Email
        </h3>
        <p className="mb-12  p-2 ">{email}</p>

        <h2 className="mb-5 text-2xl border-b dark:border-white border-black font-bold">
          Subscribe for newsletter</h2>
        <p className="mb-12 pl-2 flex gap-2 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
          {subscribe === true ? 'Yes' : 'No'}
        </p>

        <h2 className="mb-5 text-2xl border-b dark:border-white border-black font-bold">Favorite articles</h2>
        <ul className="pl-2">
          <li className="mb-1"><Link href={'/'}>seoisugs</Link> </li>
          <li className="mb-1"><Link href={'/'}>seoisugs</Link> </li>
          <li className="mb-1"><Link href={'/'}>seoisugs</Link> </li>
          <li className="mb-1"><Link href={'/'}>seoisugs</Link> </li>
          <li className="mb-1"><Link href={'/'}>seoisugs</Link> </li>
        </ul>

        <div className="text-end">
          <Link href={'/about/changedata'} className="mt-5 bg-slate-600 text-white hover:bg-slate-400 dark:hover:text-white hover:text-white rounded p-2 ">Change</Link>
        </div>



      </div>
    </div>
  )
}

export default Page