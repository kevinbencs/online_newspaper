import React from 'react'
import Link from 'next/link'
import Logout from '../../../_components/logout'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='lg:flex lg:gap-48 mt-32 min-h-screen'>
        <section className='flex justify-center lg:flex-col gap-2 mb-8 lg:justify-start'>
            <Link className='border-zinc-500 border hover:dark:bg-slate-500 hover:text-white hover:dark:text-white hover:bg-gray-700 text-center inline-block p-2 min-w-32' href={'/about'}>About</Link>
            <Link className='border-zinc-500 border hover:dark:bg-slate-500 hover:text-white hover:dark:text-white hover:bg-gray-700 text-center inline-block p-2 min-w-32' href={'/about/newpassword'}>New password</Link>
            <Link className='border-zinc-500 border hover:dark:bg-slate-500 hover:text-white hover:dark:text-white hover:bg-gray-700 text-center inline-block p-2 min-w-32' href={'/about/deleteaccount'}>Delete account</Link>
            <Logout/>
        </section>
        {children}
    </div>
  )
}

export default Layout