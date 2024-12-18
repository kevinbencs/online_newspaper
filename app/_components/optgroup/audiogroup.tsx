'use client'

import { useRef, useState, ChangeEvent, useEffect, Dispatch, SetStateAction } from 'react';
import AudioItem from './audioitem';


interface audUrl {
    url: string,
    title: string,
    _id: string
}

type Dispatcher<T> = Dispatch<SetStateAction<T>>

const AudioOptgroup = (props: {changed: boolean ,isLoading: boolean,error: Error | undefined, data: audUrl[] | undefined, setVideoCopyMessage: Dispatcher<string>, setAudioCopyMessage: Dispatcher<string>, audioCopyMessage: string, setCategoryCopyMessage: Dispatcher<string>, setImageCopyMessage: Dispatcher<string>, setSuccess: Dispatch<SetStateAction<string | undefined>>, isPending: boolean }) => {
    const [optInput, setOptInput] = useState<string>('');
    const [optClass, setOptClass] = useState<string>('h-0')
    const [audioId, setAudioId] = useState<string>('');
    const optRef = useRef<null | HTMLInputElement>(null);
    const ulRef = useRef<null | HTMLUListElement>(null)

    useEffect(() => {
        setOptInput('');
        setAudioId('');
    },[props.changed])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOptInput(e.target.value)
        setAudioId('');
        props.setSuccess('');
        props.setImageCopyMessage('Click to copy.');
        props.setCategoryCopyMessage('Click to copy.');
        props.setAudioCopyMessage('Click to copy.');
        props.setVideoCopyMessage('Click to copy.');
    };



    const handleFilter = (arrayItem: audUrl) => {
        return arrayItem.title.toLowerCase().indexOf(optInput.toLowerCase()) > -1;
    }

    const handleClick = () => {
        if (audioId !== '') {
            navigator.clipboard.writeText(audioId)
                .then(() => {
                    props.setImageCopyMessage('Click to copy.');
                    props.setCategoryCopyMessage('Click to copy.');
                    props.setAudioCopyMessage('Id is copied.');
                    props.setVideoCopyMessage('Click to copy.');
                })
                .catch(err => {
                    props.setImageCopyMessage('Click to copy.');
                    props.setCategoryCopyMessage('Click to copy.');
                    props.setAudioCopyMessage('Something went wrong.');
                    props.setVideoCopyMessage('Click to copy.');
                    console.error("Error", err);
                });
        }
    }

    

    return (
        <>
            
            <label className='relative w-full mb-4 block'>
                <input ref={optRef} type="text" name='search_image' onFocus={() => setOptClass('h-52')} onBlur={() => {setOptClass('h-0');}} className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2' placeholder='Audio' value={optInput} onChange={handleChange} disabled={props.isPending} />
                <ul ref={ulRef} className={`${optClass} overflow-y-scroll absolute sidebar z-10  w-[100%] dark:bg-neutral bg-base-200 duration-100 `} onFocus={() => setOptClass('h-52')}  onBlur={() => {setOptClass('h-0');}}>
                    {props.error && <li className='text-red-700'>{props.error.message}</li>}
                    {props.isLoading && <li>...Loading</li>}
                    {props.data && props.data.filter(handleFilter).map((item) => <AudioItem ulRef={ulRef} optClass={optClass} setAudioId={setAudioId} key={item._id} item={item} setOptClass={setOptClass} setOptInput={setOptInput} optRef={optRef} />
                    )}
                </ul>
            </label>
            <div>
                <div className='text-end text-xs mb-1'>
                    {props.audioCopyMessage}
                </div>
                <div className='relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={handleClick} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 absolute right-0 cursor-pointer" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                    </svg>
                    <input type="text" placeholder='id' value={audioId} readOnly className={` dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 min-h-[26px] mb-20 `} />

                </div>
            </div>

        </>

    )
}

export default AudioOptgroup