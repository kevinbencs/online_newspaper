'use client'

import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
import { ZodIssue } from 'zod';
import CategoryOptgroup from '../optgroup/categoryoptgroup';
import { addNewCategory } from '@/actions/addcategory';
import { deleteCategory } from '@/actions/deletecategory';
import { updateCategoryDetail } from '@/actions/updatecategory';
import { v4 as uuid } from 'uuid';

type Dispatcher<T> = Dispatch<SetStateAction<T>>

const CategoryUrl = (props: {place: string, setPlace: Dispatcher<string>, success: string | undefined, error: string | undefined, failed: undefined | ZodIssue[],setVideoCopyMessage: Dispatcher<string>, setAudioCopyMessage: Dispatcher<string>, setCategoryCopyMessage: Dispatcher<string> ,categoryCopyMessage: string, setImageCopyMessage: Dispatcher<string>, setSuccess: Dispatcher<string | undefined>, setError: Dispatcher<string | undefined>, setFailed: Dispatcher<ZodIssue[] | undefined>, isPending: boolean, startTransition: (callback: () => void) => void }) => {


    const [addCategory, setAddCategory] = useState<string>('');
    const [deleteCategoryId, setDeleteCategoryId] = useState<string>('');
    const [changed, setChanged] = useState<boolean>(false);
    const [updateIdCategory, setUpdateIdCategory] = useState<string>('');
    const [updateCategory, setUpdateCategory] = useState<string>('');

    const handleAdd = (e: SyntheticEvent) => {
        props.setImageCopyMessage('Click to copy');
        props.setSuccess('');
        props.setError('');
        props.setFailed([]);
        e.preventDefault()
        props.startTransition(() => {
            addNewCategory ({  name: addCategory,  })
                .then(res => {
                    props.setPlace('categoryAdd');
                    if (res.success) {
                        props.setSuccess(res.success);
                        setAddCategory('');
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
            deleteCategory({ Id: deleteCategoryId })
                .then(res => {
                    props.setPlace('categoryDelete');
                    if (res.success) {
                        props.setSuccess(res.success);
                        setDeleteCategoryId('');
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
            updateCategoryDetail({id: updateIdCategory,  name: updateCategory, })
            .then(res => {
                props.setPlace('categoryUpdate');
                if(res.success){
                    props.setSuccess(res.success);
                    setUpdateCategory('');
                    setUpdateIdCategory('');
                    setChanged(!changed);
                }
                props.setFailed(res.failed);
                props.setError(res.error)
            })
        })
    }

    return (
        <div className='w-full'>
            <h2 className='text-3xl mb-12 pl-2 pb-2 border-b dark:border-white border-black font-bold'>Category</h2>
            <h3 className='mb-5 text-xl pl-2'>Add category</h3>
            {props.place === 'categoryAdd' &&
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
                
                <input type="text" required value={addCategory} onChange={(e) => {setAddCategory(e.target.value); props.setSuccess('');props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setVideoCopyMessage('Click to copy.');props.setAudioCopyMessage('Click to copy.');}} placeholder='Category' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-5 pb-2' />
                <div className='text-end mb-20'>
                    <input type="submit" value="Add" className='cursor-pointer bg-slate-600 hover:bg-slate-400 p-2 pt-1 pb-1 rounded text-white' />
                </div>

            </form>

            <h3 className='mb-5 text-xl pl-2'>Search category</h3>
            <CategoryOptgroup setAudioCopyMessage={props.setAudioCopyMessage} setVideoCopyMessage={props.setVideoCopyMessage} setCategoryCopyMessage={props.setCategoryCopyMessage} setError={props.setError} setImageCopyMessage={props.setImageCopyMessage} isPending={props.isPending} categoryCopyMessage={props.categoryCopyMessage} setSuccess={props.setSuccess} changed={changed}/>

            <h3 className='mb-5 text-xl pl-2'>Delete category by id</h3>
            {props.place === 'categoryDelete' &&
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
            <input type="text" value={deleteCategoryId} required onChange={(e) => {setDeleteCategoryId(e.target.value);props.setSuccess('');props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setVideoCopyMessage('Click to copy.');props.setAudioCopyMessage('Click to copy.');}} placeholder='Category id' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-5 pb-2' />
            <div className='text-end mb-20'>
                    <input type="submit" value="Delete" className='cursor-pointer bg-slate-600 hover:bg-slate-400 p-2 pt-1 pb-1 rounded text-white' />
                </div>
            </form>

            <h3 className='mb-5 text-xl pl-2'>Update category by id</h3>
            {props.place === 'categoryUpdate' &&
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
                <input type="text" value={updateIdCategory} onChange={(e) => {setUpdateIdCategory(e.target.value); props.setSuccess('');;props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setVideoCopyMessage('Click to copy.');props.setAudioCopyMessage('Click to copy.')}} required placeholder='Id' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-3 pb-2' />
                <input type="text" value={updateCategory} onChange={(e) => {setUpdateCategory(e.target.value); props.setSuccess('');props.setImageCopyMessage('Click to copy'); props.setCategoryCopyMessage('Click to copy'); props.setVideoCopyMessage('Click to copy.');props.setAudioCopyMessage('Click to copy.');}} placeholder='New category' disabled={props.isPending} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-5 pb-2' />
                <div className='text-end mb-20'>
                    <input type="submit" value="Update" className='cursor-pointer bg-slate-600 hover:bg-slate-400 p-2 pt-1 pb-1 rounded text-white' />
                </div>

            </form>

        </div>
    )
}

export default CategoryUrl