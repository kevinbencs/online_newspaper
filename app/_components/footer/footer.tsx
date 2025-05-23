import Link from 'next/link';
import Playstore from './playstore';
import SocialIconsFooter from './socialicons';

const Footer = () => {
  let year: number = new Date().getFullYear();
  const copyright: string = ('\u00A9');
  return (
    <footer className='footer pt-10 pb-5 text-base-content bg-base-300 footer-center'>
      <nav className='border-b-2 border-base-content block w-full max-h-none'>
        <ul className='flex gap-10 w-full pb-5  justify-center md:pl-30% md:pr-30% pl-1 pr-1 flex-wrap'>
          <li>
            <Link href="/imprint" className='link link-hover'> Imprint</Link> 
          </li>
          <li>
            <Link href="/newsletter" className='link link-hover'> Newsletter</Link>
          </li>
          <li>
            <Link href="/privacypolicy" className='link link-hover'> Privacy Policy</Link>
          </li>
          <li>
            <Link href="/termsofservice" className='link link-hover'> Terms of Service</Link>
          </li>
          <li>
            <Link href="/world_times_about" className='link link-hover'> About</Link>
          </li> 
          <li>
            <Link href="/help" className='link link-hover'> Help</Link>
          </li>
          <li>
            <Link href="/contactus" className='link link-hover'> Contact us</Link>
          </li>
          <li>
            <Link href="/cookie" className='link link-hover'> Cookie policy</Link>
          </li>
          <li>
            <Link href="/career" className='link link-hover'> Careers</Link>
          </li>
        </ul>
      </nav>
      <nav className='border-b-2 border-base-content w-full justify-center pb-5 flex'>
        <SocialIconsFooter/>
      </nav>
      <nav className='border-b-2 border-base-content w-full pb-5'>
        <Playstore/>
      </nav>
      
      <div className='text-xs'>
        Copyright {copyright} {year} World Times
      </div>
    </footer>
  )
}

export default Footer