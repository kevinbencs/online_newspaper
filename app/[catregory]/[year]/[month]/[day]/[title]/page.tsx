import Rightsidebar from '@/app/_components/category_menu_search/rightsidebar';
import Link from 'next/link';
import Img from '@/app/_components/article/img';
import Vid from '@/app/_components/article/vid';
import Paywall from '@/app/_components/paywall';
import { getArticle } from '@/actions/getarticle';
import { notFound } from 'next/navigation';
import Youtube from '@/app/_components/article/embedded/youtube';
import ChooseTypeOfTextItem  from '@/app/_components/article/showArticle';
import { v4 as uuid } from 'uuid';


const Page = async ({ params }: { params: { category: string, year: string, month: string, day: string, title: string } }) => {

  const date = params.year+'. '+params.month+'. '+params.day+'.'
  const res = await getArticle(params.title.replaceAll('-', ' '), date);

  if (res.error) notFound();

  if (res.data)

    return (
      <>

        {(res.data.first_element === 'Image' && res.data.first_element_url !== '') &&
          <Img id={res.data.first_element_url} />
        }
        {(res.data.first_element === 'Video' && res.data.first_element_url !== '') &&
          <Vid id={res.data.first_element_url} />
        }
        {(res.data.first_element === 'Youtube' && res.data.first_element_url !== '') &&
          <div className=' mb-10'>
            <Youtube url={res.data.first_element_url} />
          </div>
        }
        <h2 className='mt-20 text-4xl mb-20 font-bold'>{params.title.replaceAll('-', ' ')}</h2>

        <Link href={`/category/${res.data.category}`} >
          {res.data.category}
        </Link>

        <span className='ml-1'>
          {res.data.date}
        </span>
        <span className='ml-1'>
          {res.data.time}
        </span>


        <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
          <div className="lg:w-[calc(100%-450px)] mb-8">
            
            { res.data.text.split('$').map((s:string) => <ChooseTypeOfTextItem key={uuid()} s={s}/> )}
            {res.data.paywall &&
              <Paywall />
            }
          </div>
          {res.data.sidebar &&
            <div className="lg:w-80"> <Rightsidebar /></div>
          }
        </div>

      </>
    )



}

export default Page