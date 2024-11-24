
import { getVideoById } from '@/actions/getvideourl'

const Vid = async (props: { id: string }) => {

  const { success } = await getVideoById({ id: props.id })


  return (
    <div>
      {success &&
        <>
          <video controls width={600} height={337.5} className='w-full mb-1'>
            <source src={success.url} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
          <div className='mb-10 text-xs'>{success.title}</div>
        </>
      }
    </div>
  )
}

export default Vid