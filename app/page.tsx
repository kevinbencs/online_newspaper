import Image from "next/image";
import Link from "next/link";
import NewestNews from "./components/home/latestnews";
import MainNews from "./components/home/main";
import Uk from "./components/home/uk";
import Videos from "./components/home/videos";

export default function Page() {



  return (
    <>


      <Link href='/latest' className="mb-3 text-xl font-bold flex gap-1">
        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 fill-slate-400 text-slate-400" >
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
        <h3>Latest</h3>
      </Link>
      <NewestNews />


      <MainNews />



      <Uk />


      <Videos />
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>
      <div>kell</div>

    </>
  );
}
