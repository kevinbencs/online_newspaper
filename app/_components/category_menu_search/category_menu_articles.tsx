import Stop from '../../Image/stop.png';
import Article from './article';

interface DataGet {
  header: string,
  parag: string,
  id: string,
  image: string
}
const Category_menu_articles = () => {
  const adadad: DataGet[] = [
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
    <div>
      {adadad.map((article: DataGet) => <Article article={article} key={article.id}/>)}
    </div>
  )
}

export default Category_menu_articles