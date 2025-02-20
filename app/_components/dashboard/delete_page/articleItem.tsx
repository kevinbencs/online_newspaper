'use client'

import { ChangeEvent, Dispatch, SetStateAction } from 'react'

const ArticleItem = (props: { title: string, date: string, category: string, id: number, setDeleteIds: Dispatch<SetStateAction<number[]>>, deleteIds: number[] }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? props.setDeleteIds([...props.deleteIds, props.id]) : props.setDeleteIds(props.deleteIds.filter((item) => item !== props.id));
  }

  return (
    <li className='hover:bg-slate-400 input-bordered border-b-2 p-1 pl-2 dark:hover:text-white relative'>
      <label className='w-full flex cursor-pointer'>
        <input type="checkbox" name="art_check" className='mr-2' onChange={handleChange} />
        <a href={`/${props.category.toLowerCase()}/${props.date.slice(0,4)}/${props.date.slice(6,8)}/${props.date.slice(10,12)}/${props.title.replaceAll(' ','_').replace('?','nb20')}`} target='_blank' className='hover:text-white dark:hover:text-black '>{props.title}</a>
      </label>
    </li>
  )
}

export default ArticleItem