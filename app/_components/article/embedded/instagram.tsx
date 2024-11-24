'use client'

import { InstagramEmbed } from 'react-social-media-embed';

const Instagram = (props: { url: string }) => {
    return (
        <>
            <InstagramEmbed url={props.url} width={`100%`} captioned />
        </>
    )
}

export default Instagram