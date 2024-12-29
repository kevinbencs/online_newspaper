import { getAllLockedArticle } from "@/actions/getalllockedarticle"
import Link from "next/link";

const Page = async () => {
  const data = await getAllLockedArticle();

  return (
    <div className="min-h-screen pt-10">
      <h2 className="mb-32 text-5xl text-center ">Locked articles</h2>
      {data.error && 
        <div className="text-red-700 text-4xl text-center">{data.error}</div>
      }
      {data.none && 
        <div className="text-4xl text-center">{data.none}</div>
      }

      {data.data &&
        <section>
          {data.data.map(item => <Link key={`locked-${item.id}`} className="block text-xl mb-2" href={`/lockedarticle/${item.category.replaceAll(' ','').replace('&','_').toLowerCase()}/${item.date.slice(0,4)}/${item.date.slice(6,8)}/${item.date.slice(10,12)}/${item.title.replaceAll(' ','_')}`}>{item.title}</Link> )}
        </section>
      }

    </div>
  )
}

export default Page