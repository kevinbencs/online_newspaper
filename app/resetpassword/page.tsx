import { Metadata } from 'next';
import Client from './client';

export const metadata: Metadata = {
    title: 'Add a new password',
    description: 'Add a new password for an account of Word Times',
    openGraph: {
        title: "Add a new password",
        description: "Reset password for an account of Word Times",
        url: `${process.env.URL}/resetpassword`,
        images: [
            {
                url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
                alt: 'Cover image of Word Times',
            }
        ],
    },
    twitter: {
        title: 'Add a new password',
        description: "Add a new password for an account of Word Times",
        site: '',
        images: [
            {
                url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
                alt: 'Cover image of Word Times',
            }
        ],
    },
    robots: {
        index: false,
        follow: true,
        nocache: true,
        noarchive: true,
        noimageindex: true,
        googleBot: {
            index: false,
            follow: true,
            noarchive: true,
            nocache: true,
            noimageindex: true,
        }
    }
}

const Page = () => {
    return (
        <Client />
    )
}

export default Page