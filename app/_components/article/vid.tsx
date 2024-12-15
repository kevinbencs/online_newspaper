const Vid = async (props: { id: string }) => {

  return (
    <div>
          <video controls width={600} height={337.5} className='w-full mb-1'>
            <source src={props.id.split(';')[0]} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
    </div>
  )
}

export default Vid