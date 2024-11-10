import React from 'react'
import Link from 'next/link'
import AdminLogout from '@/app/_components/adminlogout'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='lg:flex lg:gap-48 mt-32 min-h-screen relative'>
        <section className='flex justify-center lg:flex-col gap-2 mb-8 lg:justify-start flex-wrap flex-col md:flex-row'>
            <Link className='border-zinc-500 border hover:dark:bg-slate-500 hover:text-white hover:dark:text-white hover:bg-gray-700 text-center inline-block p-2 min-w-32' href={'/dashboard'}>Dashboard</Link>
            <Link className='border-zinc-500 border hover:dark:bg-slate-500 hover:text-white hover:dark:text-white hover:bg-gray-700 text-center inline-block p-2 min-w-32' href={'/dashboard/newpassword'}>New password</Link>
            <Link className='border-zinc-500 border hover:dark:bg-slate-500 hover:text-white hover:dark:text-white hover:bg-gray-700 text-center inline-block p-2 min-w-32' href={'/dashboard/category_image_audio_video'}> Category, image, audio, video</Link>
            <Link className='border-zinc-500 border hover:dark:bg-slate-500 hover:text-white hover:dark:text-white hover:bg-gray-700 text-center inline-block p-2 min-w-32' href={'/dashboard/task'}>Tasks</Link>
            <AdminLogout/>
        </section>
        {children}
    </div>
  )
}

export default Layout