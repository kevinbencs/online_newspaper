import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'About',
    description: 'About of World Times',
    openGraph: {
        title: 'About',
        description: 'About of World Times',
        url: `${process.env.URL}/world_times_about`,
        images: [
            {
                url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
                alt: 'Cover image of Word Times',
            }
        ],
    },
    twitter: {
        title: 'About',
        description: 'About of World Times',
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
            <h1 className="mb-10 mt-10 text-3xl">About</h1>
            <p className="mb-3">
                Welcome to World Times, your trusted source for global news and insightful reporting. At World Times, we aim to provide accurate, timely, and engaging content from around the world.
            </p>
            <p className="mb-3">
                Our mission is to inform, inspire, and connect readers by covering stories that matter—from breaking news and current events to culture, technology, and more.
                With a commitment to transparency and journalistic integrity, we strive to be your go-to platform for staying informed in an ever-changing world.
            </p>
        </div>
    )
}

export default Page