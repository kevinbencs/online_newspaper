import { emailChange } from "@/actions/emailchange"
import { Metadata } from 'next'

export const metadata: Metadata = {

  description: "",
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

const Page = async ({searchParams}: {searchParams:{tokenHash:string,}}) => {
    const data = await emailChange({token: searchParams.tokenHash})
  return (
    <div className="h-[90vh]">
        <div className="mt-14 text-center text-3xl">{data.success} {data.error}</div>
    </div>
  )
}

export default Page