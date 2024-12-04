import Link from 'next/link';
import Image from "next/image";
import Stop from '../../image/stop.png'
import { mainSection } from '@/actions/getmainnews';
import Img from '../article/img2';
import { deleteArticle } from '@/actions/deletearticels';


const MainNews = async () => {
  const res = await mainSection();

  if (res.error) return (
    <div>{res.error}</div>
  )

  //const res = deleteArticle();
  if (res.data) return (

    <div className='md:flex md:gap-4 mb-20 lg:flex-nowrap md:flex-wrap'>
      <div className='lg:w-[584px] md:w-[100%]'>
        <div className='mb-5 '>
          <Link href={`/${res.data[0].category}`} className='category uppercase text-[10px] category-picture'>{res.data[0].category}</Link>
          <Link href={`/${res.data[0].category.toLowerCase()}/${res.data[0].date.slice(0, 4)}/${res.data[0].date.slice(6, 8)}/${res.data[0].date.slice(10, 12)}/${res.data[0].title.replaceAll(' ', '-')}`}>
            <div className='overflow-hidden'>
              <Img id={res.data[0].cover_img_id} />
            </div>
            <article>
              <h2 className='text-lg md:text-4xl font-bold'>{res.data[0].title}</h2>
              <p>{res.data[0].detail}</p>
            </article>
          </Link>
        </div>

        <div className='mb-5 '>
          <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
          <Link href='/' className='mb-5 block '>
            <article>
              <h2 className='text-lg font-bold md:text-2xl'>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>

        <div className='mb-5 '>
          <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
          <Link href='/' className='mb-5 block '>
            <article>
              <h2 className='text-lg font-bold md:text-2xl'>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>
      </div>

      <div className='lg:w-[292px] md:w-[calc(50%-12px)]'>
        <div className='mb-5 '>
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
        </div>

        <div className='mb-5 '>
          <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
          <Link href='/' className='mb-5 block '>
            <article>
              <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>
        <div className='mb-5 '>
          <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
          <Link href='/' className='mb-5 block '>
            <article>
              <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>
        <div className='mb-5 '>
          <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
          <Link href='/' className='mb-5 block '>
            <article>
              <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>
        <div className='mb-5 '>
          <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
          <Link href='/' className='mb-5 block '>
            <article>
              <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>
      </div>
      <div className='lg:w-[292px] md:w-[calc(50%-12px)]'>
        <div className='mb-5 '>
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
        </div>

        <div className='mb-5 '>
          <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
          <Link href='/' className='mb-5 block '>
            <article>
              <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>
        <div className='mb-5 '>
          <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
          <Link href='/' className='mb-5 block '>
            <article>
              <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>
        <div className='mb-5 '>
          <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
          <Link href='/' className='mb-5 block '>
            <article>
              <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>
        <div className='mb-5 '>
          <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
          <Link href='/' className='mb-5 block '>
            <article>
              <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
              <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
            </article>
          </Link>
        </div>
      </div>
    </div>

  )
}

export default MainNews