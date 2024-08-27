import { useRouter } from 'next/router';

const Page = ({params}: {params:{year: string, month: string, day: string, title: string}}) => {

  return (
    <div>{params.title}</div>
  )
}

export default Page