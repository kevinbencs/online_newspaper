import {Dispatch, SetStateAction, useRef, useState, ChangeEvent, KeyboardEvent} from 'react'
import OptItem from './optitemwithoutfilter';

const Optgroup = (props: {optElement:{id:string, text:string}[], optInput: string, setOptInput: Dispatch<SetStateAction<string>>, placeHolder: string}) => {
    const [optClass, setOptClass] = useState<string>('h-0')
    const optRef = useRef<null | HTMLInputElement>(null);
    const ulRef = useRef<null | HTMLUListElement>(null);


      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (props.optElement.filter((arrayItem) => arrayItem.text.toLocaleLowerCase().indexOf(e.target.value.toLocaleLowerCase()) > - 1).length > 0) {
          props.setOptInput(e.target.value);
        }
      };


      const selectFilter = (arrayItem: { id: string, text: string }) => {
        return arrayItem.text.toLocaleLowerCase().indexOf(props.optInput.toLocaleLowerCase()) > -1;
      }

    return (
        <label className='lg:w-[30%] w-full  relative'>
            <input ref={optRef} type="text" name='search_audio' onFocus={() => setOptClass('h-36')} onBlur={() => setOptClass('h-0')} className='focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2' placeholder={props.placeHolder} value={props.optInput} onChange={handleChange} />
            <ul className={`${optClass} overflow-y-scroll sidebar z-10 absolute w-[100%] dark:bg-neutral bg-base-200 duration-100 `}  ref={ulRef} onBlur={() => setOptClass(`h-0`)}>
                {props.optElement.filter(selectFilter).map((item) => <OptItem item={item} key={item.id} optRef={optRef} ulRef={ulRef} setOptInput={props.setOptInput} setOptClass={setOptClass} />)}
            </ul>
        </label>
    )
}

export default Optgroup