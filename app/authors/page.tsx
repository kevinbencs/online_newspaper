import Stop from '../image/stop.png';
import Image from 'next/image';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';

const Page = () => {
  const name = [
    'saefesfes',
    'saefesfes',
    'saefesfes',
    'saefesfes',
    'saefesfes',
    'saefesfes',
    'saefesfes',
    'saefesfes',
    'saefesfes',
    'saefesfes',
  ]
  return (
    <div className='min-h-[90vh] mt-32 mb-40'>
      <h2 className='text-center text-5xl mb-28'>Authors</h2>
      <section className='flex justify-center flex-wrap gap-24 author'>
        {name.map(r => <Link href={`/authors/${r}`} className='block' key={uuid()}>
          <div className=''><Image src={Stop} alt='esfse' className='max-h-40 max-w-40'/></div>
          <h3 className='text-center'>{r}</h3>
        </Link>)}
      </section>
    </div>
  )
}

export default Page