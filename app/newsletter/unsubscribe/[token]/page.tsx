import { unsubscribeToken } from "@/actions/unsubscribenewsletter"
import { Metadata } from "next";


export const metadata: Metadata = {
  description: '',
  openGraph: {
  },
  twitter: {
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    noimageindex: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nocache: true,
      noimageindex: true,
    }
  }
}



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