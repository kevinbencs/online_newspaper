'use client';
import { useState, useEffect, useRef, SyntheticEvent } from 'react';
import { YouTubeEmbed, } from 'react-social-media-embed';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';
import { chooseTypeOfTextItem } from '../components/newArticle/showArcticle'
import Bold_italic from '../components/newArticle/bold_italic';
import Link_Anchor from '../components/newArticle/link_Anchor';
import List_embedded from '../components/newArticle/list_embedded';
import Rightsidebar from '../components/category_menu_search/rightsidebar';
import Optgroup from '../components/optgroup/optgroup';
import OptgroupWithOutFilter from '../components/optgroup/optgroupwithoutfilter';
import Themes from '../components/newArticle/themes';
import Paywall from '../components/paywall';



const Page = () => {
  const [text, setText] = useState<(string | JSX.Element)[]>(['']);
  const [categoryInput, setCategoryInput] = useState<string>('');
  const [importantInput, setImportantInput] = useState<string>('');
  const [firstElementInput, setFirstElementInput] = useState<string>('');

  const [searchImageInput, setSearchImageInput] = useState<string>('');
  const [searchVideoInput, setSearchVideoInput] = useState<string>('');
  const [searchAudioInput, setSearchAudioInput] = useState<string>('');
  const [themes, setThemes] = useState<string[]>([]);

  const [titleInput, setTitleInput] = useState<string>('');
  const [firstElementUrl, setFirstElementUrl] = useState<string>('');
  const [paywall, setPaywall] = useState<string>('Paywall: no');
  const [sidebar, setSidebar] = useState<string>('Sidebar: yes');

  const [imageAltInput, setImageAltInput] = useState<string>('');
  const [paragraphInput, setParagraphInput] = useState('');
  const [paragraphPaywallInput, setParagraphPaywallInput] = useState('');
  const [paragPlaceholder, setParagPlaceholder] = useState<string>('placeholder');

  const [paywallText, setPaywallText] = useState<(string | JSX.Element)[]>(['']);
  const [paragPaywallPlaceholder, setParagPaywallPlaceholder] = useState<string>('placeholder');
  const [textError, setTextError] = useState<string>('');

  const TextEnterRef = useRef<null | HTMLParagraphElement>(null);
  const PaywallParagRef = useRef<null | HTMLParagraphElement>(null);

  const bold_italic: string[] = ['bold', 'italic'];
  const link_anchor: string[] = ['Link', 'anchor_link'];
  const list_embedded = [
    { text: 'image', textElem: '<Image url=()/>' },
    { text: 'list', textElem: '<ul>item1<list>item2<list>item3</ul>' },
    { text: 'video', textElem: '<video url=()></video>' },
    { text: 'audio', textElem: '<audio url=()></audio>' },
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
    { id: 'awdsadwssadasdas', text: 'Youtube' }
  ];

  const table = [
    { id: 'awdfaw', text: 'aaaaa', },
    { id: 'wadsd', text: 'cccccc', },
    { id: 'öaweda', text: 'dswaf', },
    { id: '9awdawawds', text: 'dswaf', },
    { id: '8awa', text: 'dswaf', },
    { id: 'awdsa7', text: 'dswaf', },
    { id: 'awdass6', text: 'dswaf', },
    { id: '5awds', text: 'dswaf', },
    { id: '4awdsa', text: 'dswaf', },
    { id: '3wwww', text: 'dswaf', },
    { id: 'aw2', text: 'dswaf', },
    { id: '1awwa', text: 'dswaf', }
  ];


  const tableImage = [
    { id: 'awdfaw', text: 'aaaaa', },
    { id: 'wadsd', text: 'cccccc', },
    { id: 'öaweda', text: 'dswaf', },
  ];

  const tableVideo = [
    { id: 'awdfaw', text: 'aaaaa', },
    { id: 'wadsd', text: 'cccccc', },
    { id: 'öaweda', text: 'dswaf', },
  ];

  const tableAudio = [
    { id: 'awdfaw', text: 'aaaaa', },
    { id: 'wadsd', text: 'cccccc', },
    { id: 'öaweda', text: 'dswaf', },
  ];

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
    e.preventDefault();
  }

  const saveTheArticle = () => {
    if (titleInput !== '' && categoryInput !== '' && importantInput !== '' && paywall !== '' && sidebar !== '' && themes.length !== 0) {
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
        <input type="text" name='title' className='focus-within:outline-none border-b-2 block w-[100%] mb-8 bg-transparent pl-2' placeholder='Article title' value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
        <div className='flex gap-5 flex-wrap mb-8'>
          <OptgroupWithOutFilter optElement={FirstElement} setOptInput={setFirstElementInput} optInput={firstElementInput} placeHolder='Choose first element' />
          <input type="text" name='first_element_url' className='focus-within:outline-none border-b-2 block lg:w-[30%] w-full bg-transparent pl-2' placeholder='URL' value={firstElementUrl} onChange={(e) => setFirstElementUrl(e.target.value)} />
        </div>
        <div className='flex gap-5 flex-wrap mb-8'>
          <Optgroup optElement={table} setOptInput={setCategoryInput} optInput={categoryInput} placeHolder='Select category' />
          <Optgroup optElement={Important} setOptInput={setImportantInput} optInput={importantInput} placeHolder='Important?' />
        </div>
        <div className='flex gap-5 flex-wrap mb-8'>
          <Optgroup optElement={tableImage} setOptInput={setSearchImageInput} optInput={searchImageInput} placeHolder='Search image' />

          <input type="text" name='first_picture_alt' className='focus-within:outline-none border-b-2 block lg:w-[30%] w-full bg-transparent pl-2' placeholder='URL' value={imageAltInput} onChange={(e) => setImageAltInput(e.target.value)} />
        </div>
        <div className='flex gap-5 flex-wrap mb-8'>
          <Optgroup optElement={tableVideo} setOptInput={setSearchVideoInput} optInput={searchVideoInput} placeHolder='Search video' />

          <input type="text" name='first_picture_alt' className='focus-within:outline-none border-b-2 block lg:w-[30%] w-full bg-transparent pl-2' placeholder='URL' value={imageAltInput} onChange={(e) => setImageAltInput(e.target.value)} />
        </div>
        <div className='flex gap-5 flex-wrap mb-8'>
          <Optgroup optElement={tableAudio} setOptInput={setSearchAudioInput} optInput={searchAudioInput} placeHolder='Search audio' />

          <input type="text" name='first_picture_alt' className='focus-within:outline-none border-b-2 block lg:w-[30%] w-full bg-transparent pl-2' placeholder='URL' value={imageAltInput} onChange={(e) => setImageAltInput(e.target.value)} />
        </div>
        <div className='flex gap-5 flex-wrap mb-8'>
          <OptgroupWithOutFilter optElement={paywallTable} setOptInput={setPaywall} optInput={paywall} placeHolder='Paywall' />

          <OptgroupWithOutFilter optElement={sidebarTable} setOptInput={setSidebar} optInput={sidebar} placeHolder='Right sidebar' />
        </div>
        <div>
          <Themes themes={themes} setThemes={setThemes} />
        </div>

        <p contentEditable="true" className={`mt-10 focus-within:outline-none border p-3 rounded min-h-24 ${paragPlaceholder}`} onInput={handleParagraphChange} tabIndex={0} ref={TextEnterRef}></p>
        {paywall === 'Paywall: yes' &&
          <p contentEditable="true" className={`mt-10 focus-within:outline-none border p-3 rounded min-h-24 ${paragPaywallPlaceholder}`} onInput={handleParagraphPaywallChange} tabIndex={0} ref={PaywallParagRef}></p>
        }
        <div className='text-end'>
        <input type="submit" value='Save' onClick={saveTheArticle} className='bg-slate-600 text-white cursor-pointer hover:bg-slate-400 rounded p-2 mt-10'/>
        </div>
        
      </form>

      {textError !== '' &&
        <div className='text-5xl text-red-500'>{textError}</div>
      }


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
          <div className="lg:w-[calc(100%-450px)]">
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
            <div className="lg:w-[calc(100%-450px)]">
              {paywallText}
              <Paywall/>
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









/* <div className='max-w-[550px]'>
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

      <Tiktok url='https://www.tiktok.com/@scout2015/video/6718335390845095173' />*/
