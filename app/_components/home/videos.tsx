import { sectionVideo } from '@/actions/getmainnews';
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
            <Link href={`/${res.data[0].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}`} className='category uppercase drop-shadow-md font-bold text-[10px] category-picture'>{res.data[0].category}</Link>
            <Link href={`/${res.data[0].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}/${res.data[0].date.slice(0, 4)}/${res.data[0].date.slice(6, 8)}/${res.data[0].date.slice(10, 12)}/${res.data[0].title.replaceAll(' ', '_').replace('?','nb20')}`} >
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
          {res.data[1] && <div className='mb-5 '>
            <Link href={`/${res.data[1].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}`} className='category uppercase drop-shadow-md font-bold text-[10px] category-picture'>{res.data[1].category}</Link>
            <Link href={`/${res.data[1].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}/${res.data[1].date.slice(0, 4)}/${res.data[1].date.slice(6, 8)}/${res.data[1].date.slice(10, 12)}/${res.data[1].title.replaceAll(' ', '_').replace('?','nb20')}`} >
              <div className='overflow-hidden'>
              <Img id={res.data[1].cover_img_id} />
              </div>
              <article>
              {res.data[1].paywall && <div><IoLockClosed /></div>}
                <h2 className='text-lg font-bold'>{res.data[1].title}</h2>
                <p>{res.data[1].detail}</p>
              </article>
            </Link>
          </div>}
        </div>

      </section>
    )
}

export default Videos