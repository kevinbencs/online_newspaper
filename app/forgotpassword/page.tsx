import { Metadata } from 'next';
import Client from './client';


export const metadata: Metadata = {
  title: 'Reset password',
  description: 'Reset password for an account of Word Times',
  openGraph: {
    title: "Reset password",
    description: "Reset password for an account of Word Times",
    url: `https://online-newspaper.vercel.app/forgotpassword`,
    images: [
      {
        url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
        alt: 'Cover image of Word Times',
      }
    ],
  },
  twitter: {
    title: 'Reset password',
    description: "Reset password for an account of Word Times",
    site: '',
    images: [
      {
        url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
        alt: 'Cover image of Word Times',
      }
    ],
  },
}


const Page = () => {
  return (
    <Client />
  )
}

export default Page;