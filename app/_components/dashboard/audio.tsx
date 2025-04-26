'use client'

import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
import { ZodIssue } from 'zod';
import AudioOptgroup from '../optgroup/audiogroup';
import { v4 as uuid } from 'uuid';
import useSWR from 'swr'

type Dispatcher<T> = Dispatch<SetStateAction<T>>

interface audUrl {
    title: string,
    _id: string,
    url: string
}

const fetcher = async (url: string): Promise<{ success: audUrl[] }> => {
    try {
        const res = await fetch(url);

        if (!res.ok) {
            const error = new Error('An error occurred while fetching the data.')
            error.cause = res.json().then((data: { error: string }) => data.error)
            console.log(error.cause)

            throw error;
        }

        return res.json();
    } catch (error) {
        console.error(error)
        throw new Error('Api error')
    }

}

const AudioUrl = (props: { place: string, setPlace: Dispatcher<string>, success: string | undefined, error: string | undefined, failed: undefined | ZodIssue[], setVideoCopyMessage: Dispatcher<string>, setAudioCopyMessage: Dispatcher<string>, audioCopyMessage: string, setCategoryCopyMessage: Dispatcher<string>, setImageCopyMessage: Dispatcher<string>, setSuccess: Dispatcher<string | undefined>, setError: Dispatcher<string | undefined>, setFailed: Dispatcher<ZodIssue[] | undefined>, isPending: boolean, startTransition: (callback: () => void) => void }) => {

    const [addUrlAudio, setAddUrlAudio] = useState<string>('');
    const [addTitleAudio, setAddTitleAudio] = useState<string>('');
    const [deleteAudioId, setDeleteAudioId] = useState<string>('');
    const [changed, setChanged] = useState<boolean>(false);
    const [updateIdAudio, setUpdateIdAudio] = useState<string>('');
    const [updateUrlAudio, setUpdateUrlAudio] = useState<string>('');
    const [updateTitleAudio, setUpdateTitleAudio] = useState<string>('');

    const { data, error, isLoading, mutate } = useSWR<{ success: audUrl[] }, Error>('/api/audio', fetcher)

    const handleAdd = (e: SyntheticEvent) => {
        props.setSuccess('');
        props.setError('');
        props.setFailed([]);
        e.preventDefault()
        props.startTransition(async () => {
            props.setPlace('audioAdd');
            try {
                const res = await fetch('/api/audio', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: addTitleAudio, url: addUrlAudio })
                })

                const resJson = await res.json() as { success: string | undefined, error: string | undefined, failed: ZodIssue[] | undefined };

                if (res.status === 200) {
                    props.setSuccess(resJson.success);
                    setAddUrlAudio('')
                    setAddTitleAudio('');
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

    const handleDelete = (e: SyntheticEvent) => {
        e.preventDefault();
        props.setSuccess('');
        props.setError('');
        props.setFailed([]);
        props.startTransition(async () => {
            props.setPlace('audioDelete');
            try {
                const res = await fetch('/api/audio', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ Id: deleteAudioId })
                })

                const resJson = await res.json() as { success: string | undefined, error: string | undefined, failed: ZodIssue[] | undefined };

                if (res.status === 200) {
                    props.setSuccess(resJson.success);
                    setDeleteAudioId('');
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
            props.setPlace('audioUpdate');
            try {
                const res = await fetch('/api/audio', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: updateIdAudio, title: updateTitleAudio, url: updateUrlAudio })
                })

                const resJson = await res.json() as { success: string | undefined, error: string | undefined, failed: ZodIssue[] | undefined };

                if (res.status === 200) {
                    props.setSuccess(resJson.success);
                    setUpdateTitleAudio('');
                    setUpdateIdAudio('');
                    setUpdateUrlAudio('');
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
            <h2 className='text-3xl mb-12 pl-2 pb-2 border-b dark:border-white border-black font-bold'>Audio</h2>
            <h3 className='mb-5 text-xl pl-2'>Add audio url</h3>
            {props.place === 'audioAdd' &&
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

                <input type="text" required value={addUrlAudio} onChange={(e) => { setAddUrlAudio(e.target.value); props.setVideoCopyMessage('Click to copy.');; props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setAudioCopyMessage('Click to copy.'); }} placeholder='Url' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-3 pb-2' />
                <input type="text" required value={addTitleAudio} onChange={(e) => { setAddTitleAudio(e.target.value); props.setVideoCopyMessage('Click to copy.');; props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setAudioCopyMessage('Click to copy.'); props.setCategoryCopyMessage('Click to copy'); }} placeholder='Title' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-5 pb-2' />
                <div className='text-end mb-20'>
                    <input type="submit" value="Add" className='cursor-pointer bg-slate-600 hover:bg-slate-400 p-2 pt-1 pb-1 rounded text-white' />
                </div>

            </form>

            <h3 className='mb-5 text-xl pl-2'>Search audio id</h3>
            <AudioOptgroup changed={changed} error={error} isLoading={isLoading} data={data?.success} audioCopyMessage={props.audioCopyMessage} setVideoCopyMessage={props.setVideoCopyMessage} setAudioCopyMessage={props.setAudioCopyMessage} setCategoryCopyMessage={props.setCategoryCopyMessage} setImageCopyMessage={props.setImageCopyMessage} isPending={props.isPending} setSuccess={props.setSuccess} />

            <h3 className='mb-5 text-xl pl-2'>Delete audio by id</h3>
            {props.place === 'audioDelete' &&
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
                <input type="text" value={deleteAudioId} required onChange={(e) => { setDeleteAudioId(e.target.value); props.setVideoCopyMessage('Click to copy.'); props.setImageCopyMessage('Click to copy'); props.setSuccess(''); props.setCategoryCopyMessage('Click to copy'); props.setAudioCopyMessage('Click to copy.'); }} placeholder='Audio id' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-5 pb-2' />
                <div className='text-end mb-20'>
                    <input type="submit" value="Delete" className='cursor-pointer bg-slate-600 hover:bg-slate-400 p-2 pt-1 pb-1 rounded text-white' />
                </div>
            </form>

            <h3 className='mb-5 text-xl pl-2'>Update audio by id</h3>
            {props.place === 'audioUpdate' &&
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
                <input type="text" value={updateIdAudio} onChange={(e) => { setUpdateIdAudio(e.target.value); props.setVideoCopyMessage('Click to copy.'); props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setAudioCopyMessage('Click to copy.'); }} required placeholder='Id' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-3 pb-2' />
                <input type="text" value={updateUrlAudio} onChange={(e) => { setUpdateUrlAudio(e.target.value); props.setVideoCopyMessage('Click to copy.'); props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setAudioCopyMessage('Click to copy.'); }} placeholder='Url' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-3 pb-2' />
                <input type="text" value={updateTitleAudio} onChange={(e) => { setUpdateTitleAudio(e.target.value); props.setVideoCopyMessage('Click to copy.'); props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setAudioCopyMessage('Click to copy.'); }} placeholder='Title' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-5 pb-2' />
                <div className='text-end mb-20'>
                    <input type="submit" value="Update" className='cursor-pointer bg-slate-600 hover:bg-slate-400 p-2 pt-1 pb-1 rounded text-white' />
                </div>
            </form>
        </div>
    )
}

export default AudioUrl