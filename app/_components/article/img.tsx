

import { getImageById } from '@/actions/getimageurl'
import Image from 'next/image'

const Img = async (props: { id: string }) => {

    const {success} = await getImageById({ id: props.id })
            
    return (
        <div>
            {success &&
                <>
                    <Image src={success.url} alt={success.alt} className='w-[100%] block mb-1' width={600} height={337.5} />
                    <div className='mb-10 text-xs'>{success.detail}</div>
                </>
            }
        </div>

    )
}

export default Img