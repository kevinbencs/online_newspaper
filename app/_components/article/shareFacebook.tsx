'use client'

import { FaFacebook } from 'react-icons/fa6';

const ShareFacebook = (props: {url: string, title: string}) => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(props.url)}&quote=${encodeURIComponent(props.title)}`;

    const handleClick = () =>{
        window.open(facebookShareUrl, '_blank','noopener,noreferrer')
    }
  return (
    <button>
        <FaFacebook size={25} className='dark:hover:text-white hover:text-gray-500' onClick={handleClick}/>
    </button>
  )
}

export default ShareFacebook