import Rules from '@/app/_components/newArticle/rules';
import { getEditArticle } from '@/actions/geteditarticle';
import Client from './Client';



const Page = async ({ params }: { params: { category: string, year: string, month: string, day: string, title: string } }) => {
  const date = params.year + '. ' + params.month + '. ' + params.day + '.';

  const res = await getEditArticle({ title: params.title.replaceAll('_', ' ').replace('nb20','?'), date });

  return (
    <div className='mb-20'>
      <h1 className='mt-8 mb-10 text-5xl text-center'>Edit article</h1>
      <Rules />

      <Client params={params} res={res} />

    </div>
  )
}

export default Page

