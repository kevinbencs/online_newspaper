import { Metadata } from "next"


export const metadata: Metadata = {
  title: 'Help',
  description: 'Help on World Times',
  openGraph: {
    title: "Help",
    description: "Help on World Times",
    url: `https://online-newspaper.vercel.app/privacypolicy`,
    images: [
      {
        url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
        alt: 'Cover image of Word Times',
      }
    ],
  },
  twitter: {
    title: 'Help',
    description: "Help on World Times",
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
    <div className="min-h-screen">
        <h1 className="mb-10 mt-10 text-3xl">Help</h1>
        <div className="mb-3">Need assistance? Our Help Center is here to guide you:</div>
        <ul className=" list-disc list-inside mb-8">
            <li className="mb-1 ml-2">Technical Support: Facing issues with the website? Email us at support&#64;worldtimes.com.</li>
            <li className="mb-1 ml-2">Feedback: Share your thoughts or report a problem using our contact form.</li>
        </ul>
        <div>We aim to respond to all queries within 24-48 hours.</div>
    </div>
  )
}

export default Page