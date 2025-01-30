import DeleteArticle from '@/app/_components/dashboard/delete_page/article'
import DeleteCareer from '@/app/_components/dashboard/delete_page/career'
import DeleteColleague from '@/app/_components/dashboard/delete_page/colleague'
import DeleteUser from '@/app/_components/dashboard/delete_page/user'
import React from 'react'

const Page = () => {
  
  return (
    <div className='w-full'>
      <DeleteArticle/>
      <DeleteUser/>
      <DeleteColleague/>
      <DeleteCareer/>
    </div>
  )
}

export default Page