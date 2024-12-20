'use client'

import { getImageById } from '@/actions/getimageurl'
import Image from 'next/image'
import { useEffect, useState } from 'react'


interface imageUrl {
    url: string,
    alt: string,
    detail: string,
    _id: string
}

const Img = (props: { id: string }) => {
    const [image, setImage] = useState<imageUrl | null | undefined>(null)
    useEffect(() => {
        getImageById({ id: props.id })
            .then((res) => {
                setImage(res.success)
            })
    }, [])
    return (
        <div className='w-[550px]'>
            {image &&
                <>
                    <Image src={image.url} alt={image.alt} className='w-[100%] block mb-1' width={600} height={337.5} />
                </>
            }
            {!image &&
                <>
                    <div className='text-red text-4xl'>There is no image</div>
                </>
            }
        </div>

    )
}

export default Img