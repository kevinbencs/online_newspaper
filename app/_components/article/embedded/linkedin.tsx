'use client'

import { LinkedInEmbed } from 'react-social-media-embed';

const Linkedin = (props: { url: string }) => {
    return (
        <>
            <LinkedInEmbed url={props.url} width={`100%`} />
        </>
    )
}

export default Linkedin