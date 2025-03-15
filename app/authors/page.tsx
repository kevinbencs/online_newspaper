import { getAuthor } from '@/actions/getauthor';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'Authors',
  description: 'Authors of World Times',
  openGraph: {
    title: "Authors",
    description: "Authors of World Times",
    url: `${process.env.URL}/authors`,
    images: [
      {
        url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
        alt: 'Cover image of Word Times',
      }
    ],
  },
  twitter: {
    title: 'Authors',
    description: "Authors of World Times",
    site: '',
    images: [
      {
        url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
        alt: 'Cover image of Word Times',
      }
    ],
  },
}




interface author {
  _id: string,
  name: string,
  image: string,
  role: string
}


const Page = async () => {

  const authors = await getAuthor()

  return (
    <div className='min-h-[90vh] mt-32 mb-40'>
      <h1 className='text-center text-5xl mb-28'>Authors</h1>
      <section className='flex justify-center flex-wrap gap-24 author'>
        {authors.error &&
          <div>{authors.error}</div>
        }
        {authors.success?.map((item: author) => <Link href={`/authors/${item.name.replaceAll(' ', '_')}/1`} className='block' key={item._id}>
          <div className='mb-2'><Image src={item.image} alt={'photo of '+item.name} className='max-h-40 max-w-40' width={160} height={160}/></div>
          <h3 className='text-center'>{item.name}</h3>
          <p className='text-center text-sm'>{item.role}</p>
        </Link>)}
      </section>
    </div>
  )
}

export default Page