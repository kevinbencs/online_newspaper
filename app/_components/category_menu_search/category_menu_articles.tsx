import Link from "next/link";
import Img from '../article/img2';


const Category_menu_articles = (props: { imageId: string, title: string, detail: string, category_name: string, category_name_link: string, date: string, link: string }) => {

  return (
    <div className="border-b mb-6">
      <Link href={props.link} className="flex gap-2 mb-4">
        <div className="max-w-60 min-w-60 overflow-hidden">
          <Img id={props.imageId} />
        </div>
        <section className="text-start">
          <h2 className="mb-1 font-semibold">{props.title}</h2>
          <div className="text-xs mb-1">{props.date}</div>
          <p className="text-sm">{props.detail} </p>
        </section>
      </Link>
      <div className="mb-2 ml-[35%] flex justify-between text-xs">
        <div><Link href={`${props.category_name_link}`}>{props.category_name}</Link></div>
      </div>
    </div>
  )
}

export default Category_menu_articles