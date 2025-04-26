"use client"

import { FaLink } from 'react-icons/fa6'

const CopyLink = (props:{url:string}) => {

    const handleClick = () => {
        navigator.clipboard.writeText(props.url)
        .catch(err => {
            console.log('Link is not copied')
            console.error(err)
        })
    }

  return (
    <button onClick={handleClick} className='bg-black text-white rounded p-2 pt-1 pb-1 flex items-center gap-2 hover:text-gray-300 dark:bg-white dark:text-gray-950 dark:hover:text-gray-500'>
        <FaLink /> Copy
    </button>
  )
}

export default CopyLink