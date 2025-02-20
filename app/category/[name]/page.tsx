import Pagination from "./pagination";
import Rightsidebar from "../../_components/category_menu_search/rightsidebar";
import { getCategoryArticle, numberOfCategoryArticle } from "@/actions/getcategoryarticles";
import Category_menu_articles from "@/app/_components/category_menu_search/category_menu_articles";
import { Metadata, ResolvingMetadata } from "next";
import { getCategory } from "@/actions/getCategory";

interface Cat {
  name: string,
  _id: string
}

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




/*export async function generateStaticParams() {
  const authors = await getCategory()

  const arrAUthNumbNews = []
  if (authors.success) {
    for (let i of authors.success) {
      const numberOfNews = await numberOfCategoryArticle(i.name)
      arrAUthNumbNews.push({ author: i.name, number: Math.ceil(numberOfNews.success ? numberOfNews.success / 20 : 1) })
    }


    const arr = []

    for (let i = 0; i < authors.success.length; i++) {
      arr.push({ author: authors.success[i].name, num: '' });
      for (let j = 1; j <= arrAUthNumbNews[i].number; j++) {
        arr.push({ author: authors.success[i].name, num: j });
      }
    }


    return arr.map((item) => {
      item.num === '' ? { name: item.author.replaceAll(' ', '_') } : { name: item.author.replaceAll(' ', '_'), searchParams: { page: item.num } }
    })
  }

  return []
}*/


//export const dynamic = 'force-static'
//export const dynamicParams = true
//export const revalidate = 3600




const Page = async ({ params, searchParams }: { params: { name: string }, searchParams: { page: number } }) => {


  const res = await getCategoryArticle({ page: searchParams.page, name: params.name.replace('_', ' & ') })

  const lastPage = await numberOfCategoryArticle(params.name)

  if (res.error) return (
    <div className="relative">

      <h1 className="text-center mt-32 mb-40 text-5xl text-slate-400">{params.name.replace('_', ' & ')}</h1>

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
            {res.success.data.map(item => <Category_menu_articles paywall={item.paywall} link={'/' + params.name.toLowerCase().replaceAll(' ', '').replace('&', '_') + '/' + item.date.slice(0, 4) + '/' + item.date.slice(6, 8) + '/' + item.date.slice(10, 12) + '/' + item.title.replaceAll(' ', '_').replace('?', 'nb20')}
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