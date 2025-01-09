import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Contact us on World Times',
    openGraph: {
        title: 'Contact Us',
        description: 'Contact us on World Times',
        url: `https://online-newspaper.vercel.app/singin`,
        images: [
            {
                url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
                alt: 'Cover image of Word Times',
            }
        ],
    },
    twitter: {
        title: 'Contact Us',
        description: 'Contact us on World Times',
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
            <h1 className="mb-10 mt-10 text-3xl">Contact Us</h1>
            <div className="mb-1">Have questions, feedback, or story tips? We&apos;d love to hear from you!</div>
            <div className="mb-3">You can reach us through the following channels:</div>
            <ul className=" list-disc list-inside mb-8">
                <li className="mb-1 ml-2">Email: contact&#64;worldtimes.com</li>
                <li className="mb-1 ml-2">Phone: +1 (123) 456-7890</li>
                <li className="mb-1 ml-2">Address: 123 Media Lane, New York, NY 10001, USA</li>
            </ul>
            <div>For inquiries related to advertising, partnerships, or technical issues, please mention the topic in the subject line for faster response.</div>
        </div>
    )
}

export default Page