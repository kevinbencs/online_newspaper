'use client';
import { useState, useEffect, useRef, SyntheticEvent, Dispatch, SetStateAction, RefObject, useTransition } from 'react';
import { v4 as uuid } from 'uuid';
import { chooseTypeOfTextItem } from '@/app/_components/career/showCareer';
import Bold_italic from '@/app/_components/newArticle/bold_italic';
import List_embedded from '@/app/_components/newArticle/list_embedded';
import * as z from 'zod';
import { EditCareer } from '@/actions/editcareer';
import { useRouter } from 'next/navigation';


type Dispatcher<T> = Dispatch<SetStateAction<T>>

const Client = (props:{title: string, _id: string, text: string, lastUrl: string}) => {
    const [text, setText] = useState<(string | JSX.Element)[]>(['']);
    const [lastText, setLastText] = useState<string[]>([])

    const [Reset1, setReset] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    const [titleInput, setTitleInput] = useState<string>(props.title);

    const [paragraphInput, setParagraphInput] = useState<string>(props.text.split('$').join('\n\n'));
    const [paragPlaceholder, setParagPlaceholder] = useState<string>('placeholder');
    const [textError, setTextError] = useState<string>('');

    const [success, setSuccess] = useState<string | undefined>('');
    const [error, setError] = useState<string | undefined>('');
    const [failed, setFailed] = useState<undefined | z.ZodIssue[]>([])

    const TextEnterRef = useRef<null | HTMLParagraphElement>(null);
    const {push} = useRouter()

    const bold_italic: string[] = ['bold', 'italic'];
    const list_embedded = [
        { text: 'list', textElem: '<ul>item1<list>item2<list>item3</ul>' },
        { text: 'highlight', textElem: '<highlight></highlight>' },
        { text: 'title', textElem: '<title></title>' }
    ]

    useEffect(() => {
        if(TextEnterRef.current) TextEnterRef.current.innerText = props.text.split('$').join('\n\n')
    },[])


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


    const handleParagraphChange = (e: React.ChangeEvent<HTMLParagraphElement>) => {
        setParagraphInput(e.target.innerText);
        if (e.target.innerText == '\n' || e.target.innerText === '') setParagPlaceholder('placeholder');
        else setParagPlaceholder('');
    }


    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
    }

    const saveTheArticle = () => {
        setSuccess('');
        setError('');
        setFailed([]);
        if (titleInput !== '' && text.join('$') !== '') {
            startTransition(() => {
                EditCareer({
                    text: paragraphInput.split('\n').filter(item => item !== '').join('$'), title: titleInput, _id: props._id, lastUrl: props.lastUrl

                })
                    .then((res) => {
                        if (res.success) {
                            setSuccess(res.success);
                            push(`/career/${titleInput.replaceAll(' ','_')}`)
                            

                        }
                        if (res.error) setError(res.error);
                        if (res.failed) setFailed(res.failed);
                    })
            })
        }
        else {
            setError('Title, detail,  category, important, paywall, sidebar, themes and text must be filled');
        }
    }


    return (
        <div className='mb-20 min-h-screen pt-10'>
            <h1 className='mt-8 mb-10 text-5xl text-center'>Edit careers</h1>
            <form action="" className='mb-20 mt-10' onSubmit={handleSubmit}>
                <input type="text" name='title' disabled={isPending} className='focus-within:outline-none border-b-2 input-bordered block w-[100%] mb-8 bg-transparent pl-2 dark:text-white' placeholder='Title' value={titleInput} onChange={(e) => setTitleInput(e.target.value)} />

                <section className='flex gap-2 mb-10 flex-wrap'>
                    {bold_italic.map((item: string) => <Bold_italic text={item} TextEnterRef={TextEnterRef} key={uuid()} />)}
                    {list_embedded.map(item => <List_embedded TextEnterRef={TextEnterRef} text={item.text} textElem={item.textElem} key={uuid()} />)}
                </section>

                <p contentEditable={!isPending} className={`mt-10 focus-within:outline-none border p-3 rounded min-h-24 dark:text-white ${paragPlaceholder}`} onInput={handleParagraphChange} tabIndex={0} ref={TextEnterRef}></p>

                <div className='text-end'>
                    <input type="submit" value='Save' disabled={isPending} onClick={saveTheArticle} className='bg-slate-600 text-white cursor-pointer hover:bg-slate-400 rounded p-2 mt-10' />
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
                <h2 className='mt-20 text-5xl mb-20 font-bold leading-normal'>{titleInput}</h2>
                <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
                    <div className="lg:w-[calc(100%-450px)] mb-8">
                        {text}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Client

