'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { useEffect } from "react"
import { useSession } from "next-auth/react"

const Page = () => {
  const {push} = useRouter();
  const {data: session, status} = useSession();

  const handleClickLogOut = async () => {
    /*await fetch('api/logout',{
      method: "GET",
      redirect: "follow"
    })
    .then(res => {
      push(res.url);
    })
    .catch(err => {
      console.log(err);
    })*/
    await signOut();
  }

  useEffect(() => {
    if(!session) push('/');
  },[session])

  return (
    <div className="w-full lg:w-auto">
      <h2 className='text-3xl mb-20 text-center lg:text-start'>About</h2>

      <div className="ml-3 lg:ml-0">
      <h3>Name</h3>
      <p className="mb-10">Name</p>

      <h3>Email</h3>
      <p className="mb-10">example.com</p>

      <h3>Favorite articles</h3>
      <ul>
        <li><Link href={'/'}>seoisugs</Link> </li>
        <li><Link href={'/'}>seoisugs</Link> </li>
        <li><Link href={'/'}>seoisugs</Link> </li>
        <li><Link href={'/'}>seoisugs</Link> </li>
        <li><Link href={'/'}>seoisugs</Link> </li>
      </ul>

      </div>

      <div onClick={handleClickLogOut} className="mt-10 cursor-pointer">
        Log out
      </div>

      
    </div>
  )
}

export default Page