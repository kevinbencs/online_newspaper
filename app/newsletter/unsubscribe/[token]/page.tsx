import { unsubscribeToken } from "@/actions/unsubscribenewsletter"


const Page = async ({params}: {params:{token: string}}) => {
    const data = await unsubscribeToken(params.token);
    
  return (
    <div className="flex justify-center mt-32 h-[90vh] text-4xl">
        {data.success &&
            <div>{data.success}</div>
        }
        {data.failed && 
            <div>{data.failed}</div>
        }
    </div>
  )
}

export default Page