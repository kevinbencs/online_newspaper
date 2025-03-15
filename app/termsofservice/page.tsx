import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Terms of service on World Times',
    openGraph: {
        title: 'Terms of Service',
        description: 'Terms of service on World Times',
        url: `${process.env.URL}/termofservice`,
        images: [
            {
                url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
                alt: 'Cover image of Word Times',
            }
        ],
    },
    twitter: {
        title: 'Terms of Service',
        description: 'Terms of service on World Times',
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
        <h1 className="mb-10 mt-10 text-3xl">Terms of Service</h1>
        <div className="mb-3">By accessing or using the World Times website, you agree to the following terms:</div>
        <ul className=" list-decimal list-inside mb-8">
            <li className="mb-1 ml-2">Content Use: All content is for informational purposes only. Redistribution or reproduction without permission is prohibited.</li>
            <li className="mb-1 ml-2">User Responsibility: Users must not engage in unlawful, abusive, or fraudulent activities.</li>
            <li className="mb-1 ml-2">Third-party Links: We may include links to external websites. World Times is not responsible for their content or policies.</li>
            <li className="mb-1 ml-2">Data Usage: Anonymous data (e.g., article clicks) is collected to improve user experience. See our Privacy Policy for details.</li>
        </ul>
        <div>World Times reserves the right to update these terms at any time.</div>
    </div>
  )
}

export default Page