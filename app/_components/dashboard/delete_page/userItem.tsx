'use client'

import { ChangeEvent, Dispatch, SetStateAction } from 'react'

const UserItem = (props: { name: string, email: string | undefined, id: string, setDeleteIds: Dispatch<SetStateAction<string[]>>, deleteIds: string[] }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? props.setDeleteIds([...props.deleteIds, props.id]) : props.setDeleteIds(props.deleteIds.filter((item) => item !== props.id));
    }

    return (
        <li className='hover:bg-slate-400 input-bordered border-b-2 p-1 pl-2 dark:hover:text-white'>
            <label className='w-full flex cursor-pointer'>
                <input type="checkbox" name="art_check" className='mr-2' onChange={handleChange} />
                <div className='flex justify-between w-full pr-2'>
                    <div>{props.name}</div>
                    <div>{props.email}</div>
                </div>

            </label>
        </li>
    )
}

export default UserItem