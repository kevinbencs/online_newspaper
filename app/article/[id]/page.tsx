import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
  const params = useParams();
  return (
    <div>Article</div>
  )
}

export default Page