import { getCareerByTitle } from "@/actions/getcareer"
import  ChooseTypeOfTextItem from "@/app/_components/carrier/showCarrierSSR";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { v4 as uuid } from "uuid";

export async function generateMetadata({params}:{params:{title: string}}, parent: ResolvingMetadata): Promise<Metadata> {

  return {
    metadataBase: new URL('https://online-newspaper.vercel.app'),
    title: `${decodeURIComponent(params.title.replaceAll('_', ' '))} `,
    description: `${decodeURIComponent(params.title.replaceAll('_', ' '))} job advertisement on Word Times`,
    alternates: {
      canonical: `/${decodeURIComponent(params.title.replaceAll('_', ' '))}`
    },
    openGraph: {
      title: `${decodeURIComponent(params.title.replaceAll('_', ' '))}`,
      description: `${decodeURIComponent(params.title.replaceAll('_', ' '))} job advertisement on Word Times`,
      type: 'website',
      url: `https://online-newspaper.vercel.app/carrier/${params.title}`,
      images: [
        {
          url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
          alt: 'Cover image of Word Times',
        }
      ],
    },
    twitter: {
      card: 'summary',
      title: `${decodeURIComponent(params.title.replaceAll('_', ' '))}`,
      description: `${decodeURIComponent(params.title.replaceAll('_', ' '))} job advertisement on Word Times`,
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

const Page = async ({params}:{params:{title: string}}) => {
  const {success, error} = await getCareerByTitle({title: decodeURIComponent(params.title.replaceAll('_', ' '))})

  if(error) notFound();

  return (
    <div className="min-h-screen pb-10">
      <h1 className='mt-20 text-5xl mb-20 font-bold leading-normal'>{decodeURIComponent(params.title.replaceAll('_', ' '))}</h1>
      <div>
        {success.text.split('$').map((item: string) => <ChooseTypeOfTextItem s={item} key={uuid()}/>)}
      </div>
    </div>
  )
}

export default Page