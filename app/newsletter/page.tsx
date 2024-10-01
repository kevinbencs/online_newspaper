'use client';
import { SyntheticEvent, useState, KeyboardEvent } from "react";
import Link from "next/link";

const Page = () => {

  const [checkBoxValue, setCheckboxValue] = useState<boolean>(false);

  const handleKeyboardCheckbox = (e: KeyboardEvent<SVGRectElement>) => {
    if(e.code === 'Space' || e.code=== 'Enter') setCheckboxValue(!checkBoxValue);
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  }

  return (
    <div className="min-h-[90vh] lg:ml-80 lg:w-[500px] w-full">
      <h2 className="mt-20 text-3xl mb-16 font-bold text-center lg:text-start">Subscribe for the newsletters</h2>
      <p className="mb-10">If you would like to be informed the valuable news, subscribe for our newsletters.</p>
      <form action="#" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required className="block w-[100%] mb-3 border border-gray-400 dark:border-current p-2 pt-1 pb-1 rounded-sm focus-within:outline-none"/>
        <input type="text" name="name" placeholder="Name" required className="block w-[100%] mb-4 border border-gray-400 dark:border-current p-2 pb-1 pt-1 rounded-sm focus-within:outline-none"/>
        
        <div className="checkbox-wrapper-62 mb-4" >
            <input type="checkbox" className="check" id="check1-63" checked={checkBoxValue} required/>
            <label htmlFor="check1-63" className="label1 flex gap-2 items-center cursor-pointer" onClick={() => setCheckboxValue(!checkBoxValue)}>
              <svg width="30" height="30" viewBox="0 0 90 90">
                <rect x="30" y="20" width="50" height="50" stroke="currentColor" fill="none" className='focus:outline  outline-base-content' tabIndex={0} onKeyDown={handleKeyboardCheckbox} />
                <g transform="translate(0,-952.36218)">
                  <path d="m 13,983 c 33,6 40,26 55,48 " stroke="currentColor" stroke-width="3" className="path1" fill="none" />
                  <path d="M 75,970 C 51,981 34,1014 25,1031 " stroke="currentColor" stroke-width="3" className="path1" fill="none" />
                </g>
              </svg>
              <span>By subscribing for newsletters, you agree to privacy notice.</span>
            </label>
          </div>
        <input type="submit" value="Subscribe" className="border p-2 cursor-pointer border-gray-400 dark:border-current font-semibold bg-gray-100 hover:bg-gray-50 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-sm"/>
      </form>
      <div>
        <div className="mt-10 text-xs text-center lg:text-start">Would not you like to get letters? <Link href='/newsletter/unsubscribe' className='text-slate-400'>Unsubscribe</Link></div> 
      </div>
    </div>
  )
}

export default Page