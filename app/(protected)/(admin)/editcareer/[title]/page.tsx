import { getCareerByTitle } from "@/actions/getcareer"
import Client from "./Client"
import { notFound } from "next/navigation"

const Page = async({params}:{params:{title: string}}) => {
    
    const {success, error} = await getCareerByTitle({title: decodeURIComponent(params.title.replaceAll('_', ' '))})

    if(error || success === null || !success) notFound()

    return (
        <Client lastUrl={decodeURIComponent(params.title)} _id={success._id} title={success.title} text={success.text}/>
    )
}

export default Page



