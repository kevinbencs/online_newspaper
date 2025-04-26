"use client";

import { useState, MouseEvent, useRef, useEffect, TouchEvent } from "react";
import LatestNewsLink from "./latestnewslink";
import { latestNewsMainPage } from "@/actions/getlatestnews";


interface DataMainPage {
  id: string,
  title: string,
  date: string,
  time: string,
  category: string,
  paywall: boolean
}



const LatestNews = (props: {
  res: {
    error: string;
    data?: undefined;
  } | {
    data: DataMainPage[];
    error?: undefined;
  }
}) => {
  const [isDown, setIsDown] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [isDragging, setDragging] = useState<boolean>(false);
  const [data, setData] = useState<DataMainPage[] | undefined>(props.res.data)
  const [error, setError] = useState<string | undefined>(props.res.error);


  useEffect(() => {
    const id = setInterval(() => {
      latestNewsMainPage()
      .then((res) => {
        if(res.error){
          console.log(error)
        }
        if(res.data){
          setError('')
          setData(res.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }, 5000)

    return () => clearInterval(id)
  })



  const handleMouseDown = (e: MouseEvent<HTMLElement>) => {
    setIsDown(true);
    setDragging(false);
    setStartX(e.pageX - scrollContainerRef.current!.offsetLeft);
    setScrollLeft(scrollContainerRef.current!.scrollLeft);
    scrollContainerRef.current!.style.cursor = 'grabbing';
  }
  const handleMouseUp = () => {
    setIsDown(false);
    const timeOut = setTimeout(() => {
      setDragging(false);
    }, 10);
    clearTimeout(timeOut);
    scrollContainerRef.current!.style.cursor = 'grab';

  }

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!isDown) return;
    setDragging(true);
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 1;
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
  }
  const handleMouseLeave = () => {
    setIsDown(false);
    setDragging(false);
    scrollContainerRef.current!.style.cursor = 'grab';
  }



  const handleTouchStart = (e: TouchEvent<HTMLElement>) => {
    setIsDown(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current!.offsetLeft);
    setScrollLeft(scrollContainerRef.current!.scrollLeft);
    scrollContainerRef.current!.style.cursor = 'grabbing';
  }
  const handleTouchEnd = (e: TouchEvent<HTMLElement>) => {
    setIsDown(false);
    scrollContainerRef.current!.style.cursor = 'grab';
  }

  const handleTouchMove = (e: TouchEvent<HTMLElement>) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 1;
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
  }


  return (
    <div>

      {(error !== '' && error !== undefined)&&
        <div>{error}</div>
      }

      <div className=" overflow-x-hidden overflow-y-hidden cursor-pointer mb-5 ml-5 sm:ml-0"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        ref={scrollContainerRef}>
        <section className="flex gap-8  mb-5 flex-nowrap  no-scrollbar">
          {data && data?.map(item => <LatestNewsLink Article={{ header: item.title, paywall: item.paywall, date: item.date, link: '/'+item.category.toLowerCase().replaceAll(' ', '').replace('&', '_')+'/'+item.date.slice(0, 4)+'/'+item.date.slice(5, 7)+'/'+item.date.slice(8, 10)+'/'+item.title.replaceAll(' ', '_').replace('?','nb20') }} key={item.id} isDragging={isDragging} />)}
        </section>
      </div>
    </div>
  )
}

export default LatestNews