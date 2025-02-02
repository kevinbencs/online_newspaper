'use client'
import { SyntheticEvent, useRef, useState, useEffect, ChangeEvent } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import OptgroupSearch from '../_components/optgroup/optgroup';
import { getAuthor } from '@/actions/getauthor';
import useSWR, {preload} from 'swr';


interface Cat {
    _id: string,
    name: string
  }
  
  const fetcher = async (url: string): Promise<{ success: Cat[] | undefined }> => {
    const res = await fetch(url)
    
    if(!res.ok){
      const error = new Error('An error occurred while fetching the data.')
      error.cause = await res.json().then((res:{error: string})=> res.error)
      console.error(error.cause)
  
      throw error
    }
    
    return res.json()
  }
  
  preload('/api/category', fetcher)
  

const Search = () => {
    const [textInput, setTextInput] = useState<string>('');
    const [authorInput, setAuthorInput] = useState<string>('');
    const [categoryInput, setCategoryInput] = useState<string>('');
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const [Author, setAuthor] = useState<{text: string, id: string}[]>([])
    const { theme } = useTheme();

    const FromRef = useRef<null | HTMLInputElement>(null);
    const ToRef = useRef<null | HTMLInputElement>(null);
    const router = useRouter();

    const { data, error, isLoading } = useSWR<{ success: Cat[] | undefined }, Error>('/api/category', fetcher);

    useEffect(() => {
        getAuthor()
        .then(res => {
            if(res.success){
                const arr: {text: string, id: string}[] = []
                for(let i = 0; i< res.success.length; i++){
                    const obj: {text: string, id: string} = {text: res.success[i].name, id: res.success[i]._id};
                    arr.push(obj)
                }
                setAuthor(arr)
            }
        })

    },[])


    const formatDateToLocal = (date: undefined | Date) => {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}/${month}/${day}`;
    };

    useEffect(() => {
        const currDate = new Date(new Date().toLocaleDateString());
        if (FromRef.current) {
            flatpickr(FromRef.current, {
                maxDate: currDate,
                minDate: "1928-01-01",
                dateFormat: "Y-m-d",
                onChange: (selectedDates) => {
                    setFromDate(formatDateToLocal(selectedDates[0]))
                }
            });
        }
        if (ToRef.current) {
            flatpickr(ToRef.current, {
                maxDate: currDate,
                minDate: "1928-01-01",
                dateFormat: "Y-m-d",
                onChange: (selectedDates) => {
                    setToDate(formatDateToLocal(selectedDates[0]))
                }
            });
        }

    }, []);


    useEffect(() => {

        const themeLink = document.createElement('link');
        themeLink.rel = 'stylesheet';
        themeLink.type = 'text/css';

        themeLink.href =
            theme === 'dark'
                ? 'https://cdn.jsdelivr.net/npm/flatpickr/dist/themes/dark.css'
                : 'https://cdn.jsdelivr.net/npm/flatpickr/dist/themes/light.css';

        document.head.appendChild(themeLink);

        return () => {
            document.head.removeChild(themeLink);
        };
    }, [theme]);




    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (textInput !== '') {
            router.push(`/search?text=${textInput.replaceAll(' ', '_')}&date_from=${fromDate.replaceAll('/','-')}&date_to=${toDate.replaceAll('/','-')}&category=${categoryInput.replaceAll(' ','').replaceAll('&','-').toLowerCase()}&author=${authorInput.replaceAll(' ','_')}`);
        }
    }

    return (
        <form action="#" onSubmit={handleSubmit} className='mt-1'>
            <label className="input input-bordered border-2 flex items-center h-16 gap-2 w-[100%] focus-within:outline-none">
                <input type="text" className="grow text-lg text-base-content dark:text-white border-none focus-within:outline-none" placeholder="Search" value={textInput} onChange={(e) => setTextInput(e.target.value)} />
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
            </label>
            <div className='mt-10  flex gap-5 flex-col lg:flex-row items-start flex-wrap'>
                <OptgroupSearch optElement={Author} optInput={authorInput} setOptInput={setAuthorInput} placeHolder='Author'/>
                {(data && data.success) &&
                <OptgroupSearch optElement={ data.success.map(item => ({id: item._id, text: item.name} )) } optInput={categoryInput} setOptInput={setCategoryInput} placeHolder='Category'/>
                

                }
                

                <label className='lg:w-[30%] w-full  block'>
                    <input type="text" ref={FromRef}  readOnly  placeholder='From' className='pl-2 mb-2 dark:text-white border-b-2 input-bordered focus-within:outline-none bg-transparent w-full ' />
                </label>
                <label className='lg:w-[30%] w-full  block'>
                    <input type="text" ref={ToRef} readOnly placeholder='To' className='pl-2 mb-2 dark:text-white border-b-2 input-bordered focus-within:outline-none bg-transparent w-full' />
                </label>
            </div>
        </form >
    )
}

export default Search