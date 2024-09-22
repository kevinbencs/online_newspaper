'use client';
import { useState, useEffect, useRef, ChangeEvent, Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { FacebookEmbed, InstagramEmbed, YouTubeEmbed, LinkedInEmbed, PinterestEmbed } from 'react-social-media-embed';
import { Tweet } from 'react-tweet';
import Image from 'next/image';
import Stop from '../image/stop.png'
import AudioElement from '../components/audio/audio'
import { v4 as uuid } from 'uuid';
import Tiktok from '../components/tiktokembedded/tiktok';



const Page = () => {
  const [text, setText] = useState<string>('');
  const [categoryInput, setCategoryInput] = useState<string>('');
  const [categoryClass, setCategoryClass] = useState('h-0');
  const [importantInput, setImportantInput] = useState<string>('');
  const [importantClass, setImportantClass] = useState('h-0');
  const [titleInput, setTitleInput] = useState<string>('');
  const [imageUrlInput, setImageUrlInput] = useState<string>('');
  const [imageAltInput, setImageAltInput] = useState<string>('');
  const [paragraphInput, setParaghrapInput] = useState('');
  const [paragPlaceholder, setParagPlaceholder] = useState<string>('placeholder');
  const [fa, setF1] = useState<(string | JSX.Element)[]>([])
  const [textError, setTextError] = useState<string>('');


  const categoryRef = useRef<null | HTMLInputElement>(null);
  const importantRef = useRef<null | HTMLInputElement>(null);

  const Important = [
    'Most important',
    'Second most important',
    'Important',
    'Not important'
  ];

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
    const Text = paragraphInput.split('\n');

    setText(Text.filter((s: string) => s !== '').map((s: string) => `<p class='mb-5'>${s}</p>`).join(''));
  }, [paragraphInput])

  const selectCategoryFilter = (arrayItem: string) => {
    return arrayItem.toLocaleLowerCase().indexOf(categoryInput.toLocaleLowerCase()) > -1;
  }

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (table.filter((arrayItem) => arrayItem.toLocaleLowerCase().indexOf(e.target.value.toLocaleLowerCase()) > - 1).length > 0) {
      setCategoryInput(e.target.value);
    }
  };

  const handleCategoryClick = (r: string) => {
    setCategoryInput(r);
    setTimeout(() => {
      categoryRef.current?.blur();
    }, 0);
  };

  const selectImportantFilter = (arrayItem: string) => {
    return arrayItem.toLocaleLowerCase().indexOf(importantInput.toLocaleLowerCase()) > -1;
  }

  const handleImportantChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (Important.filter((arrayItem) => arrayItem.toLocaleLowerCase().indexOf(e.target.value.toLocaleLowerCase()) > - 1).length > 0) {
      setImportantInput(e.target.value);
    }
  };

  const handleImportantClick = (r: string) => {
    setImportantInput(r);
    setTimeout(() => {
      importantRef.current?.blur();
    }, 0);
  };

  const handleParagraphChange = (e: React.ChangeEvent<HTMLParagraphElement>) => {
    setParaghrapInput(e.target.innerText);
    console.log(e.target.innerText);
    if (e.target.innerText == '\n') setParagPlaceholder('placeholder');
    else setParagPlaceholder('');
  }


  useEffect(() => {
    setF1(jsxInText('  <em><strong>dfvsgg</strong></em> as <Link href={/}><strong>ws</strong></Link> sdgdr <Link href={/}><em>wwdawdawd</em></Link> rgrg <Link href={/}>dasd</Link> <a href={https://www.instagram.com/tinistoessel/tagged/}><strong>adwadwa</strong></a>  <strong><em>efaesfa</em></strong> <a href={https://www.instagram.com/tinistoessel/tagged/}><em>adwadwa</em></a>', setTextError));
  }, [])



  return (
    <div className='mb-20'>
      <section className='flex gap-2 mb-20 flex-wrap'>
        <button className='dark:bg-neutral bg-base-200 pt-1 pb-1 min-w-24 rounded'>bold</button>
        <button className='dark:bg-neutral bg-base-200 pt-1 pb-1 min-w-24 rounded'>italic</button>
        <button className='dark:bg-neutral bg-base-200 pt-1 pb-1 min-w-24 rounded'>image</button>
        <button className='dark:bg-neutral bg-base-200 pt-1 pb-1 min-w-24 rounded'>list</button>
        <button className='dark:bg-neutral bg-base-200 pt-1 pb-1 min-w-24 rounded'>video</button>
        <button className='dark:bg-neutral bg-base-200 pt-1 pb-1 min-w-24 rounded'>voice</button>
        <button className='dark:bg-neutral bg-base-200 pt-1 pb-1 min-w-24 rounded'>link</button>
        <button className='dark:bg-neutral bg-base-200 pt-1 pb-1 min-w-24 rounded'> anchor link</button>
        <button className='dark:bg-neutral bg-base-200 pt-1 pb-1 min-w-24 rounded'> Facebook</button>
        <button className='dark:bg-neutral bg-base-200 pt-1 pb-1 min-w-24 rounded'> Instagram</button>
        <button className='dark:bg-neutral bg-base-200 pt-1 pb-1 min-w-24 rounded'> X</button>
        <button className='dark:bg-neutral bg-base-200 pt-1 pb-1 min-w-24 rounded'> LinkedIn</button>
        <button className='dark:bg-neutral bg-base-200 pt-1 pb-1 min-w-24 rounded'> Pinterest</button>
        <button className='dark:bg-neutral bg-base-200 pt-1 pb-1 min-w-24 rounded'> Tiktok</button>
        <button className='dark:bg-neutral bg-base-200 pt-1 pb-1 min-w-24 rounded'> Youtube </button>
      </section>

      <form action="" className='mb-60'>
        <input type="text" name='title' className='focus-within:outline-none border-b-2 block w-[100%] mb-8 bg-transparent pl-2' placeholder='Article title' value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
        <div className='flex gap-5 flex-wrap mb-8'>
          <input type="text" name='first_picture' className='focus-within:outline-none border-b-2 block w-[30%] bg-transparent pl-2' placeholder='First picture url' value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)} />
          <input type="text" name='first_picture_alt' className='focus-within:outline-none border-b-2 block w-[30%] bg-transparent pl-2' placeholder='First picture alt' value={imageAltInput} onChange={(e) => setImageAltInput(e.target.value)} />
        </div>
        <div className='flex gap-5 flex-wrap'>
          <label className='w-[30%]  block'>
            <input type="text" ref={categoryRef} onFocus={() => setCategoryClass('h-36')} onBlur={() => setCategoryClass('h-0')} value={categoryInput} onChange={handleCategoryChange} placeholder='Category' className='pl-2 mb-2 border-b-2  focus-within:outline-none bg-transparent w-[100%] block' />
            <ul className={`${categoryClass} overflow-y-scroll sidebar absolute w-[100%] lg:w-60 dark:bg-neutral bg-base-200 duration-100 pl-2`}>
              {table.filter(selectCategoryFilter).map((item: string) => <li tabIndex={0} onFocus={() => setCategoryClass(`h-36`)} onBlur={() => setCategoryClass(`h-0`)} onClick={() => handleCategoryClick(item)} key={uuid()}>{item} </li>)}
            </ul>
          </label>
          <label className='w-[30%]  block'>
            <input type="text" ref={importantRef} onFocus={() => setImportantClass('h-36')} onBlur={() => setImportantClass('h-0')} value={importantInput} onChange={handleImportantChange} placeholder='Important?' className='pl-2 mb-2 border-b-2  focus-within:outline-none bg-transparent w-[100%] block' />
            <ul className={`${importantClass} overflow-y-scroll sidebar absolute w-[100%] lg:w-60 dark:bg-neutral bg-base-200 duration-100 pl-2`}>
              {Important.filter(selectImportantFilter).map((item: string) => <li tabIndex={0} onFocus={() => setImportantClass(`h-36`)} onBlur={() => setImportantClass(`h-0`)} onClick={() => handleImportantClick(item)} key={uuid()}>{item} </li>)}
            </ul>
          </label>
        </div>

        <p contentEditable="true" className={`mt-10 focus-within:outline-none border p-3 rounded min-h-24 ${paragPlaceholder}`} onInput={handleParagraphChange} tabIndex={0}></p>
      </form>

      {textError !== '' &&
        <div className='text-5xl red'>{textError}</div>
      }



      <div className='max-w-[550px]'>
        <FacebookEmbed url='https://www.facebook.com/peter.konok/posts/8361474520575249' width={'100%'} />
      </div>

      <div >
        <Tweet id="1629307668568633344" />
      </div>

      <div className='max-w-[328px]'>
        <InstagramEmbed url='https://www.instagram.com/p/C9692HUIQtU/' width={`100%`} captioned />
      </div>


      <div className=' mt-10 max-w-[328px]'>
        <PinterestEmbed url='https://hu.pinterest.com/pin/770256342549487715/'
          width={`100%`}
          height={`100%`}
        />
      </div>



      <div className=' mt-10 max-w-[500px]'>
        <YouTubeEmbed url='https://www.youtube.com/watch?v=5QmLOfz1L5M' width={`100%`} height={`100%`} />
      </div>

      <div className='mt-10 max-w-[500px]'>
        <LinkedInEmbed url='https://www.linkedin.com/embed/feed/update/urn:li:share:7240254513041842176'
          width={`100%`} />
      </div>

      <Image src={Stop} alt='swfaw' className='mt-10 mb-10' />
      <Image src={'https://drive.usercontent.google.com/uc?id=1tzXMb5L46xtEjI1Z91CO9m9ggW_bwEMD'} alt='fesaesf' width={600} height={400} />

      <AudioElement />

      <Tiktok url='https://www.tiktok.com/@scout2015/video/6718335390845095173' />

      <div >
        {(imageAltInput !== '' && imageUrlInput !== '') &&
          <img src={imageUrlInput} alt={imageAltInput} className='w-[100%] block mb-10' />
        }
        <h2 className='mt-20 text-4xl mb-20 font-bold'>{titleInput}</h2>
        <div>
          {fa}
        </div>





      </div>
    </div>
  )
}

