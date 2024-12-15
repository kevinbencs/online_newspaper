"use client";

import { useState, MouseEvent, useRef, useEffect, TouchEvent } from "react";
import LatestNewsLink from "./latestnewslink";
import { latestNewsMainPage } from "@/actions/getlatestnews";


interface DataGet {
  title: string,
  date: string,
  id: string,
  category: string,
  paywall: boolean
}

const LatestNews = () => {
  const [isDown, setIsDown] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [isDragging, setDragging] = useState<boolean>(false);

  const [Articles, setArticles] = useState<DataGet[]>();
  const [err, setErr] = useState<string>('')

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
    const x = e.touches[0].pageX  - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 1;
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
  }



  useEffect(() => {
    latestNewsMainPage()
      .then((res) => {
        if(res.data) setArticles(res.data)
        if(res.error) setErr('Server error')
      })
  }, [])

  return (
    <div>

      {err !== '' &&
        <div>{err}</div>
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
          {Articles?.map(item => <LatestNewsLink Article={{header: item.title, paywall: item.paywall, date: item.date, link:`/${item.category}/${item.date.slice(0,4)}/${item.date.slice(5,7)}/ ${item.date.slice(8,10)}/${item.title.replaceAll(' ','_')}`}} key={item.id} isDragging={isDragging}/>)}
        </section>
      </div>
    </div>
  )
}

export default LatestNews