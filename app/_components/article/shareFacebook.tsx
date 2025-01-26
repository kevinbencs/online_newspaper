'use client'

import { saveShare } from '@/actions/saveshare';
import { FaFacebook } from 'react-icons/fa6';

const ShareFacebook = (props: { url: string, title: string }) => {
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=https://online-newspaper.vercel.app${encodeURIComponent(props.url)}&quote=${encodeURIComponent(props.title)}`;

  const handleClick = async () => {
    await saveShare({ url: props.url, share: 'facebook' })
    window.open(facebookShareUrl, '_blank', 'noopener,noreferrer')
  }
  return (
    <button onClick={handleClick}>
      <FaFacebook size={25} className='dark:hover:text-gray-500 hover:text-gray-300 dark:text-white' />
    </button>
  )
}

export default ShareFacebook