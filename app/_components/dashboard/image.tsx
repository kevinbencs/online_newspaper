'use client'
import { addImageUrl } from '@/actions/addimageurl';
import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
import { ZodIssue } from 'zod';
import ImgOptgroup from '../optgroup/imgoptgropu';
import { deleteImageUrl } from '@/actions/deleteimageurl';
import { updateImageUrl } from '@/actions/updateimgeurl';

type Dispatcher<T> = Dispatch<SetStateAction<T>>

const ImageUrl = (props: {setVideoCopyMessage: Dispatcher<string>, setAudioCopyMessage: Dispatcher<string>, setCategoryCopyMessage: Dispatcher<string> ,imageCopyMessage: string, setImageCopyMessage: Dispatcher<string>, setSuccess: Dispatcher<string | undefined>, setError: Dispatcher<string | undefined>, setFailed: Dispatcher<ZodIssue[] | undefined>, isPending: boolean, startTransition: (callback: () => void) => void }) => {
    const [addAltImg, setAddAltImg] = useState<string>('');
    const [addUrlImg, setAddUrlImg] = useState<string>('');
    const [addDetailImg, setAddDetailImg] = useState<string>('');
    const [deleteImgId, setDeleteImgId] = useState<string>('');
    const [changed, setChanged] = useState<boolean>(false);
    const [updateIdImg, setUpdateIdImg] = useState<string>('');
    const [updateAltImg, setUpdateAltImg] = useState<string>('');
    const [updateUrlImg, setUpdateUrlImg] = useState<string>('');
    const [updateDetailImg, setUpdateDetailImg] = useState<string>('');

    const handleAddImage = (e: SyntheticEvent) => {
        props.setSuccess('');
        props.setError('');
        props.setFailed([]);
        e.preventDefault()
        props.startTransition(() => {
            addImageUrl({ alt: addAltImg, detail: addDetailImg, url: addUrlImg })
                .then(res => {
                    if (res.success) {
                        props.setSuccess(res.success);
                        setAddAltImg('');
                        setAddUrlImg('');
                        setAddDetailImg('');
                        setChanged(!changed);
                    }

                    props.setError(res.error);
                    props.setFailed(res.failed)
                })
        })

    }

    const handleDeleteImage = (e: SyntheticEvent) => {
        e.preventDefault();
        props.setSuccess('');
        props.setError('');
        props.setFailed([]);
        props.startTransition(() => {
            deleteImageUrl({ Id: deleteImgId })
                .then(res => {
                    if (res.success) {
                        props.setSuccess(res.success);
                        setDeleteImgId('');
                        setChanged(!changed);
                    }
                    props.setError(res.error);
                    props.setFailed(res.failed)
                })
        })
    }

    const handleUpdateImage = (e: SyntheticEvent) => {
        e.preventDefault();
        props.setSuccess('');
        props.setError('');
        props.setFailed([]);
        props.startTransition(() => {
            updateImageUrl({id: updateIdImg, alt: updateAltImg, detail: updateDetailImg, url: updateUrlImg})
            .then(res => {
                if(res.success){
                    props.setSuccess(res.success);
                    setUpdateAltImg('');
                    setUpdateDetailImg('');
                    setUpdateIdImg('');
                    setUpdateUrlImg('');
                    setChanged(!changed);
                }
                props.setFailed(res.failed);
                props.setError(res.error)
            })
        })
    }

    return (
        <div className='w-full'>
            <h2 className='text-3xl mb-12 pl-2 pb-2 border-b dark:border-white border-black font-bold'>Image</h2>
            <form onSubmit={handleAddImage}>
                <h3 className='mb-5 text-xl pl-2'>Add image url</h3>
                <input type="text" required value={addAltImg} onChange={(e) => {setAddAltImg(e.target.value); props.setSuccess('');props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setVideoCopyMessage('Click to copy.');props.setAudioCopyMessage('Click to copy.');}} placeholder='Alt' disabled={props.isPending} className='focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-3 pb-2' />
                <input type="text" required value={addUrlImg} onChange={(e) => {setAddUrlImg(e.target.value); props.setSuccess('');props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setVideoCopyMessage('Click to copy.');props.setAudioCopyMessage('Click to copy.');}} placeholder='Url' disabled={props.isPending} className='focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-3 pb-2' />
                <input type="text" required value={addDetailImg} onChange={(e) => {setAddDetailImg(e.target.value); props.setSuccess('');props.setImageCopyMessage('Click to copy'); props.setVideoCopyMessage('Click to copy.');props.setAudioCopyMessage('Click to copy.');props.setCategoryCopyMessage('Click to copy');}} placeholder='Detail' disabled={props.isPending} className='focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-5 pb-2' />
                <div className='text-end mb-20'>
                    <input type="submit" value="Add" className='cursor-pointer bg-slate-600 hover:bg-slate-400 p-2 pt-1 pb-1 rounded text-white' />
                </div>

            </form>

            <h3 className='mb-5 text-xl pl-2'>Search image id</h3>
            <ImgOptgroup setAudioCopyMessage={props.setAudioCopyMessage} setVideoCopyMessage={props.setVideoCopyMessage} setCategoryCopyMessage={props.setCategoryCopyMessage} setError={props.setError} setImageCopyMessage={props.setImageCopyMessage} isPending={props.isPending} imageCopyMessage={props.imageCopyMessage} setSuccess={props.setSuccess} changed={changed}/>

            <h3 className='mb-5 text-xl pl-2'>Delete image by id</h3>

            <form onSubmit={handleDeleteImage} className='mb-20'>
            <input type="text" value={deleteImgId} required onChange={(e) => {setDeleteImgId(e.target.value);props.setImageCopyMessage('Click to copy');props.setSuccess(''); props.setCategoryCopyMessage('Click to copy'); props.setVideoCopyMessage('Click to copy.');props.setAudioCopyMessage('Click to copy.');}} placeholder='Image id' disabled={props.isPending} className='focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-5 pb-2' />
            <div className='text-end mb-20'>
                    <input type="submit" value="Delete" className='cursor-pointer bg-slate-600 hover:bg-slate-400 p-2 pt-1 pb-1 rounded text-white' />
                </div>
            </form>

            <h3 className='mb-5 text-xl pl-2'>Update image by id</h3>
            <form onSubmit={handleUpdateImage}>
                <input type="text" value={updateIdImg} onChange={(e) => {setUpdateIdImg(e.target.value); props.setSuccess('');props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setVideoCopyMessage('Click to copy.');props.setAudioCopyMessage('Click to copy.');}} required placeholder='Id' disabled={props.isPending} className='focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-3 pb-2' />
                <input type="text" value={updateAltImg} onChange={(e) => {setUpdateAltImg(e.target.value); props.setSuccess('');props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setVideoCopyMessage('Click to copy.');props.setAudioCopyMessage('Click to copy.');}} placeholder='Alt' disabled={props.isPending} className='focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-3 pb-2' />
                <input type="text" value={updateUrlImg} onChange={(e) => {setUpdateUrlImg(e.target.value); props.setSuccess('');props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setVideoCopyMessage('Click to copy.');props.setAudioCopyMessage('Click to copy.');}} placeholder='Url' disabled={props.isPending} className='focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-3 pb-2' />
                <input type="text" value={updateDetailImg} onChange={(e) => {setUpdateDetailImg(e.target.value); props.setSuccess('');props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setVideoCopyMessage('Click to copy.');props.setAudioCopyMessage('Click to copy.');}} placeholder='Detail' disabled={props.isPending} className='focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-5 pb-2' />
                <div className='text-end mb-20'>
                    <input type="submit" value="Update" className='cursor-pointer bg-slate-600 hover:bg-slate-400 p-2 pt-1 pb-1 rounded text-white' />
                </div>

            </form>

        </div>
    )
}

export default ImageUrl