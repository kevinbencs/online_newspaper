'use client'

import { getVideoById } from '@/actions/getvideourl'
import  { useEffect, useState } from 'react'

interface videoUrl {
    url: string,
    title: string,
    _id: string
}

const Vid = (props: { id: string }) => {
    const [Video, setVideo] = useState<videoUrl | null | undefined>(null)
    useEffect(() => {
        getVideoById({ id: props.id })
            .then((res) => {
                setVideo(res.success)
            })
    }, [])
  return (
    <div>
        {Video &&
        <>
        <video controls width={600} height={337.5} className='w-full mb-1'>
            <source src={Video.url} type='video/mp4'/>
            Your browser does not support the video tag.
          </video>
        </>
        }
        {!Video &&
        <>
          <div className='text-red text-4xl'> There is no video</div>
        </>
        }
    </div>
  )
}

export default Vid