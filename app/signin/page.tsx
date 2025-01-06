import { Metadata } from "next"
import Client from "./client"

export const metadata: Metadata = {
  title: 'Sing in',
  description: 'Sing in on World Times',
  openGraph: {
    title: 'Sing in',
    description: 'Sing in on World Times',
    url: `https://online-newspaper.vercel.app/singin`,
    images: [
      {
        url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
        alt: 'Cover image of Word Times',
      }
    ],
  },
  twitter: {
    title: 'Sing in',
    description: 'Sing in on World Times',
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
  return(
    <Client/>
  )
}

export default Page