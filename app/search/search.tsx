'use client'
import { SyntheticEvent, useRef, useState, useEffect, ChangeEvent } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import { v4 as uuid } from 'uuid';
import Optgroup from '../components/optgroup/optgroup';

const Search = () => {
    const [textInput, setTextInput] = useState<string>('');
    const [authorInput, setAuthorInput] = useState<string>('');
    const [categoryInput, setCategoryInput] = useState<string>('');
    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const { theme } = useTheme();

    const FromRef = useRef<null | HTMLInputElement>(null);
    const ToRef = useRef<null | HTMLInputElement>(null);
    const router = useRouter();

    const table = [
        {id: 'fvgse', text: 'aaaaa'},
        {id: 'fsdfxdfs', text: 'cccccc'},
        {id: 'sefdsfsdfs', text: 'dswaf'},
        {id: 'dsfxsesffse', text: 'dswaf'},
        {id: 'dgsdgsdgsd', text: 'dswaf'},
        {id: 'dsgcxgxdgxdf', text: 'dswaf'},
        {id: 'dgbxdgxgcx', text: 'dswaf'},
        {id: 'xvgxcdsee', text: 'dswaf'},
        {id: 'dddddxs', text: 'dswaf'},
        {id: 'sdfsdfsd', text: 'dswaf'},
        {id: 'dfsdfsd', text: 'dswaf'},
        {id: 'dfsdfdsfsd', text: 'dswaf'},
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
            <div className='mt-10  flex gap-5 flex-col lg:flex-row items-start flex-wrap'>
                <Optgroup optElement={table} optInput={authorInput} setOptInput={setAuthorInput} placeHolder='Author'/>
                <Optgroup optElement={table} optInput={categoryInput} setOptInput={setCategoryInput} placeHolder='Category'/>

                <label className='lg:w-[30%] w-full  block'>
                    <input type="text" ref={FromRef} value={fromDate} onChange={(e) => setFromDate(e.target.value)} placeholder='From' className='pl-2 mb-2 border-b-2 input-bordered focus-within:outline-none bg-transparent w-full ' />
                </label>
                <label className='lg:w-[30%] w-full  block'>
                    <input type="text" ref={ToRef} value={toDate} onChange={(e) => setToDate(e.target.value)} placeholder='To' className='pl-2 mb-2 border-b-2 input-bordered focus-within:outline-none bg-transparent w-full' />
                </label>
            </div>
        </form >
    )
}

export default Search