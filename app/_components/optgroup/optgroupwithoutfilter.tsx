import {Dispatch, SetStateAction, useRef, useState} from 'react'
import OptItem from './optitemwithoutfilter';

const OptgroupWithOutFilter = (props: {optElement:{id:string, text:string}[], optInput: string, setOptInput: Dispatch<SetStateAction<string>>, placeHolder: string}) => {
    const [optClass, setOptClass] = useState<string>('h-0')
    const optRef = useRef<null | HTMLInputElement>(null);
    const ulRef = useRef<null | HTMLUListElement>(null);

    return (
        <label className='lg:w-[30%] w-full relative block'>
            <input ref={optRef} type="text" name='search_audio' onFocus={() => setOptClass('h-36')} onBlur={() => setOptClass('h-0')} className='focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 dark:text-white' placeholder={props.placeHolder} readOnly value={props.optInput} />
            <ul className={`${optClass} overflow-y-scroll sidebar absolute w-[100%] z-10 dark:bg-neutral bg-base-200 duration-100 `} ref={ulRef} onBlur={() => setOptClass(`h-0`)}>
                {props.optElement.map((item: {id:string, text:string}) => <OptItem item={item} key={item.id} optRef={optRef} ulRef={ulRef} setOptInput={props.setOptInput} setOptClass={setOptClass} />)}
            </ul>
        </label>
    )
}

export default OptgroupWithOutFilter