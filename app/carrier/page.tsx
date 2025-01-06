import { getCarriers } from "@/actions/getcarrier"
import { Metadata } from "next"
import Link from "next/link"


export const metadata: Metadata = {
    title: 'Carriers',
    description: 'Carriers on World Times',
    openGraph: {
      title: "Carriers",
      description: "Carriers on World Times",
      url: `https://online-newspaper.vercel.app/carrier`,
      images: [
        {
          url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
          alt: 'Cover image of Word Times',
        }
      ],
    },
    twitter: {
      title: 'Carriers',
      description: "Carriers on World Times",
      site: '',
      images: [
        {
          url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
          alt: 'Cover image of Word Times',
        }
      ],
    },
  }
  

interface Car {
    _id: string,
    title: string
}

const Page = async () => {
    const data: { success: Car[], error: undefined } | { success: undefined, error: string } = await getCarriers()


    return (
        <div className="min-h-screen">
            {data.error &&
                <div>{data.error}</div>
            }
            {data.success &&
                <section className="text-xl">
                    {data.success.map(item => <Link className="mb-4" href={`/carrier/${item.title.replaceAll(' ','_')}`} key={item._id}>{item.title}</Link>)}
                </section>
            }
        </div>
    )
}

export default Page