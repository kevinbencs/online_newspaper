"use client";

import { useState, MouseEvent, useRef, useEffect, TouchEvent } from "react";
import LatestNewsLink from "./latestnewslink";


interface DataGet {
  header: string,
  date: string,
  id: string
}

const LatestNews = () => {
  const [isDown, setIsDown] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [isDragging, setDragging] = useState<boolean>(false);

  const adadad: DataGet[] = [
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyseT ysg ysg se gsg',
      date: '2024-08-22T14:30:00Z',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgposydjviosgjiesgksegjvsp'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      date: '2024-08-20T14:30:00Z',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgposydjviosgjiesgksegjvspaewfsaefgseagfvwsservde'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      date: '2024-08-20T14:30:00Z',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgwegwegposydjviosgjiesgksegjvwqefwegfsp'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      date: '2024-08-20T14:30:00Z',
      id: 'asfeasgfesjoesiogegjwegfwegwegwegvfdsvregergsaEWAEGWpsoegjspoejgposydjviosgjiesgksegjvsp'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      date: '2024-08-20T14:30:00Z',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgposydjviosgjiesgksegjvspasefpojsegjsepokgvsepojgvisoerojfpoasej'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      date: '2024-08-20T14:30:00Z',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgposydjviosgjiesgkawélfjawoipfjawpofjaifhioawefjaopwefsegjvsp'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      date: '2024-08-20T14:30:00Z',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgafjaioewfjapowfwifhnaoiuwfguiwfgfeposydjviosgjiesgksegjvsp'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      date: '2024-08-20T14:30:00Z',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgpoalkwefiowfjapowfjpoawjfawiojfawwfawfwasydjviosgjiesgksegjvsp'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      date: '2024-08-20T14:30:00Z',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgposydjviosgjiesgksegjvsawfjaiwoefjaiwofjapowfjioawjioawioahfwhhhhhhhhp'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      date: '2024-08-20T14:30:00Z',
      id: 'asfeasgpoawjfioawfjaoipwfjpoyclyxjfciofhuwefzhweafaweffesjoesiogegjpsoegjspoejgposydjviosgjiesgksegjvsp'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      date: '2024-08-20T14:30:00Z',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgwafawfscyfcefgregthztzuhdhgdhgdfposydjviosgjiesgksegjvsp'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      date: '2024-08-20T14:30:00Z',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgposydjviosgjiesgksegjvspafjoaiowpfjsxyxfyfysdxcyycyxcyxyxyxy'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      date: '2024-08-20T14:30:00Z',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgpoysjkfsjjfjjjjjjjysícgbfhzygfhszagfhsfsydjviosgjiesgksegjvsp'
    },
    
  ]

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



  /*useEffect(() => {
    fetch('lateastnews')
      .then(data => data.json())
      .then(res => {
        if (res.status === 'success') setArticles(res.data);
        else setErr(res.error);
      })
      .catch(err => {
        setErr('Something has gone wrong');
      })
  }, [])*/

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
          {adadad.map(ads => <LatestNewsLink Article={{header: ads.header,date: ads.date, link:`/article/${ads.header.replaceAll(' ','-')}`}} key={ads.id} isDragging={isDragging}/>)}
        </section>
      </div>
    </div>
  )
}

export default LatestNews