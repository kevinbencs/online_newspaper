'use client'

import React, { useState, useTransition } from 'react'
import { ZodIssue } from 'zod';

import ImageUrl from '@/app/_components/dashboard/image';
import CategoryUrl from '@/app/_components/dashboard/category';
import AudioUrl from '@/app/_components/dashboard/audio';
import VideoUrl from '@/app/_components/dashboard/video';

const Page = () => {

  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');
  const [failed, setFailed] = useState<undefined | ZodIssue[]>([]);
  const [imageCopyMessage, setImageCopyMessage] = useState<string>('Click to copy');
  const [categoryCopyMessage, setCategoryCopyMessage] = useState<string>('Click to copy');
  const [audioCopyMessage, setAudioCopyMessage] = useState<string>('Click to copy');
  const [videoCopyMessage, setVideoCopyMessage] = useState<string>('Click to copy');
  const [isPending, startTransition] = useTransition();
  const [place, setPlace] = useState<string>('');

 
  return (
    <div className='w-full'>
      
      <ImageUrl setSuccess={setSuccess} place={place} setPlace={setPlace} success={success} error={error} failed={failed} setAudioCopyMessage={setAudioCopyMessage} setVideoCopyMessage={setVideoCopyMessage} setCategoryCopyMessage={setCategoryCopyMessage} setImageCopyMessage={setImageCopyMessage} setError={setError} setFailed={setFailed} isPending={isPending} startTransition={startTransition} imageCopyMessage={imageCopyMessage}/>
      <CategoryUrl setSuccess={setSuccess} place={place} setPlace={setPlace} success={success} error={error} failed={failed} setAudioCopyMessage={setAudioCopyMessage} setVideoCopyMessage={setVideoCopyMessage} setCategoryCopyMessage={setCategoryCopyMessage} setImageCopyMessage={setImageCopyMessage} setError={setError} setFailed={setFailed} isPending={isPending} startTransition={startTransition} categoryCopyMessage={categoryCopyMessage}/>
      <AudioUrl setSuccess={setSuccess} place={place} setPlace={setPlace} success={success} error={error} failed={failed} setAudioCopyMessage={setAudioCopyMessage} setVideoCopyMessage={setVideoCopyMessage} audioCopyMessage={audioCopyMessage}  setCategoryCopyMessage={setCategoryCopyMessage} setImageCopyMessage={setImageCopyMessage} setError={setError} setFailed={setFailed} isPending={isPending} startTransition={startTransition} />
      <VideoUrl setSuccess={setSuccess} place={place} setPlace={setPlace} success={success} error={error} failed={failed} setAudioCopyMessage={setAudioCopyMessage} setVideoCopyMessage={setVideoCopyMessage} videoCopyMessage={videoCopyMessage}  setCategoryCopyMessage={setCategoryCopyMessage} setImageCopyMessage={setImageCopyMessage} setError={setError} setFailed={setFailed} isPending={isPending} startTransition={startTransition} />
    </div>
  )
}

export default Page