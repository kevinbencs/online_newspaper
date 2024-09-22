import Latest_important from "../components/category_menu_search/latest_important";
import { v4 as uuid } from "uuid";
import Pagination from "./pagination";
import Rightsidebar from "../components/category_menu_search/rightsidebar";

const Page = ({searchParams}: {searchParams:{page: number}}) => {
  const lastPage: number = 40;

  const adadad = [
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyseT ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgposydjviosgjiesgksegjvsp',
      image: ''
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgposydjviosgjiesgksegjvspaewfsaefgseagfvwsservde',
      image: ''
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgwegwegposydjviosgjiesgksegjvwqefwegfsp',
      image: ''
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjwegfwegwegwegvfdsvregergsaEWAEGWpsoegjspoejgposydjviosgjiesgksegjvsp',
      image: ''
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgposydjviosgjiesgksegjvspasefpojsegjsepokgvsepojgvisoerojfpoasej',
      image: ''
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgposydjviosgjiesgkawélfjawoipfjawpofjaifhioawefjaopwefsegjvsp',
      image: ''
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgafjaioewfjapowfwifhnaoiuwfguiwfgfeposydjviosgjiesgksegjvsp',
      image: ''
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgpoalkwefiowfjapowfjpoawjfawiojfawwfawfwasydjviosgjiesgksegjvsp',
      image: ''
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgposydjviosgjiesgksegjvsawfjaiwoefjaiwofjapowfjioawjioawioahfwhhhhhhhhp',
      image: ''
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgpoawjfioawfjaoipwfjpoyclyxjfciofhuwefzhweafaweffesjoesiogegjpsoegjspoejgposydjviosgjiesgksegjvsp',
      image: ''
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgwafawfscyfcefgregthztzuhdhgdhgdfposydjviosgjiesgksegjvsp',
      image: ''
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgposydjviosgjiesgksegjvspafjoaiowpfjsxyxfyfysdxcyycyxcyxyxyxy',
      image: ''
    },
    {
      header: 'asefsefgesfgsgsegsesgse gsegs gsegseg segsegyse ysg ysg se gsg',
      parag: 'oiwehnfuerwifhniuewrhoifjpoefjwopfjewpofkaqjf pqfjipoq whiq jwqpoj iqwjf oefjpo wejpowejf ioewf jpoqwfj oiwef ioqef poe jfpo po j jiewj fpowkefpowej fowejkfpowejfeowpfpweijfiewjf poewjf weioj fpo jie jpo jweio jwepo jwoij fpowej fiowe poewqjfiwe fpwejf iewjf powej fiwejf powekfpoejfpo wqkpoqjfdpoi wejfpowejk fpowe fwopefpo  o wjfiowejfpowej iwejf wiej fpowe fpowjfpowej fwepjf powe fpowe fpowefj.',
      id: 'asfeasgfesjoesiogegjpsoegjspoejgpoysjkfsjjfjjjjjjjysícgbfhzygfhszagfhsfsydjviosgjiesgksegjvsp',
      image: ''
    },
    
  ]

  return (
    <div className="relative">



      <h2 className="text-center mt-32 mb-40 text-5xl text-slate-400">Latest</h2>

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