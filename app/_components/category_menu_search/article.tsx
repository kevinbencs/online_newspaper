import Link from "next/link";
import Image from "next/image";
import Stop from '../../image/stop.png';

interface DataGet {
  header: string,
  parag: string,
  id: string,
  image: string
}

const Article = (props: { article: DataGet }) => {
  return (
    <>
      
      <Link href='/' className="flex">
        <Image src={Stop} alt='stop' />
        <div>
          <h2>{props.article.header}</h2>
          <p>{props.article.parag}</p>
        </div>
      </Link>
      <div><Link href='/category/faew' className='category  text-[10px] category-picture'>afdwqfwqfwq</Link></div>
    </>

  )
}

export default Article