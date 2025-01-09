import Link from 'next/link'

export default function NotFound() {
    return(
    <div className='h-screen text-center '>
        <h1 className='text-3xl mb-10'>Page not found - 404!</h1>
        <div>
        <Link href="/" className='text-2xl'>Go back to Home</Link>
      </div>
    </div>
    );
}