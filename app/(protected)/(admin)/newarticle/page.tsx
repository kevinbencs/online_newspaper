'use client';
import { useState, useEffect, useRef, SyntheticEvent, Dispatch, SetStateAction, RefObject, useTransition } from 'react';
import { YouTubeEmbed, } from 'react-social-media-embed';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';
import { chooseTypeOfTextItem } from '../../../_components/newArticle/showArcticle'
import Bold_italic from '../../../_components/newArticle/bold_italic';
import Link_Anchor from '../../../_components/newArticle/link_Anchor';
import List_embedded from '../../../_components/newArticle/list_embedded';
import Rightsidebar from '@/app/_components/newArticle/rightsidebar';
import Optgroup from '../../../_components/optgroup/optgroup';
import OptgroupWithOutFilter from '../../../_components/optgroup/optgroupwithoutfilter';
import Themes from '../../../_components/newArticle/themes';
import Paywall from '../../../_components/paywall';
import { WriteArticle } from '@/actions/writearticle';
import * as z from 'zod';
import ImgOptgroup from '@/app/_components/optgroup/articleimggroup';
import AudioOptgroup from '@/app/_components/optgroup/articleaudiogroup';
import VideoOptgroup from '@/app/_components/optgroup/articlevideogroup';
import Img from '@/app/_components/newArticle/img';
import Vid from '@/app/_components/newArticle/vid';
import { getCategory } from '@/actions/getcategory';

type Dispatcher<T> = Dispatch<SetStateAction<T>>

