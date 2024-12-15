'use client'

import Link from 'next/link'
import React, { useEffect, useState, MouseEvent } from 'react';
import { IoLockClosed } from 'react-icons/io5';

interface Data {
  header: string,
  date: string,
  link: string,
  paywall: boolean
}

const Month: string[] =[
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'okt',
  'nov',
  'dec'
];

const LatestNewsLink = (props: { Article: Data, isDragging: boolean }) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    function updateTime() {
      const dateTime = new Date(props.Article.date);
      const now = new Date();
      const secondsPast = Math.floor((Number(now) - Number(dateTime)) / 1000);
      console.log(now)
      console.log(new Date())
      if (secondsPast < 60) {setTime(`${secondsPast} seconds ago`);}
      else if (secondsPast < 3600) {setTime(`${Math.floor(secondsPast / 60)} minutes ago`)}
      else if (dateTime.getDay() === now.getDay()) {setTime(`Today ${dateTime.getHours()}:${dateTime.getMinutes()}`)}
      else {
        
        let month: number | string = dateTime.getMonth();
        let day: number | string = dateTime.getDay();
        month = Month[month];
        if (day < 10) day = '0' + day;

        setTime(`${month}.${day}.-${dateTime.getHours()}:${dateTime.getMinutes()}`);
        return () => clearInterval(IntervalId);
      }
    }

    updateTime()
    const IntervalId = setTimeout(updateTime, 60000);

    return () => clearInterval(IntervalId);

  }, [])

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (props.isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  }


  return (
    <Link href={props.Article.link} className='min-w-64 block select-none border-r' draggable='false' onClick={handleClick}>
      
      <div className='flex gap-1 items-center mb-1'>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="8" height="8" viewBox="0 0 50 50" className='fill-slate-600 dark:fill-slate-500 mr-1'>
          <path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M25,28c-0.462,0-0.895-0.113-1.286-0.3 l-6.007,6.007C17.512,33.902,17.256,34,17,34s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l6.007-6.007 C22.113,25.895,22,25.462,22,25c0-1.304,0.837-2.403,2-2.816V8c0-0.553,0.447-1,1-1s1,0.447,1,1v14.184c1.163,0.413,2,1.512,2,2.816 C28,26.657,26.657,28,25,28z"></path>
        </svg>
      <div className='text-xs dark:text-slate-400 text-slate-500 w-[100%]'>{time}</div>
      </div>


      <h2 className='text-sm font-bold'>{props.Article.header.slice(0, 56)}</h2>
      <div> <IoLockClosed/> </div>
      <div className='w-[60%] h-4 relative bg-gradient-to-r from-transparent via-base-100 to-base-100   -top-4 left-[25%]'></div>
    </Link>
  )
}

export default LatestNewsLink