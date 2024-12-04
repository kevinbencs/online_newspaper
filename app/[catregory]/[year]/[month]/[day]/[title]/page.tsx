import Rightsidebar from '@/app/_components/category_menu_search/rightsidebar';
import Link from 'next/link';
import Img from '@/app/_components/article/img';
import Vid from '@/app/_components/article/vid';
import Paywall from '@/app/_components/paywall';
import { getArticle } from '@/actions/getarticle';
import { notFound } from 'next/navigation';
import Youtube from '@/app/_components/article/embedded/youtube';
import ChooseTypeOfTextItem from '@/app/_components/article/showArticle';
import { v4 as uuid } from 'uuid';
import ShareFacebook from '@/app/_components/article/shareFacebook';
import ShareX from '@/app/_components/article/embedded/shareX';



const Page = async ({ params }: { params: { category: string, year: string, month: string, day: string, title: string } }) => {

  

  const date = params.year + '. ' + params.month + '. ' + params.day + '.'
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
        <h2 className='mt-20 text-4xl mb-8 font-bold'>{params.title.replaceAll('-', ' ')}</h2>

        <Link href={`/category/${res.data.category.toLowerCase()}`} className='dark:bg-white dark:text-gray-950 bg-slate-950 text-gray-50 hover:text-gray-300 dark:hover:text-stone-400 pl-2 pr-2 pt-1 pb-1' >
          {res.data.category}
        </Link>

        <span className='ml-3'>
          {res.data.date.replaceAll(' ', '')}
        </span>
        <span className='ml-2'>
          {res.data.time}
        </span>




        <div className="lg:flex mt-12 mb-10 lg:gap-32 lg:flex-wrap">
          <div className="lg:w-[calc(100%-450px)] mb-8">
            <div className='mb-5 flex justify-between items-center'>
              <Link href={`/authors/${res.data.author.replaceAll(' ', '-')}`} className='dark:bg-white dark:text-gray-950 bg-slate-950 text-gray-50 hover:text-gray-300 dark:hover:text-stone-400 pl-2 pr-2 pt-1 pb-1'>{res.data.author}</Link>
              <div className='flex gap-3 items-center'>
                <ShareFacebook url={`https://online-newspaper.vercel.app/${params.category}/${params.year}/${params.month}/${params.day}/${params.title}`}
                title={params.title.replaceAll('-', ' ')}/>
                <ShareX url={`https://online-newspaper.vercel.app/${params.category}/${params.year}/${params.month}/${params.day}/${params.title}`}
                title={params.title.replaceAll('-', ' ')} />
              </div>
            </div>
            {res.data.text.split('$').map((s: string) => <ChooseTypeOfTextItem key={res.data.id} s={s} />)}
            {res.data.paywall &&
              <Paywall />
            }
            <section className='flex gap-3'>
              {res.data.keyword.map(item => <li className='list-none dark:bg-white bg-slate-950 pl-2 pr-2 pt-1 pb-1'>
                <Link className=' dark:text-gray-950  text-gray-50 hover:text-gray-300 dark:hover:text-stone-400' href={`/search?text=${item.replaceAll(' ','-')}&filter=theme`}>{item}</Link>
              </li>)}
            </section>
          </div>
          {res.data.sidebar &&
            <div className="lg:w-80"> <Rightsidebar /></div>
          }
        </div>

      </>
    )



}

export default Page