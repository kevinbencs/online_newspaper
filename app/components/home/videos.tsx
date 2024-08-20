'use client'

import React, { useEffect, useState } from 'react'
import Stop from '../../image/stop.png'
import Image from "next/image";
import Link from 'next/link';


interface Data {
  image: string,
  alt: string,
  header: string,
  parag: string
}
const Videos = () => {
  const [err, setErr] = useState<string>('');
  const [Articles, setArticles] = useState<Data[]>();

  /*useEffect(() => {
    fetch('/videos')
      .then(data => data.json())
      .then(res => {
        if(res.status === 'success') setArticles(res.data);
      else setErr(res.error);
      })
      .catch(err => {
        setErr('Something has gone wrong')
      })
  }, [])*/
  return (
    <>
      {err !== '' &&
        <div>{err}</div>
      }
      <section>
        <h2>Videos</h2>

        <div className='md:flex md:gap-4 mb-5 '>
          <Link href='/' className='mb-10 block'>
            <Image src={Stop} alt='Stop' />
            <article>
              <h2>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-10 block'>
            <Image src={Stop} alt='Stop' />
            <article>
              <h2>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>
        <div className='lg:flex md:gap-4 mb-20 md:grid md:grid-cols-2'>
          <div>
          <Link href='/' className='mb-10 block'>
            <Image src={Stop} alt='Stop' />
            <article>
              <h2>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-10 block'>
            <Image src={Stop} alt='Stop' />
            <article>
              <h2>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-10 block'>
            <Image src={Stop} alt='Stop' />
            <article>
              <h2>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          </div>
          <div>
          <Link href='/' className='mb-10 block'>
            <Image src={Stop} alt='Stop' />
            <article>
              <h2>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-10 block'>
            <Image src={Stop} alt='Stop' />
            <article>
              <h2>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-10 block'>
            <Image src={Stop} alt='Stop' />
            <article>
              <h2>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          </div>
          <div>
          <Link href='/' className='mb-10 block'>
            <Image src={Stop} alt='Stop' />
            <article>
              <h2>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-10 block'>
            <Image src={Stop} alt='Stop' />
            <article>
              <h2>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-10 block'>
            <article>
              <h2>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          </div>
          <div>
          <Link href='/' className='mb-10 block'>
            <Image src={Stop} alt='Stop' />
            <article>
              <h2>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-10 block'>
            <article>
              <h2>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-10 block'>
            <article>
              <h2>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          </div>
        </div>


      </section>
    </>

  )
}

export default Videos