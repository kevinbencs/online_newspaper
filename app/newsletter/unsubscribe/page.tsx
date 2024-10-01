'use client';
import { SyntheticEvent } from 'react'

const Page = () => {
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  }

  return (
    <div className='min-h-[90vh] mt-20 lg:ml-80 lg:w-[500px]'>
      <p className='mb-2 text-center lg:text-start'>If you would like to unsubscribe, enter your email.</p>
      <form action="#" className='relative' onSubmit={handleSubmit}>
        <input type="email" name="email" className='block w-[100%] border border-gray-400 dark:border-current p-2 pt-1 pb-1 rounded-sm focus-within:outline-none'/>
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