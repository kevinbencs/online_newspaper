'use client'
import Link from 'next/link';
import CurrentDate from '../date/currentdate';
import ThemeController from './themecontroller';
import SidebarContainer from '../sidebar/sidebarcontainer';
import { useEffect, useState } from 'react';
import Search from './search';
import SocialIconsHeader from './socialicons';
import { usePathname } from 'next/navigation';



function getScrollClass() {
  return 'translate-y-0';
};

function getDurationClass() {
  return 'duration-0';
};

const Header = (props: { mainPos: number }) => {

  const [scrollClass, setScrollClass] = useState<string>(getScrollClass);
  const [topbarHide, setTopbarHide] = useState<string>("");
  const [scrollCoo, setscrollCoo] = useState<number>(0);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [topbarDuration, setTopbarDuration] = useState<string>(getDurationClass);

  const pathname = usePathname();



  useEffect(() => {

    const handleScroll = () => {
      const position = window.scrollY;

      if (position - scrollCoo > 0 && position > 0 && props.mainPos <= 0) {
        setScrollClass(() => '-translate-y-96');
        setShowSearch(false);
      }
      else {
        setScrollClass(() => 'translate-y-0');
      }
      setscrollCoo(position);


      if (props.mainPos <= 0) {
        setTopbarHide('none');
      }
      else {
        setTopbarHide('');
      }


      if (position <= 100) {
        setTopbarDuration(() => 'duration-0');
        setScrollClass(() => '');
      }
      else {
        setTopbarDuration(() => 'duration-500');
      }
    };




    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [props.mainPos, scrollCoo])

  useEffect(() => {
    setTopbarHide('');
  }, [pathname])



  const clickSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <header className={` bg-base-300 sticky top-0 z-20  ${topbarDuration} ${scrollClass}`}>
      <div className={`hidden sm:flex justify-between  text-xs bg-zinc-950 pr-5 pl-5 pt-2  text-gray-400 pb-2`} style={{ display: `${topbarHide}` }}>
        <CurrentDate />
        <nav className='hidden  lg:block'>
          <ul className="menu rounded-box menu-horizontal text-s pt-0 pb-0">
            <li><Link href='/category/uk/1' className='pt-0 pb-0 hover:text-gray-100'>uk</Link> </li>
            <li><Link href='/category/world/1' className='pt-0 pb-0 hover:text-gray-100'>world</Link></li>
            <li><Link href='/category/business_money/1' className='pt-0 pb-0  hover:text-gray-100'>business</Link></li>
            <li><Link href='/category/tech/1' className='pt-0 pb-0  hover:text-gray-100'>tech</Link></li>
            <li><Link href='/category/culture/1' className='pt-0 pb-0  hover:text-gray-100'>culture</Link></li>
          </ul>
        </nav>

        <nav className='hidden sm:block'>
          <SocialIconsHeader />
        </nav>
      </div>
      <div className='justify-between pt-3 pb-3  pr-5 pl-5 navbar '>
        <div className='flex gap-2'>
          <SidebarContainer />
          <button onClick={clickSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              className={`fill-current ${pathname === '/search' ? 'invisible' : 'visible'}`}>
              <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
            </svg>
          </button>


        </div>

        <nav className='mr-2 ml-2 text-center'>
          <Link href='/'><span className='text-3xl  sm:text-5xl font-serif dark:text-slate-50 dark:hover:text-slate-400 hover:text-slate-950 text-stone-700 lg:pr-20'>World Times</span></Link>
        </nav>
        <div>
          <ThemeController />
        </div>

      </div>

      <div className={`absolute p-10 lg:pl-[20%] lg:pr-[20%]  w-[100%] bg-base-300 ${showSearch ? '' : 'hidden'}`} >
        <Search setShowSearch={setShowSearch} />
      </div>



    </header>
  )
}

export default Header;