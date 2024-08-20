"use client";

import Link from "next/link";
import { useState, MouseEvent, useRef, useEffect } from "react";

interface Data {
  header: string,
  parag: string
}

const LatestNews = () => {
  const [isDown, setIsDown] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const [Articles, setArticles] = useState<Data[]>();
  const [err, setErr] = useState<string>('')

  const handleMouseDown = (e: MouseEvent<HTMLElement>) => {
    setIsDown(true);
    setStartX(e.pageX - scrollContainerRef.current!.offsetLeft);
    setScrollLeft(scrollContainerRef.current!.scrollLeft);
    scrollContainerRef.current!.style.cursor = 'grabbing';
  }
  const handleMouseUp = () => {
    setIsDown(false);
    scrollContainerRef.current!.style.cursor = 'grab';
  }

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 1;
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
  }
  const handleMouseLeave = () => {
    setIsDown(false);
    scrollContainerRef.current!.style.cursor = 'grab';
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
    <section>

      {err !== '' &&
        <div>{err}</div>
      }
      <h2>Latest</h2>
      <div className=" overflow-x-hidden overflow-y-hidden cursor-pointer" onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} ref={scrollContainerRef}>
        <section className="flex gap-8 mb-10   flex-nowrap  no-scrollbar">
          <Link href='/' className="text-xl">Newest</Link>
          <Link href='/' className="text-xl">Newest</Link>
          <Link href='/' className="text-xl">Newest</Link>
          <Link href='/' className="text-xl">Newest</Link>
          <Link href='/' className="text-xl">Newest</Link>
          <Link href='/' className="text-xl">Newest</Link>
          <Link href='/' className="text-xl">Newest</Link>
          <Link href='/' className="text-xl">Newest</Link>
          <Link href='/' className="text-xl">Newest</Link>
          <Link href='/' className="text-xl">Newest</Link>
          <Link href='/' className="text-xl">Newest</Link>
          <Link href='/' className="text-xl">Newest</Link>
        </section>
      </div>
    </section>
  )
}

export default LatestNews