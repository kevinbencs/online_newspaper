import { Metadata } from "next"


export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'Privacy policy of World Times',
  openGraph: {
    title: "Privacy policy",
    description: "Subscribe for newsletters of World Times",
    url: `https://online-newspaper.vercel.app/privacypolicy`,
    images: [
      {
        url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
        alt: 'Cover image of Word Times',
      }
    ],
  },
  twitter: {
    title: 'Privacy policy',
    description: "Privacy policy of World Times",
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
    <div>Page</div>
  )
}

export default Page