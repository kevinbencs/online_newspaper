import Link from 'next/link';
import CurrentDate from '../date/currentdate';
import Facebook from '../../images/facebook.png';
import Image from 'next/image';
import Instagram from '../../images/instagram.png';
import Youtube from '../../images/youtube.png';
import X from '../../images/x-logo.png';


const Header = () => {
  return (
    <header>
      <div>
        <CurrentDate/>
        <nav>
          <Link href='/heading/uk'>uk</Link>
          <Link href='/heading/world'>world</Link>
          <Link href='/heading/business'>business</Link>
          <Link href='/heading/tech'>tech</Link>
          <Link href='/heading/culture'>culture</Link>
        </nav>
        <nav>
          <ul>
            <li>
              <a href="https://www.facebook.com" target='_blank'><Image src={Facebook} alt="facebook" width={15}/> </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target='_blank'><Image src={Instagram} alt='instagram' width={15}/></a>
            </li>
            <li>
              <a href="https://www.youtube.com" target='_blank'> <Image src={Youtube} alt='youtube' width={15}/></a>
            </li>
            <li>
              <a href="https://www.x.com" target='_blank'><Image src={X} alt='x' width={15}/></a>
            </li>
          </ul>
        </nav>
      </div>
      <button>Menu</button>
      <button>Search</button>
      
      <nav>
        <Link href='/'><h1>World Times</h1></Link>
        <Link href='/signin'>Sign in</Link>
        <Link href='/signup'>Sign up</Link>
      </nav>

    </header>
  )
}

export default Header;