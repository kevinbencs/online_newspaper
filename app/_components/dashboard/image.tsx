'use client'

import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
import { ZodIssue } from 'zod';
import ImgOptgroup from '../optgroup/imgoptgropu';
import { v4 as uuid } from 'uuid';
import useSWR from 'swr'

type Dispatcher<T> = Dispatch<SetStateAction<T>>

interface imageUrl {
    url: string,
    _id: string,
    detail: string
}

const fetcher = async (url: string): Promise<{ success: imageUrl[] }> => {
    try {
        const res = await fetch(url);

        if (!res.ok) {
            const error = new Error('An error occurred while fetching the data.')
            error.cause = await res.json().then((data: { error: string }) => data.error)
            console.log(error.cause)

            throw error;
        }

        return res.json();
    } catch (error) {
        console.error(error);
        throw new Error('Api error')
    }

}

const ImageUrl = (props: { place: string, setPlace: Dispatcher<string>, success: string | undefined, error: string | undefined, failed: undefined | ZodIssue[], setVideoCopyMessage: Dispatcher<string>, setAudioCopyMessage: Dispatcher<string>, setCategoryCopyMessage: Dispatcher<string>, imageCopyMessage: string, setImageCopyMessage: Dispatcher<string>, setSuccess: Dispatcher<string | undefined>, setError: Dispatcher<string | undefined>, setFailed: Dispatcher<ZodIssue[] | undefined>, isPending: boolean, startTransition: (callback: () => void) => void }) => {

    const [addUrlImg, setAddUrlImg] = useState<string>('');
    const [addDetailImg, setAddDetailImg] = useState<string>('');
    const [deleteImgId, setDeleteImgId] = useState<string>('');
    const [changed, setChanged] = useState<boolean>(false);
    const [updateIdImg, setUpdateIdImg] = useState<string>('');
    const [updateUrlImg, setUpdateUrlImg] = useState<string>('');
    const [updateDetailImg, setUpdateDetailImg] = useState<string>('');

    const { data, error, isLoading, mutate } = useSWR<{ success: imageUrl[] }, Error>('/api/img', fetcher)

    if (error) props.setError(error.message)

    const handleAdd = (e: SyntheticEvent) => {
        props.setSuccess('');
        props.setError('');
        props.setFailed([]);
        e.preventDefault()
        props.startTransition(async () => {
            props.setPlace('imageAdd');

            try {
                const res = await fetch('/api/img', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ detail: addDetailImg, url: addUrlImg })
                })

                const resJson = await res.json() as { success: string | undefined, error: string | undefined, failed: ZodIssue[] | undefined };

                if (res.status === 200) {
                    props.setSuccess(resJson.success);
                    setAddUrlImg('');
                    setAddDetailImg('');
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
            props.setPlace('imageDelete');

            try {
                const res = await fetch('/api/img', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ Id: deleteImgId })
                })

                const resJson = await res.json() as { success: string | undefined, error: string | undefined, failed: ZodIssue[] | undefined };

                if (res.status === 200) {
                    props.setSuccess(resJson.success);
                    setDeleteImgId('');
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
            props.setPlace('imageUpdate');
            try {
                const res = await fetch('/api/img', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: updateIdImg, detail: updateDetailImg, url: updateUrlImg })
                })

                const resJson = await res.json() as { success: string | undefined, error: string | undefined, failed: ZodIssue[] | undefined };

                if (res.status === 200) {
                    props.setSuccess(resJson.success);
                    setUpdateDetailImg('');
                    setUpdateIdImg('');
                    setUpdateUrlImg('');
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
        <div className='w-full'>
            <h2 className='text-3xl mb-12 pl-2 pb-2 border-b dark:border-white border-black font-bold'>Image</h2>
            <h3 className='mb-5 text-xl pl-2'>Add image url</h3>
            {props.place === 'imageAdd' &&
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

                <input type="text" required value={addUrlImg} onChange={(e) => { setAddUrlImg(e.target.value); props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setVideoCopyMessage('Click to copy.'); props.setAudioCopyMessage('Click to copy.'); }} placeholder='Url' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-3 pb-2' />
                <input type="text" required value={addDetailImg} onChange={(e) => { setAddDetailImg(e.target.value); props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setVideoCopyMessage('Click to copy.'); props.setAudioCopyMessage('Click to copy.'); props.setCategoryCopyMessage('Click to copy'); }} placeholder='Detail' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-5 pb-2' />
                <div className='text-end mb-20'>
                    <input type="submit" value="Add" className='cursor-pointer bg-slate-600 hover:bg-slate-400 p-2 pt-1 pb-1 rounded text-white' />
                </div>

            </form>

            <h3 className='mb-5 text-xl pl-2'>Search image id</h3>
            <ImgOptgroup error={error} isLoading={isLoading} data={data?.success} setAudioCopyMessage={props.setAudioCopyMessage} setVideoCopyMessage={props.setVideoCopyMessage} setCategoryCopyMessage={props.setCategoryCopyMessage} setImageCopyMessage={props.setImageCopyMessage} isPending={props.isPending} imageCopyMessage={props.imageCopyMessage} setSuccess={props.setSuccess} changed={changed} />

            <h3 className='mb-5 text-xl pl-2'>Delete image by id</h3>
            {props.place === 'imageDelete' &&
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
                <input type="text" value={deleteImgId} required onChange={(e) => { setDeleteImgId(e.target.value); props.setImageCopyMessage('Click to copy'); props.setSuccess(''); props.setCategoryCopyMessage('Click to copy'); props.setVideoCopyMessage('Click to copy.'); props.setAudioCopyMessage('Click to copy.'); }} placeholder='Image id' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-5 pb-2' />
                <div className='text-end mb-20'>
                    <input type="submit" value="Delete" className='cursor-pointer bg-slate-600 hover:bg-slate-400 p-2 pt-1 pb-1 rounded text-white' />
                </div>
            </form>

            <h3 className='mb-5 text-xl pl-2'>Update image by id</h3>
            {props.place === 'imageUpdate' &&
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
                <input type="text" value={updateIdImg} onChange={(e) => { setUpdateIdImg(e.target.value); props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setVideoCopyMessage('Click to copy.'); props.setAudioCopyMessage('Click to copy.'); }} required placeholder='Id' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-3 pb-2' />
                <input type="text" value={updateUrlImg} onChange={(e) => { setUpdateUrlImg(e.target.value); props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setVideoCopyMessage('Click to copy.'); props.setAudioCopyMessage('Click to copy.'); }} placeholder='Url' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-3 pb-2' />
                <input type="text" value={updateDetailImg} onChange={(e) => { setUpdateDetailImg(e.target.value); props.setSuccess(''); props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setVideoCopyMessage('Click to copy.'); props.setAudioCopyMessage('Click to copy.'); }} placeholder='Detail' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-5 pb-2' />
                <div className='text-end mb-20'>
                    <input type="submit" value="Update" className='cursor-pointer bg-slate-600 hover:bg-slate-400 p-2 pt-1 pb-1 rounded text-white' />
                </div>

            </form>

        </div>
    )
}

export default ImageUrl