export default Page







/*************************************************************************************************************************************
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *************************************************************************************************************************************/
















const chooseTypeOfTextItem = (s: string, setTextError: Dispatch<SetStateAction<string>>) => {
  let TextArray: (string | JSX.Element)[] = [];
  if (s.indexOf('<p>') === 0) {TextArray = jsxInText(s, setTextError) }
  else if (s.indexOf('<img>') === 0) { }
  else if (s.indexOf('<ul>') === 0) { }
  else if (s.indexOf('<video>') === 0) { }
  else if (s.indexOf('<youtube>') === 0) { }
  else if (s.indexOf('<x>') === 0) { }
  else if (s.indexOf('<facebook>') === 0) { }
  else if (s.indexOf('<instagram>') === 0) { }
  else if (s.indexOf('<linkedin>') === 0) { }
  else if (s.indexOf('<tiktok>') === 0) { }
  else if (s.indexOf('<pinterest>') === 0) { }
  else { setTextError('Error'); return }

  return TextArray;
}


const jsxInText = (s: string, setTextError: Dispatch<SetStateAction<string>>) => {
  const textArray: (string | JSX.Element)[] = [];

  let index1: number = 0
  let index2: number | JSX.Element = s.indexOf('<')
  let error: string = '';
  let result: number | JSX.Element = <></>;


  while (index2 > -1) {

    if (s.indexOf('<Link', index1) === index2 && index2 > -1) {
      textArray.push(s.slice(index1, index2));
      result = createLink(s.slice(index2, s.indexOf('</Link>', index2) + 7), setTextError, index2);

      if (typeof (result) !== 'number') {
        textArray.push(result);
        index1 = s.indexOf('</Link>', index2) + 7;
        index2 = s.indexOf('<', index1);
      }
    }
    else if (s.indexOf('<a', index1) === index2 && index2 > -1) {
      textArray.push(s.slice(index1, index2));
      result = createAnchor(s.slice(index2, s.indexOf('</a>', index2) + 4), setTextError, index2);
      if (typeof (result) !== 'number') {
        textArray.push(result);
        index1 = s.indexOf('</a>', index2) + 4;
        index2 = s.indexOf('<', index1);
      }

    }
    else if (s.indexOf('<strong', index1) === index2 && index2 > -1) {
      textArray.push(s.slice(index1, index2));
      result = createStrong(s.slice(index2, s.indexOf('</strong>', index2) + 9), setTextError, index2);
      if (typeof (result) !== 'number') {
        textArray.push(result);
        index1 = s.indexOf('</strong>', index2) + 9;
        index2 = s.indexOf('<', index1);
      }

    }
    else if (s.indexOf('<em', index1) === index2 && index2 > -1) {
      textArray.push(s.slice(index1, index2));
      result = createEm(s.slice(index2, s.indexOf('</em>', index2) + 5), setTextError, index2);
      if (typeof (result) !== 'number') {
        textArray.push(result);
        index1 = s.indexOf('</em>', index2) + 5;
        index2 = s.indexOf('<', index1);
      }

    }
    else {
      error = 'error';
      setTextError('Error');
      index2 = -1;
    }
    if (typeof (result) === 'number') {
      error = 'error';
      setTextError('Error');
      index2 = -1;
    }
  }

  if (error === '') textArray.push(s.slice(index1, s.length));

  return textArray;
}

