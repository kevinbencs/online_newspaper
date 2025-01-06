import { Confirm } from '@/actions/confirm'
import React from 'react'
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

const Page = async ({searchParams}: {searchParams: {token_hash: string}}) => {

    const res = await Confirm({token:searchParams.token_hash});
    const error = res.error;
    const success = res.success;
    
  return (
    <div className='mt-32 text-center h-svh'>
        <div className='text-3xl'>{error}</div>
        <div className='text-3xl'>{success}</div>
    </div>
  )
}

export default Page