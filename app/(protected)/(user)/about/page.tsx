import Link from "next/link"

const Page = () => {
  

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

      
    </div>
  )
}

export default Page