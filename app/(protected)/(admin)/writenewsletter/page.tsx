'use client'

import { writeNewsletter } from '@/actions/writenewsletter';
import { SyntheticEvent, useRef, useState } from 'react'
import {  ZodIssue } from 'zod';
import { v4 as uuid } from 'uuid';

const Page = () => {
  const [paragPlaceholder, setParagPlaceholder] = useState<string>('placeholder');
  const [paragraphInput, setParagraphInput] = useState('');
  const TextEnterRef = useRef<null | HTMLParagraphElement>(null);
  const [success, setSuccess] = useState<undefined | string>('');
  const [error, setError] = useState<undefined | string>('');
  const [failed, setFailed] = useState<undefined | ZodIssue[]>([]);
  const [subject, setSubject] = useState<string>('');

  const handleParagraphChange = (e: React.ChangeEvent<HTMLParagraphElement>) => {
    setParagraphInput(e.target.innerText);
    if (e.target.innerText == '\n' || e.target.innerText === '') setParagPlaceholder('placeholder');
    else setParagPlaceholder('');
    setSuccess('');
  }

  const handleSubmit = async (e:SyntheticEvent) => {
    setSuccess('');
    setError('');
    setFailed([])
    e.preventDefault()
    writeNewsletter({text: paragraphInput, subject})
    .then((res) => {
      if (res.success){
        setParagraphInput('');
        setSuccess(res.success);
        setParagPlaceholder('placeholder');
        setSubject('');
        if(TextEnterRef.current){
          TextEnterRef.current.innerText = '';
        }
        
      }
      if(res.error) setError(res.error)
      if(res.failed) setFailed(res.failed)
    })
    
  }

  return (
    <div className='mt-40 min-h-screen'>
      {success &&
        <div className='text-green-600 bg-green-600/15 p-2 text-center rounded-lg mb-5 font-bold'>{success}</div>
      }
      {(failed && failed.length> 0) &&
        <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 rounded-lg mb-5  p-2'>
          {failed.map(e => <div key={uuid()}>{e.message}</div> )}
        </div>
      }
      {error &&
        <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 text-center bg-red-700/25 rounded-lg mb-5  p-2'>
          {error}
        </div>
      }
      <form onSubmit={handleSubmit}>
        <input type="text" name="subject"  className='mt-10 focus-within:outline-none border-t-0 border-r-0 border-l-0 w-full border border-b p-3 bg-transparent input-bordered' placeholder='Subject' value={subject} onChange={(e) => {setSubject(e.target.value), setSuccess('')}}/>
        <p contentEditable="true" className={`mt-10 focus-within:outline-none border p-3 rounded-md min-h-80 input-bordered ${paragPlaceholder}`} onInput={handleParagraphChange} tabIndex={0} ref={TextEnterRef}></p>
        <input type="submit" value="Send" className='w-full lg:w-14 mt-10 cursor-pointer bg-slate-600 p-1 text-center rounded-sm hover:bg-slate-400 text-white'/>
      </form>
    </div>
  )
}

export default Page