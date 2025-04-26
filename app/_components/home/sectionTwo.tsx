import Link from 'next/link';
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
                    <Link href={`/${res.data[0].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}`} className='category uppercase drop-shadow-md font-bold text-[10px] category-picture'>{res.data[0].category}</Link>
                    <Link href={`/${res.data[0].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}/${res.data[0].date.slice(0, 4)}/${res.data[0].date.slice(6, 8)}/${res.data[0].date.slice(10, 12)}/${res.data[0].title.replaceAll(' ', '_').replace('?', 'nb20')}`} >
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
                    <Link href={`/${res.data[1].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}`} className='category uppercase drop-shadow-md font-bold text-[10px] category-picture'>{res.data[1].category}</Link>
                    <Link href={`/${res.data[1].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}/${res.data[1].date.slice(0, 4)}/${res.data[1].date.slice(6, 8)}/${res.data[1].date.slice(10, 12)}/${res.data[1].title.replaceAll(' ', '_').replace('?', 'nb20')}`} >
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
                {res.data[2] && <div className='mb-5 '>
                    <Link href={`/${res.data[2].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}`} className='category uppercase drop-shadow-md font-bold text-[10px]'>{res.data[2].category}</Link>
                    <Link href={`/${res.data[2].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}/${res.data[2].date.slice(0, 4)}/${res.data[2].date.slice(6, 8)}/${res.data[2].date.slice(10, 12)}/${res.data[2].title.replaceAll(' ', '_').replace('?', 'nb20')}`} className='mb-5 block '>
                        <article>
                            {res.data[2].paywall && <div><IoLockClosed /></div>}
                            <h2 className='text-lg font-bold'>{res.data[2].title}</h2>
                            <p>{res.data[2].detail}</p>
                        </article>
                    </Link>
                </div>}
                {res.data[3] && <div className='mb-5 '>
                    <Link href={`/${res.data[3].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}`} className='category uppercase drop-shadow-md font-bold text-[10px]'>{res.data[3].category}</Link>
                    <Link href={`/${res.data[3].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}/${res.data[3].date.slice(0, 4)}/${res.data[3].date.slice(6, 8)}/${res.data[3].date.slice(10, 12)}/${res.data[3].title.replaceAll(' ', '_').replace('?', 'nb20')}`} className='mb-5 block '>
                        <article>
                            {res.data[3].paywall && <div><IoLockClosed /></div>}
                            <h2 className='text-lg font-bold'>{res.data[3].title}</h2>
                            <p>{res.data[3].detail}</p>
                        </article>
                    </Link>
                </div>}
            </div>
            <div className='md:max-w-[calc((100%-32px)/3)]'>
                {res.data[4] && <div className='mb-5 '>
                    <Link href={`/${res.data[4].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}`} className='category uppercase drop-shadow-md font-bold text-[10px] category-picture'>{res.data[4].category}</Link>
                    <Link href={`/${res.data[4].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}/${res.data[4].date.slice(0, 4)}/${res.data[4].date.slice(6, 8)}/${res.data[4].date.slice(10, 12)}/${res.data[4].title.replaceAll(' ', '_').replace('?', 'nb20')}`} >
                        <div className='overflow-hidden'>
                        <Img id={res.data[4].cover_img_id} />
                        </div>
                        <article>
                            {res.data[4].paywall && <div><IoLockClosed /></div>}
                            <h2 className='text-lg font-bold'>{res.data[4].title}</h2>
                            <p>{res.data[4].detail}</p>
                        </article>
                    </Link>
                </div>}
                {res.data[5] && <div className='mb-5 '>
                    <Link href={`/${res.data[5].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}`} className='category uppercase drop-shadow-md font-bold text-[10px]'>{res.data[5].category}</Link>
                    <Link href={`/${res.data[5].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}/${res.data[5].date.slice(0, 4)}/${res.data[5].date.slice(6, 8)}/${res.data[5].date.slice(10, 12)}/${res.data[5].title.replaceAll(' ', '_').replace('?', 'nb20')}`} className='mb-5 block '>
                        <article>
                            {res.data[5].paywall && <div><IoLockClosed /></div>}
                            <h2 className='text-lg font-bold'>{res.data[5].title}</h2>
                            <p>{res.data[5].detail}</p>
                        </article>
                    </Link>
                </div>}
                {res.data[6] && <div className='mb-5 '>
                    <Link href={`/${res.data[6].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}`} className='category uppercase drop-shadow-md font-bold text-[10px]'>{res.data[6].category}</Link>
                    <Link href={`/${res.data[6].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}/${res.data[6].date.slice(0, 4)}/${res.data[6].date.slice(6, 8)}/${res.data[6].date.slice(10, 12)}/${res.data[6].title.replaceAll(' ', '_').replace('?', 'nb20')}`} className='mb-5 block '>
                        <article>
                            {res.data[6].paywall && <div><IoLockClosed /></div>}
                            <h2 className='text-lg font-bold'>{res.data[6].title}</h2>
                            <p>{res.data[6].detail}</p>
                        </article>
                    </Link>
                </div>}
                {res.data[7] && <div className='mb-5 '>
                    <Link href={`/${res.data[7].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}`} className='category uppercase drop-shadow-md font-bold text-[10px]'>{res.data[7].category}</Link>
                    <Link href={`/${res.data[7].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}/${res.data[7].date.slice(0, 4)}/${res.data[7].date.slice(6, 8)}/${res.data[7].date.slice(10, 12)}/${res.data[7].title.replaceAll(' ', '_').replace('?', 'nb20')}`} className='mb-5 block '>
                        <article>
                            {res.data[7].paywall && <div><IoLockClosed /></div>}
                            <h2 className='text-lg font-bold'>{res.data[7].title}</h2>
                            <p>{res.data[7].detail}</p>
                        </article>
                    </Link>
                </div>}
                {res.data[8] && <div className='mb-5 '>
                    <Link href={`/${res.data[8].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}`} className='category uppercase drop-shadow-md font-bold text-[10px]'>{res.data[8].category}</Link>
                    <Link href={`/${res.data[8].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}/${res.data[8].date.slice(0, 4)}/${res.data[8].date.slice(6, 8)}/${res.data[8].date.slice(10, 12)}/${res.data[8].title.replaceAll(' ', '_').replace('?', 'nb20')}`} className='mb-5 block '>
                        <article>
                            {res.data[8].paywall && <div><IoLockClosed /></div>}
                            <h2 className='text-lg font-bold'>{res.data[8].title}</h2>
                            <p>{res.data[8].detail}</p>
                        </article>
                    </Link>
                </div>}
            </div>
            <div className='md:max-w-[calc((100%-32px)/3)]'>
                {res.data[9] && <div className='mb-5 '>
                    <Link href={`/${res.data[9].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}`} className='category uppercase drop-shadow-md font-bold text-[10px] category-picture'>{res.data[9].category}</Link>
                    <Link href={`/${res.data[9].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}/${res.data[9].date.slice(0, 4)}/${res.data[9].date.slice(6, 8)}/${res.data[9].date.slice(10, 12)}/${res.data[9].title.replaceAll(' ', '_').replace('?', 'nb20')}`} >
                        <div className='overflow-hidden'>
                        <Img id={res.data[9].cover_img_id} />
                        </div>
                        <article>
                            {res.data[9].paywall && <div><IoLockClosed /></div>}
                            <h2 className='text-lg font-bold'>{res.data[9].title}</h2>
                            <p>{res.data[9].detail}</p>
                        </article>
                    </Link>
                </div>}
                {res.data[10] && <div className='mb-5 '>
                    <Link href={`/${res.data[10].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}`} className='category uppercase drop-shadow-md font-bold text-[10px] category-picture'>{res.data[10].category}</Link>
                    <Link href={`/${res.data[10].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}/${res.data[10].date.slice(0, 4)}/${res.data[10].date.slice(6, 8)}/${res.data[10].date.slice(10, 12)}/${res.data[10].title.replaceAll(' ', '_').replace('?', 'nb20')}`} >
                        <div className='overflow-hidden'>
                        <Img id={res.data[10].cover_img_id} />
                        </div>
                        <article>
                            {res.data[10].paywall && <div><IoLockClosed /></div>}
                            <h2 className='text-lg font-bold'>{res.data[10].title}</h2>
                            <p>{res.data[10].detail}</p>
                        </article>
                    </Link>
                </div>}
                {res.data[11] && <div className='mb-5 '>
                    <Link href={`/${res.data[11].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}`} className='category uppercase drop-shadow-md font-bold text-[10px]'>{res.data[11].category}</Link>
                    <Link href={`/${res.data[11].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}/${res.data[11].date.slice(0, 4)}/${res.data[11].date.slice(6, 8)}/${res.data[11].date.slice(10, 12)}/${res.data[11].title.replaceAll(' ', '_').replace('?', 'nb20')}`} className='mb-5 block '>
                        <article>
                            {res.data[11].paywall && <div><IoLockClosed /></div>}
                            <h2 className='text-lg font-bold'>{res.data[11].title}</h2>
                            <p>{res.data[11].detail}</p>
                        </article>
                    </Link>
                </div>}
                {res.data[12] && <div className='mb-5 '>
                    <Link href={`/${res.data[12].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}`} className='category uppercase drop-shadow-md font-bold text-[10px]'>{res.data[12].category}</Link>
                    <Link href={`/${res.data[12].category.toLowerCase().replaceAll(' ', '').replace('&', '_')}/${res.data[12].date.slice(0, 4)}/${res.data[12].date.slice(6, 8)}/${res.data[12].date.slice(10, 12)}/${res.data[12].title.replaceAll(' ', '_').replace('?', 'nb20')}`} className='mb-5 block '>
                        <article>
                            {res.data[12].paywall && <div><IoLockClosed /></div>}
                            <h2 className='text-lg font-bold'>{res.data[12].title}</h2>
                            <p>{res.data[12].detail}</p>
                        </article>
                    </Link>
                </div>}
            </div>
        </div>
    )
}

export default SectionTwo