'use client'
import { SyntheticEvent, useState, useTransition } from 'react'
import { ZodIssue } from 'zod'
import { v4 as uuid } from 'uuid'
import { changeAdminPassword } from '@/actions/adminnewpassword'


const Page = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [failed, setFailed] = useState<ZodIssue[] | undefined>([])
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setPasswordConfirm] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: SyntheticEvent) => {
    setError('');
    setSuccess('');
    setFailed([])
    e.preventDefault();
    startTransition(() => {
      changeAdminPassword({ password, confirmPassword })
        .then((val) => {
          setError(val.error);
          setFailed(val.failed);
          if (val.success) {
            setSuccess(val.success);
            setPassword('');
            setPasswordConfirm('');
          }
        })
    })
  }

  return (
    <div className='w-full'>
      <div>
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
      </div>
      <div className='lg:w-[500px]'>
        <h2 className='text-3xl mb-20 text-center lg:text-start'>Change password</h2>
        <form onSubmit={handleSubmit} className='text-center md:text-start'>
          <input type="password" className='p-1 pl-2 dark:bg-[#121212] border-gray-800 border rounded w-full mb-2' name="password" required placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} disabled={isPending} />
          <input type="password" className='p-1 pl-2 dark:bg-[#121212] border-gray-800 border rounded w-full mb-2' name="confirm_password" required placeholder='Confirm password' disabled={isPending} value={confirmPassword} onChange={(e) => setPasswordConfirm(e.target.value)} />
          <input type="submit" value="Change password" className='md:w-96 lg:w-auto w-full text-white hover:bg-slate-500 p-1 rounded bg-slate-700 mt-5' disabled={isPending} />
        </form>
      </div>

    </div>
  )
}

export default Page