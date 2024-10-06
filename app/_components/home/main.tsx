import Link from 'next/link';
import Image from "next/image";
import Stop from '../../image/stop.png'

interface Data {
  image: string,
  alt: string,
  title: string,
  parag: string
}
const MainNews = async() => {
  /*const [err, res] ?= await fetch('');

  if(err) return (
    <div>{err}</div>
  );

  const data = await res.json();
  if (data.status !== 'success') 
    return (
      <div>{data.error}</div>
    )

  const Article = data.data;*/
  
  
  return (

    <>
      
      <div className='md:flex md:gap-4 mb-20 lg:flex-nowrap md:flex-wrap'>
        <div className='lg:w-[584px] md:w-[100%]'>
          <div className='mb-5 '>
            <Link href='/latest/faew' className='category uppercase text-[10px] category-picture'>afdwqfwqfwq</Link>
            <Link href='/' >
              <div className='overflow-hidden'>
                <Image src={Stop} alt='Stop' />
              </div>
              <article>
                <h2 className='text-lg md:text-4xl font-bold'>segseges e gesgseg</h2>
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


      <div className='md:flex md:gap-4 mb-12'>
        <div>
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
        </div>
        <div>
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
        <div>
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
        </div>
      </div>
    </>

  )
}

export default MainNews