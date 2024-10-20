import {Dispatch, SetStateAction, useRef, useState, KeyboardEvent, ChangeEvent} from 'react'

const OptgroupWithOutFilter = (props: {optElement:{id:string, text:string}[], optInput: string, setOptInput: Dispatch<SetStateAction<string>>, placeHolder: string}) => {
    const [optClass, setOptClass] = useState<string>('h-0')
    const optRef = useRef<null | HTMLInputElement>(null);

    const handleClick = (s: string) => {
        props.setOptInput(s);
        setTimeout(() => {
          optRef.current?.blur();
        }, 0);
      };



      const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>, s: string) => {
        if(e.code === 'Enter' || e.code === 'Space') handleClick(s);
      }


    return (
        <label className='lg:w-[30%] w-full block'>
            <input ref={optRef} type="text" name='search_audio' onFocus={() => setOptClass('h-36')} onBlur={() => setOptClass('h-0')} className='focus-within:outline-none border-b-2 block w-full bg-transparent pl-2' placeholder={props.placeHolder} readOnly value={props.optInput} />
            <ul className={`${optClass} overflow-y-scroll sidebar absolute w-[100%] lg:w-[calc(15%-20px)] dark:bg-neutral bg-base-200 duration-100 pl-2`}>
                {props.optElement.map((item) => <li tabIndex={0} onFocus={() => setOptClass(`h-36`)} onBlur={() => setOptClass(`h-0`)} key={item.id} onClick={() => handleClick(item.text)} onKeyDown={(e) => handleKeyDown(e, item.text)}>{item.text} </li>)}
            </ul>
        </label>
    )
}

export default OptgroupWithOutFilter