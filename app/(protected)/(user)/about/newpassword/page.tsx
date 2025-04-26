'use client'
import { changePassword } from '@/actions/updateuser';
import { SyntheticEvent, useState, useTransition } from 'react'
import { ZodIssue } from 'zod';
import { v4 as uuid } from 'uuid';

const Page = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<undefined | string>('');
  const [failed, setFailed] = useState<undefined | ZodIssue[]>([]);
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    startTransition(() => {
      changePassword({ password, confirmPassword })
        .then(res => {
          setSuccess(res.success);
          setFailed(res.failed);
          setError(res.error);
          if (res.success) {
            setPassword('');
            setConfirmPassword('');
          }
        })
        .catch(error =>{
            console.log(error);
            setError('Something went wrong, please try again')
        })
    })

  }

  return (
    <div className='w-full lg:w-[500px]'>
      <h1 className='text-3xl mb-20 text-center lg:text-start'>Change password</h1>
      {(failed && failed.length > 0) &&
        <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 rounded-lg mb-5  p-2'>
          {failed.map(e => <p key={uuid()}>{e.message}</p>)}
        </div>
      }
      {error &&
        <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 rounded-lg mb-5 text-center  p-2'>
          {error}
        </div>
      }
      {success &&
        <div className='text-green-600 bg-green-600/15 p-2 text-center rounded-lg mb-5 font-bold'>{success}</div>
      }
      <form onSubmit={handleSubmit} className='text-center md:text-start'>
        <input type="password" maxLength={16} className='p-1 pl-2 dark:bg-[#121212] border-gray-800 border rounded w-full mb-2' name="password" required placeholder='Password' disabled={isPending} value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" maxLength={16} className='p-1 pl-2 dark:bg-[#121212] border-gray-800 border rounded w-full mb-2' name="confirm_password" required placeholder='Confirm password' disabled={isPending} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <input type="submit" value="Change password" className='md:w-96 lg:w-auto w-full text-white hover:bg-slate-500 p-1 rounded bg-slate-700 mt-5' />
      </form>
    </div>
  )
}

export default Page