import { getCareerByTitle, getCareers } from "@/actions/getcareer"
import  ChooseTypeOfTextItem from "@/app/_components/carrier/showCarrierSSR";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { v4 as uuid } from "uuid";

export async function generateMetadata({params}:{params:{title: string}}, parent: ResolvingMetadata): Promise<Metadata> {

  return {
    title: `${decodeURIComponent(params.title.replaceAll('_', ' '))} `,
    description: `${decodeURIComponent(params.title.replaceAll('_', ' '))} job advertisement on Word Times`,

    openGraph: {
      title: `${decodeURIComponent(params.title.replaceAll('_', ' '))}`,
      description: `${decodeURIComponent(params.title.replaceAll('_', ' '))} job advertisement on Word Times`,
      type: 'website',
      url: `${process.env.URL}/${params.title}`,
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

export async function generateStaticParams() {
  const res = await getCareers();

  return res.success?.map((item: {title: string, _id: string}) => ({
    title: item.title.replaceAll(' ','_')
  })) ?? []
}

export const dynamic = 'force-static'
export const dynamicParams = true;
//export const revalidate = 60

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