import Pagination from "./pagination";
import Rightsidebar from "../../_components/category_menu_search/rightsidebar";
import { getCategoryArticle, numberOfCategoryArticle } from "@/actions/getcategoryarticles";
import Category_menu_articles from "@/app/_components/category_menu_search/category_menu_articles";
import { Metadata, ResolvingMetadata } from "next";



//export const revalidate = 60

export async function generateMetadata({ params, searchParams }: { params: { name: string }, searchParams: { page: number } }, parent: ResolvingMetadata): Promise<Metadata> {

  return {
    metadataBase: new URL('https://online-newspaper.vercel.app'),
    title: `${params.name.replace('_', ' & ')} news`,
    description: `${params.name.replace('_', ' & ')} news of Word Times`,
    alternates: {
      canonical: `/${params.name}`
    },
    keywords: params.name.replace('_', ' & '),
    openGraph: {
      title: `${params.name.replace('_', ' & ')} news`,
      description: `${params.name.replace('_', ' & ')} news of Word Times`,
      type: 'article',
      url: `https://online-newspaper.vercel.app/${params.name}`,
      images: [
        {
          url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
          alt: 'Cover image of Word Times',
        }
      ],
    },
    twitter: {
      card: 'summary',
      title: `${params.name.replace('_', ' & ')} news`,
      description: `${params.name.replace('_', ' & ')} news of Word Times`,
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


const Page = async ({ params, searchParams }: { params: { name: string }, searchParams: { page: number } }) => {


  const res = await getCategoryArticle({ page: searchParams.page, name: params.name.replace('_', ' & ') })

  const lastPage = await numberOfCategoryArticle(params.name)

  if (res.error) return (
    <div className="relative">

      <h2 className="text-center mt-32 mb-40 text-5xl text-slate-400">{params.name.replace('_', ' & ')}</h2>

      <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
        <div className="lg:w-[calc(100%-450px)] text-center">
          <div className="mb-10">
            Server error
          </div>
          {lastPage.success && <Pagination searchParams={searchParams} lastPage={lastPage.success} params={params} />}
        </div>
        <div className="lg:w-80">
          <Rightsidebar />
        </div>
      </div>
    </div>
  )

  if (res.success) return (
    <div className="relative">

      <h2 className="text-center mt-32 mb-40 text-5xl text-slate-400">{params.name.replace('_', ' & ')}</h2>

      <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
        <div className="lg:w-[calc(100%-450px)] text-center">
          <div className="mb-10">
            {res.success.data.map(item => <Category_menu_articles paywall={item.paywall} link={'/' + params.name.toLowerCase() + '/' + item.date.slice(0, 4) + '/' + item.date.slice(6, 8) + '/' + item.date.slice(10, 12) + '/' + item.title.replaceAll(' ', '_')}
              date={item.date} detail={item.detail} category_name={item.author} category_name_link={`/authors/${item.author.replaceAll(' ', '_')}`} imageId={item.cover_img_id} title={item.title} key={item.id} />)}
          </div>
          {lastPage.success && <Pagination searchParams={searchParams} lastPage={Math.round(lastPage.success / 20)} params={params} />}
        </div>
        <div className="lg:w-80">
          <Rightsidebar />
        </div>
      </div>
    </div>
  )

}

export default Page;