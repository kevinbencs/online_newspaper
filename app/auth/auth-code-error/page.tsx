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

const Page = () => {
  return (
    <div className="h-full text-center pt-10 text-2xl">Error in auth</div>
  )
}

export default Page