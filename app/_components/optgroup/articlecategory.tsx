'use client'
import { Dispatch, SetStateAction, useRef, useState, ChangeEvent, } from 'react'
import OptItem from './optitemwithoutfilter';
import useSWR from 'swr'

interface Cat {
    _id: string,
    name: string
  }

const fetcher = async (url:string): Promise<{success:Cat[]}> => {
  const res = await fetch(url);

  if(!res.ok){
    const error = new Error();
    error.cause = res.json().then((data: {error: string}) => data.error)
    console.error(error.cause);
    throw error;
  }

  return res.json()
}

const ArticleCategoryGroup = (props: { optInput: string, setOptInput: Dispatch<SetStateAction<string>>}) => {
    const [optClass, setOptClass] = useState<string>('h-0')
    const optRef = useRef<null | HTMLInputElement>(null);
    const ulRef = useRef<null | HTMLUListElement>(null);

    const {data, error, isLoading} = useSWR<{success:Cat[]}, Error>('/api/category', fetcher);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (data && data.success.filter((arrayItem) => arrayItem.name.toLocaleLowerCase().indexOf(e.target.value.toLocaleLowerCase()) > - 1).length > 0) {
            props.setOptInput(e.target.value);
        }
    };


    const selectFilter = (arrayItem: { _id: string, name: string }) => {
        return arrayItem.name.toLowerCase().indexOf(props.optInput.toLowerCase()) > -1;
    }

    return (
        <label className='lg:w-[30%] w-full  relative'>
            <input ref={optRef} type="text" name='search_audio' onFocus={() => setOptClass('h-36')} onBlur={() => setOptClass('h-0')} className='focus-within:outline-none dark:text-white input-bordered border-b-2 block w-full bg-transparent pl-2' placeholder='Select category' value={props.optInput} onChange={handleChange} />
            <ul className={`${optClass} overflow-y-scroll sidebar z-10 absolute w-[100%] dark:bg-neutral bg-base-200 duration-100 `} ref={ulRef} onBlur={() => setOptClass(`h-0`)}>
                {error && <div className='text-red-700'>{error.message}</div>}
                {isLoading && <div>...Loading</div>}
                {(data && data.success) && data.success.filter(selectFilter).map((item) => <OptItem item={{id:item._id, text:item.name}} key={item._id} optRef={optRef} ulRef={ulRef} setOptInput={props.setOptInput} setOptClass={setOptClass} />)}
            </ul>
        </label>
    )
}

export default ArticleCategoryGroup