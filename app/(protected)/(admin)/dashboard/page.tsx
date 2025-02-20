import { getAuthor } from '@/actions/getauthor'
import Colleague from '@/app/_components/dashboard/mainpage/colleague'
import Source from '@/app/_components/dashboard/mainpage/source'
import FavouriteArtOfWeek from '@/app/_components/dashboard/mainpage/favoriteArtOfWeek'
import FavouriteArt from '@/app/_components/dashboard/mainpage/favouriteArt'
import DailyReadership from '@/app/_components/dashboard/mainpage/dailyReadership'
import NumberOfSubscribers from '@/app/_components/dashboard/mainpage/numberOfSubscribe'
import NumberOfUser from '@/app/_components/dashboard/mainpage/numberOfUser'
import Share from '@/app/_components/dashboard/mainpage/share'
import MonthlyReadership from '@/app/_components/dashboard/mainpage/monthlyReadership'
import { getNumberOfDailyReadership, getNumberOfMonthlyReadership, getNumberOfSubscriber, getNumberOfUser, getNumberShare, getNumberSource, getPopularArtSevenDays, getPopularArtYear } from '@/actions/getdatadashboard'
//import { kel } from '@/actions/updatedate'

export const revalidate = 10

const page = async () => {
  const data = await getAuthor()
  const numberOfUser = await getNumberOfUser();
  const numberOfSubscribe = await getNumberOfSubscriber()
  const resDailyRead = await getNumberOfDailyReadership()
  const resMonthlyRead = await getNumberOfMonthlyReadership()

  //await kel();


  const populArtYear = await getPopularArtYear()
  const popArtSevenDays = await getPopularArtSevenDays()
  const share = await getNumberShare()
  const source = await getNumberSource()


   /*const [auth, setAuth] = useState(null)
  const [numberOfUser, setNumberOfUserh] = useState<number>(0)
  const [numberOfSubscribe, setNumberOfSubscribe] = useState(0)
  const [resDailyRead, setResDailyRead] = useState<null | art[]>(null)
  const [resMonthlyRead, setResMonthlyRead] = useState(null)
  const [populArtYear, setPopulArtYear] = useState(null)
  const [popArtSevenDays, setPopArtSevenDays] = useState(null)
  const [share, setShare] = useState(null)
  const [source, setSource] = useState(null)




  useEffect(() => {
    getAuthor().then(res => {
      setAuth(res.success)
    })

    getNumberOfUser().then(res => {
      if (res.numOfUser)
        setNumberOfUserh(res.numOfUser)
    })

    getNumberOfSubscriber().then(res => {
      if (res.numOfSubscriber) setNumberOfSubscribe(res.numOfSubscriber)
    })

    getNumberOfDailyReadership().then(res => {
      if (res.numOfUser) setResDailyRead(res.numOfUser)
    })

    getNumberOfMonthlyReadership().then(res => {
      if(res.monthlyReadership) setResMonthlyRead(res.monthlyReadership)
    })

    getPopularArtYear().then(res => {
      if(res.Art) setPopulArtYear(res.Art)
    })

    getPopularArtSevenDays().then(res => {
      if(res.Art) setPopArtSevenDays(res.Art)
    })

    getNumberShare().then( res => {
      if(res.numOfUser) setShare(res.numOfUser)
    })

    getNumberSource().then(res => {
      if(res.numOfUser) setSource(res.numOfUser)
    })
  }, [])*/


  return (
    <div className='w-full pb-10'>
      <div className='flex justify-between mb-20'>
        <NumberOfUser number={numberOfUser?.numOfUser || 0} />
        <NumberOfSubscribers number={numberOfSubscribe?.numOfSubscriber || 0} />
      </div>

      <Colleague Coll={data.success} />
      <FavouriteArt data={popArtSevenDays.Art}/>
      <FavouriteArtOfWeek data={populArtYear.Art}/>


      <DailyReadership reader={resDailyRead.numOfUser}/>
      <MonthlyReadership  readership={resMonthlyRead.monthlyReadership}/>
      <div className='md:flex md:justify-between'>
        <Share share={share.numOfUser}/>
        <Source source={source.numOfUser}/>
      </div>
      
    </div>
  )
}

export default page