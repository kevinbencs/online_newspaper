import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Cookie Policy',
    description: 'Cookie Policy on World Times',
    openGraph: {
        title: 'Cookie Policy',
        description: 'Cookie Policy on World Times',
        url: `https://online-newspaper.vercel.app/singin`,
        images: [
            {
                url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
                alt: 'Cover image of Word Times',
            }
        ],
    },
    twitter: {
        title: 'Cookie Policy',
        description: 'Cookie Policy on World Times',
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
        <h1 className="mb-10 mt-10 text-3xl">Cookie Policy</h1>
        <div className="mb-1">What Are Cookies?</div>
        <div className="mb-2">Cookies are small text files stored on your device to enhance your experience on our website.</div>
        <div className="mb-1">Cookies We Use:</div>
        <ul className=" list-disc list-inside mb-8">
            <li className="mb-1 ml-2">Supabase: Used for user authentication and session management.</li>
            <li className="mb-1 ml-2">Dropbox: Enables seamless storage and display of images across our platform.</li>
        </ul>
        <div>You can manage your cookie preferences in your browser settings. Please note that disabling cookies may affect functionality.</div>
    </div>
  )
}

export default Page