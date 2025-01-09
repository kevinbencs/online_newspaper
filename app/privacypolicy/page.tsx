import { Metadata } from "next"


export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'Privacy policy of World Times',
  openGraph: {
    title: "Privacy policy",
    description: "Privacy policy of World Times",
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
    <div className="min-h-screen">
      <h1 className="mb-10 mt-10 text-3xl">Privacy Policy</h1>
      <div className="mb-3">Your privacy is important to us. This Privacy Policy explains how World Times collects, uses, and protects your information.</div>
      <div className="mb-3">Data We Collect:</div>
      <ul className=" list-disc list-inside mb-8">
        <li className="mb-1 ml-2">Anonymous Data: Information such as the number of article clicks is collected to improve content relevance.</li>
        <li className="mb-1 ml-2">Authentication Data: If you create an account, authentication data is securely managed via Supabase.</li>
      </ul>
      <div className="mb-3">How We Use Data:</div>
      <ul className=" list-disc list-inside mb-8">
        <li className="mb-1 ml-2">To analyze user interactions and improve our services.</li>
        <li className="mb-1 ml-2">To analyze user interactions and improve our services.</li>
      </ul>
      <div>We do not sell or share your personal data with third parties. For detailed inquiries, contact us at privacy@worldtimes.com.</div>
    </div>
  )
}

export default Page