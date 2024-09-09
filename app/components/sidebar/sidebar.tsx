'use client'
import Link from "next/link";
import CurrentDate from "../date/currentdate";
import { Dispatch, SetStateAction } from "react";


type Dispatcher<T> = Dispatch<SetStateAction<T>>
const Sidebar = (props: { setCheckboxValue: Dispatcher<boolean>, }) => {

  const checked = () => {
    props.setCheckboxValue(false);
  }

  return (
    <div className='bg-base-300 md:w-[450px] sm:w-96 w-72 h-screen overflow-y-scroll sidebar border-r border-gray-500'>
      <div className="text-center border-b border-gray-500 pt-2 pb-2 bg-sidebar text-neutral-content">
        <div className="pb-2 text-xs">
          <CurrentDate />
        </div>
        <nav>
          <ul className="menu">
            <li><Link onClick={checked} href='/newsletter' className="pt-1 bg-neutral text-neutral-content pb-1 md:text-xl text-base ml-2 mr-2 rounded-[4px] hover:bg-slate-100 hover:text-black flex justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              Newsletter
            </Link></li>
            <li><Link onClick={checked} href='/signin' className='pt-1 pb-1 bg-neutral text-neutral-content mt-2 ml-2 mr-2 md:text-xl text-base  rounded-[4px] hover:bg-slate-100 hover:text-black flex justify-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              Sign in
            </Link></li>
            <li><Link onClick={checked} href='/signup' className='pt-1 pb-1 bg-neutral text-neutral-content mt-2 ml-2 mr-2 md:text-xl text-base  rounded-[4px] hover:bg-slate-100 hover:text-black flex justify-center gap-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
              </svg>
              Sign up
            </Link></li>
          </ul>
        </nav>
      </div>
      <div className="pt-5 ">

        <nav className="pl-5 border-b border-gray-500">
          <ul className="menu text-lg marker:text-green-600 text-base-content pr-0 list-inside list-disc">
            <li className="menu-title border-b border-gray-500 rounded-none pl-0 pb-2"><h3 className=" text-base-content md:text-2xl text-lg">Menu</h3></li>
            <li><Link onClick={checked} className="border-b rounded-none before:w-[5px] before:h-[5px] before:bg-green-700 before:dark:bg-green-500 before:rounded-[50%] before:relative before:-left-3 dark:text-sky-200 text-base-content border-gray-500 pt-3 pb-3 pl-3 text-sm md:text-base" href='/latest'>latest</Link></li>
            <li><Link onClick={checked} className="border-b rounded-none before:w-[5px] before:h-[5px] before:bg-green-700 before:dark:bg-green-500 before:rounded-[50%] before:relative before:-left-3 dark:text-sky-200 text-base-content border-gray-500 pt-3 pb-3 pl-3 text-sm md:text-base" href='/important'>important</Link></li>
            <li><Link onClick={checked} className="border-b-1 rounded-none before:w-[5px] before:h-[5px] before:bg-green-700 before:dark:bg-green-500 before:rounded-[50%] before:relative before:-left-3 dark:text-sky-200 text-base-content  pt-3 pb-2 pl-3 text-sm md:text-base" href='/authors'>authors</Link></li>
          </ul>
        </nav>

        <nav className="pl-5 border-b pt-2 border-gray-500">
          <ul className="menu text-lg marker:text-green-600 text-base-content pr-0 list-inside list-disc">
            <li className="menu-title border-b border-gray-500 rounded-none pl-0 pb-2"><h3 className=" text-base-content md:text-2xl text-lg">Category</h3></li>
            <li><Link onClick={checked} className="border-b rounded-none  dark:text-sky-200 text-base-content border-gray-500 pt-3 pb-3 pl-3 text-sm md:text-base before:w-[5px] before:h-[5px] before:bg-green-700 before:dark:bg-green-500 before:rounded-[50%] before:relative before:-left-3" href='/category/uk'>uk</Link></li>
            <li><Link onClick={checked} className="border-b rounded-none  dark:text-sky-200 text-base-content border-gray-500 pt-3 pb-3 pl-3 text-sm md:text-base before:w-[5px] before:h-[5px] before:bg-green-700 before:dark:bg-green-500 before:rounded-[50%] before:relative before:-left-3" href='/category/world'>world</Link></li>
            <li><Link onClick={checked} className="border-b rounded-none  dark:text-sky-200 text-base-content border-gray-500 pt-3 pb-3 pl-3 text-sm md:text-base before:w-[5px] before:h-[5px] before:bg-green-700 before:dark:bg-green-500 before:rounded-[50%] before:relative before:-left-3" href='/category/tech'>tech</Link></li>
            <li><Link onClick={checked} className="border-b rounded-none  dark:text-sky-200 text-base-content border-gray-500 pt-3 pb-3 pl-3 text-sm md:text-base before:w-[5px] before:h-[5px] before:bg-green-700 before:dark:bg-green-500 before:rounded-[50%] before:relative before:-left-3" href='/category/business'>business & money</Link></li>
            <li><Link onClick={checked} className="border-b rounded-none  dark:text-sky-200 text-base-content border-gray-500 pt-3 pb-3 pl-3 text-sm md:text-base before:w-[5px] before:h-[5px] before:bg-green-700 before:dark:bg-green-500 before:rounded-[50%] before:relative before:-left-3" href='/category/culture'>culture</Link></li>
            <li><Link onClick={checked} className="border-b rounded-none  dark:text-sky-200 text-base-content border-gray-500 pt-3 pb-3 pl-3 text-sm md:text-base before:w-[5px] before:h-[5px] before:bg-green-700 before:dark:bg-green-500 before:rounded-[50%] before:relative before:-left-3" href='/category/authors'>authors</Link></li>
            <li><Link onClick={checked} className="border-b rounded-none  dark:text-sky-200 text-base-content border-gray-500 pt-3 pb-3 pl-3 text-sm md:text-base before:w-[5px] before:h-[5px] before:bg-green-700 before:dark:bg-green-500 before:rounded-[50%] before:relative before:-left-3" href='/category/podcast'>podcast</Link></li>
            <li><Link onClick={checked} className="border-b rounded-none  dark:text-sky-200 text-base-content border-gray-500 pt-3 pb-3 pl-3 text-sm md:text-base before:w-[5px] before:h-[5px] before:bg-green-700 before:dark:bg-green-500 before:rounded-[50%] before:relative before:-left-3" href='/category/life-style'>life & style</Link></li>
            <li><Link onClick={checked} className="border-b rounded-none  dark:text-sky-200 text-base-content border-gray-500 pt-3 pb-3 pl-3 text-sm md:text-base before:w-[5px] before:h-[5px] before:bg-green-700 before:dark:bg-green-500 before:rounded-[50%] before:relative before:-left-3" href='/category/sport'>sport</Link></li>
            <li><Link onClick={checked} className="border-b-1 rounded-none list-item dark:text-sky-200 text-base-content border-gray-500 pt-3 pb-3 pl-3 text-sm md:text-base before:w-[5px] before:h-[5px] before:bg-green-700 before:dark:bg-green-500 before:rounded-[50%] before:relative before:-left-3" href='/category/video'>video</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar;