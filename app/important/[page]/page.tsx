import Latest_important from "../../_components/category_menu_search/latest_important";
import Pagination from "../../_components/category_menu_search/pagination2";
import Rightsidebar from "../../_components/category_menu_search/rightsidebar";
import { Metadata } from "next";
import { impArt, impArtNum } from "@/actions/getimportantarticle";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.URL}`),
  title: 'Important news',
  description: 'Important news',
  alternates: {
    canonical: '/important/1'
  },
  openGraph: {
    title: "Important news",
    description: "Important news",
    url: `${process.env.URL}/important/1`,
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


export async function generateStaticParams() {
  const lastPage = await impArtNum() 
  const arr: number[] = []
  for(let i = 1; i<= Math.ceil(lastPage.numb / 20) ; i++){
    arr.push(i)
  }

  return arr.map(item => ({page: String(item)}))?? []
}


export const dynamic = 'force-static'
export const dynamicParams = true;
//export const revalidate = 60


const Page = async ({ params }: { params: {page: number  }}) => {

  if(!Number.isInteger(Number(params.page))) notFound();
  if(Number(params.page) < 1) notFound();

  const lastPage = await impArtNum() 

  if(Number(params.page) > Math.ceil(lastPage.numb / 20)) notFound();

  const res = (await impArt(Number(params.page))).res 

  if (res.error) return (

    <div className="relative">

      <h1 className="text-center mt-32 mb-40 text-5xl text-slate-400">Important</h1>

      <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
        <div className="lg:w-[calc(100%-450px)] text-center">
          <div className="mb-10">
            Server error
          </div>
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
                link={`/${item.category.toLowerCase().replaceAll(' ', '').replace('&', '_')}/${item.date.slice(0, 4)}/${item.date.slice(6, 8)}/${item.date.slice(10, 12)}/${item.title.replaceAll(' ', '_').replace('?', 'nb20')}`} />)}
            </div>
            {lastPage && <Pagination url='important' page={params.page} lastPage={Math.ceil(lastPage.numb / 20)} />}
          </div>
          <div className="lg:w-80">
            <Rightsidebar />
          </div>
        </div>
      </div>
    )

}

export default Page