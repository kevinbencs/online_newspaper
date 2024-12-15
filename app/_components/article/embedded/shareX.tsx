'use client'

import { FaXTwitter } from "react-icons/fa6"; 

const ShareX = (props: {url: string, title: string}) => {
    const xShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(props.url)}&text=${encodeURIComponent(props.title)}`;

    const handleClick = () =>{
        window.open(xShareUrl, '_blank','noopener,noreferrer')
    }
  return (
    <button onClick={handleClick}>
        <FaXTwitter size={25} className='dark:hover:text-gray-500 hover:text-gray-300 dark:text-white' />
    </button>
  )
}

export default ShareX