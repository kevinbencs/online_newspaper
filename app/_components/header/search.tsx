'use client'
import { SyntheticEvent, useState, Dispatch, SetStateAction, } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import Link from 'next/link';

interface Cat {
  name: string,
  _id: string
}

interface Author {
  _id: string,
  name: string,
}

interface Title {
  id: string,
  title: string,
  number: number
}

interface Theme {
  id: string,
  theme: string,
  number: number
}

interface Res {
  res: {
    category: Cat[],
    author: Author[],
    title: Title[],
    theme: Theme[]
  }
}

const fetcher = async (url: string): Promise<Res> => {
  const res = await fetch(url)

  if(!res.ok){
    const error = new Error()
    error.cause = res.json().then((data: {error: string}) => data.error)
    console.log(error.cause)

    throw error;
  }

  return await res.json()
}

const Search = (props: { setShowSearch: Dispatch<SetStateAction<boolean>> }) => {
  const [Input, setInput] = useState<string>('');
  const [focus, setFocus] = useState<boolean>(false);
  const router = useRouter();

  const { data, error, isLoading } = useSWR<Res, Error>('/api/search', fetcher,{refreshInterval: 60000});

  const categoryFilter = (arrayItem: Cat) => {
    const arr = arrayItem.name.toLowerCase().split(' ')
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].indexOf(Input.toLowerCase()) === 0) return true
    }
    return false
  };
  const authorFilter = (arrayItem: Author) => {
    const arr = arrayItem.name.toLowerCase().split(' ')
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].indexOf(Input.toLowerCase()) === 0) return true
    }
    return false
  };
  const titleFilter = (arrayItem: Title) => {
    return arrayItem.title.toLowerCase().indexOf(Input.toLowerCase()) === 0;
  };
  const themeFilter = (arrayItem: Theme) => {
    const arr = arrayItem.theme.toLowerCase().split(' ')
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].indexOf(Input.toLowerCase()) === 0) return true
    }
    return false
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (Input !== '') {
      props.setShowSearch(false);
      setInput('')
      setFocus(false)
      router.push(`/search?text=${Input.replaceAll(' ', '_')}`);
    }
  };

  const handleLinkClick = () => {
    setInput('')
    props.setShowSearch(false);
    setFocus(false)
  }

  return (
    <>
      <form action="#" onSubmit={handleSubmit} className="input input-bordered dark:border-2 border-none dark:border-solid focus-within:outline-none flex items-center h-16 gap-2">
        <input name='headerSearch' type="text" onFocus={() => setFocus(true)} onBlur={() => {setFocus(false)}}  className="grow text-lg text-base-content" placeholder="Search" value={Input} onChange={(e) => setInput(e.target.value)} />
        <button onFocus={() => setFocus(true)} onBlur={() => {setFocus(false)}} >
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
      {Input !== ''  &&
        <div className={` ${focus ? 'h-64' : 'h-0'} bg-white border-l-2 border-r-2 border-b-2 border-gray-600 dark:bg-neutral absolute lg:w-[59.3%] w-[calc(100%-92px)] m-10 lg:ml-[20.3%] lg:mr-[20%] left-[6px] lg:left-0  top-16 overflow-y-scroll overflow-x-hidden text-base-content dark:text-neutral-content sidebar`}>
          {error && <div>{error.message}</div>}
          {isLoading && <div>...Loading</div>}
          {data &&
            <>

              {(data.res.category && data.res.category.filter(categoryFilter).length > 0) &&
                <section>
                  <h3 className='bg-base-300 p-2 text-2xl border-b-2 border-gray-600'>Category</h3>
                  <ul className='text-lg'>

                    {data.res.category.filter(categoryFilter).slice(0, 7).map((item) => <li className='border-b-2 border-gray-600 ' key={item._id}>
                      <Link onFocus={() => setFocus(true)} onBlur={() => {setFocus(false)}} href={`/category/${item.name.toLowerCase().replaceAll(' ', '').replaceAll('&', '_')}`} onClick={handleLinkClick} className='block p-1 pl-2 hover:bg-slate-400 hover:text-white'>{item.name}</Link>
                    </li>)}
                  </ul>
                </section>
              }

              {(data.res.author && data.res.author.filter(authorFilter).length > 0) &&
                <section>
                  <h3 className='bg-base-300 p-2 text-2xl border-b-2 border-gray-600'>Author</h3>
                  <ul className='text-lg'>
                    {data.res.author.filter(authorFilter).slice(0, 7).map((item) => <li className='border-b-2 border-gray-600 ' key={item._id}>
                      <Link onFocus={() => setFocus(true)} onBlur={() => {setFocus(false)}} href={`/authors/${item.name.replaceAll(' ', '_')}`} onClick={handleLinkClick} className='block p-1 pl-2 hover:bg-slate-400 hover:text-white'>{item.name}</Link>
                    </li>)}
                  </ul>
                </section>
              }

              {(data.res.theme && data.res.theme.filter(themeFilter).length > 0) &&
                <section>
                  <h3 className='bg-base-300 p-2 text-2xl border-b-2 border-gray-600'>Theme</h3>
                  <ul className='text-lg'>

                    {data.res.theme.filter(themeFilter).slice(0, 7).map((item) => <li className='border-b-2 border-gray-600 ' key={item.id}>
                      <Link onFocus={() => setFocus(true)} onBlur={() => {setFocus(false)}} href={`/search?text=${item.theme.replaceAll(' ', '_')}&filter=theme`} onClick={handleLinkClick} className='block p-1 pl-2 hover:bg-slate-400 hover:text-white'>{item.theme} ({item.number})</Link>
                    </li>)}
                  </ul>
                </section>
              }

              {(data.res.title && data.res.title.filter(titleFilter).length > 0) &&
                <section>
                  <h3 className='bg-base-300 p-2 text-2xl border-b-2 border-gray-600'>Title</h3>
                  <ul className='text-lg'>
                    {data.res.title.filter(titleFilter).slice(0, 7).map((item) => <li className='border-b-2 border-gray-600 ' key={item.id}>
                      <Link onFocus={() => setFocus(true)} onBlur={() => {setFocus(false)}} href={`/search?text=${item.title}&filter=title`} onClick={handleLinkClick} className='block p-1 pl-2 hover:bg-slate-400 hover:text-white'>{item.title} ({item.number})</Link>
                    </li>)}
                  </ul>
                </section>
              }

            </>
          }
        </div>
      }

    </>
  )
}

export default Search