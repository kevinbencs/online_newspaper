import Link from 'next/link';
import CurrentDate from '../date/currentdate';
import Image from 'next/image';
import SocialIcons from '../socialicons';

const hoverTextColor1 = 'text-slate-50' 

const Header = () => {
  return (
    <header className='text-neutral-content bg-neutral'>
      <div className='flex justify-between text-xs bg-base-200 pr-5 pl-5 pt-2  text-base-content '>
        <CurrentDate />
        <nav>
          <ul className="menu rounded-box menu-vertical lg:menu-horizontal text-s pt-0">
            <li><Link href='/heading/uk' className='pt-0 pb-0 hover:text-slate-50'>uk</Link> </li>
            <li><Link href='/heading/world' className='pt-0 pb-0  hover:text-slate-950'>world</Link></li>
            <li><Link href='/heading/business' className='pt-0 pb-0  hover:text-slate-950'>business</Link></li>
            <li><Link href='/heading/tech' className='pt-0 pb-0  hover:text-slate-950'>tech</Link></li>
            <li><Link href='/heading/culture' className='pt-0 pb-0  hover:text-slate-950'>culture</Link></li>
          </ul>
        </nav>

        <nav>
          <SocialIcons />
        </nav>
      </div>
      <div className='flex justify-between pt-5 pb-5 content-center pr-5 pl-5'>
        <div className='flex'>
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              className="fill-current">
              <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
            </svg>
          </button>
        </div>

        <nav>
          <Link href='/'><h1 className='text-5xl font-serif hover:text-slate-50'>World Times</h1></Link>
        </nav>
        <nav className='grid grid-flow-col gap-4'>
          <Link href='/signin' className='flex content-center flex-wrap hover:text-slate-300'>Sign in</Link>
          <Link href='/signup' className='flex content-center flex-wrap hover:text-slate-300'>Sign up</Link>
        </nav>
      </div>


    </header>
  )
}

export default Header;