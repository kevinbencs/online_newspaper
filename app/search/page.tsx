import Link from "next/link";
import Pagination from "./pagination";
import Search from "./search";
import Rightsidebar from "../_components/category_menu_search/rightsidebar";
import Latest_important from "../_components/category_menu_search/latest_important";
import { searchNews } from "@/actions/getsearchnews";


const Page = async ({ searchParams }: {
  searchParams: {
    category: string | undefined | null, text: string, date_from: string | undefined | null, date_to: string | undefined | null, author: string | undefined | null, page: number | undefined, filter: string | undefined | null
  }
}) => {

  const res = await searchNews(searchParams.category, searchParams.text.replaceAll('_',' '), searchParams.date_from, searchParams.date_to, searchParams.author, searchParams.page, searchParams.filter)

  let filt = res.filt

  const searchParams2 = {
    category: searchParams.category,
    text: searchParams.text,
    date_from: searchParams.date_from,
    date_to: searchParams.date_to,
    author: searchParams.author,
    page: searchParams.page
  }


  return (
    <div className="relative">
      <Search />
      <section className="sm:flex sm:gap-2 mt-10 sm:flex-row">
        {(res.success  && res.success.resTitle > 0) &&
          <Link href={`/search?text=${searchParams.text}&category=${searchParams.category === undefined ? '': ''}&author=${searchParams.author === undefined ? '': ''}&date_form=${searchParams.date_from === undefined ? '': ''}&date_to=${searchParams.date_to === undefined ? '': ''}&filter=title&page=1`}
            className="bg-gray-400 block pl-2 pr-2 pt-1 pb-1 mb-2 sm:mb-0 sm:w-24 text-center dark:bg-zinc-900 rounded hover:text-gray-100 text-xs">
            Title
          </Link>
        }
        {(res.success  && res.success.resTheme > 0) &&
          <Link href={`/search?text=${searchParams.text}&category=${searchParams.category === undefined ? '': ''}&author=${searchParams.author === undefined ? '': ''}&date_form=${searchParams.date_from === undefined ? '': ''}&date_to=${searchParams.date_to === undefined ? '': ''}&filter=theme&page=1`}
            className="bg-gray-400 block pl-2 pr-2 pt-1 pb-1 mb-2 sm:mb-0 sm:w-24 text-center dark:bg-zinc-900 rounded hover:text-gray-100 text-xs">
            Theme
          </Link>
        }
        {(res.success && res.success.resText > 0) &&
          <Link href={`/search?text=${searchParams.text}&category=${searchParams.category === undefined ? '': ''}&author=${searchParams.author === undefined ? '': ''}&date_form=${searchParams.date_from === undefined ? '': ''}&date_to=${searchParams.date_to === undefined ? '': ''}&filter=text&page=1`}
            className="bg-gray-400 block  pl-2 pr-2 pt-1 pb-1  sm:w-24 text-center dark:bg-zinc-900 rounded hover:text-gray-100 text-xs">
            Text
          </Link>
        }
      </section>

      <h2 className="text-center mt-32 mb-40 text-5xl text-slate-400">{filt}: {searchParams.text.replaceAll('_', ' ')}</h2>

      <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
        <div className="lg:w-[calc(100%-450px)] text-center">
          <div className="mb-10">
            {res.success?.data.data && res.success.data.data.map(item => <Latest_important paywall={item.paywall} date={item.date} detail={item.detail} author={item.author} category={item.category} imageId={item.cover_img_id} title={item.title} key={item.id}
              link={`/${item.category}/${item.date.slice(0, 4)}/${item.date.slice(6, 8)}/${item.date.slice(10, 12)}/${item.title.replaceAll(' ', '_')}`} />)}
          </div>
          {res.lastPage > 0 && <Pagination searchParams={searchParams2} filter={filt} lastPage={res.lastPage} />}
        </div>
        <div className="lg:w-80">
          <Rightsidebar />
        </div>
      </div>

    </div>
  )
}

export default Page