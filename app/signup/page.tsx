import { Metadata } from "next"
import Client from "./client"

export const metadata: Metadata = {
  title: 'Sing up',
  description: 'Sing up on World Times',
  openGraph: {
    title: 'Sing up',
    description: 'Sing up on World Times',
    url: `${process.env.URL}/singup`,
    images: [
      {
        url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
        alt: 'Cover image of Word Times',
      }
    ],
  },
  twitter: {
    title: 'Sing up',
    description: 'Sing up on World Times',
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