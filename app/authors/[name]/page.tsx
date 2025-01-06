import Pagination from "./pagination";
import Rightsidebar from "../../_components/category_menu_search/rightsidebar";
import { authorArticle, numberOfAuthorArticle } from "@/actions/getarthurarticle";
import Category_menu_articles from "@/app/_components/category_menu_search/category_menu_articles";
import { Metadata, ResolvingMetadata } from "next";


export async function generateMetadata({params, searchParams}: {params:{name: string}, searchParams:{page: number}}, parent: ResolvingMetadata): Promise<Metadata> {

  return {
    metadataBase: new URL('https://online-newspaper.vercel.app'),
    title: `${params.name.replaceAll('_',' ')}`,
    description: `Articles of ${params.name.replaceAll('_',' ')} on Word Times`,
    alternates: {
      canonical: `/authors/${params.name.replaceAll('_',' ')}`
    },
    openGraph: {
      title: `${params.name.replaceAll('_',' ')}`,
      description: `Articles of ${params.name.replaceAll('_',' ')} on Word Times`,
      type: 'website',
      url: `https://online-newspaper.vercel.app/authors/${params.name}`,
      images: [
        {
          url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
          alt: 'Cover image of Word Times',
        }
      ],
    },
    twitter: {
      card: 'summary',
      title: `${params.name.replaceAll('_',' ')}`,
      description: `Articles of ${params.name.replaceAll('_',' ')} on Word Times`,
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


const Page = async ({params, searchParams}: {params:{name: string}, searchParams:{page: number}}) => {

    const lastPage = await numberOfAuthorArticle({author: params.name})

    const res = await authorArticle({author:params.name.replaceAll('_',' '), page: searchParams.page})

    if(res.error) return(
      <div className="relative">


      <h2 className="text-center mt-32 mb-40 text-5xl text-slate-400">{params.name.replaceAll('_',' ')}</h2>

      <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
        <div className="lg:w-[calc(100%-450px)] text-center">
          <div className="mb-10">
             {res.error}
          </div>
           {lastPage.success && <Pagination searchParams={searchParams} lastPage={lastPage.success} params={params}/> }
        </div>
        <div className="lg:w-80">
          <Rightsidebar/>
        </div>
      </div>
    </div>
    )
    if(res.success)
  return (
    <div className="relative">


      <h2 className="text-center mt-32 mb-40 text-5xl text-slate-400">{params.name.replaceAll('_',' ')}</h2>

      <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
        <div className="lg:w-[calc(100%-450px)] text-center">
          <div className="mb-10">
             {res.success.map(item => <Category_menu_articles imageId={item.cover_img_id} title={item.title} paywall={item.paywall}
             detail={item.detail} category_name={item.category} category_name_link={`/category/${item.category.toLowerCase().replaceAll(' ','').replace('&','_')}`} date={item.date} 
             link={`/${item.category.toLowerCase().replaceAll(' ','').replace('&','_')}/${item.date.slice(0,4)}/${item.date.slice(6,8)}/${item.date.slice(10,12)}/${item.title.replaceAll(' ','_')}`}   key={item.id}/>)}
          </div>
           {lastPage.success && <Pagination searchParams={searchParams} lastPage={lastPage.success} params={params}/> }
        </div>
        <div className="lg:w-80">
          <Rightsidebar/>
        </div>
      </div>
    </div>
  )
  
}

export default Page;