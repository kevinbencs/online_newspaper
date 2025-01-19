'use client'

import { AddName } from '@/actions/addnametask'
import { DeleteTask } from '@/actions/daletetask'
import React, { Dispatch, SetStateAction } from 'react'

const TaskItem = (props: { name: string, id: string, task: string, setError: Dispatch<SetStateAction<string>> }) => {
    const handleDelete = async () => {
        props.setError('');
        DeleteTask({id: props.id})
        .then(val => {
            if(val.error) props.setError(val.error)
        })
    }

    const changeName = () => {
        props.setError('');
        console.log(props.id)
        AddName({id: props.id})
        .then(val => {
            if(val.error) props.setError(val.error)
        })
    }
    return (
        <div className=' bg-gray-200 mb-2 text-black rounded-lg shadow-3xl shadow-black dark:shadow-none dark:bg-slate-700 dark:text-white'>
            <div className='w-full pl-10 p-5'>
                <p className=' w-full mb-5'>{props.task}</p>
                <div className='flex gap-2 items-center'>
                    <button onClick={changeName} className='bg-slate-500 p-1 pl-2 pr-2 hover:bg-slate-400 text-white'>{props.name && props.name} {!props.name && 'Do it?'} </button>
                    <button className='bg-red-700 p-1 text-white hover:bg-red-500' onClick={handleDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskItem