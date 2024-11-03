'use client'

import React, { useState, useTransition } from 'react'
import { ZodIssue } from 'zod';
import { v4 as uuid } from 'uuid';
import ImageUrl from '@/app/_components/dashboard/image';
import CategoryUrl from '@/app/_components/dashboard/category';

const Page = () => {

  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');
  const [failed, setFailed] = useState<undefined | ZodIssue[]>([]);
  const [imageCopyMessage, setImageCopyMessage] = useState<string>('Click to copy');
  const [categoryCopyMessage, setCategoryCopyMessage] = useState<string>('Click to copy');
  const [audioCopyMessage, setAudioCopyMessage] = useState<string>('Click to copy');
  const [videoCopyMessage, setVideoCopyMessage] = useState<string>('Click to copy');
  const [isPending, startTransition] = useTransition();

 
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
      <ImageUrl setSuccess={setSuccess} setAudioCopyMessage={setAudioCopyMessage} setVideoCopyMessage={setVideoCopyMessage} setCategoryCopyMessage={setCategoryCopyMessage} setImageCopyMessage={setImageCopyMessage} setError={setError} setFailed={setFailed} isPending={isPending} startTransition={startTransition} imageCopyMessage={imageCopyMessage}/>
      <CategoryUrl setSuccess={setSuccess} setAudioCopyMessage={setAudioCopyMessage} setVideoCopyMessage={setVideoCopyMessage} setCategoryCopyMessage={setCategoryCopyMessage} setImageCopyMessage={setImageCopyMessage} setError={setError} setFailed={setFailed} isPending={isPending} startTransition={startTransition} categoryCopyMessage={categoryCopyMessage}/>
    </div>
  )
}

export default Page