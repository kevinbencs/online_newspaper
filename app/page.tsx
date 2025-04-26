import Link from "next/link";
import LatestNews from "./_components/home/latestnews";
import MainNews from "./_components/home/main";
import Videos from "./_components/home/videos";
import SectionTwo from "./_components/home/sectionTwo";
import { latestNewsMainPage } from "@/actions/getlatestnews";


/*export const revalidate = 60*/

export default async function Page() {

  const res = await latestNewsMainPage()
  
  return (
    <>

      <Link href='/latest' className="mb-3 text-xl font-bold flex gap-1">
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 fill-slate-400 text-slate-400" >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
        <h3>Latest</h3>
      </Link>
      
      <LatestNews res={res}/>

      <MainNews />
      <SectionTwo />

      <Videos />
    </>
  );
}
