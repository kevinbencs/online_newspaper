import Image from 'next/image'

const Img2 = (props: { id: string }) => {


    return (
        <div>
            <Image src={props.id.split(';')[0]} unoptimized={true} alt={props.id.split(';')[2]} className='w-[100%] block mb-1' width={600} height={337.5} />    
        </div>

    )
}

export default Img2