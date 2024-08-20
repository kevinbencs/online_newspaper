'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import Stop from '../../image/stop.png'

interface Data {
  image: string,
  alt: string,
  header: string,
  parag: string
}
const MainNews = () => {
  const [Articles, setArticles] = useState<Data[]>();
  const [err, setErr] = useState<string>('')

  /*useEffect(() => {
    fetch('/')
    .then(data => data.json())
    .then(res => {
      if(res.status === 'success') setArticles(res.data);
      else setErr(res.error);
    })
    .catch(err => {
      setErr('Something has gone wrong');
    })
  },[])*/
  return (

    <>
      {err !== '' &&
        <div>{err}</div>
      }
      <div className='md:flex md:gap-4 mb-20 lg:flex-nowrap md:flex-wrap'>
        <div className='lg:w-[584px] md:w-[100%]'>
          <Link href='/' className='mb-5 block'>
            <Image src={Stop} alt='Stop' />
            <article>
              <h2>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <article>
              <h2>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <article>
              <h2>segseggsegseg seg segseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>
        <div className='lg:w-[292px] md:w-[calc(50%-12px)]'>
          <Link href='/' className='mb-5 block'>
            <Image src={Stop} alt='Stop' />
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>
        <div className='lg:w-[292px] md:w-[calc(50%-12px)]'>
          <Link href='/' className='mb-5 block'>
            <Image src={Stop} alt='Stop' />
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>
      </div>


      <div className='md:flex md:gap-4 mb-12'>
        <div>
          <Link href='/' className='mb-5 block'>
            <Image src={Stop} alt='Stop' />
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <Image src={Stop} alt='Stop' />
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>
        <div>
          <Link href='/' className='mb-5 block'>
            <Image src={Stop} alt='Stop' />
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>
        <div>
          <Link href='/' className='mb-5 block'>
            <Image src={Stop} alt='Stop' />
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <Image src={Stop} alt='Stop' />
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
          <Link href='/' className='mb-5 block'>
            <article>
              <h2>afeasfse segseg segsg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>
      </div>
    </>

  )
}

export default MainNews