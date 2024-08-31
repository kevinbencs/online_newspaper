import Link from "next/link"
import Image from "next/image"
import Stop from '../../image/stop.png'

const Latest_important = (props: {imageSrc: string, imageAlt: string, header:string}) => {
  return (
    <Link href='/' className="flex gap-2">
        <Image src={Stop} alt='fd'/>
        <h2>{props.header}</h2>
    </Link>
  )
}

export default Latest_important