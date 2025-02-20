'use client'

import { useState, useEffect, useRef, SyntheticEvent, useTransition } from 'react';
import { YouTubeEmbed, } from 'react-social-media-embed';
import { v4 as uuid } from 'uuid';
import { chooseTypeOfTextItem } from '@/app/_components/newArticle/showArcticle'
import Bold_italic from '@/app/_components/newArticle/bold_italic';
import Link_Anchor from '@/app/_components/newArticle/link_Anchor';
import List_embedded from '@/app/_components/newArticle/list_embedded';
import Rightsidebar from '@/app/_components/newArticle/rightsidebar';
import Optgroup from '@/app/_components/optgroup/optgroup';
import OptgroupWithOutFilter from '@/app/_components/optgroup/optgroupwithoutfilter';
import Themes from '@/app/_components/newArticle/themes';
import Paywall from '@/app/_components/paywall';
import * as z from 'zod';
import ImgOptgroup from '@/app/_components/optgroup/articleimggroup';
import AudioOptgroup from '@/app/_components/optgroup/articleaudiogroup';
import VideoOptgroup from '@/app/_components/optgroup/articlevideogroup';
import Img from '@/app/_components/newArticle/img';
import Vid from '@/app/_components/newArticle/vid';
import Img2 from '@/app/_components/newArticle/img2';
import ArticleCategoryGroup from '@/app/_components/optgroup/articlecategory';
import { useRouter } from 'next/navigation';



