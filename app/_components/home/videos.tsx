import { sectionVideo } from '@/actions/getmainnews';
import Stop from '../../image/stop.png'
import Image from "next/image";
import Link from 'next/link';
import Img from '../article/img2';
import { IoLockClosed } from "react-icons/io5";


const Videos = async () => {
  const res = await sectionVideo()

  if (res.error) return (
    <div>{res.error}</div>
  )

  if (res.data)
    return (
      <section>
        <h2>Videos</h2>

        <div className='md:flex md:gap-4 mb-5 '>
          {res.data[0] && <div className='mb-5 md:max-w-[calc((100%-16px)/2)]'>
            <Link href={`/${res.data[0].category.toLowerCase()}`} className='category uppercase drop-shadow-md font-bold text-[10px] category-picture'>{res.data[0].category}</Link>
            <Link href={`/${res.data[0].category.toLowerCase()}/${res.data[0].date.slice(0, 4)}/${res.data[0].date.slice(6, 8)}/${res.data[0].date.slice(10, 12)}/${res.data[0].title.replaceAll(' ', '_')}`} >
              <div className='overflow-hidden'>
                <Img id={res.data[0].cover_img_id} />
              </div>
              <article>
                {res.data[0].paywall && <div><IoLockClosed /></div>}
                <h2 className='text-lg font-bold'>{res.data[0].title}</h2>
                <p>{res.data[0].detail}</p>
              </article>
            </Link>
          </div>}
          <div className='mb-5 '>
            <Link href='/latest/faew' className='category uppercase drop-shadow-md font-bold text-[10px] category-picture'>afdwqfwqfwq</Link>
            <Link href='/' >
              <div className='overflow-hidden'>
                <Image src={Stop} alt='Stop' />
              </div>
              <article>
                <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
                <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
              </article>
            </Link>
          </div>
        </div>

      </section>
    )
}

export default Videos