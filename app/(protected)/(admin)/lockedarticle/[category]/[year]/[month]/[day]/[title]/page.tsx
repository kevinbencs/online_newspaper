import Rules from '@/app/_components/newArticle/rules';
import { getLockedArticle } from '@/actions/getlockedarticle';
import Client from './client';


const Page = async ({params}: {params: {category: string, year: string, month: string, day: string, title: string}}) => {
  const date = params.year + '. ' + params.month + '. ' + params.day + '.';
  const res = await getLockedArticle({ title: decodeURIComponent(params.title.replaceAll('_', ' ')), date })


  return (
    <div className='mb-20'>
      <h1 className='mt-8 mb-10 text-5xl text-center'>Unlock article</h1>
      <Rules />

      <Client res ={res} params = {params}/>

    </div>
  )
}

export default Page
