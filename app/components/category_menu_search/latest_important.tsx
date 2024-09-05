import Link from "next/link"
import Image from "next/image"
import Stop from '../../image/stop.png'

const Latest_important = (props: { imageSrc: string, imageAlt: string, header: string }) => {
  return (
    <section className="border-b mb-6">
      <Link href='/' className="flex gap-2 mb-4">
        <div className="max-w-60 min-w-60 overflow-hidden"><Image src={Stop} alt='fd' /></div>
        <section className="text-start">
          <h2 className="mb-1 font-semibold">{props.header}</h2>
          <div className="text-xs mb-1">eioewhjiowef</div>
          <p className="text-sm">awfajwfiojafjsaiofj wawiofsmkopwaejfposkf wakfpowa fwjfapofjkosdpjafaiopw jfpoasjysjfspoifjpwaoj fposajfaowjfpajf jaopsf jpaoijfpawj fpafjwafawf awef awf wa awf awfawfswaf aw s fawe af dsf aw aw poawjf poawf </p>
        </section>
      </Link>
      <div className="mb-2 ml-[35%] flex justify-between text-xs">
        <div>efgposemgoisegjnmisejg</div>
        <div>efgposemgoisegjnmisejg</div>
      </div>
    </section>

  )
}

export default Latest_important