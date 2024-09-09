import Rightsidebar from '@/app/components/category_menu_search/rightsidebar';
import Image from 'next/image';
import Stop from '../../../../../image/stop.png';

const Page = ({ params }: { params: { year: string, month: string, day: string, title: string } }) => {
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
    <>
      <h2 className='mt-20 text-4xl mb-20 font-bold'>{params.title.replaceAll('-',' ')}</h2>

      <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
        <div className="lg:w-[calc(100%-450px)]">
          <div className="mb-10">
             {adadad.map(r => 
              <div className='mb-10'>
                <p className='mb-5'>{r.parag}</p>
                <Image src={Stop} alt='adf' className='mb-1'/>
                <p className='text-xs'>awpoijawopfjwa</p>
              </div>

             )}
          </div>
        </div>
        <div className="lg:w-80">
          <Rightsidebar/>
        </div>
      </div>
    </>
  )
}

export default Page