'use client'

import { SyntheticEvent, useRef, useState } from 'react'

const Page = () => {
  const [paragPlaceholder, setParagPlaceholder] = useState<string>('placeholder');
  const [paragraphInput, setParagraphInput] = useState('');
  const TextEnterRef = useRef<null | HTMLParagraphElement>(null);

  const handleParagraphChange = (e: React.ChangeEvent<HTMLParagraphElement>) => {
    setParagraphInput(e.target.innerText);
    if (e.target.innerText == '\n' || e.target.innerText === '') setParagPlaceholder('placeholder');
    else setParagPlaceholder('');
  }

  const handleSubmit = async (e:SyntheticEvent) => {
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p contentEditable="true" className={`mt-10 focus-within:outline-none border p-3 rounded min-h-24 ${paragPlaceholder}`} onInput={handleParagraphChange} tabIndex={0} ref={TextEnterRef}></p>
        <input type="submit" value="Send" className='w-full lg:w-12'/>
      </form>
    </div>
  )
}

export default Page