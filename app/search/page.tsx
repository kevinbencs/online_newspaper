import Link from "next/link";
import Pagination from "../_components/category_menu_search/pagination";
import Search from "./search";
import Rightsidebar from "../_components/category_menu_search/rightsidebar";
import Latest_important from "../_components/category_menu_search/latest_important";
import { searchNews } from "@/actions/getsearchnews";
import { Metadata, ResolvingMetadata } from "next";





export async function generateMetadata({ searchParams }: {
  searchParams: {
    category: string | undefined | null, text: string, date_from: string | undefined | null, date_to: string | undefined | null, author: string | undefined | null, page: number | undefined, filter: string | undefined | null
  }}, parent: ResolvingMetadata): Promise<Metadata> {

  return {
    metadataBase: new URL('https://online-newspaper.vercel.app'),
    title: `${searchParams.text.replaceAll('_', ' ')} news`,
    description: `Search ${searchParams.text.replaceAll('_', ' ')} news on Word Times`,
    alternates: {
      canonical: `/search&text=${searchParams.text}`
    },
    keywords: searchParams.text.replaceAll('_', ' '),
    openGraph: {
      title: `${searchParams.text.replaceAll('_', ' ')} news`,
      description: `Search ${searchParams.text.replaceAll('_', ' ')} news on Word Times`,
      type: 'article',
      url: `https://online-newspaper.vercel.app/search?text=${searchParams.text}`,
      images: [
        {
          url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
          alt: 'Cover image of Word Times',
        }
      ],
    },
    twitter: {
      card: 'summary',
      title: `${searchParams.text.replaceAll('_', ' ')} news`,
      description: `Search ${searchParams.text.replaceAll('_', ' ')} news on Word Times`,
      site: '',
      images: [
        {
          url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
          alt: 'Cover image of Word Times',
        }
      ],
    },

  }
}

const Page = async ({ searchParams }: {
  searchParams: {
    category: string | undefined | null, text: string, date_from: string | undefined | null, date_to: string | undefined | null, author: string | undefined | null, page: number | undefined, filter: string | undefined | null
  }
}) => {

  const res = await searchNews({
    category: searchParams.category,
    text: decodeURIComponent(searchParams.text.replaceAll('_', ' ')),
    date_from: searchParams.date_from,
    date_to: searchParams.date_to,
    author: searchParams.author,
    page:  searchParams.page !== null && searchParams.page !== undefined ? Number(searchParams.page) : searchParams.page,
    filter: searchParams.filter
  })

  let filt = res.filt


  const searchParams2 = {
    category: searchParams.category ? searchParams.category: '',
    text: searchParams.text,
    date_from: searchParams.date_from ? searchParams.date_from: '',
    date_to: searchParams.date_to ? searchParams.date_to: '',
    author: searchParams.author ? searchParams.author: '',
    page: searchParams.page !== null && searchParams.page !== undefined ? Number(searchParams.page) : searchParams.page
  }


  return (
    <div className="relative">
      <Search />
      <section className="sm:flex sm:gap-2 mt-10 sm:flex-row">
        {(res.success && res.success.resTitle > 0) &&
          <Link href={`/search?text=${searchParams.text}&category=${searchParams.category === undefined ? '' : ''}&author=${searchParams.author === undefined ? '' : ''}&date_form=${searchParams.date_from === undefined ? '' : ''}&date_to=${searchParams.date_to === undefined ? '' : ''}&filter=title&page=1`}
            className="bg-gray-400 block pl-2 pr-2 pt-1 pb-1 mb-2 sm:mb-0 sm:w-24 text-center dark:bg-zinc-900 rounded hover:text-gray-100 text-xs">
            Title
          </Link>
        }
        {(res.success && res.success.resTheme > 0) &&
          <Link href={`/search?text=${searchParams.text}&category=${searchParams.category === undefined ? '' : ''}&author=${searchParams.author === undefined ? '' : ''}&date_form=${searchParams.date_from === undefined ? '' : ''}&date_to=${searchParams.date_to === undefined ? '' : ''}&filter=theme&page=1`}
            className="bg-gray-400 block pl-2 pr-2 pt-1 pb-1 mb-2 sm:mb-0 sm:w-24 text-center dark:bg-zinc-900 rounded hover:text-gray-100 text-xs">
            Theme
          </Link>
        }
        {(res.success && res.success.resText > 0) &&
          <Link href={`/search?text=${searchParams.text}&category=${searchParams.category === undefined ? '' : ''}&author=${searchParams.author === undefined ? '' : ''}&date_form=${searchParams.date_from === undefined ? '' : ''}&date_to=${searchParams.date_to === undefined ? '' : ''}&filter=text&page=1`}
            className="bg-gray-400 block  pl-2 pr-2 pt-1 pb-1  sm:w-24 text-center dark:bg-zinc-900 rounded hover:text-gray-100 text-xs">
            Text
          </Link>
        }
      </section>

      <h1 className="text-center mt-32 mb-40 text-5xl text-slate-400">{typeof filt !== 'undefined' ? filt+':' : ''} {decodeURIComponent(searchParams.text.replaceAll('_', ' '))}</h1>

      <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
        <div className="lg:w-[calc(100%-450px)] text-center">
          <div className="mb-10">
            {res.success?.data.data && res.success.data.data.map(item => <Latest_important paywall={item.paywall} date={item.date} detail={item.detail} author={item.author} category={item.category} imageId={item.cover_img_id} title={item.title} key={item.id}
              link={`/${item.category.toLowerCase()}/${item.date.slice(0, 4)}/${item.date.slice(6, 8)}/${item.date.slice(10, 12)}/${item.title.replaceAll(' ', '_').replace('?','nb20')}`} />)}
          </div>
          {(res.lastPage !== undefined && res.lastPage > 0) && <Pagination url={`search?category=${searchParams2.category}&filter=${filt}&text=${searchParams2.text}&date_from=${searchParams2.date_from}&date_to=${searchParams2.date_to}&`} searchParams={{'page': searchParams2.page}}  lastPage={res.lastPage} />}
        </div>
        <div className="lg:w-80">
          <Rightsidebar />
        </div>
      </div>

    </div>
  )
}

export default Page