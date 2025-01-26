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

export const revalidate = 10

const page = async () => {
  const data = await getAuthor()
  const numberOfUser = await getNumberOfUser();
  const numberOfSubscribe = await getNumberOfSubscriber()
  const resDailyRead = await getNumberOfDailyReadership()
  const resMonthlyRead = await getNumberOfMonthlyReadership()

  const populArtYear = await getPopularArtYear()
  const popArtSevenDays = await getPopularArtSevenDays()
  const share = await getNumberShare()
  const source = await getNumberSource()


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