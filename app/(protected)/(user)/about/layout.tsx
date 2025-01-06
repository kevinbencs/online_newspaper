import Link from 'next/link'
import Logout from '../../../_components/logout'
import { Metadata } from 'next'

export const metadata: Metadata = {

  description: "",
  openGraph: {
  },
  twitter: {
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    noimageindex: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nocache: true,
      noimageindex: true,
    }
  }
}

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='lg:flex lg:gap-48 mt-32 min-h-screen'>
        <section className='flex justify-center lg:flex-col gap-2 mb-8 lg:justify-start sm:flex-row flex-col'>
            <Link className='border-zinc-500 border hover:dark:bg-slate-500 hover:text-white hover:dark:text-white hover:bg-gray-700 text-center inline-block p-2 min-w-32' href={'/about'}>About</Link>
            <Link className='border-zinc-500 border hover:dark:bg-slate-500 hover:text-white hover:dark:text-white hover:bg-gray-700 text-center inline-block p-2 min-w-32' href={'/about/newpassword'}>New password</Link>
            <Link className='border-zinc-500 border hover:dark:bg-slate-500 hover:text-white hover:dark:text-white hover:bg-gray-700 text-center inline-block p-2 min-w-32' href={'/about/twofa'}>2FA</Link>
            <Link className='border-zinc-500 border hover:dark:bg-slate-500 hover:text-white hover:dark:text-white hover:bg-gray-700 text-center inline-block p-2 min-w-32' href={'/about/deleteaccount'}>Delete account</Link>
            <Logout/>
        </section>
        {children}
    </div>
  )
}

export default Layout