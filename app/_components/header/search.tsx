'use client'
import { SyntheticEvent, useState, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

const Search = (props: { setShowSearch: Dispatch<SetStateAction<boolean>> }) => {
  const [Input, setInput] = useState<string>('');
  const [focus, setFocus] = useState<boolean>(false)
  const router = useRouter();


  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (Input !== '') {
      props.setShowSearch(false);
      router.push(`/search?text=${Input.replaceAll(' ', '_')}`);
    }
  }
  return (
    <>
      <form action="#" onSubmit={handleSubmit} className="input input-bordered flex items-center h-16 gap-2">
        <input type="text" onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} className="grow text-lg text-base-content" placeholder="Search" value={Input} onChange={(e) => setInput(e.target.value)} />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
        </button>

      </form >
      {(Input !== '' && focus) &&
        <div className='h-64 bg-base-200 dark:bg-neutral absolute lg:w-[60%] w-[calc(100%-80px)] m-10 lg:ml-[20%] lg:mr-[20%] left-0 top-16 overflow-y-scroll overflow-x-hidden text-base-content dark:text-neutral-content sidebar'>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
          <div>weafkwhifowafi</div>
        </div>
      }



    </>

  )
}

export default Search