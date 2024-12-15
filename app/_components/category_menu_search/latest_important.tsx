import Link from "next/link"
import Img2 from "../article/img2"
import { IoLockClosed } from "react-icons/io5";

const Latest_important = (props: { imageId: string, title: string, date: string, author: string, category: string, detail: string, link: string, paywall: boolean }) => {
  return (
    <section className="border-b mb-6">
      <Link href={props.link} className="flex gap-2 mb-4">
        <div className="max-w-60 min-w-60 overflow-hidden">
          <Img2 id={props.imageId} />
        </div>
        <section className="text-start">
          <h2 className="mb-1 font-semibold">{props.title}</h2>
          <div className="text-xs mb-1">
            {props.paywall && <IoLockClosed />}
            {props.date}</div>
          <p className="text-sm">{props.detail} </p>
        </section>
      </Link>
      <div className="mb-2 ml-[35%] flex justify-between text-sm">
        <div><Link href={`/category/${props.category.toLowerCase()}`}>{props.category}</Link>  </div>
        <div><Link href={`/authors/${props.author.replaceAll(' ', '_')}`}>{props.author}</Link></div>
      </div>
    </section>

  )
}

export default Latest_important