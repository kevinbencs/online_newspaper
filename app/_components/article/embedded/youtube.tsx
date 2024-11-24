'use client'

import { YouTubeEmbed } from 'react-social-media-embed';

const Youtube = (props: { url: string }) => {
    return (
        <>
            <YouTubeEmbed url={props.url} width={`100%`} height={`100%`} />
        </>
    )
}

export default Youtube