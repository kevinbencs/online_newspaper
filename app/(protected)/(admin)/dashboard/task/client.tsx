'use client'

import TaskItem from '@/app/_components/taskitem';
import { SyntheticEvent, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';
import { useSocket } from '@/app/_components/socketProvider';


interface TaskType {
    _id: string,
    name: string,
    task: string
}

const Client = (props:{tasks: TaskType[] | undefined, error: string | undefined}) => {
    const [tasks, setTasks] = useState<TaskType[] | undefined>(props.tasks);
    const [firstLoad,setFirstLoad] = useState<boolean>(true);
    const [inputValue, setINputValue] = useState<string>('');
    const [error, setError] = useState<string | undefined>(props.error);
    const {task} = useSocket();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('/api/task',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({task: inputValue})
            });

            const resJSON = await res.json() as {error: string | undefined, success: string | undefined};

            if(res.status === 200){
                setINputValue('');
            }
            else{
                setError(resJSON.error)
            }

        } catch (error) {
            console.log(error)
            setError('Error, please try again')
        }
    }



    useEffect(() => {
        if(firstLoad){
            setFirstLoad(false);
        }
        else{
            setTasks(task)
        }
    },[task])

    return (
        <div className='flex justify-center w-full'>
            <div className='lg:w-[680px] w-full'>
                <h1 className='text-center mb-10 text-3xl'>Tasks</h1>
                {error &&
                    <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 rounded-lg mb-5 text-center  p-2'>
                        {error}
                    </div>
                }
                <form onSubmit={handleSubmit}>
                    <label htmlFor="task" className='pl-2 mb-2 block text-sm'> Add new task</label>
                    <div className='flex justify-end items-center'>
                        <input type="text" name="task" id='task' className='w-full dark:bg-[#121212] h-10 pl-2 p-1 rounded-lg border border-gray-700' value={inputValue} onChange={(e) => setINputValue(e.target.value)} />
                        <button className='absolute mr-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                            </svg>
                        </button>
                    </div>
                </form>
                <div className='mt-10'>
                    {tasks && tasks.map((item: TaskType) => <TaskItem name={item.name} task={item.task} id={item._id}  key={uuid()} setError={setError} />)}
                </div>
            </div>
        </div>
    )
}

export default Client