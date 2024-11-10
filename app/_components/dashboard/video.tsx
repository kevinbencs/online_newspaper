'use client'

import React, { Dispatch, SetStateAction, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { ZodIssue } from 'zod';
import { addVideoUrl } from '@/actions/addvideourl';
import { deleteVideoUrl } from '@/actions/deletevideourl';
import { updateVideoUrl } from '@/actions/updatevideourl';
import VideoOptgroup from '../optgroup/videogroup';
import { v4 as uuid } from 'uuid';

type Dispatcher<T> = Dispatch<SetStateAction<T>>

const VideoUrl = (props: { place: string, setPlace: Dispatcher<string>, success: string | undefined, error: string | undefined, failed: undefined | ZodIssue[], setVideoCopyMessage: Dispatcher<string>, setAudioCopyMessage: Dispatcher<string>, videoCopyMessage: string, setCategoryCopyMessage: Dispatcher<string>, setImageCopyMessage: Dispatcher<string>, setSuccess: Dispatcher<string | undefined>, setError: Dispatcher<string | undefined>, setFailed: Dispatcher<ZodIssue[] | undefined>, isPending: boolean, startTransition: (callback: () => void) => void }) => {

    const [addUrlAudio, setAddUrlAudio] = useState<string>('');
    const [addTitleAudio, setAddTitleAudio] = useState<string>('');
    const [deleteAudioId, setDeleteAudioId] = useState<string>('');
    const [changed, setChanged] = useState<boolean>(false);
    const [updateIdAudio, setUpdateIdAudio] = useState<string>('');
    const [updateUrlAudio, setUpdateUrlAudio] = useState<string>('');
    const [updateTitleAudio, setUpdateTitleAudio] = useState<string>('');




    const handleAdd = (e: SyntheticEvent) => {
        props.setSuccess('');
        props.setError('');
        props.setFailed([]);
        e.preventDefault()
        props.startTransition(() => {
            addVideoUrl({ title: addTitleAudio, url: addUrlAudio })
                .then(res => {
                    props.setPlace('videoAdd');
                    if (res.success) {
                        props.setSuccess(res.success);
                        setAddUrlAudio('');
                        setAddTitleAudio('');
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
        props.startTransition(() => {
            deleteVideoUrl({ Id: deleteAudioId })
                .then(res => {
                    props.setPlace('videoDelete');
                    if (res.success) {
                        props.setSuccess(res.success);
                        setDeleteAudioId('');
                        setChanged(!changed);
                    }
                    props.setError(res.error);
                    props.setFailed(res.failed)
                })
        })
    }

    const handleUpdate = (e: SyntheticEvent) => {
        e.preventDefault();
        props.setSuccess('');
        props.setError('');
        props.setFailed([]);
        props.startTransition(() => {
            updateVideoUrl({ id: updateIdAudio, title: updateTitleAudio, url: updateUrlAudio })
                .then(res => {
                    props.setPlace('videoUpdate');
                    if (res.success) {
                        props.setSuccess(res.success);
                        setUpdateTitleAudio('');
                        setUpdateIdAudio('');
                        setUpdateUrlAudio('');
                        setChanged(!changed);
                    }
                    props.setFailed(res.failed);
                    props.setError(res.error)
                })
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

                <input type="text" required value={addUrlAudio} onChange={(e) => { props.setVideoCopyMessage('Click to copy'); setAddUrlAudio(e.target.value); props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setAudioCopyMessage('Click to copy.'); }} placeholder='Url' disabled={props.isPending} className='focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-3 pb-2' />
                <input type="text" required value={addTitleAudio} onChange={(e) => { props.setVideoCopyMessage('Click to copy'); setAddTitleAudio(e.target.value); props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setAudioCopyMessage('Click to copy.'); props.setCategoryCopyMessage('Click to copy'); }} placeholder='Title' disabled={props.isPending} className='focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-5 pb-2' />
                <div className='text-end mb-20'>
                    <input type="submit" value="Add" className='cursor-pointer bg-slate-600 hover:bg-slate-400 p-2 pt-1 pb-1 rounded text-white' />
                </div>

            </form>

            <h3 className='mb-5 text-xl pl-2'>Search video id</h3>
            <VideoOptgroup videoCopyMessage={props.videoCopyMessage} setVideoCopyMessage={props.setVideoCopyMessage} setAudioCopyMessage={props.setAudioCopyMessage} setCategoryCopyMessage={props.setCategoryCopyMessage} setError={props.setError} setImageCopyMessage={props.setImageCopyMessage} isPending={props.isPending} setSuccess={props.setSuccess} changed={changed} />

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
                <input type="text" value={deleteAudioId} required onChange={(e) => { props.setVideoCopyMessage('Click to copy'); setDeleteAudioId(e.target.value); props.setImageCopyMessage('Click to copy'); props.setSuccess(''); props.setCategoryCopyMessage('Click to copy'); props.setAudioCopyMessage('Click to copy.'); }} placeholder='Video id' disabled={props.isPending} className='focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-5 pb-2' />
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
                <input type="text" value={updateIdAudio} onChange={(e) => { props.setVideoCopyMessage('Click to copy'); setUpdateIdAudio(e.target.value); props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setAudioCopyMessage('Click to copy.'); }} required placeholder='Id' disabled={props.isPending} className='focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-3 pb-2' />
                <input type="text" value={updateUrlAudio} onChange={(e) => { props.setVideoCopyMessage('Click to copy'); setUpdateUrlAudio(e.target.value); props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setAudioCopyMessage('Click to copy.'); }} placeholder='Url' disabled={props.isPending} className='focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-3 pb-2' />
                <input type="text" value={updateTitleAudio} onChange={(e) => { props.setVideoCopyMessage('Click to copy'); setUpdateTitleAudio(e.target.value); props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setAudioCopyMessage('Click to copy.'); }} placeholder='Title' disabled={props.isPending} className='focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-5 pb-2' />
                <div className='text-end mb-20'>
                    <input type="submit" value="Update" className='cursor-pointer bg-slate-600 hover:bg-slate-400 p-2 pt-1 pb-1 rounded text-white' />
                </div>

            </form>

        </div>
    )
}

export default VideoUrl