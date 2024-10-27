'use client';
import { unsubscribeEmail } from '@/actions/unsubscribenewsletter';
import { SyntheticEvent, useState } from 'react'
import { ZodIssue } from 'zod';
import { v4 as uuid } from 'uuid';

const Page = () => {
  const [email, setEmail] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<undefined | ZodIssue[]>([]);
  const [failed, setFailed] = useState<string | undefined>('');

  const handleSubmit = (e: SyntheticEvent) => {
    setSuccess('');
    setFailed('');
    setError([]);
    e.preventDefault();
    unsubscribeEmail({email})
    .then(val => {
      if(val.success){
        setSuccess(val.success);
        setEmail('');
      }
      setError(val.error);
      setFailed(val.failed)
    })
  }

  return (
    <div className='min-h-[90vh] mt-20 lg:ml-80 lg:w-[500px]'>
      {success &&
        <div className='text-green-600 bg-green-600/15 p-2 text-center rounded-lg mb-5 font-bold'>{success}</div>
      }
      {(error && error.length> 0) &&
        <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 rounded-lg mb-5  p-2'>
          {error.map(e => <div key={uuid()}>{e.message}</div> )}
        </div>
      }
      {failed &&
        <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 text-center bg-red-700/25 rounded-lg mb-5  p-2'>
          {failed}
        </div>
      }
      <p className='mb-2 text-center lg:text-start'>If you would like to unsubscribe, enter your email.</p>
      <form action="#" className='relative' onSubmit={handleSubmit}>
        <input type="email" name="email" className='block w-[100%] border border-gray-400 dark:border-current p-2 pt-1 pb-1 rounded-sm focus-within:outline-none' value={email} onChange={(e) => {setEmail(e.target.value); setSuccess('')}}/>
        <button className='absolute right-1 top-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      </form>
    </div>
  )
}

export default Page