const createLink = (s: string, setTextError: Dispatch<SetStateAction<string>>, index2: number) => {
  const indexHref: number = s.indexOf('{');
  const indexHrefEnd: number = s.indexOf('}');
  const indexTextEnd: number = s.indexOf('</Link', 1);
  const emIndex: number = s.indexOf('<em');
  const strongIndex: number = s.indexOf('<strong');
  const index: number = s.indexOf('<', 1);
  if (indexHref === -1 || indexHrefEnd === -1 || indexTextEnd === -1 || (index !== emIndex && index !== strongIndex && index !== indexTextEnd)) {
    index2 = -1;
    setTextError('Error');
    return -1;
  }

  const text = s.slice(indexHrefEnd + 2, indexTextEnd);
  const textArray: (string | JSX.Element)[] = [];
  let index1: number = 0
  let index3: number = text.indexOf('<');
  let result: JSX.Element | number = <></>;

  while (index3 > -1) {
    if (text.indexOf('<em') === index3 && index3 > -1) {
      textArray.push(text.slice(index1, index3));
      result = createEm(text.slice(index3, text.indexOf('</em>', index3) + 5), setTextError, index2);

      if (typeof (result) !== 'number') {
        textArray.push(result);
        index1 = text.indexOf('</em>', index3) + 5;
        index3 = text.indexOf('<', index1);
      }
    }
    else if (text.indexOf('<strong') === index3 && index3 > -1) {
      textArray.push(text.slice(index1, index3));
      result = createStrong(text.slice(index3, text.indexOf('</strong>', index3) + 9), setTextError, index2);

      if (typeof (result) !== 'number') {
        textArray.push(result);
        index1 = text.indexOf('</strong>', index3) + 9;
        index3 = text.indexOf('<', index1);
      }
    }
    else {
      setTextError('error');
      return -1;
    }
    if (typeof (result) === 'number') {
      setTextError('error');
      return -1;
    }
  }
  textArray.push(text.slice(index1, text.length))
  return (
    <Link href={s.slice(indexHref + 1, indexHrefEnd)} key={uuid()}>{textArray}</Link>
  )
}


