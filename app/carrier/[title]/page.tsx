import { getCarrierByTitle } from "@/actions/getcarrier"
import  ChooseTypeOfTextItem from "@/app/_components/carrier/showCarrierSSR";
import { notFound } from "next/navigation";
import { v4 as uuid } from "uuid";

const Page = async ({params}:{params:{title: string}}) => {
  const {success, error} = await getCarrierByTitle({title: decodeURIComponent(params.title.replaceAll('_', ' '))})

  if(error) notFound();

  return (
    <div className="min-h-screen pb-10">
      <h2 className='mt-20 text-5xl mb-20 font-bold leading-normal'>{decodeURIComponent(params.title.replaceAll('_', ' '))}</h2>
      <div>
        {success.text.split('$').map((item: string) => <ChooseTypeOfTextItem s={item} key={uuid()}/>)}
      </div>
    </div>
  )
}

export default Page