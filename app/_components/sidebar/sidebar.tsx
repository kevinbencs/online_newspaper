'use client'
import Link from "next/link";
import CurrentDate from "../date/currentdate";
import { Dispatch, SetStateAction } from "react";
import UserElement from "./userelement";
import { useCategory } from "../categoryContext";


type Dispatcher<T> = Dispatch<SetStateAction<T>>
const Sidebar = (props: { setCheckboxValue: Dispatcher<boolean> }) => {

  const { categoryData, categoryError, categoryIsLoading } = useCategory()

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
            <UserElement setCheckboxValue={props.setCheckboxValue} />
          </ul>
        </nav>
      </div>
      <div className="pt-5 ">

        <nav className="pl-5 border-b border-gray-500">
          <ul className="menu text-lg marker:text-green-600 text-base-content pr-0 list-inside list-disc">
            <li className="menu-title border-b border-gray-500 rounded-none pl-0 pb-2"><h3 className=" text-base-content md:text-2xl text-lg">Menu</h3></li>
            <li><Link onClick={checked} className="border-b rounded-none before:w-[5px] before:h-[5px] before:bg-green-700 before:dark:bg-green-500 before:rounded-[50%] before:relative before:-left-3 dark:text-sky-200 text-base-content border-gray-500 pt-3 pb-3 pl-3 text-sm md:text-base" href='/latest/1'>latest</Link></li>
            <li><Link onClick={checked} className="border-b rounded-none before:w-[5px] before:h-[5px] before:bg-green-700 before:dark:bg-green-500 before:rounded-[50%] before:relative before:-left-3 dark:text-sky-200 text-base-content border-gray-500 pt-3 pb-3 pl-3 text-sm md:text-base" href='/important/1'>important</Link></li>
            <li><Link onClick={checked} className="border-b-1 rounded-none before:w-[5px] before:h-[5px] before:bg-green-700 before:dark:bg-green-500 before:rounded-[50%] before:relative before:-left-3 dark:text-sky-200 text-base-content  pt-3 pb-2 pl-3 text-sm md:text-base" href='/authors'>authors</Link></li>
          </ul>
        </nav>

        <nav className="pl-5 border-b pt-2 border-gray-500">
          <ul className="menu text-lg marker:text-green-600 text-base-content pr-0 list-inside list-disc">
            <li className="menu-title  pl-0 pb-2"><h3 className=" text-base-content md:text-2xl text-lg">Category</h3></li>
            {categoryError && <li className="text-red-700"> {categoryError.message}</li>}
            {categoryIsLoading && <li>...Loading</li>}
            {(categoryData && categoryData.length > 0) &&
              <>
                {categoryData.map(item => <li key={item._id}>
                  <Link onClick={checked}
                    className="border-t rounded-none  dark:text-sky-200 text-base-content border-gray-500 pt-3 pb-3 pl-3 text-sm md:text-base before:w-[5px] before:h-[5px] before:bg-green-700 before:dark:bg-green-500 before:rounded-[50%] before:relative before:-left-3"
                    href={`/category/${item.name.toLowerCase().replaceAll(' ', '').replaceAll('&', '_')}/1`}>
                    {item.name.toLowerCase()}
                  </Link>
                </li>)}
              </>
            }
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar;