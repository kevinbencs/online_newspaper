import { Confirm } from '@/actions/confirm'
import { error } from 'console';
import React from 'react'

const Page = async ({searchParams}: {searchParams: {token_hash: string, type: string}}) => {
    const res = await Confirm(searchParams.token_hash, searchParams.type);
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