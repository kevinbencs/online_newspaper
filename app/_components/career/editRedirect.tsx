'use client'
import Link from 'next/link'
import React from 'react'
import { useLogged } from '../islogged/isloggedprovider'

const EditRedirect = (props:{url: string}) => {
    const {RoleLogged} = useLogged()

    if(RoleLogged === 'Admin' || RoleLogged === 'Editor')
  return (
    <Link href={`/editcareer/${props.url.replaceAll(' ','_')}`} className='mt-10 mb-10 bg-black  text-center text-white rounded p-2 pt-1 pb-1 hover:text-gray-300 dark:bg-white dark:text-gray-950 dark:hover:text-gray-500'>Edit</Link>
  )

  return(<></>)
}

export default EditRedirect