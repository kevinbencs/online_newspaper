import Link from 'next/link';
import Image from "next/image";
import Stop from '../../image/stop.png'
import { mainSection } from '@/actions/getmainnews';
import Img from '../article/img2';
import { IoLockClosed } from "react-icons/io5";



const MainNews = async () => {
  const res = await mainSection();

  if (res.error) return (
    <div>{res.error}</div>
  )


  if (res.data) return (

    <div className='md:flex md:gap-4 mb-20 lg:flex-nowrap md:flex-wrap'>
      <div className='lg:w-[584px] md:w-[100%]'>
        {res.data[0] && <div className='mb-5 '>
          <Link href={`/${res.data[0].category.toLowerCase()}`} className='category uppercase text-[10px] category-picture'>{res.data[0].category}</Link>
          <Link href={`/${res.data[0].category.toLowerCase()}/${res.data[0].date.slice(0, 4)}/${res.data[0].date.slice(6, 8)}/${res.data[0].date.slice(10, 12)}/${res.data[0].title.replaceAll(' ', '_')}`}>
            <div className='overflow-hidden'>
              <Img id={res.data[0].cover_img_id} />
            </div>
            <article>
              {res.data[0].paywall && <div><IoLockClosed /></div>}
              <h2 className='text-lg md:text-4xl font-bold'>{res.data[0].title}</h2>
              <p>{res.data[0].detail}</p>
            </article>
          </Link>
        </div>}

        {res.data[1] && <div className='mb-5 '>
          <Link href={`/${res.data[1].category.toLowerCase()}`} className='category uppercase text-[10px]'>{res.data[1].category}</Link>
          <Link href={`/${res.data[1].category.toLowerCase()}/${res.data[1].date.slice(0, 4)}/${res.data[1].date.slice(6, 8)}/${res.data[1].date.slice(10, 12)}/${res.data[1].title.replaceAll(' ', '_')}`} className='mb-5 block '>
            <article>
              {res.data[1].paywall && <div><IoLockClosed /></div>}
              <h2 className='text-lg font-bold md:text-2xl'>{res.data[1].title}</h2>
              <p>{res.data[1].detail}</p>
            </article>
          </Link>
        </div>}

        {res.data[2] && <div className='mb-5 '>
          <Link href={`/${res.data[2].category.toLowerCase()}`} className='category uppercase text-[10px]'>{res.data[2].category}</Link>
          <Link href={`/${res.data[2].category.toLowerCase()}/${res.data[2].date.slice(0, 4)}/${res.data[2].date.slice(6, 8)}/${res.data[2].date.slice(10, 12)}/${res.data[2].title.replaceAll(' ', '_')}`} className='mb-5 block '>
            <article>
              {res.data[2].paywall && <div><IoLockClosed /></div>}
              <h2 className='text-lg font-bold md:text-2xl'>{res.data[2].title}</h2>
              <p>{res.data[2].detail}</p>
            </article>
          </Link>
        </div>}
      </div>

      <div className='lg:w-[292px] md:w-[calc(50%-12px)]'>
        {res.data[3] && <div className='mb-5 '>
          <Link href={`/${res.data[3].category.toLowerCase()}`} className='category uppercase text-[10px] category-picture'>{res.data[3].category}</Link>
          <Link href={`/${res.data[3].category.toLowerCase()}/${res.data[3].date.slice(0, 4)}/${res.data[3].date.slice(6, 8)}/${res.data[3].date.slice(10, 12)}/${res.data[3].title.replaceAll(' ', '_')}`} >
            <div className='overflow-hidden'>
              <Img id={res.data[3].cover_img_id} />
            </div>
            <article>
              <h2 className='text-lg font-bold'>{res.data[3].title}</h2>
              <p>{res.data[3].detail}</p>
            </article>
          </Link>
        </div>}

        {res.data[4] && <div className='mb-5 '>
          <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
          <Link href='/' className='mb-5 block '>
            <article>
              <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>}

        {res.data[5] && <div className='mb-5 '>
          <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
          <Link href='/' className='mb-5 block '>
            <article>
              <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>}

        {res.data[6] && <div className='mb-5 '>
          <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
          <Link href='/' className='mb-5 block '>
            <article>
              <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>}

        {res.data[7] && <div className='mb-5 '>
          <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
          <Link href='/' className='mb-5 block '>
            <article>
              <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>}
      </div>

      <div className='lg:w-[292px] md:w-[calc(50%-12px)]'>
        {res.data[8] && <div className='mb-5 '>
          <Link href='/latest/faew' className='category uppercase text-[10px] category-picture'>afdwqfwqfwq</Link>
          <Link href='/' >
            <div className='overflow-hidden'>
              <Image src={Stop} alt='Stop' />
            </div>
            <article>
              <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>}

        {res.data[9] && <div className='mb-5 '>
          <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
          <Link href='/' className='mb-5 block '>
            <article>
              <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>}

        {res.data[10] && <div className='mb-5 '>
          <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
          <Link href='/' className='mb-5 block '>
            <article>
              <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>}

        {res.data[11] && <div className='mb-5 '>
          <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
          <Link href='/' className='mb-5 block '>
            <article>
              <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>}

        {res.data[12] && <div className='mb-5 '>
          <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
          <Link href='/' className='mb-5 block '>
            <article>
              <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>}


      </div>
    </div>

  )
}

export default MainNews