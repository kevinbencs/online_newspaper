import Link from 'next/link';
import Image from "next/image";
import Stop from '../../image/stop.png'
import { sectionTwo } from '@/actions/getmainnews';
import Img from '../article/img2';
import { IoLockClosed } from "react-icons/io5";

const SectionTwo = async () => {
    const res = await sectionTwo()
    if (res.error) return (
        <div>{res.error}</div>
    )

    if (res.data) return (
        <div className='md:flex md:gap-4 mb-12'>
            <div className='md:max-w-[calc((100%-32px)/3)]'>
                {res.data[0] && <div className='mb-5 '>
                    <Link href={`/${res.data[0].category.toLowerCase()}`} className='category uppercase drop-shadow-md font-bold text-[10px] category-picture'>{res.data[0].category}</Link>
                    <Link href={`/${res.data[0].category.toLowerCase()}/${res.data[0].date.slice(0, 4)}/${res.data[0].date.slice(6, 8)}/${res.data[0].date.slice(10, 12)}/${res.data[0].title.replaceAll(' ', '_')}`} >
                        <div className='overflow-hidden '>
                            <Img id={res.data[0].cover_img_id} />
                        </div>
                        <article>
                            {res.data[0].paywall && <div><IoLockClosed /></div>}
                            <h2 className='text-lg font-bold'>{res.data[0].title}</h2>
                            <p>{res.data[0].detail}</p>
                        </article>
                    </Link>
                </div>}
                {res.data[1] && <div className='mb-5 '>
                    <Link href={`/${res.data[1].category.toLowerCase()}`} className='category uppercase drop-shadow-md font-bold text-[10px] category-picture'>{res.data[1].category}</Link>
                    <Link href={`/${res.data[1].category.toLowerCase()}/${res.data[1].date.slice(0, 4)}/${res.data[1].date.slice(6, 8)}/${res.data[1].date.slice(10, 12)}/${res.data[1].title.replaceAll(' ', '_')}`} >
                        <div className='overflow-hidden'>
                            <Img id={res.data[1].cover_img_id} />
                        </div>
                        <article>
                            {res.data[1].paywall && <div><IoLockClosed /></div>}
                            <h2 className='text-lg font-bold md:text-2xl'>{res.data[1].title}</h2>
                            <p>{res.data[1].detail}</p>
                        </article>
                    </Link>
                </div>}
                <div className='mb-5 '>
                    <Link href='/latest/faew' className='category uppercase drop-shadow-md font-bold text-[10px]'>afdwqfwqfwq</Link>
                    <Link href='/' className='mb-5 block '>
                        <article>
                            <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
                            <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
                        </article>
                    </Link>
                </div>
                <div className='mb-5 '>
                    <Link href='/latest/faew' className='category uppercase drop-shadow-md font-bold text-[10px]'>afdwqfwqfwq</Link>
                    <Link href='/' className='mb-5 block '>
                        <article>
                            <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
                            <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
                        </article>
                    </Link>
                </div>
            </div>
            <div className='md:max-w-[calc((100%-32px)/3)]'>
                <div className='mb-5 '>
                    <Link href='/latest/faew' className='category uppercase drop-shadow-md font-bold text-[10px] category-picture'>afdwqfwqfwq</Link>
                    <Link href='/' >
                        <div className='overflow-hidden'>
                            <Image src={Stop} alt='Stop' />
                        </div>
                        <article>
                            <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
                            <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
                        </article>
                    </Link>
                </div>
                <div className='mb-5 '>
                    <Link href='/latest/faew' className='category uppercase drop-shadow-md font-bold text-[10px]'>afdwqfwqfwq</Link>
                    <Link href='/' className='mb-5 block '>
                        <article>
                            <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
                            <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
                        </article>
                    </Link>
                </div>
                <div className='mb-5 '>
                    <Link href='/latest/faew' className='category uppercase drop-shadow-md font-bold text-[10px]'>afdwqfwqfwq</Link>
                    <Link href='/' className='mb-5 block '>
                        <article>
                            <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
                            <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
                        </article>
                    </Link>
                </div>
                <div className='mb-5 '>
                    <Link href='/latest/faew' className='category uppercase drop-shadow-md font-bold text-[10px]'>afdwqfwqfwq</Link>
                    <Link href='/' className='mb-5 block '>
                        <article>
                            <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
                            <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
                        </article>
                    </Link>
                </div>
                <div className='mb-5 '>
                    <Link href='/latest/faew' className='category uppercase drop-shadow-md font-bold text-[10px]'>afdwqfwqfwq</Link>
                    <Link href='/' className='mb-5 block '>
                        <article>
                            <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
                            <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
                        </article>
                    </Link>
                </div>
            </div>
            <div className='md:max-w-[calc((100%-32px)/3)]'>
                <div className='mb-5 '>
                    <Link href='/latest/faew' className='category uppercase drop-shadow-md font-bold text-[10px] category-picture'>afdwqfwqfwq</Link>
                    <Link href='/' >
                        <div className='overflow-hidden'>
                            <Image src={Stop} alt='Stop' />
                        </div>
                        <article>
                            <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
                            <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
                        </article>
                    </Link>
                </div>
                <div className='mb-5 '>
                    <Link href='/latest/faew' className='category uppercase drop-shadow-md font-bold text-[10px] category-picture'>afdwqfwqfwq</Link>
                    <Link href='/' >
                        <div className='overflow-hidden'>
                            <Image src={Stop} alt='Stop' />
                        </div>
                        <article>
                            <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
                            <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
                        </article>
                    </Link>
                </div>
                <div className='mb-5 '>
                    <Link href='/latest/faew' className='category uppercase drop-shadow-md font-bold text-[10px]'>afdwqfwqfwq</Link>
                    <Link href='/' className='mb-5 block '>
                        <article>
                            <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
                            <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
                        </article>
                    </Link>
                </div>
                <div className='mb-5 '>
                    <Link href='/latest/faew' className='category uppercase drop-shadow-md font-bold text-[10px]'>afdwqfwqfwq</Link>
                    <Link href='/' className='mb-5 block '>
                        <article>
                            <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
                            <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
                        </article>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SectionTwo