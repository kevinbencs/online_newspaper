import GoogleStore from '../../image/googlestore.png';
import AppleStore from '../../image/applestore.svg';
import HuaweiStore from '../../image/huawei-appgallery-seeklogo.svg';
import Image from 'next/image';

const Playstore = () => {
  return (
        <ul className='flex flex-col sm:flex-row gap-5 sm:gap-10 flex-wrap justify-center items-end '>
            <li>
                <a href='https://play.google.com/store/games?device=windows' target='_blank' className=' before:absolute overflow-hidden rounded before:box-content block before:z-10 before:block before:bg-zinc-950 before:opacity-70 before:w-0 before:h-full  relative before:rounded  hover:before:w-36 before:transition-all'>
                    <Image src={GoogleStore} alt='google play store' className='w-36 rounded  '/>
                </a>
            </li>
            <li>
                <a href='https://www.apple.com/hu/store' target='_blank' className=' before:absolute before:z-10 block before:bg-zinc-950 before:opacity-70 rounded overflow-hidden before:w-0 before:h-full relative before:rounded-md before:block hover:before:w-36 before:transition-all'>
                    <Image src={AppleStore} alt='apple store' className='w-36'/>
                </a>
            </li>
            <li>
                <a href='https://appgallery.huawei.com/Featured' target='_blank' className='before:absolute block before:z-10 before:bg-zinc-950 before:opacity-70 rounded overflow-hidden before:w-0 before:h-full  relative before:rounded-md before:block hover:before:w-36 before:transition-all'>
                    <Image src={HuaweiStore} alt='huawei store' className='w-36 '/>
                </a>
            </li>
        </ul>
  )
}

export default Playstore;