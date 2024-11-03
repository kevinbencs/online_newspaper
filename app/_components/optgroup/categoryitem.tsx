'use client'

import React, { SetStateAction, Dispatch, KeyboardEvent, useRef, MutableRefObject } from 'react'

type Dispatcher<T> = Dispatch<SetStateAction<T>>;

interface Category {

    name: string,
    _id: string
}

const CategoryItem = (props: { setImageId:Dispatcher<string>,    setOptClass: Dispatcher<string>, item: Category, setOptInput: Dispatcher<string>, optRef:MutableRefObject<HTMLInputElement | null> }) => {
    const liRef = useRef<null | HTMLLIElement>(null);


    const handleClick = (s: string) => {
        props.setOptInput(s);
        props.setImageId(props.item._id)
        setTimeout(() => {
            props.optRef.current?.blur();
            liRef.current?.blur();
        }, 0);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>, s: string) => {
        if (e.code === 'Enter' || e.code === 'Space') handleClick(s);
    }


    return (
        <li ref={liRef} tabIndex={0} onFocus={() => props.setOptClass(`h-40`)} onBlur={() => props.setOptClass(`h-0`)}
             onClick={() => handleClick(props.item.name)} onKeyDown={(e) => handleKeyDown(e, props.item.name)}
            className='cursor-pointer hover:bg-base-100 input-bordered border-b-2 p-1 pl-2'>
            {props.item.name}
        </li>)
}


export default CategoryItem