const createAnchor = (s: string, setTextError: Dispatch<SetStateAction<string>>, index2: number) => {
  const indexHref: number = s.indexOf('{');
  const indexHrefEnd: number = s.indexOf('}');
  const indexTextEnd: number = s.indexOf('</a', 1);
  const emIndex: number = s.indexOf('<em');
  const strongIndex: number = s.indexOf('<strong');
  const index: number = s.indexOf('<', 1);
  if (indexHref === -1 || indexHrefEnd === -1 || indexTextEnd === -1 || (index !== emIndex && index !== strongIndex && index !== indexTextEnd)) {
    setTextError('Error');
    return -1;
  }
  ///Fixed the +2 error link kinézet miatt {} >///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const text = s.slice(indexHrefEnd + 2, indexTextEnd);
  const textArray: (string | JSX.Element)[] = [];
  let index1: number = 0
  let index3: number = text.indexOf('<');
  let result: JSX.Element | number = <></>;

  while (index3 > -1) {
    if (text.indexOf('<em') === index3 && index3 > -1) {

      textArray.push(text.slice(index1, index3));
      result = createEm(text.slice(index3, text.indexOf('</em>', index3) + 5), setTextError, index2);
      if (typeof (result) !== 'number') {
        textArray.push(result);
        index1 = text.indexOf('</em>', index3) + 5;
        index3 = text.indexOf('<', index1);
      }

    }
    else if (text.indexOf('<strong') === index3 && index3 > -1) {
      textArray.push(text.slice(index1, index3));
      result = createStrong(text.slice(index3, text.indexOf('</strong>', index3) + 9), setTextError, index2);
      if (typeof (result) !== 'number') {
        textArray.push(result);
        index1 = text.indexOf('</strong>', index3) + 9;
        index3 = text.indexOf('<', index1);
      }

    }
    else {
      setTextError('error');
      return -1;
    }
    if (typeof (result) === 'number') {
      setTextError('error');
      return -1;
    }
  }
  textArray.push(text.slice(index1, text.length))

  return (
    <a target='blank' href={s.slice(indexHref + 1, indexHrefEnd)} key={uuid()}>{textArray}</a>
  )
}


const createStrong = (s: string, setTextError: Dispatch<SetStateAction<string>>, index2: number) => {
  const indexHrefEnd = s.indexOf('>');
  const indexTextEnd = s.indexOf('</strong', 1);
  const index = s.indexOf('<', 1);
  const emIndex = s.indexOf('<em');
  if (indexHrefEnd === -1 || indexTextEnd === -1 || (index !== indexTextEnd && index !== emIndex)) {
    setTextError('Error');
    return -1;
  }

  const text = s.slice(indexHrefEnd + 1, indexTextEnd);
  const textArray: (string | JSX.Element)[] = [];
  let index1: number = 0
  let index3: number = text.indexOf('<');
  let result: number | JSX.Element = <></>;

  while (index3 > -1) {
    if (text.indexOf('<em') === index3 && index3 > -1) {

      textArray.push(text.slice(index1, index3));
      result = createEmText(text.slice(index3, text.indexOf('</em>', index3) + 5), setTextError, index2);
      if (typeof (result) !== 'number') {
        textArray.push(result);
        index1 = text.indexOf('</em>', index3) + 5;
        index3 = text.indexOf('<', index1);
      }
    }
    else {
      setTextError('error');
      return -1;
    }
    if (typeof (result) === 'number') {
      setTextError('error');
      return -1;
    }
  }
  textArray.push(text.slice(index1, text.length))

  return (
    <strong key={uuid()}>{textArray}</strong>
  )
}

const createStrongText = (s: string, setTextError: Dispatch<SetStateAction<string>>, index2: number) => {
  const indexHrefEnd = s.indexOf('>');
  const indexTextEnd = s.indexOf('</strong', 1);
  const index = s.indexOf('<', 1);
  if (indexHrefEnd === -1 || indexTextEnd === -1 || index !== indexTextEnd) {
    setTextError('Error');
    return -1;
  }

  const text = s.slice(indexHrefEnd + 1, indexTextEnd);

  return (
    <strong key={uuid()}>{text}</strong>
  )
}



const createEm = (s: string, setTextError: Dispatch<SetStateAction<string>>, index2: number) => {
  const indexHrefEnd = s.indexOf('>');
  const indexTextEnd = s.indexOf('</em');
  const index = s.indexOf('<', 1);
  const strongIndex = s.indexOf('<strong');

  if (indexHrefEnd === -1 || indexTextEnd === -1 || (index !== indexTextEnd && index !== strongIndex)) {
    setTextError('Error');
    return -1;
  }
  const text = s.slice(indexHrefEnd + 1, indexTextEnd);

  const textArray: (string | JSX.Element)[] = [];
  let index1: number = 0
  let index3: number = text.indexOf('<');
  let result: number | JSX.Element = <></>;

  while (index3 > -1) {
    if (text.indexOf('<strong') === index3 && index3 > -1) {
      textArray.push(text.slice(index1, index3));
      result = createStrongText(text.slice(index3, text.indexOf('</strong>', index3) + 9), setTextError, index2);

      if (typeof (result) !== 'number') {
        textArray.push(result);
        index1 = text.indexOf('</strong>', index3) + 9;
        index3 = text.indexOf('<', index1);
      }
    }
    else {
      setTextError('error');
      return -1;
    }
    if (typeof (result) === 'number') {
      setTextError('error');
      return -1;
    }
  }
  textArray.push(text.slice(index1, text.length))
  return (
    <em key={uuid()}>{textArray}</em>
  )
}


const createEmText = (s: string, setTextError: Dispatch<SetStateAction<string>>, index2: number) => {
  const indexHrefEnd = s.indexOf('>');
  const indexTextEnd = s.indexOf('</em');
  const index = s.indexOf('<', 1);

  if (indexHrefEnd === -1 || indexTextEnd === -1 || index !== indexTextEnd) {
    setTextError('Error');
    return -1;
  }
  const text = s.slice(indexHrefEnd + 1, indexTextEnd);
  return (
    <em key={uuid()}>{text}</em>
  )
}