const Page = () => {
  const [text, setText] = useState<(string | JSX.Element)[]>(['']);
  const [categoryInput, setCategoryInput] = useState<string>('');
  const [importantInput, setImportantInput] = useState<string>('');
  const [firstElementInput, setFirstElementInput] = useState<string>('');
  const [coverImageId, setCoverImageId] = useState<string>('');
  const [Category, setCategory] = useState<{id:string,text:string}[]>([]);
  const [detail, setDetail] = useState<string>('');

  const [themes, setThemes] = useState<string[]>([]);
  const [Reset1, setReset] = useState<boolean>(false);

  const [imageCopyMessage, setImageCopyMessage] = useState<string>('Click to copy');
  const [audioCopyMessage, setAudioCopyMessage] = useState<string>('Click to copy');
  const [videoCopyMessage, setVideoCopyMessage] = useState<string>('Click to copy');
  const [isPending, startTransition] = useTransition();

  const [titleInput, setTitleInput] = useState<string>('');
  const [firstElementUrl, setFirstElementUrl] = useState<string>('');
  const [paywall, setPaywall] = useState<string>('Paywall: no');
  const [sidebar, setSidebar] = useState<string>('Sidebar: yes');

  const [paragraphInput, setParagraphInput] = useState<string>('');
  const [paragraphPaywallInput, setParagraphPaywallInput] = useState('');
  const [paragPlaceholder, setParagPlaceholder] = useState<string>('placeholder');

  const [paywallText, setPaywallText] = useState<(string | JSX.Element)[]>(['']);
  const [paragPaywallPlaceholder, setParagPaywallPlaceholder] = useState<string>('placeholder');
  const [textError, setTextError] = useState<string>('');

  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');
  const [failed, setFailed] = useState<undefined | z.ZodIssue[]>([])

  const TextEnterRef = useRef<null | HTMLParagraphElement>(null);
  const PaywallParagRef = useRef<null | HTMLParagraphElement>(null);

  const bold_italic: string[] = ['bold', 'italic'];
  const link_anchor: string[] = ['Link', 'anchor_link'];
  const list_embedded = [
    { text: 'image', textElem: '<Image id=()/>' },
    { text: 'list', textElem: '<ul>item1<list>item2<list>item3</ul>' },
    { text: 'video', textElem: '<video id=()></video>' },
    { text: 'audio', textElem: '<audio id=()></audio>' },
    { text: 'facebook', textElem: '<facebook url=()/>' },
    { text: 'instagram', textElem: '<instagram url=()/>' },
    { text: 'X', textElem: '<X id=()/>' },
    { text: 'linkedin', textElem: '<linkedin url=()/>' },
    { text: 'pinterest', textElem: '<pinterest url=()/>' },
    { text: 'tiktok', textElem: '<tiktok url=()/>' },
    { text: 'youtube', textElem: '<youtube url=()/>' },
    { text: 'title', textElem: '<title></title>' },
    { text: 'highlight', textElem: '<highlight></highlight>' },
  ]

  const paywallTable = [
    { id: 'efwefwe', text: 'Paywall: no' },
    { id: 'adsawas', text: 'Paywall: yes' }
  ]

  const sidebarTable = [
    { id: 'efwewfwe', text: 'Sidebar: no' },
    { id: 'adsawwas', text: 'Sidebar: yes' }
  ]


  const Important = [
    { id: 'wadaw', text: 'Most important', },
    { id: 'awds', text: 'Second most important', },
    { id: 'awdsaw', text: 'Important', },
    { id: 'awdsadsadasdas', text: 'Not important' }
  ];

  const FirstElement = [
    { id: 'wadaww', text: 'None', },
    { id: 'awdsws', text: 'Image', },
    { id: 'awdwssaw', text: 'Video', },
    { id: 'awdsfadwssadasdas', text: 'Youtube' }
  ];



  useEffect(() => {
    getCategory()
    .then(res => {
      if(res.success) {
        const values: {id: string, text: string}[] = [];
        for(let i = 0; i < res.success.length; i++){
          values.push({id:res.success[i]._id, text:res.success[i].name})
        }
        setCategory(values)}
    })
  },[])

  useEffect(() => {
    const Text = paragraphInput.split('\n').filter(item => item !== '');
    setTextError('');
    setText(Text.map(item => chooseTypeOfTextItem(item, setTextError)));
  }, [paragraphInput])

  useEffect(() => {
    const Text = paragraphPaywallInput.split('\n').filter(item => item !== '');
    setTextError('');
    setPaywallText(Text.map(item => chooseTypeOfTextItem(item, setTextError)));
  }, [paragraphPaywallInput])

  const handleParagraphChange = (e: React.ChangeEvent<HTMLParagraphElement>) => {
    setParagraphInput(e.target.innerText);
    if (e.target.innerText == '\n' || e.target.innerText === '') setParagPlaceholder('placeholder');
    else setParagPlaceholder('');
  }

  const handleParagraphPaywallChange = (e: React.ChangeEvent<HTMLParagraphElement>) => {
    setParagraphPaywallInput(e.target.innerText);
    if (e.target.innerText == '\n' || e.target.innerText === '') setParagPaywallPlaceholder('placeholder');
    else setParagPaywallPlaceholder('');
  }

  const handleSubmit = (e: SyntheticEvent) => {
    setSuccess('');
    setError('');
    setFailed([]);
    e.preventDefault();
  }

  const saveTheArticle = () => {
    if (titleInput !== '' && categoryInput !== '' && importantInput !== '' && paywall !== '' && sidebar !== '' && themes.length !== 0) {
      startTransition(() => {
        WriteArticle({
          text: paragraphInput.split('\n').filter(item => item !== '').join('$'), title: titleInput, first_element: firstElementInput, first_element_url: firstElementUrl, category: categoryInput, important: importantInput,
          paywall: paywall === 'Paywall yes' ? true : false, sidebar: sidebar === 'Sidebar: yes' ? true : false, themes: themes.join('$'), keyword: themes, cover_img_id: coverImageId, 
          paywall_text: paragraphPaywallInput.split('\n').filter(item => item !== '').join('$'), detail

        })
          .then((res) => {
            if (res.success) {
              setSuccess(res.success);

              setText([]);
              reset(
                setText, setCategoryInput, setImportantInput, setFirstElementInput, setThemes, setTitleInput, setFirstElementUrl, setPaywall,
                setSidebar,  setParagraphInput, setParagraphPaywallInput, setParagPlaceholder, setReset, Reset1, setPaywallText, setParagPaywallPlaceholder, setTextError, TextEnterRef,
                setDetail, setCoverImageId
              )

            }
            if (res.error) setError(res.error);
            if (res.failed) setFailed(res.failed);
          })

      })
    }
  }


  return (
    <div className='mb-20'>
      <section className='flex gap-2 mb-20 flex-wrap'>
        {bold_italic.map((item: string) => <Bold_italic text={item} TextEnterRef={TextEnterRef} key={uuid()} />)}
        {link_anchor.map((item: string) => <Link_Anchor text={item} TextEnterRef={TextEnterRef} key={uuid()} />)}
        {list_embedded.map(item => <List_embedded TextEnterRef={TextEnterRef} text={item.text} textElem={item.textElem} key={uuid()} />)}
      </section>

      <form action="" className='mb-60' onSubmit={handleSubmit}>
        <input type="text" name='title' className='focus-within:outline-none border-b-2 input-bordered block w-[100%] mb-8 bg-transparent pl-2' placeholder='Article title' value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
        <input type="text" name='cover_image_id' className='focus-within:outline-none border-b-2 input-bordered block w-[100%] mb-8 bg-transparent pl-2' placeholder='Cover image id' value={coverImageId} onChange={(e) => setCoverImageId(e.target.value)} />
        <div className='flex gap-5 flex-wrap mb-8'>
          <OptgroupWithOutFilter optElement={FirstElement} setOptInput={setFirstElementInput} optInput={firstElementInput} placeHolder='Choose first element' />
          <input type="text" name='first_element_url' className='focus-within:outline-none input-bordered border-b-2 block lg:w-[30%] w-full bg-transparent pl-2' placeholder='URL/Id' value={firstElementUrl} onChange={(e) => setFirstElementUrl(e.target.value)} />
        </div>
        <div className='flex gap-5 flex-wrap mb-8'>
          <Optgroup optElement={Category} setOptInput={setCategoryInput} optInput={categoryInput} placeHolder='Select category' />
          <Optgroup optElement={Important} setOptInput={setImportantInput} optInput={importantInput} placeHolder='Important?' />
        </div>

        <div className='flex gap-5 flex-wrap mb-20'>
          <OptgroupWithOutFilter optElement={paywallTable} setOptInput={setPaywall} optInput={paywall} placeHolder='Paywall' />

          <OptgroupWithOutFilter optElement={sidebarTable} setOptInput={setSidebar} optInput={sidebar} placeHolder='Right sidebar' />
        </div>

        <ImgOptgroup reset={Reset1} setAudioCopyMessage={setAudioCopyMessage} setVideoCopyMessage={setVideoCopyMessage} setError={setError} setImageCopyMessage={setImageCopyMessage} isPending={isPending} imageCopyMessage={imageCopyMessage} setSuccess={setSuccess} />
        <VideoOptgroup reset={Reset1} setAudioCopyMessage={setAudioCopyMessage} setVideoCopyMessage={setVideoCopyMessage} setError={setError} setImageCopyMessage={setImageCopyMessage} isPending={isPending} videoCopyMessage={videoCopyMessage} setSuccess={setSuccess} />
        <AudioOptgroup reset={Reset1} setAudioCopyMessage={setAudioCopyMessage} setVideoCopyMessage={setVideoCopyMessage} setError={setError} setImageCopyMessage={setImageCopyMessage} isPending={isPending} audioCopyMessage={audioCopyMessage} setSuccess={setSuccess} />


        <div>
          <Themes themes={themes} setThemes={setThemes} />
        </div>

        <input type='text' value={detail} onChange={(e) => setDetail(e.target.value)} className='focus-within:outline-none border-b-2 input-bordered block w-[100%] mt-10 mb-8 bg-transparent pl-2' placeholder='Detail'/>

        <p contentEditable="true" className={`mt-10 focus-within:outline-none border p-3 rounded min-h-24 ${paragPlaceholder}`} onInput={handleParagraphChange} tabIndex={0} ref={TextEnterRef}></p>
        {paywall === 'Paywall: yes' &&
          <p contentEditable="true" className={`mt-10 focus-within:outline-none border p-3 rounded min-h-24 ${paragPaywallPlaceholder}`} onInput={handleParagraphPaywallChange} tabIndex={0} ref={PaywallParagRef}></p>
        }
        <div className='text-end'>
          <input type="submit" value='Save' onClick={saveTheArticle} className='bg-slate-600 text-white cursor-pointer hover:bg-slate-400 rounded p-2 mt-10' />
        </div>

      </form>

      {textError !== '' &&
        <div className='text-5xl text-red-500'>{textError}</div>
      }

      {success &&
        <div className='text-green-600 bg-green-600/15 p-2 text-center rounded-lg mb-5 font-bold'>{success}</div>
      }

      {error &&
        <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 text-center bg-red-700/25 rounded-lg mb-5  p-2'>
          {error}
        </div>
      }
      {(failed && failed.length > 0) &&
        <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 text-center rounded-lg mb-5  p-2'>
          {failed.map(e => <p key={uuid()}>{e.message}</p>)}
        </div>
      }


      <div >
        {(firstElementInput === 'Image' && firstElementUrl !== '') &&
          <Img id={firstElementUrl} />
        }
        {(firstElementInput === 'Video' && firstElementUrl !== '') &&
          <Vid id={firstElementUrl} />
        }
        {(firstElementInput === 'Youtube' && firstElementUrl !== '') &&
          <div className=' mb-10'>
            <YouTubeEmbed url={firstElementUrl} width={`100%`} height={`100%`} />
          </div>
        }
        <h2 className='mt-20 text-5xl mb-20 font-bold leading-normal'>{titleInput}</h2>
        <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
          <div className="lg:w-[calc(100%-450px)] mb-8">
            {text}
          </div>
          {sidebar === 'Sidebar: yes' &&
            <div className="lg:w-80"> <Rightsidebar /></div>
          }
        </div>
      </div>

      {paywall === 'Paywall: yes' &&
        <div >
          {(firstElementInput === 'Image' && firstElementUrl !== '') &&
            <Image src={firstElementUrl} alt='fesaesf' className='w-[100%] block mb-10' width={600} height={337.5} />
          }
          {(firstElementInput === 'Video' && firstElementUrl !== '') &&
            <video controls width={600} height={337.5} className='w-full mb-10'>
              <source src={firstElementUrl} />
              Your browser does not support the video tag.
            </video>
          }
          {(firstElementInput === 'Youtube') &&
            <div className=' mb-10'>
              <YouTubeEmbed url={firstElementUrl} width={`100%`} height={`100%`} />
            </div>
          }
          <h2 className='mt-20 text-5xl mb-20 font-bold leading-normal'>{titleInput}</h2>
          <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
            <div className="lg:w-[calc(100%-450px)] mb-8">
              {paywallText}
              <Paywall />
            </div>
            {sidebar === 'Sidebar: yes' &&
              <div className="lg:w-80"> <Rightsidebar /></div>
            }
          </div>
        </div>
      }

    </div>
  )
}

