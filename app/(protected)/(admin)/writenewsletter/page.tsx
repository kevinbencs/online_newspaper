'use client'

import { writeNewsletter } from '@/actions/writenewsletter';
import { SyntheticEvent, useRef, useState, useTransition, useEffect } from 'react'
import { ZodIssue } from 'zod';
import { v4 as uuid } from 'uuid';
import Bold_italic from '../../../_components/newArticle/bold_italic';
import Link_Anchor from '../../../_components/newArticle/link_Anchor';
import List_embedded from '../../../_components/newArticle/list_embedded';
import { chooseTypeOfTextItem } from '@/app/_components/email/showEmail';
import facebook from '@/image/facebook.png'
import Image from 'next/image';
import instagram from '@/image/instagram.png';
import youtube from '@/image/youtube.png';
import x from '@/image/logos.png';
import tiktok from '@/image/tik-tok(1).png';
import email from '@/image/email.png';
import CurrentDate from '@/app/_components/date/currentdate';
import Optgroup from '@/app/_components/optgroup/optgroup';

const Page = () => {
  const [paragPlaceholder, setParagPlaceholder] = useState<string>('placeholder');
  const [paragraphInput, setParagraphInput] = useState('');
  const TextEnterRef = useRef<null | HTMLParagraphElement>(null);
  const [success, setSuccess] = useState<undefined | string>('');
  const [error, setError] = useState<string>('');
  const [failed, setFailed] = useState<undefined | ZodIssue[]>([]);
  const [subject, setSubject] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const [text, setText] = useState<(string | JSX.Element)[]>(['']);
  const [title, setTitle] = useState<string>('')
  const [searchImageInput, setSearchImageInput] = useState<string>('');
  const [imageAltInput, setImageAltInput] = useState<string>('');

  const tableImage = [
    { id: 'awdfaw', text: 'aaaaa', },
    { id: 'wadsd', text: 'cccccc', },
    { id: 'öaweda', text: 'dswaf', },
  ];

  const bold_italic: string[] = ['bold', 'italic'];
  const link_anchor: string[] = ['anchor_link'];
  const list_embedded = [
    { text: 'image', textElem: '<Image url=()/>' },
    { text: 'list', textElem: '<ul>item1<list>item2<list>item3</ul>' },
    { text: 'highlight', textElem: '<highlight></highlight>' },
  ]

  const handleParagraphChange = (e: React.ChangeEvent<HTMLParagraphElement>) => {
    setParagraphInput(e.target.innerText);
    if (e.target.innerText == '\n' || e.target.innerText === '') setParagPlaceholder('placeholder');
    else setParagPlaceholder('');
    setSuccess('');
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    setSuccess('');
    setError('');
    setFailed([])
    e.preventDefault()
    startTransition(() => {
      writeNewsletter({ text: paragraphInput, subject, title })
        .then((res) => {
          if (res.success) {
            setParagraphInput('');
            setSuccess(res.success);
            setParagPlaceholder('placeholder');
            setSubject('');
            setTitle('');
            if (TextEnterRef.current) {
              TextEnterRef.current.innerText = '';
            }

          }
          if (res.error) setError(res.error)
          if (res.failed) setFailed(res.failed)
        })
    })
  }

  useEffect(() => {
    const Text = paragraphInput.split('\n').filter(item => item !== '');
    setError('');
    setText(Text.map(item => chooseTypeOfTextItem(item, setError)));
  }, [paragraphInput])

  return (
    <div className='mt-40 min-h-screen'>
      <section className='flex gap-2 mb-20 flex-wrap'>
        {bold_italic.map((item: string) => <Bold_italic text={item} TextEnterRef={TextEnterRef} key={uuid()} />)}
        {link_anchor.map((item: string) => <Link_Anchor text={item} TextEnterRef={TextEnterRef} key={uuid()} />)}
        {list_embedded.map(item => <List_embedded TextEnterRef={TextEnterRef} text={item.text} textElem={item.textElem} key={uuid()} />)}
      </section>
      {success &&
        <div className='text-green-600 bg-green-600/15 p-2 text-center rounded-lg mb-5 font-bold'>{success}</div>
      }
      {(failed && failed.length > 0) &&
        <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 rounded-lg mb-5  p-2'>
          {failed.map(e => <div key={uuid()}>{e.message}</div>)}
        </div>
      }
      {error &&
        <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 text-center bg-red-700/25 rounded-lg mb-5  p-2'>
          {error}
        </div>
      }
      <div className='flex gap-5 flex-wrap mb-8'>
        <Optgroup optElement={tableImage} setOptInput={setSearchImageInput} optInput={searchImageInput} placeHolder='Search image' />

        <input type="text" name='first_picture_alt' className='focus-within:outline-none input-bordered border-b-2 block lg:w-[30%] w-full bg-transparent pl-2' placeholder='URL' value={imageAltInput} onChange={(e) => setImageAltInput(e.target.value)} />
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" disabled={isPending} name="subject" className='mt-10 focus-within:outline-none border-t-0 border-r-0 border-l-0 w-full border border-b p-3 bg-transparent input-bordered' placeholder='Subject' value={subject} onChange={(e) => { setSubject(e.target.value); setSuccess('') }} />
        <input type='text' disabled={isPending} name="title" className='mt-5 focus-within:outline-none border-t-0 border-r-0 border-l-0 w-full border border-b p-3 bg-transparent input-bordered' placeholder='Title' value={title} onChange={(e) => { setTitle(e.target.value); setSuccess('') }} />
        <p contentEditable={!isPending} className={`mt-10 focus-within:outline-none border p-3 rounded-md min-h-80 input-bordered ${paragPlaceholder}`} onInput={handleParagraphChange} tabIndex={0} ref={TextEnterRef}></p>
        <input type="submit" disabled={isPending} value="Send" className='w-full lg:w-14 mt-10 cursor-pointer bg-slate-600 p-1 text-center rounded-sm hover:bg-slate-400 text-white' />
      </form>

      <div className="mt-10 mb-10 ">
        <div className='bg-[#F5F5F5] p-2'>
          <div className=' max-w-[800px] mx-auto bg-white pt-2 text-black'>
            <div className='pl-2 mb-2'>
              <Image src={email} alt='Email icon' className='w-8' />
            </div>
            <div className='pl-2 mb-10'>
              <CurrentDate />
            </div>
            <div className="mb-10 text-3xl font-bold pl-2">{title}</div>
            <div className='mb-10 pl-2'>Dear Someone,</div>
            {text}
            <div className='mt-5 text-white bg-black p-2   '>
              <ul className='flex gap-[10px] list-none mb-10 mt-2'>
                <li>
                  <a href="https://www.facebook.com" target='_blank' className='text-white'>
                    <Image src={facebook} alt='facebook icon' width={20} className=' hover:transform-none ' />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com" target='_blank' className='text-white'>
                    <Image src={instagram} alt='facebook icon' width={20} className=' hover:transform-none ' />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com" target='_blank' className='text-white'>
                    <Image src={youtube} alt='facebook icon' width={20} className=' hover:transform-none ' />
                  </a>
                </li>
                <li>
                  <a href="https://www.x.com" target='_blank' className='text-white'>
                    <Image src={x} alt='facebook icon' width={20} className=' hover:transform-none ' />
                  </a>
                </li>
                <li>
                  <a href="https://www.tiktok.com" target='_blank' className='text-white'>
                    <Image src={tiktok} alt='facebook icon' width={20} className=' hover:transform-none ' />
                  </a>
                </li>
              </ul>
              <div className='mb-4'>Want to stop getting emails from Wordtimes? <a href='http://localhost:3000/newsletter/unsubscribe/token' target='_blank' className='text-white link hover:text-white dark:hover:text-white'>Unsubscribe</a></div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Page