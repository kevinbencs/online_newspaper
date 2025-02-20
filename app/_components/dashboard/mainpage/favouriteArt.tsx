'use client'

import Link from 'next/link'
import { v4 as uuid } from 'uuid'

interface dataArt {
    tit: string,
    dat: string,
    cat: string,
    article_count: number

}

const FavouriteArt = (props: { data: dataArt[] | null}) => {
    return (
        <section className='mb-20'>
            <h2 className='text-center text-xl mb-2'>The most popular article of the year</h2>
            <ul className='max-h-20 overflow-x-auto'>
                {props.data && props.data.map(item => <li key={`${uuid()}-${item.tit}`} ><Link href={`/${item.cat.toLowerCase()}/${item.dat.slice(0,4)}/${item.dat.slice(6,8)}/${item.dat.slice(10,12)}/${item.tit.replaceAll(' ','_').replaceAll('?','nb20')}`}>{item.tit}</Link> </li>)}
            </ul>
        </section>
    )
}

export default FavouriteArt