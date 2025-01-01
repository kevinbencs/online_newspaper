import DeleteArticle from '@/app/_components/dashboard/delete_page/article'
import DeleteCarrier from '@/app/_components/dashboard/delete_page/carrier'
import DeleteColleague from '@/app/_components/dashboard/delete_page/colleague'
import DeleteUser from '@/app/_components/dashboard/delete_page/user'
import React from 'react'

const Page = () => {
  
  return (
    <div className='w-full'>
      <DeleteArticle/>
      <DeleteUser/>
      <DeleteColleague/>
      <DeleteCarrier/>
    </div>
  )
}

export default Page