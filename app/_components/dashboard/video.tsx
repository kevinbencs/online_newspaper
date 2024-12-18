'use client'

import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
import { ZodIssue } from 'zod';
import { addVideoUrl } from '@/actions/addvideourl';
import VideoOptgroup from '../optgroup/videogroup';
import { v4 as uuid } from 'uuid';
import useSWR from 'swr'

type Dispatcher<T> = Dispatch<SetStateAction<T>>

interface videoUrl {
    title: string,
    _id: string,
    url: string
}


const fetcher = async (url: string): Promise<{ success: videoUrl[] }> => {
    const res = await fetch(url);

    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.')
        error.cause = res.json().then((data: { error: string }) => data.error)
        console.log(error.cause)

        throw error;
    }

    return res.json();
}



const VideoUrl = (props: { place: string, setPlace: Dispatcher<string>, success: string | undefined, error: string | undefined, failed: undefined | ZodIssue[], setVideoCopyMessage: Dispatcher<string>, setAudioCopyMessage: Dispatcher<string>, videoCopyMessage: string, setCategoryCopyMessage: Dispatcher<string>, setImageCopyMessage: Dispatcher<string>, setSuccess: Dispatcher<string | undefined>, setError: Dispatcher<string | undefined>, setFailed: Dispatcher<ZodIssue[] | undefined>, isPending: boolean, startTransition: (callback: () => void) => void }) => {

    const [addUrlVideo, setAddUrlVideo] = useState<string>('');
    const [addTitleVideo, setAddTitleVideo] = useState<string>('');
    const [deleteVideoId, setDeleteVideoId] = useState<string>('');
    const [changed, setChanged] = useState<boolean>(false);
    const [updateIdVideo, setUpdateIdVideo] = useState<string>('');
    const [updateUrlVideo, setUpdateUrlVideo] = useState<string>('');
    const [updateTitleVideo, setUpdateTitleVideo] = useState<string>('');

    const { data, error, isLoading, mutate } = useSWR<{ success: videoUrl[] }, Error>('/api/video', fetcher)

    if (error) props.setError(error.message)


    const handleAdd = (e: SyntheticEvent) => {
        props.setSuccess('');
        props.setError('');
        props.setFailed([]);
        e.preventDefault()
        props.startTransition(async () => {
            props.setPlace('videoAdd');
            try {
                const res = await fetch('/api/video', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: addTitleVideo, url: addUrlVideo })
                })

                const resJson = await res.json() as { success: string | undefined, error: string | undefined, failed: ZodIssue[] | undefined };

                if (res.status === 200) {
                    props.setSuccess(resJson.success);
                    setAddUrlVideo('')
                    setAddTitleVideo('');
                    setChanged(!changed);
                    mutate();
                }
                else if (res.status === 400) {
                    if (resJson.failed) props.setFailed(resJson.failed);
                    else props.setError(resJson.error);
                }
                else if (res.status === 401 || res.status === 500) {
                    props.setError(resJson.error);
                }
            }
            catch (err) {
                console.error('Error ', err);
                props.setError('Failed to connect to the server.');
            }
            addVideoUrl({ title: addTitleVideo, url: addUrlVideo })
                .then(res => {

                    if (res.success) {
                        props.setSuccess(res.success);
                        setAddUrlVideo('');
                        setAddTitleVideo('');
                        setChanged(!changed);
                    }

                    props.setError(res.error);
                    props.setFailed(res.failed)
                })
        })

    }

    const handleDelete = (e: SyntheticEvent) => {
        e.preventDefault();
        props.setSuccess('');
        props.setError('');
        props.setFailed([]);
        props.startTransition(async () => {
            props.setPlace('videoDelete');
            try {
                const res = await fetch('/api/video', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ Id: deleteVideoId })
                })

                const resJson = await res.json() as { success: string | undefined, error: string | undefined, failed: ZodIssue[] | undefined };

                if (res.status === 200) {
                    props.setSuccess(resJson.success);
                    setDeleteVideoId('');
                    setChanged(!changed);
                    mutate();
                }
                else if (res.status === 400) {
                    if (resJson.failed) props.setFailed(resJson.failed);
                }
                else if (res.status === 401 || res.status === 500) {
                    props.setError(resJson.error);
                }
            }
            catch (err) {
                console.error('Error ', err);
                props.setError('Failed to connect to the server.');
            }
        })
    }

    const handleUpdate = (e: SyntheticEvent) => {
        e.preventDefault();
        props.setSuccess('');
        props.setError('');
        props.setFailed([]);
        props.startTransition(async () => {
            props.setPlace('videoUpdate');
            try {
                const res = await fetch('/api/video', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: updateIdVideo, title: updateTitleVideo, url: updateUrlVideo })
                })

                const resJson = await res.json() as { success: string | undefined, error: string | undefined, failed: ZodIssue[] | undefined };

                if (res.status === 200) {
                    props.setSuccess(resJson.success);
                    setUpdateTitleVideo('');
                    setUpdateIdVideo('');
                    setUpdateUrlVideo('');
                    setChanged(!changed);
                    mutate();
                }
                else if (res.status === 400) {
                    if (resJson.failed) props.setFailed(resJson.failed);
                    else props.setError(resJson.error);
                }
                else if (res.status === 401 || res.status === 500) {
                    props.setError(resJson.error);
                }
            }
            catch (err) {
                console.error('Error ', err);
                props.setError('Failed to connect to the server.');
            }
        })
    }

    return (
        <div className='w-full relative' >
            <h2 className='text-3xl mb-12 pl-2 pb-2 border-b dark:border-white border-black font-bold'>Video</h2>

            <h3 className='mb-5 text-xl pl-2'>Add video url</h3>
            {props.place === 'videoAdd' &&
                <div>
                    {(props.failed && props.failed.length > 0) &&
                        <div className='text-red-700 font-bold dark:bg-red-400/15  dark:text-red-500 bg-red-700/25 rounded-lg mb-5  p-2'>
                            {props.failed.map(e => <p key={uuid()}>{e.message}</p>)}
                        </div>
                    }
                    {props.error &&
                        <div className='text-red-700 font-bold dark:bg-red-400/15  dark:text-red-500 bg-red-700/25 rounded-lg mb-5 text-center  p-2'>
                            {props.error}
                        </div>
                    }
                    {props.success &&
                        <div className='text-green-600 bg-green-600/15 p-2  text-center rounded-lg mb-5 font-bold'>{props.success}</div>
                    }
                </div>
            }

            <form onSubmit={handleAdd}>

                <input type="text" required value={addUrlVideo} onChange={(e) => { props.setVideoCopyMessage('Click to copy'); setAddUrlVideo(e.target.value); props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setAudioCopyMessage('Click to copy.'); }} placeholder='Url' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-3 pb-2' />
                <input type="text" required value={addTitleVideo} onChange={(e) => { props.setVideoCopyMessage('Click to copy'); setAddTitleVideo(e.target.value); props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setAudioCopyMessage('Click to copy.'); props.setCategoryCopyMessage('Click to copy'); }} placeholder='Title' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-5 pb-2' />
                <div className='text-end mb-20'>
                    <input type="submit" value="Add" className='cursor-pointer bg-slate-600 hover:bg-slate-400 p-2 pt-1 pb-1 rounded text-white' />
                </div>

            </form>

            <h3 className='mb-5 text-xl pl-2'>Search video id</h3>
            <VideoOptgroup error={error} isLoading={isLoading} data={data?.success} videoCopyMessage={props.videoCopyMessage} setVideoCopyMessage={props.setVideoCopyMessage} setAudioCopyMessage={props.setAudioCopyMessage} setCategoryCopyMessage={props.setCategoryCopyMessage} setImageCopyMessage={props.setImageCopyMessage} isPending={props.isPending} setSuccess={props.setSuccess} changed={changed} />

            <h3 className='mb-5 text-xl pl-2'>Delete video by id</h3>

            {props.place === 'videoDelete' &&
                <div>
                    {(props.failed && props.failed.length > 0) &&
                        <div className='text-red-700 font-bold dark:bg-red-400/15  dark:text-red-500 bg-red-700/25 rounded-lg mb-5  p-2'>
                            {props.failed.map(e => <p key={uuid()}>{e.message}</p>)}
                        </div>
                    }
                    {props.error &&
                        <div className='text-red-700 font-bold dark:bg-red-400/15  dark:text-red-500 bg-red-700/25 rounded-lg mb-5 text-center  p-2'>
                            {props.error}
                        </div>
                    }
                    {props.success &&
                        <div className='text-green-600 bg-green-600/15 p-2  text-center rounded-lg mb-5 font-bold'>{props.success}</div>
                    }
                </div>
            }

            <form onSubmit={handleDelete} className='mb-20'>
                <input type="text" value={deleteVideoId} required onChange={(e) => { props.setVideoCopyMessage('Click to copy'); setDeleteVideoId(e.target.value); props.setImageCopyMessage('Click to copy'); props.setSuccess(''); props.setCategoryCopyMessage('Click to copy'); props.setAudioCopyMessage('Click to copy.'); }} placeholder='Video id' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-5 pb-2' />
                <div className='text-end mb-20'>
                    <input type="submit" value="Delete" className='cursor-pointer bg-slate-600 hover:bg-slate-400 p-2 pt-1 pb-1 rounded text-white' />
                </div>
            </form>

            <h3 className='mb-5 text-xl pl-2'>Update video by id</h3>

            {props.place === 'videoUpdate' &&
                <div>
                    {(props.failed && props.failed.length > 0) &&
                        <div className='text-red-700 font-bold dark:bg-red-400/15  dark:text-red-500 bg-red-700/25 rounded-lg mb-5  p-2'>
                            {props.failed.map(e => <p key={uuid()}>{e.message}</p>)}
                        </div>
                    }
                    {props.error &&
                        <div className='text-red-700 font-bold dark:bg-red-400/15  dark:text-red-500 bg-red-700/25 rounded-lg mb-5 text-center  p-2'>
                            {props.error}
                        </div>
                    }
                    {props.success &&
                        <div className='text-green-600 bg-green-600/15 p-2  text-center rounded-lg mb-5 font-bold'>{props.success}</div>
                    }
                </div>
            }

            <form onSubmit={handleUpdate}>
                <input type="text" value={updateIdVideo} onChange={(e) => { props.setVideoCopyMessage('Click to copy'); setUpdateIdVideo(e.target.value); props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setAudioCopyMessage('Click to copy.'); }} required placeholder='Id' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-3 pb-2' />
                <input type="text" value={updateUrlVideo} onChange={(e) => { props.setVideoCopyMessage('Click to copy'); setUpdateUrlVideo(e.target.value); props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setAudioCopyMessage('Click to copy.'); }} placeholder='Url' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-3 pb-2' />
                <input type="text" value={updateTitleVideo} onChange={(e) => { props.setVideoCopyMessage('Click to copy'); setUpdateTitleVideo(e.target.value); props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setAudioCopyMessage('Click to copy.'); }} placeholder='Title' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-5 pb-2' />
                <div className='text-end mb-20'>
                    <input type="submit" value="Update" className='cursor-pointer bg-slate-600 hover:bg-slate-400 p-2 pt-1 pb-1 rounded text-white' />
                </div>
            </form>

        </div>
    )
}

export default VideoUrl