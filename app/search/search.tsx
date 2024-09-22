'use client'
import { SyntheticEvent, useRef, useState, useEffect, ChangeEvent } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import { v4 as uuid } from 'uuid';

const Search = () => {
    const [textInput, setTextInput] = useState<string>('');
    const [authorInput, setAuthorInput] = useState<string>('');
    const [authorClass, setAuthorClass] = useState('h-0');
    const [categoryInput, setCategoryInput] = useState<string>('');
    const [categoryClass, setCategoryClass] = useState('h-0');
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const { theme } = useTheme();


    const categoryRef = useRef<null | HTMLInputElement>(null);
    const authorRef = useRef<null | HTMLInputElement>(null);
    const FromRef = useRef<null | HTMLInputElement>(null);
    const ToRef = useRef<null | HTMLInputElement>(null);
    const router = useRouter();

    const table = [
        'aaaaa',
        'cccccc',
        'dswaf',
        'dswaf',
        'dswaf',
        'dswaf',
        'dswaf',
        'dswaf',
        'dswaf',
        'dswaf',
        'dswaf',
        'dswaf',
    ];

    useEffect(() => {
        const currDate = new Date(new Date().toLocaleDateString());
        if (FromRef.current) {
            flatpickr(FromRef.current, {
                maxDate: currDate,
                minDate: "1928-01-01",
                dateFormat: "Y/m/d"
            });
        }
        if (ToRef.current) {
            flatpickr(ToRef.current, {
                maxDate: currDate,
                minDate: "1928-01-01",
                dateFormat: "Y/m/d"
            });
        }

    }, []);


    useEffect(() => {

        const themeLink = document.createElement('link');
        themeLink.rel = 'stylesheet';
        themeLink.type = 'text/css';

        themeLink.href =
            theme === 'dracula'
                ? 'https://cdn.jsdelivr.net/npm/flatpickr/dist/themes/dark.css'
                : 'https://cdn.jsdelivr.net/npm/flatpickr/dist/themes/light.css';

        document.head.appendChild(themeLink);

        return () => {
            document.head.removeChild(themeLink);
        };
    }, [theme]);


    const selectAuthorFilter = (arrayItem: string) => {
        return arrayItem.toLocaleLowerCase().indexOf(authorInput.toLocaleLowerCase()) > -1;
    }

    const selectCategoryFilter = (arrayItem: string) => {
        return arrayItem.toLocaleLowerCase().indexOf(categoryInput.toLocaleLowerCase()) > -1;
    }

    const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (table.filter((arrayItem) => arrayItem.toLocaleLowerCase().indexOf(e.target.value.toLocaleLowerCase()) > - 1).length > 0) {
            setAuthorInput(e.target.value);
        }
    };

    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (table.filter((arrayItem) => arrayItem.toLocaleLowerCase().indexOf(e.target.value.toLocaleLowerCase()) > - 1).length > 0) {
            setCategoryInput(e.target.value);
        }
    };

    const handleAuthorClick = (r: string) => {
        setTimeout(() => {
            setAuthorInput(r);
            authorRef.current?.blur();
            setAuthorClass('h-0');
        }, 0);
    };

    const handleCategoryClick = (r: string) => {
        setTimeout(() => {
            setCategoryInput(r);
            categoryRef.current?.blur();
            setCategoryClass('h-0');
        }, 0);
    };


    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (textInput !== '') {
            router.push(`/search?text=${textInput.replaceAll(' ', '_')}&date_from=${fromDate}&to_date=${toDate}&category=${categoryInput.replaceAll(' ','_')}&author=${authorInput.replaceAll(' ','_')}`);
        }
    }

    return (
        <form action="#" onSubmit={handleSubmit} className='mt-1'>
            <label className="input input-bordered flex items-center h-16 gap-2 w-[100%] ">
                <input type="text" className="grow text-lg text-base-content" placeholder="Search" value={textInput} onChange={(e) => setTextInput(e.target.value)} />
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
            <div className='mt-10  flex gap-5 flex-col lg:flex-row items-start flex-wrap lg:justify-between'>
                <label className='lg:w-60 block w-[100%]'>
                    <input type="text" ref={authorRef} onFocus={() => setAuthorClass('h-36')} onBlur={() => setAuthorClass('h-0')} value={authorInput} onChange={handleAuthorChange} placeholder='Author' className='mb-2 pl-1 border-b-2 input-bordered focus-within:outline-none bg-transparent w-[100%] lg:w-60' />
                    <ul className={`${authorClass} overflow-y-scroll sidebar absolute w-[100%] lg:w-60 dark:bg-neutral bg-base-200 duration-100 pl-1`}>
                        {table.filter(selectAuthorFilter).map((item: string) => <li tabIndex={0} onFocus={() => setAuthorClass(`h-36`)} onBlur={() => setAuthorClass(`h-0`)} onClick={() => handleAuthorClick(item)} key={uuid()}> {item} </li>)}
                    </ul>
                </label>
                <label className='w-[100%] lg:w-60 block'>
                    <input type="text" ref={categoryRef} onFocus={() => setCategoryClass('h-36')} onBlur={() => setCategoryClass('h-0')} value={categoryInput} onChange={handleCategoryChange} placeholder='Category' className='pl-1 mb-2 border-b-2 input-bordered focus-within:outline-none bg-transparent w-[100%] lg:w-60' />
                    <ul className={`${categoryClass} overflow-y-scroll sidebar absolute w-[100%] lg:w-60 dark:bg-neutral bg-base-200 duration-100 pl-1`}>
                        {table.filter(selectCategoryFilter).map((item: string) => <li tabIndex={0} onFocus={() => setCategoryClass(`h-36`)} onBlur={() => setCategoryClass(`h-0`)} onClick={() => handleCategoryClick(item)} key={uuid()}>{item} </li>)}
                    </ul>
                </label>
                <label className='w-[100%] lg:w-60 block'>
                    <input type="text" ref={FromRef} value={fromDate} onChange={(e) => setFromDate(e.target.value)} placeholder='From' className='pl-1 mb-2 border-b-2 input-bordered focus-within:outline-none bg-transparent w-[100%] lg:w-60' />
                </label>
                <label className='w-[100%] lg:w-60 block'>
                    <input type="text" ref={ToRef} value={toDate} onChange={(e) => setToDate(e.target.value)} placeholder='To' className='pl-1 mb-2 border-b-2 input-bordered focus-within:outline-none bg-transparent w-[100%] lg:w-60' />
                </label>
            </div>
        </form >
    )
}

export default Search