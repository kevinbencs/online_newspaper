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
import ShareX from '@/app/_components/article/shareX';
import CopyLink from '@/app/_components/article/copylink';
import EditSave from '@/app/_components/article/editSave';
import { Metadata, ResolvingMetadata } from 'next';
import { getArticleMetadata } from '@/actions/getArticleMetadata';
import ClickOnArt from '@/app/_components/article/clickOnArt';
import { getArtUrl } from '@/actions/getArtUrl';

export async function generateMetadata({ params, searchParams }: { params: { category: string, year: string, month: string, day: string, title: string }, searchParams: { source: string } }, parent: ResolvingMetadata): Promise<Metadata> {
  const date = params.year + '. ' + params.month + '. ' + params.day + '.'
  const res = await getArticleMetadata({ Article: decodeURIComponent(params.title.replaceAll('_', ' ').replace('nb20','?')), date, source: searchParams.source });

  return {
    title: decodeURIComponent(params.title.replaceAll('_', ' ')),
    description: res.data?.description,
    keywords: res.data?.keyword,
    category: res.data?.category,
    authors: {name: res.data?.author},
    openGraph: {
      title: params.title.replaceAll('_', ' '),
      description: res.data?.description,
      type: 'article',
      publishedTime: res.data?.date,
      url: `${process.env.URL}/${params.category}/${params.year}/${params.month}/${params.day}/${params.title}`,
      images: [
        {
          url: res.data ? res.data?.cover_img_id.split(';')[0] : '',
          alt: res.data ? res.data?.cover_img_id.split(';')[2] : '',
        }
      ],
    },
    twitter: {
      card: 'summary',
      title: params.title.replaceAll('_', ' '),
      description: res.data?.description,
      site: '',
      images: [
        {
          url: res.data ? res.data?.cover_img_id.split(';')[0] : '',
          alt: res.data ? res.data?.cover_img_id.split(';')[2] : '',
        }
      ],
    },
    robots:{
      index: true,
      follow: true,
      nocache: false,
      noarchive:false,
      noimageindex:false,
      googleBot:{
        index:true,
        follow:true,
        noarchive:false,
        nocache:false,
        noimageindex:false,
        "max-video-preview": 0,
        "max-image-preview": "large",
      }
    }
  }
}


export async function generateStaticParams() {
  const res = await getArtUrl();

  return res.data?.map((item) => ({
    category: item.category,
    year: item.date.slice(0,4),
    month: item.date.slice(6,8),
    day: item.date.slice(10,12),
    title: item.title.replace(' ','_').replace('?','nb20')
  })) ?? []
}

export const dynamic = 'force-static'
export const dynamicParams = true;
/*export const revalidate = 60*/

const Page = async ({ params, searchParams }: { params: { category: string, year: string, month: string, day: string, title: string }, searchParams: { source: string } }) => {

  const date = params.year + '. ' + params.month + '. ' + params.day + '.'
  const res = await getArticle({ Article: decodeURIComponent(params.title.replaceAll('_', ' ').replace('nb20','?')), date, source: searchParams.source });
  
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
        <h1 className='mt-20 text-4xl mb-8 font-bold'>{decodeURIComponent(params.title.replaceAll('_', ' ').replace('nb20','?'))}</h1>

        <div>
          <Link href={`/category/${res.data.category.toLowerCase()}/1`} className='dark:bg-white dark:text-gray-950 bg-slate-950 text-gray-50 hover:text-gray-300 dark:hover:text-stone-400 pl-2 pr-2 pt-1 pb-1' >
            {res.data.category.replace( ' & ', '_')}
          </Link>
          <span className='ml-3'>
            {res.data.date.replaceAll(' ', '')}
          </span>
          <span className='ml-2'>
            {res.data.time}
          </span>
          {res.data.updated &&
            <span className='ml-3'>Updated!</span>
          }
        </div>

        <div className="lg:flex mt-12 mb-10 lg:gap-32 lg:flex-wrap">
          <div className="lg:w-[calc(100%-450px)] mb-8">
            <div className='mb-5 flex justify-between items-center'>
              <Link href={`/authors/${res.data.author.replaceAll(' ', '_')}/1`} className='dark:bg-white dark:text-gray-950 bg-slate-950 text-gray-50 hover:text-gray-300 dark:hover:text-stone-400 pr-2 pl-2 pt-1 pb-1'>{res.data.author}</Link>
              <div className='flex gap-3 items-center'>
                <ClickOnArt title={params.title} date={date} source={searchParams.source}/>
                <EditSave name={res.data.author} url={`${params.category}/${params.year}/${params.month}/${params.day}/${params.title}`} title={params.title.replaceAll('_', ' ').replaceAll('nb20','?')} />
                <CopyLink url={`${process.env.URL}/${params.category}/${params.year}/${params.month}/${params.day}/${params.title}`} />
                <ShareFacebook url={`/${params.category}/${params.year}/${params.month}/${params.day}/${params.title}?source=facebook`}
                  title={params.title.replaceAll('-', ' ')} />
                <ShareX url={`/${params.category}/${params.year}/${params.month}/${params.day}/${params.title}?source=x`}
                  title={params.title.replaceAll('-', ' ')} />
              </div>
            </div>
            {res.data.text.split('$').map((s: string) => <ChooseTypeOfTextItem key={res.data.id} s={s} />)}
            {res.data.paywall &&
              <Paywall />
            }
            <section className='flex gap-3 mt-10'>
              {res.data.keyword.map(item => <li className='list-none dark:bg-white bg-slate-950 pl-2 pr-2 pt-1 pb-1' key={uuid()}>
                <Link className=' dark:text-gray-950  text-gray-50 hover:text-gray-300 dark:hover:text-stone-400' href={`/search?text=${item.replaceAll(' ', '_').replaceAll('+','10b10')}&filter=theme`}>{item}</Link>
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