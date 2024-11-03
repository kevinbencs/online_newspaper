'use client'

import Link from 'next/link'
import { SyntheticEvent, useState, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { FaDiscord } from 'react-icons/fa6'
import { login } from '@/actions/login'
import { useLogged } from '../_components/islogged/isloggedprovider'
import { loginGoogle } from '@/actions/loginGoogle'
import { loginGithub } from '@/actions/loginGithub'
import { loginDiscord } from '@/actions/loginDiscord'

const Page = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('')
  const { RoleLogged, setRole } = useLogged();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    startTransition(() => {
      login({ email, password })
        .then((data) => {
          setError(data.error);
          if (data.success) {
            setRole('user');
          }
        })
    })
  }

  useEffect(() => {
    if(RoleLogged !== '')
    push('/');
  },[RoleLogged])


  const handleGoogleSignIn = () => {
   loginGoogle()
  }

  const handleDiscordSignIn = () => {
    loginDiscord();
  }

  const handleGithubSignIn = () => {
   loginGithub()
  }

  return (
    <div className='flex justify-center min-h-[90vh] pt-[10vh] mb-10'>
      <div className='w-80'>
        <h2 className='text-center mb-5 text-3xl'>Sign in to Word Times</h2>
        <form action="#" className='dark:bg-neutral bg-gray-200 border-gray-800 rounded-lg p-[5%] pt-6 pb-6 mb-10 border dark:border-slate-400' onSubmit={handleSubmit}>

          {error &&
            <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 rounded-lg mb-5 text-center p-2'>{error}</div>
          }
          {success &&
            <div className='text-green-600 bg-green-600/15 p-2 text-center rounded-lg mb-5 font-bold'>{success}</div>
          }

          <label className='text-sm'>
            Email address
            <input type="email" name="email" disabled={isPending} className='block w-[100%] pl-2 rounded-md dark:bg-[#121212] mt-1 pt-1 pb-1 focus-within:outline-none' required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <div className='relative mt-6 mb-6'>
            <Link href='/forgotpassword' className='absolute right-0 text-xs dark:text-slate-400 text-slate-800'>Forgot password?</Link>
            <label className='text-sm'>
              Password
              <input type="password" disabled={isPending} name='password' minLength={8} maxLength={16} required className='block w-[100%] dark:bg-[#121212] focus-within:outline-none pl-2 mt-1 rounded-md pt-1 pb-1' value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
          </div>
          <input type="submit" value="Sign in" disabled={isPending} className='block w-[100%] rounded-lg bg-base-300 dark:bg-gray-400 p-2 cursor-pointer hover:bg-base-100 dark:hover:bg-gray-500' />
        </form>
        <div className=' text-center text-xs'>New to Word Times? <Link href='/signup' className='text-slate-400' >Create an account</Link></div>
        <div className='mt-10 before:w-full gap-2 after:w-full flex-nowrap items-center before:h-[1px] before:bg-gray-500 before:dark:bg-white before:relative after:h-[1px] after:dark:bg-white after:bg-gray-500 after:relative flex justify-center'><span className=' text-center'>OR</span></div>

        <section className='mt-10'>
          <button onClick={handleGoogleSignIn} className='w-[100%] pl-16 rounded-lg bg-white p-2 text-black cursor-pointer   flex items-center  gap-4  shadow-[0_0_10px_2px_rgba(0,0,0,0.1)]'><FcGoogle className='h-5 w-5' /> Sign in with Google</button>
          <button onClick={handleDiscordSignIn} className='w-[100%] pl-16 rounded-lg  p-2 text-white cursor-pointer  bg-[#5865F2] flex items-center  gap-4 mt-5 shadow-[0_0_10px_2px_rgba(0,0,0,0.1)]'><FaDiscord className='h-5 w-5' /> Sign in with Discord</button>
          <button onClick={handleGithubSignIn} className='w-[100%] pl-16 rounded-lg bg-black p-2 text-white cursor-pointer  flex items-center  gap-4 mt-5 shadow-[0_0_10px_2px_rgba(0,0,0,0.1)]'><FaGithub className='h-5 w-5' /> Sign in with Github</button>
        </section>

      </div>

    </div>
  )
}

export default Page