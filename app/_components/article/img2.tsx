import { getImageById } from '@/actions/getimageurl'
import Image from 'next/image'

const Img = async (props: { id: string }) => {

    const {success} = await getImageById({ id: props.id })

    return (
        <div>
            {success &&
                <>
                    <Image src={success.url /*props.id.split(ß)[0]*/} alt={success.alt /*props.id.split(ß)[1]*/} className='w-[100%] block mb-1' width={600} height={337.5} />
                </>
            }
        </div>

    )
}

export default Img