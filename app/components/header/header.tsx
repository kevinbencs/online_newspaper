'use client'
import Link from 'next/link';
import CurrentDate from '../date/currentdate';
import SocialIcons from '../socialicons';
import ThemeController from './themecontroller';
import SidebarContainer from '../sidebar/sidebarcontainer';
import { useEffect, useState } from 'react';
import Search from './search';



const Header = () => {

  const [scrollClass, setScrollClass] = useState<string>('translate-y-0');
  const [topbarHide, setTopbarHide] = useState<string>('flex');
  const [scrollCoo, setscrollCoo] = useState<number>(0);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const handleScroll = () => {
    const position = window.scrollY;
    const mainPos = document.querySelector('main')!.getBoundingClientRect().top;

    if (position - scrollCoo > 0 && position > 0 && mainPos <= 0) {
      setScrollClass('-translate-y-96');
      setTopbarHide('hidden')
    }
    else {
      setScrollClass('translate-y-0');
      setTopbarHide('flex')
    }
    setscrollCoo(position);

  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  })


  const clickSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <header className={`text-neutral-content bg-neutral sticky top-0 z-10  duration-500 ${scrollClass}`}>
      <div className={`hidden sm:${topbarHide} justify-between  text-xs bg-base-200 pr-5 pl-5 pt-2  text-base-content pb-3 lg:pb-0 `}>
        <CurrentDate />
        <nav className='hidden lg:opacity-100 lg:block'>
          <ul className="menu rounded-box menu-vertical lg:menu-horizontal text-s pt-0">
            <li><Link href='/menu/uk' className='pt-0 pb-0 '>uk</Link> </li>
            <li><Link href='/menu/world' className='pt-0 pb-0  hover:text-slate-950'>world</Link></li>
            <li><Link href='/menu/business' className='pt-0 pb-0  hover:text-slate-950'>business</Link></li>
            <li><Link href='/menu/tech' className='pt-0 pb-0  hover:text-slate-950'>tech</Link></li>
            <li><Link href='/menu/culture' className='pt-0 pb-0  hover:text-slate-950'>culture</Link></li>
          </ul>
        </nav>

        <nav className='hidden sm:block'>
          <SocialIcons />
        </nav>
      </div>
      <div className='justify-between pt-5 pb-5  pr-5 pl-5 navbar '>
        <div className='flex'>
          <SidebarContainer />

          <button onClick={clickSearch}>
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

        <nav className='mr-2 ml-2 text-center'>
          <Link href='/'><h1 className='text-3xl  sm:text-5xl font-serif hover:text-slate-50 '>World Times</h1></Link>
        </nav>
        <div>
          <ThemeController />
        </div>

      </div>
      {showSearch &&
      <div className='p-10 lg:pl-[20%] lg:pr-[20%]  xl:pl-[30%] xl:pr-[30%]'>
        <Search/>
      </div>}
      


    </header>
  )
}

export default Header;