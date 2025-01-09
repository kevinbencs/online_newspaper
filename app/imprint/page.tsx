import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Imprint',
    description: 'Imprint on World Times',
    openGraph: {
        title: 'Imprint',
        description: 'Imprint on World Times',
        url: `https://online-newspaper.vercel.app/singin`,
        images: [
            {
                url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
                alt: 'Cover image of Word Times',
            }
        ],
    },
    twitter: {
        title: 'Imprint',
        description: 'Imprint on World Times',
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
            <h1 className="mb-10 mt-10 text-3xl">Imprint</h1>
            <ul className="mb-6">
                <li className="mb-1">World Times</li>
                <li className="mb-1">123 Media Lane</li>
                <li className="mb-1">New York, NY 10001</li>
                <li className="mb-1">USA</li>
            </ul>
            <ul className=" list-disc list-inside mb-8">
                <li className="mb-2">Website Owner: World Times Media LLC</li>
                <li className="mb-2">Managing Director: John Doe</li>
                <li className="mb-2">Contact Email: admin@worldtimes.com</li>
                <li className="mb-2">Phone: +1 (123) 456-7890</li>
            </ul>
            <div>This website is operated by World Times Media LLC, a company registered in the United States. All rights reserved.</div>
        </div>
    )
}

export default Page