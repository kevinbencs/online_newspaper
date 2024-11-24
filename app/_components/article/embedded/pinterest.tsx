'use client'

import { PinterestEmbed } from 'react-social-media-embed';

const Pinterest = (props: { url: string }) => {
    return (
        <>
            <PinterestEmbed url={props.url}
                width={`100%`}
                height={`100%`}
            />
        </>
    )
}

export default Pinterest