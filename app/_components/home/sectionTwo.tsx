import Link from 'next/link';
import Image from "next/image";
import Stop from '../../image/stop.png'
import { mainSection, sectionTwo } from '@/actions/getmainnews';
import Img from '../article/img2';
import { deleteArticle } from '@/actions/deletearticels';

const SectionTwo = async () => {
    const res = await sectionTwo()
    if (res.error) return (
        <div>{res.error}</div>
    )

    if (res.data) return (
        <div className='md:flex md:gap-4 mb-12'>
            <div>
                <div className='mb-5 '>
                    <Link href='/latest/faew' className='category uppercase text-[10px] category-picture'>afdwqfwqfwq</Link>
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
                    <Link href='/latest/faew' className='category uppercase text-[10px] category-picture'>afdwqfwqfwq</Link>
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
                    <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
                    <Link href='/' className='mb-5 block '>
                        <article>
                            <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
                            <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
                        </article>
                    </Link>
                </div>
                <div className='mb-5 '>
                    <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
                    <Link href='/' className='mb-5 block '>
                        <article>
                            <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
                            <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
                        </article>
                    </Link>
                </div>
            </div>
            <div>
                <div className='mb-5 '>
                    <Link href='/latest/faew' className='category uppercase text-[10px] category-picture'>afdwqfwqfwq</Link>
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
                    <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
                    <Link href='/' className='mb-5 block '>
                        <article>
                            <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
                            <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
                        </article>
                    </Link>
                </div>
                <div className='mb-5 '>
                    <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
                    <Link href='/' className='mb-5 block '>
                        <article>
                            <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
                            <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
                        </article>
                    </Link>
                </div>
                <div className='mb-5 '>
                    <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
                    <Link href='/' className='mb-5 block '>
                        <article>
                            <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
                            <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
                        </article>
                    </Link>
                </div>
                <div className='mb-5 '>
                    <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
                    <Link href='/' className='mb-5 block '>
                        <article>
                            <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
                            <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
                        </article>
                    </Link>
                </div>
            </div>
            <div>
                <div className='mb-5 '>
                    <Link href='/latest/faew' className='category uppercase text-[10px] category-picture'>afdwqfwqfwq</Link>
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
                    <Link href='/latest/faew' className='category uppercase text-[10px] category-picture'>afdwqfwqfwq</Link>
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
                    <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
                    <Link href='/' className='mb-5 block '>
                        <article>
                            <h2 className='text-lg font-bold'>segseges e gesgseg</h2>
                            <p>awfawf awfbawfhb awufhaiowfh aowhfioahoiawh oawh foiawfh aoiwfh oiawhf oiawh</p>
                        </article>
                    </Link>
                </div>
                <div className='mb-5 '>
                    <Link href='/latest/faew' className='category uppercase text-[10px]'>afdwqfwqfwq</Link>
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