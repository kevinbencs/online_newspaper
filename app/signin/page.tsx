'use client'

import Link from 'next/link'
import { SyntheticEvent, useState } from 'react'

const Page = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');


  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  }
  
  return (
    <div className='flex justify-center h-[90vh] pt-[10vh]'>
      <div className='w-80'>
        <h2 className='text-center mb-5 text-3xl'>Sign in to Word Times</h2>
        <form action="#" className='dark:bg-neutral bg-gray-200 border-gray-800 rounded-lg p-[5%] pt-6 pb-6 mb-10 border dark:border-slate-400' onSubmit={handleSubmit}>
          <label className='text-sm'>
            Email address
            <input type="email" name="email" className='block w-[100%] pl-2 rounded-md mt-1 pt-1 pb-1 focus-within:outline-none' required value={email} onChange={(e) => setEmail(e.target.value)}/>
          </label>
          <div className='relative mt-6 mb-6'>
          <Link href='/forgotpassword' className='absolute right-0 text-xs dark:text-slate-950 text-slate-800'>Forgot password?</Link>
          <label className='text-sm'>
            Password
            <input type="password" name='password' minLength={8} maxLength={16} required className='block w-[100%] focus-within:outline-none pl-2 mt-1 rounded-md pt-1 pb-1' value={password} onChange={(e) => setPassword(e.target.value)}/>
          </label>
          </div>
          <input type="submit" value="Sign up" className='block w-[100%] rounded-lg bg-base-300 dark:bg-gray-400 p-2 cursor-pointer hover:bg-base-100 dark:hover:bg-gray-500'/>
        </form>
        <div className=' text-center text-xs'>New to Word Times? <Link href='/signup' className='text-slate-400'>Create an account</Link></div>
      </div>
    </div>
  )
}

export default Page