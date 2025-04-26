import { getCareers } from "@/actions/getcareer"
import { Metadata } from "next"
import Link from "next/link"


export const metadata: Metadata = {
    title: 'Careers',
    description: 'Carriers on World Times',
    openGraph: {
      title: "Careers",
      description: "Careers on World Times",
      url: `${process.env.URL}/career`,
      images: [
        {
          url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
          alt: 'Cover image of Word Times',
        }
      ],
    },
    twitter: {
      title: 'Careers',
      description: "Careers on World Times",
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

/*export const revalidate = 60*/

const Page = async () => {
    const data: { success: Car[], error: undefined } | { success: undefined, error: string } = await getCareers()


    return (
        <div className="min-h-screen">
          <h1 className="mb-10 mt-10 text-center text-5xl">Careers</h1>
            {data.error &&
                <div>{data.error}</div>
            }
            {data.success &&
                <section className="text-xl">
                    {data.success.map(item => <Link className="mb-4" href={`/career/${item.title.replaceAll(' ','_')}`} key={item._id}>{item.title}</Link>)}
                </section>
            }
        </div>
    )
}

export default Page