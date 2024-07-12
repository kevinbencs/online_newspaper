import Link from 'next/link';
import GoogleStore from '../../image/googlestore.png';
import AppleStore from '../../image/applestore.svg';
import HuaweiStore from '../../image/huawei-appgallery-seeklogo.svg';
import Image from 'next/image';

const Playstore = () => {
  return (
        <ul className='flex gap-10 flex-wrap justify-center content-center '>
            <li>
                <Link href='https://play.google.com/store/games?device=windows' className='before:absolute  before:bg-zinc-950 before:opacity-70 before:w-0 before:h-full before:z-10 relative before:rounded before:-translate-x-72px hover:before:w-36 before:transition-all'>
                    <Image src={GoogleStore} alt='google play store' className='w-36 rounded  '/>
                </Link>
            </li>
            <li>
                <Link href='https://www.apple.com/hu/store' className='before:absolute  before:bg-zinc-950 before:opacity-70 before:w-0 before:h-full before:z-10 relative before:rounded before:-translate-x-72px hover:before:w-36 before:transition-all'>
                    <Image src={AppleStore} alt='apple store' className='w-36  '/>
                </Link>
            </li>
            <li>
                <Link href='https://appgallery.huawei.com/Featured' className='before:absolute  before:bg-zinc-950 before:opacity-70 before:w-0 before:h-full before:z-10 relative before:rounded before:-translate-x-72px hover:before:w-36 before:transition-all'>
                    <Image src={HuaweiStore} alt='huawei store' className='w-36 '/>
                </Link>
            </li>
        </ul>
  )
}

export default Playstore;