export default Page




const reset = (
  setText: Dispatcher<(string | JSX.Element)[]>,
  setCategoryInput: Dispatcher<string>,
  setImportantInput: Dispatcher<string>,
  setFirstElementInput: Dispatcher<string>,
  setThemes: Dispatcher<string[]>,

  setTitleInput: Dispatcher<string>,
  setFirstElementUrl: Dispatcher<string>,
  setPaywall: Dispatcher<string>,
  setSidebar: Dispatcher<string>,
  setParagraphInput: Dispatcher<string>,
  setParagraphPaywallInput: Dispatcher<string>,
  setParagPlaceholder: Dispatcher<string>,
  setReset: Dispatcher<boolean>,
  Reset1: boolean,
  
  setPaywallText: Dispatch<(string | JSX.Element)[]>,
  setParagPaywallPlaceholder: Dispatcher<string>,
  setTextError: Dispatcher<string>,
  TextEnterRef: RefObject<HTMLParagraphElement>,
  setDetail: Dispatcher<string>,
  setCoverImageId: Dispatcher<string>
) => {
  setText([]);
  setCategoryInput('');
  setImportantInput('');
  setFirstElementInput('');
  setFirstElementUrl('');
  setThemes([]);
  setTitleInput('');
  setPaywall('Paywall: no')
  setSidebar('Sidebar: yes');
  setParagraphInput('');
  setParagPaywallPlaceholder('placeholder');
  setParagPlaceholder('placeholder');
  setParagraphPaywallInput('');
  setPaywallText(['']);
  setTextError('');
  setReset(!Reset1)
  setDetail(''),
  setCoverImageId('');
  if (TextEnterRef.current) TextEnterRef.current.innerText = '';
}
