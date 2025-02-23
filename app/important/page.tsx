import { unstable_cache } from "next/cache";
import Latest_important from "../_components/category_menu_search/latest_important";
import Pagination from "../_components/category_menu_search/pagination";
import Rightsidebar from "../_components/category_menu_search/rightsidebar";
//import { importantArticle, numberOfImportantArticle } from "@/actions/getimportantarticle";
import { Metadata } from "next";
import { supabase } from "@/utils/supabase/article";

export const metadata: Metadata = {
  metadataBase: new URL('https://online-newspaper.vercel.app'),
  title: 'Important news',
  description: 'Important news',
  alternates:{
    canonical:'/important'
  },
  openGraph: {
    title: "Important news",
    description: "Important news",
    url: `https://online-newspaper.vercel.app/important`,
    images: [
      {
        url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
        alt: 'Cover image of Word Times',
      }
    ],
  },
  twitter: {
    title: 'Important news',
    description: "Important news",
    site: '',
    images: [
      {
        url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
        alt: 'Cover image of Word Times',
      }
    ],
  },
}


const getImpNewsCache = unstable_cache(
  async (page: number | undefined) => page === undefined ?
    supabase.from('article').select('id, date, title, detail, cover_img_id, author, category, paywall').neq('important', 'Not important').limit(20).order('id', { ascending: false }).eq('locked', false) :
    supabase.from('article').select('id, date, title, detail, cover_img_id, author, category, paywall').neq('important', 'Not important').range((page - 1) * 20, page * 20 - 1).order('id', { ascending: false }).eq('locked', false),
  [`impN`]
);

const getImpNewsNumCache = unstable_cache(
  async () => supabase.from('article').select('*', { count: 'exact' }).neq('important', 'Not important').eq('locked', false),
  [`impNewNum`]
)



const Page = async ({ searchParams }: { searchParams: { page: number } }) => {

  const lastPage = (await getImpNewsNumCache()).count

  const res = await getImpNewsCache(searchParams.page === undefined ? searchParams.page : Number(searchParams.page))

  if (res.error) return (

    <div className="relative">

      <h1 className="text-center mt-32 mb-40 text-5xl text-slate-400">Important</h1>

      <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
        <div className="lg:w-[calc(100%-450px)] text-center">
          <div className="mb-10">
            Server error
          </div>
          {lastPage !== null && <Pagination url='important?' searchParams={searchParams} lastPage={lastPage} />}
        </div>
        <div className="lg:w-80">
          <Rightsidebar />
        </div>
      </div>
    </div>
  )

  if (res.data)
    return (
      <div className="relative">

        <h2 className="text-center mt-32 mb-40 text-5xl text-slate-400">Important</h2>

        <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
          <div className="lg:w-[calc(100%-450px)] text-center">
            <div className="mb-10">
              {res.data.map(item => <Latest_important paywall={item.paywall} date={item.date} detail={item.detail} author={item.author} category={item.category} imageId={item.cover_img_id} title={item.title} key={item.id}
                link={`/${item.category.toLowerCase().replaceAll(' ', '').replace('&', '_')}/${item.date.slice(0, 4)}/${item.date.slice(6, 8)}/${item.date.slice(10, 12)}/${item.title.replaceAll(' ', '_').replace('?','nb20')}`} />)}
            </div>
            {lastPage && <Pagination url='important?' searchParams={searchParams} lastPage={Math.round(lastPage/20)} />}
          </div>
          <div className="lg:w-80">
            <Rightsidebar />
          </div>
        </div>
      </div>
    )

}

export default Page