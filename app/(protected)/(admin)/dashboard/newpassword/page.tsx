'use client'
import {SyntheticEvent} from 'react'

const Page = () => {
    const handleSubmit = (e: SyntheticEvent ) => {
        e.preventDefault();
    }
  return (
    <div className='w-full lg:w-[500px]'>
      <h2 className='text-3xl mb-20 text-center lg:text-start'>Change password</h2>
        <form onSubmit={handleSubmit} className='text-center md:text-start'>
            <input type="password" className='p-1 pl-2 border-gray-800 border rounded w-full mb-2' name="password" required placeholder='Password'/>
            <input type="password" className='p-1 pl-2 border-gray-800 border rounded w-full mb-2' name="confirm_password"  required placeholder='Confirm password'/>
            <input type="submit" value="Change password" className='md:w-96 lg:w-auto w-full text-white hover:bg-slate-500 p-1 rounded bg-slate-700 mt-5'/>
        </form>
    </div>
  )
}

export default Page