'use client'
import React, { SetStateAction, Dispatch, KeyboardEvent, useRef, useState, useEffect, MutableRefObject } from 'react'

type Dispatcher<T> = Dispatch<SetStateAction<T>>;

interface imageUrl {
    url: string,
    alt: string,
    detail: string,
    _id: string
}

const ImgItem = (props: {setImgLeft:Dispatcher<number>, setImageId:Dispatcher<string>, setImgAlt: Dispatcher<string>, setImgUrl: Dispatcher<string>, setImgTop: Dispatcher<number>, setOptClass: Dispatcher<string>, item: imageUrl, setOptInput: Dispatcher<string>, optRef:MutableRefObject<HTMLInputElement | null> }) => {
    const liRef = useRef<null | HTMLLIElement>(null);
    const [liTop, setLiTop] = useState<number>(0);
    const [liLeft, setLiLeft] = useState<number>(0);


    useEffect(() => {
        if(liRef.current){
            setLiLeft(liRef.current?.getBoundingClientRect().left)
            setLiTop(liRef.current?.getBoundingClientRect().top)
        }

    }, [liRef.current?.getBoundingClientRect().top, liRef.current?.getBoundingClientRect().left])

    const handleMouseEnter = (url: string, alt: string) => {
        props.setImgUrl(url);
        props.setImgAlt(alt);
        props.setImgTop(liTop);
        props.setImgLeft(liLeft);
    }

    const handleMouseLeave = () => {
        props.setImgAlt('');
        props.setImgUrl('');
    }

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
        <li ref={liRef} tabIndex={0} onFocus={() => props.setOptClass(`h-40`)} onBlur={() => props.setOptClass(`h-0`)} onMouseLeave={handleMouseLeave}
            onMouseEnter={() => handleMouseEnter(props.item.url, props.item.alt)} onClick={() => handleClick(props.item.detail)} onKeyDown={(e) => handleKeyDown(e, props.item.detail)}
            className='cursor-pointer hover:bg-base-100 input-bordered border-b-2 p-1 pl-2'>
            {props.item.detail}
        </li>)
}


export default ImgItem