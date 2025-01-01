'use client'

import { ChangeEvent, Dispatch, SetStateAction } from 'react'

const CarrierItem = (props: {  title: string, id: string, setDeleteIds: Dispatch<SetStateAction<string[]>>, deleteIds: string[] }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? props.setDeleteIds([...props.deleteIds, props.id]) : props.setDeleteIds(props.deleteIds.filter((item) => item !== props.id));
    }

    return (
        <li className='hover:bg-slate-400 input-bordered border-b-2 p-1 pl-2 dark:hover:text-white w-full'>
            <label className='w-full flex cursor-pointer'>
                <input type="checkbox" name="art_check" className='mr-2' onChange={handleChange} />
                <div className='w-full pr-2'>
                {props.title}
                </div>
            </label>
        </li>
    )
}

export default CarrierItem