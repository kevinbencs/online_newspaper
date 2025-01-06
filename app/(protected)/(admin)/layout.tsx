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

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
        {children}
    </>
  )
}

export default Layout