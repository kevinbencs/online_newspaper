'use client'

import { FaXTwitter } from "react-icons/fa6"; 

const ShareX = (props: {url: string, title: string}) => {
    const xShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(props.url)}&text=${encodeURIComponent(props.title)}`;

    const handleClick = () =>{
        window.open(xShareUrl, '_blank','noopener,noreferrer')
    }
  return (
    <button>
        <FaXTwitter size={25} className='dark:hover:text-white hover:text-gray-500' onClick={handleClick}/>
    </button>
  )
}

export default ShareX