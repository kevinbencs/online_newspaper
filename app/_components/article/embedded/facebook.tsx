'use client'

import { FacebookEmbed } from 'react-social-media-embed';

const Facebook = (props:{url:string}) => {
    return (
        <>
            <FacebookEmbed url={props.url} width={'100%'} />
        </>
    )
}

export default Facebook