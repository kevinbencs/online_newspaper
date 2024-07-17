'use client'
import Link from "next/link";
import CurrentDate from "../date/currentdate";
import { Dispatch, SetStateAction } from "react";


type Dispatcher<T> = Dispatch<SetStateAction<T>>
const Sidebar = (props: { setShowSidebar: Dispatcher<boolean>, setCheckboxValue: Dispatcher<boolean> }) => {


  const checked = () => {
    setTimeout(() => {
      props.setShowSidebar(false);
    }, 1000)
    props.setCheckboxValue(false);
  }


  return (
    <div className='bg-base-300 w-96 h-screen overflow-y-scroll sidebar'>
      <div className="text-center border-b-2 border-base-content pt-2 pb-2 bg-sidebar text-neutral-content">
        <div className="pb-2 text-xs">
          <CurrentDate />
        </div>
        <nav>
          <ul className="menu">
            <li><Link onClick={checked} href='/newsletter' className="pt-2 bg-neutral text-neutral-content pb-2 text-xl ml-2 mr-2 block text-center rounded-md hover:bg-slate-100 hover:text-black">Newsletter</Link></li>
            <li><Link onClick={checked} href='/signin' className='pt-2 pb-2 bg-neutral text-neutral-content mt-2 ml-2 mr-2 text-xl block text-center rounded-md hover:bg-slate-100 hover:text-black'>Sign in</Link></li>
            <li><Link onClick={checked} href='/signup' className='pt-2 pb-2 bg-neutral text-neutral-content mt-2 ml-2 mr-2 text-xl block  text-center rounded-md hover:bg-slate-100 hover:text-black'>Sign up</Link></li>
          </ul>
        </nav>
      </div>
      <div className="pt-5 ">

        <nav className="pl-5">
          <ul className="menu text-lg marker:text-green-600 text-base-content pr-0 list-inside list-disc">
            <li className="menu-title border-b-2 border-base-content rounded-none pl-0 pb-7"><h3 className=" text-base-content text-2xl">Menu</h3></li>
            <li><Link onClick={checked} className="border-b-2 rounded-none list-item text-base-content border-base-content pt-5 pb-5" href='/new'>new</Link></li>
            <li><Link onClick={checked} className="border-b-2 rounded-none list-item text-base-content border-base-content pt-5 pb-5" href='/important'>important</Link></li>
            <li><Link onClick={checked} className="border-b-2 rounded-none list-item text-base-content border-base-content pt-5 pb-5" href='/menu/uk'>uk</Link></li>
            <li><Link onClick={checked} className="border-b-2 rounded-none list-item text-base-content border-base-content pt-5 pb-5" href='/menu/world'>world</Link></li>
            <li><Link onClick={checked} className="border-b-2 rounded-none list-item text-base-content border-base-content pt-5 pb-5" href='/menu/tech'>tech</Link></li>
            <li><Link onClick={checked} className="border-b-2 rounded-none list-item text-base-content border-base-content pt-5 pb-5" href='/menu/business'>business & money</Link></li>
            <li><Link onClick={checked} className="border-b-2 rounded-none list-item text-base-content border-base-content pt-5 pb-5" href='/menu/culture'>culture</Link></li>
            <li><Link onClick={checked} className="border-b-2 rounded-none list-item text-base-content border-base-content pt-5 pb-5" href='/menu/authors'>authors</Link></li>
            <li><Link onClick={checked} className="border-b-2 rounded-none list-item text-base-content border-base-content pt-5 pb-5" href='/menu/podcast'>podcast</Link></li>
            <li><Link onClick={checked} className="border-b-2 rounded-none list-item text-base-content border-base-content pt-5 pb-5" href='/menu/life-style'>life & style</Link></li>
            <li><Link onClick={checked} className="border-b-2 rounded-none list-item text-base-content border-base-content pt-5 pb-5" href='/menu/sport'>sport</Link></li>
            <li><Link onClick={checked} className="border-b-2 rounded-none list-item text-base-content border-base-content pt-5 pb-5" href='/menu/video'>video</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar;