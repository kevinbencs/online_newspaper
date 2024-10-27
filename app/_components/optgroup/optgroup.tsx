import {Dispatch, SetStateAction, useRef, useState, ChangeEvent, KeyboardEvent} from 'react'

const Optgroup = (props: {optElement:{id:string, text:string}[], optInput: string, setOptInput: Dispatch<SetStateAction<string>>, placeHolder: string}) => {
    const [optClass, setOptClass] = useState<string>('h-0')
    const optRef = useRef<null | HTMLInputElement>(null);

    const handleClick = (s: string) => {
        props.setOptInput(s);
        setTimeout(() => {
          optRef.current?.blur();
        }, 0);
      };

      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (props.optElement.filter((arrayItem) => arrayItem.text.toLocaleLowerCase().indexOf(e.target.value.toLocaleLowerCase()) > - 1).length > 0) {
          props.setOptInput(e.target.value);
        }
      };

      const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>, s: string) => {
        if(e.code === 'Enter' || e.code === 'Space') handleClick(s);
      }

      const selectFilter = (arrayItem: { id: string, text: string }) => {
        return arrayItem.text.toLocaleLowerCase().indexOf(props.optInput.toLocaleLowerCase()) > -1;
      }

    return (
        <label className='lg:w-[30%] w-full  relative'>
            <input ref={optRef} type="text" name='search_audio' onFocus={() => setOptClass('h-36')} onBlur={() => setOptClass('h-0')} className='focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2' placeholder={props.placeHolder} value={props.optInput} onChange={handleChange} />
            <ul className={`${optClass} overflow-y-scroll sidebar z-10 absolute w-[100%] dark:bg-neutral bg-base-200 duration-100 pl-2`}>
                {props.optElement.filter(selectFilter).map((item) => <li tabIndex={0} onFocus={() => setOptClass(`h-36`)} onBlur={() => setOptClass(`h-0`)} key={item.id} onClick={() => handleClick(item.text)} onKeyDown={(e) => handleKeyDown(e, item.text)} >{item.text} </li>)}
            </ul>
        </label>
    )
}

export default Optgroup