const Client = (props: {
    params: { category: string, year: string, month: string, day: string, title: string }, res: {
        error: string,
        failed: undefined,
        data: undefined,
    } | {
        failed: z.ZodIssue[],
        error: undefined,
        data: undefined,
    } | {
        data: {
            title: string,
            text: string,
            first_element: string,
            first_element_url: string,
            category: string,
            paywall: boolean,
            sidebar: boolean,
            cover_img_id: string,
            keyword: string[],
            id: string,
            paywall_text: string,
            important: string,
            detail: string,
        },
        error: undefined,
        failed: undefined,
    }
}) => {
    const [text, setText] = useState<(string | JSX.Element)[]>(['']);
    const [categoryInput, setCategoryInput] = useState<string>('');
    const [importantInput, setImportantInput] = useState<string>('');
    const [firstElementInput, setFirstElementInput] = useState<string>('');
    const [coverImageId, setCoverImageId] = useState<string>('');
    const [detail, setDetail] = useState<string>('');
    const { push } = useRouter();

    const [lastText, setLastText] = useState<string[]>([])
    const [lastPaywallText, setLastPaywallText] = useState<string[]>([])

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
    const [firstLoad, setFirstLoad] = useState<boolean>(true);

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
        if (props.res.data) {
            setTitleInput(props.res.data.title);
            setPaywall(props.res.data.paywall ? 'Paywall: yes' : 'Paywall: no');
            setParagraphInput(props.res.data.text.split('$').join('\n\n'));
            setParagraphPaywallInput(props.res.data.paywall_text.split('$').join('\n\n'));
            setFirstElementUrl(props.res.data.first_element_url);
            setFirstElementInput(props.res.data.first_element);
            setSidebar(props.res.data.sidebar ? 'Sidebar: yes' : 'Sidebar: no');
            setCategoryInput(props.res.data.category)
            setCoverImageId(props.res.data.cover_img_id)
            setThemes(props.res.data.keyword)
            if (TextEnterRef.current) TextEnterRef.current.innerText = `${props.res.data.text.split('$').join('\n')}`
            setParagPlaceholder('');
            setImportantInput(props.res.data.important);
            setCategoryInput(props.res.data.category);
            setDetail(props.res.data.detail);
            
        }

        if (props.res.error) push('/')
        if (props.res.failed) setFailed(props.res.failed);

    }, [])

    useEffect(() => {
        if(props.res.data && firstLoad){
            if (PaywallParagRef.current) {PaywallParagRef.current.innerText = `${props.res.data.paywall_text.split('$').join('\n')}`
            if(props.res.data.paywall_text.split('$').join('\n') !== '') setParagPaywallPlaceholder('');
            setFirstLoad(false);}
        }
        
    },[paywall])


    useEffect(() => {
        const Text = paragraphInput.split('\n').filter(item => item !== '');
        const Text2: (string | JSX.Element)[] = [];
        setTextError('');
        for (let i = 0; i < Text.length; i++) {
            if (Text[i] !== lastText[i]) {
                Text2[i] = chooseTypeOfTextItem(Text[i], setTextError)

            }
            else {
                Text2[i] = text[i];
            }
        }
        setText(Text2);
        setLastText(paragraphInput.split('\n').filter(item => item !== ''))
    }, [paragraphInput])

    useEffect(() => {
        const Text = paragraphPaywallInput.split('\n').filter(item => item !== '');
        const Text2: (string | JSX.Element)[] = [];
        setTextError('');
        for (let i = 0; i < Text.length; i++) {
            if (Text[i] !== lastPaywallText[i]) {
                Text2[i] = chooseTypeOfTextItem(Text[i], setTextError)
            }
            else {
                Text2[i] = paywallText[i];
            }
        }

        setPaywallText(Text2);
        setLastPaywallText(paragraphInput.split('\n').filter(item => item !== ''))
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
        setSuccess('');
        setError('');
        setFailed([]);
        if (titleInput !== '' && categoryInput !== '' && importantInput !== '' && paywall !== '' && sidebar !== '' && themes.length !== 0 && text.join('$') !== '' && detail !== '') {
            startTransition(async () => {

                const res = await fetch('/api/unlockarticle', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        text: paragraphInput.split('\n').filter(item => item !== '').join('$'), title: titleInput, first_element: firstElementInput, first_element_url: firstElementUrl, category: categoryInput, important: importantInput,
                        paywall: paywall === 'Paywall: yes' ? true : false, sidebar: sidebar === 'Sidebar: yes' ? true : false, keyword: themes, cover_img_id: coverImageId,
                        paywall_text: paragraphPaywallInput.split('\n').filter(item => item !== '').join('$'), detail, lastTitle: titleInput
                    })
                });

                const resJson = await res.json() as { success: string | undefined, date: string | undefined, error: string | undefined, failed: z.ZodIssue[] | undefined };

                if (res.status === 200) {
                    setSuccess(resJson.success);
                    if(resJson.date) push(`/${categoryInput.toLowerCase().replaceAll(' & ','_')}/${resJson.date.slice(0, 4)}/${resJson.date.slice(6, 8)}/${resJson.date.slice(10, 12)}/${titleInput.replaceAll(' ', '_').replace('?','nb20')}`)
                }
                else if (res.status === 400) {
                    if (resJson.failed) setFailed(resJson.failed);
                    else setError(resJson.error);
                }
                else {
                    setError(resJson.error);
                }
            })
        }
        else {
            setError('Title, detail,  category, important, paywall, sidebar, themes and text must be filled');
        }
    }

    return (
        <>
            <form action="" className='mb-20 mt-10' onSubmit={handleSubmit}>
                <input type="text" name='title' className='focus-within:outline-none border-b-2 input-bordered block w-[100%] mb-8 bg-transparent pl-2 dark:text-white' placeholder='Article title' value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />
                <input type="text" name='cover_image_id' className='focus-within:outline-none border-b-2 input-bordered block w-[100%] mb-8 bg-transparent pl-2 dark:text-white' placeholder='Cover image id' value={coverImageId} onChange={(e) => setCoverImageId(e.target.value)} />
                <div className='max-w-96 mb-10'>
                    <Img2 id={coverImageId} />
                </div>

                <div className='flex gap-5 flex-wrap mb-8'>
                    <OptgroupWithOutFilter optElement={FirstElement} setOptInput={setFirstElementInput} optInput={firstElementInput} placeHolder='Choose first element' />
                    <input type="text" name='first_element_url' className='dark:text-white focus-within:outline-none input-bordered border-b-2 block lg:w-[30%] w-full bg-transparent pl-2' placeholder='URL/Id' value={firstElementUrl} onChange={(e) => setFirstElementUrl(e.target.value)} />
                </div>
                <div className='flex gap-5 flex-wrap mb-8'>
                    <ArticleCategoryGroup setOptInput={setCategoryInput} optInput={categoryInput} />
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

                <input type='text' value={detail} onChange={(e) => setDetail(e.target.value)} className='focus-within:outline-none border-b-2 input-bordered block w-[100%] mt-10 mb-10 bg-transparent pl-2 dark:text-white' placeholder='Detail' />

                <section className='flex gap-2 mb-10 flex-wrap'>
                    {bold_italic.map((item: string) => <Bold_italic text={item} TextEnterRef={TextEnterRef} key={uuid()} />)}
                    {link_anchor.map((item: string) => <Link_Anchor text={item} TextEnterRef={TextEnterRef} key={uuid()} />)}
                    {list_embedded.map(item => <List_embedded TextEnterRef={TextEnterRef} text={item.text} textElem={item.textElem} key={uuid()} />)}
                </section>

                <p contentEditable="true" className={`mt-10 focus-within:outline-none border p-3 rounded min-h-24 dark:text-white ${paragPlaceholder}`} onInput={handleParagraphChange} tabIndex={0} ref={TextEnterRef}></p>
                {paywall === 'Paywall: yes' &&
                    <p contentEditable="true" className={`mt-10 focus-within:outline-none border p-3 rounded min-h-24 dark:text-white ${paragPaywallPlaceholder}`} onInput={handleParagraphPaywallChange} tabIndex={0} ref={PaywallParagRef}></p>
                }
                <div className='text-end'>
                    <input type="submit" value='Unlock' onClick={saveTheArticle} className='bg-slate-600 text-white cursor-pointer hover:bg-slate-400 rounded p-2 mt-10' />
                </div>

            </form>

            {textError !== '' &&
                <div className='text-5xl text-red-500 mb-40'>{textError}</div>
            }

            {success &&
                <div className='text-green-600 bg-green-600/15 p-2 text-center rounded-lg mb-40 font-bold'>{success}</div>
            }

            {error &&
                <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 text-center bg-red-700/25 rounded-lg mb-40  p-2'>
                    {error}
                </div>
            }
            {(failed && failed.length > 0) &&
                <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 text-center rounded-lg mb-40  p-2'>
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
                        <Img id={firstElementUrl} />
                    }
                    {(firstElementInput === 'Video' && firstElementUrl !== '') &&
                        <Vid id={firstElementUrl} />
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
        </>
    )
}

export default Client