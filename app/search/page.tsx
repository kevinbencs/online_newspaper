import Link from "next/link";
import Pagination from "./pagination";
import Search from "./search";
import Rightsidebar from "../_components/category_menu_search/rightsidebar";
import Latest_important from "../_components/category_menu_search/latest_important";
import { v4 as uuid } from "uuid";


const Page = ({ searchParams }: { searchParams: { category: string, text: string, date_from: string, date_to: string, author: string, page: number, filter: string } }) => {
  const lastPage: number = 40;
  //filter, title theme, text


  const adadad = [
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyseT ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgposydjviosgjiesgksegjvsp',
      image: 'fefe'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgposydjviosgjiesgksegjvspaewfsaefgseagfvwsservde',
      image: 'fefe'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgwegwegposydjviosgjiesgksegjvwqefwegfsp',
      image: 'fefe'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjwegfwegwegwegvfdsvregergsaEWAEGWpsoegjspoejgposydjviosgjiesgksegjvsp',
      image: 'fefe'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgposydjviosgjiesgksegjvspasefpojsegjsepokgvsepojgvisoerojfpoasej',
      image: 'fefe'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgposydjviosgjiesgkawélfjawoipfjawpofjaifhioawefjaopwefsegjvsp',
      image: 'fefe'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgafjaioewfjapowfwifhnaoiuwfguiwfgfeposydjviosgjiesgksegjvsp',
      image: 'fefe'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgpoalkwefiowfjapowfjpoawjfawiojfawwfawfwasydjviosgjiesgksegjvsp',
      image: 'fefe'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgposydjviosgjiesgksegjvsawfjaiwoefjaiwofjapowfjioawjioawioahfwhhhhhhhhp',
      image: 'fefe'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgpoawjfioawfjaoipwfjpoyclyxjfciofhuwefzhweafaweffesjoesiogegjpsoegjspoejgposydjviosgjiesgksegjvsp',
      image: 'fefe'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgwafawfscyfcefgregthztzuhdhgdhgdfposydjviosgjiesgksegjvsp',
      image: 'fefe'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgposydjviosgjiesgksegjvspafjoaiowpfjsxyxfyfysdxcyycyxcyxyxyxy',
      image: 'fefe'
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgpoysjkfsjjfjjjjjjjysícgbfhzygfhszagfhsfsydjviosgjiesgksegjvsp',
      image: 'fefe'
    },
    
  ]

  return (
    <div className="relative">
      <Search />
      <section className="sm:flex sm:gap-2 mt-10 sm:flex-row">
        <Link href={`/search?text=${searchParams.text}&category=${searchParams.category}&author=${searchParams.author}&date_form=${searchParams.date_from}&date_to=${searchParams.date_to}&filter=title`} className="bg-gray-400 block pl-2 pr-2 pt-1 pb-1 mb-2 sm:mb-0 sm:w-24 text-center dark:bg-zinc-900 rounded hover:text-gray-100 text-xs">Title</Link>
        <Link href={`/search?text=${searchParams.text}&category=${searchParams.category}&author=${searchParams.author}&date_form=${searchParams.date_from}&date_to=${searchParams.date_to}&filter=theme`} className="bg-gray-400 block pl-2 pr-2 pt-1 pb-1 mb-2 sm:mb-0 sm:w-24 text-center dark:bg-zinc-900 rounded hover:text-gray-100 text-xs">Theme</Link>
        <Link href={`/search?text=${searchParams.text}&category=${searchParams.category}&author=${searchParams.author}&date_form=${searchParams.date_from}&date_to=${searchParams.date_to}&filter=text`} className="bg-gray-400 block  pl-2 pr-2 pt-1 pb-1  sm:w-24 text-center dark:bg-zinc-900 rounded hover:text-gray-100 text-xs">Text</Link>
      </section>

      <h2 className="text-center mt-32 mb-40 text-5xl text-slate-400">{searchParams.text}</h2>

      <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
        <div className="lg:w-[calc(100%-450px)] text-center">
          <div className="mb-10">
             {adadad.map(r => <Latest_important imageAlt={r.image} imageSrc={r.image} header={r.header} key={uuid()}/>)}
          </div>
          <Pagination searchParams={searchParams} lastPage={lastPage} />
        </div>
        <div className="lg:w-80">
          <Rightsidebar/>
        </div>
      </div>




    </div>
  )
}

export default Page