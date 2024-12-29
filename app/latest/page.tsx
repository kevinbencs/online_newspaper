import Latest_important from "../_components/category_menu_search/latest_important";
import Pagination from "./pagination";
import Rightsidebar from "../_components/category_menu_search/rightsidebar";
import { latestNews, numberOfLatestNews } from "@/actions/getlatest";



const Page = async ({searchParams}: {searchParams:{page: number}}) => {
  const lastPage = await numberOfLatestNews()

  const res = await latestNews({page: searchParams.page})

  if(res.error) return(
    <div>{res.error}</div>
  )
  if(res.success)
  return (
    <div className="relative">



      <h2 className="text-center mt-32 mb-40 text-5xl text-slate-400">Latest</h2>

      <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
        <div className="lg:w-[calc(100%-450px)] text-center">
          <div className="mb-10">
             {res.success.data.map(item => <Latest_important paywall={item.paywall} date={item.date} detail={item.detail} author={item.author} category={item.category}  imageId={item.cover_img_id} title={item.title} key={item.id}
             link={`/${item.category}/${item.date.slice(0,4)}/${item.date.slice(6,8)}/${item.date.slice(10,12)}/${item.title.replaceAll(' ','_')}`}/>)}
          </div>
          {lastPage.success && <Pagination searchParams={searchParams} lastPage={Math.round(lastPage.success/20)} />}
        </div>
        <div className="lg:w-80">
          <Rightsidebar/>
        </div>
      </div>
    </div>
  )

}

export default Page