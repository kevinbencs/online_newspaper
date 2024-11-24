import {KeyboardEvent, useState, useRef, MutableRefObject, Dispatch, SetStateAction} from 'react'

const OptItem = (props: {optRef: MutableRefObject<HTMLDivElement| null>, ulRef: MutableRefObject<HTMLUListElement| null>, item: {id:string, text:string}, setOptInput: Dispatch<SetStateAction<string>>, setOptClass: Dispatch<SetStateAction<string>>}) => {

    const liRef = useRef<null | HTMLLIElement>(null);

    const handleClick = (s: string) => {
        props.setOptInput(s);
        setTimeout(() => {
          props.optRef.current?.blur();
          liRef.current?.blur();
          props.ulRef.current?.blur();
        }, 0);
      };


      const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>, s: string) => {
        if(e.code === 'Enter' || e.code === 'Space') {
          handleClick(s);
        }
      }
  return (
    <li tabIndex={0} ref={liRef} onFocus={() => props.setOptClass(`h-36`)} className='pl-2 hover:bg-slate-400 hover:text-white' onBlur={() => props.setOptClass(`h-0`)}  onClick={() => handleClick(props.item.text)} onKeyDown={(e) => handleKeyDown(e, props.item.text)}>{props.item.text} </li>
  )
}

export default OptItem