import { v4 as uuid } from "uuid";
import {Dispatch, SetStateAction} from 'react';
import Link from 'next/link';
import { FacebookEmbed, InstagramEmbed, YouTubeEmbed, LinkedInEmbed, PinterestEmbed } from 'react-social-media-embed';
import { Tweet } from 'react-tweet';
import Image from 'next/image';
import Stop from '../image/stop.png'
import AudioElement from '../audio/audio'
import Tiktok from '../tiktokembedded/tiktok';

export function chooseTypeOfTextItem (s: string, setTextError: Dispatch<SetStateAction<string>>) {
    let TextArray: (string | JSX.Element) ='';
    if (s.indexOf('<Image') === 0) { TextArray = createImg(s, setTextError) }
    else if (s.indexOf('<ul>') === 0) { TextArray = createList(s, setTextError) }
    else if (s.indexOf('<video>') === 0) { TextArray = createVideo(s, setTextError) }
    else if (s.indexOf('<youtube') === 0) { TextArray = createYoutube(s, setTextError) }
    else if (s.indexOf('<X') === 0) {TextArray = createX(s, setTextError) }
    else if (s.indexOf('<facebook') === 0) { TextArray = createFacebook(s, setTextError) }
    else if (s.indexOf('<instagram') === 0) { TextArray = createInstagram(s, setTextError) }
    else if (s.indexOf('<linkedin') === 0) { TextArray = createLinkedin(s, setTextError) }
    else if (s.indexOf('<tiktok') === 0) { TextArray = createTiktok(s, setTextError) }
    else if (s.indexOf('<pinterest') === 0) { TextArray = createPinterest(s, setTextError) }
    else if (s.indexOf('<title>') === 0) { TextArray = createTitlte(s, setTextError) }
    else if (s.indexOf('<highlight>') === 0) { TextArray = createHighlight(s, setTextError) }
    else if (s.indexOf('<audio') === 0) { TextArray = createAudio(s, setTextError) }
    else { TextArray = createParagh(s, setTextError);}

    return TextArray;
}

const createParagh = (s: string, setTextError: Dispatch<SetStateAction<string>>) => {
    return (
        <p key={uuid()} className="mb-10">
            {jsxInText(s, setTextError)}
        </p>
    )
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
        else if (s.indexOf('<anchor', index1) === index2 && index2 > -1) {
            textArray.push(s.slice(index1, index2));
            result = createAnchor(s.slice(index2, s.indexOf('</anchor_link>', index2) + 14), setTextError, index2);
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = s.indexOf('</anchor_link>', index2) + 14;
                index2 = s.indexOf('<', index1);
            }

        }
        else if (s.indexOf('<bold', index1) === index2 && index2 > -1) {
            textArray.push(s.slice(index1, index2));
            result = createStrong(s.slice(index2, s.indexOf('</bold>', index2) + 7), setTextError, index2);
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = s.indexOf('</bold>', index2) + 7;
                index2 = s.indexOf('<', index1);
            }

        }
        else if (s.indexOf('<italic', index1) === index2 && index2 > -1) {
            textArray.push(s.slice(index1, index2));
            result = createEm(s.slice(index2, s.indexOf('</italic', index2) + 9), setTextError, index2);
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = s.indexOf('</italic', index2) + 9;
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
    const indexHref: number = s.indexOf('(');
    const indexHrefEnd: number = s.indexOf(')');
    const indexTextEnd: number = s.indexOf('</Link', 1);
    const emIndex: number = s.indexOf('<italic');
    const strongIndex: number = s.indexOf('<bold');
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
        if (text.indexOf('<italic') === index3 && index3 > -1) {
            textArray.push(text.slice(index1, index3));
            result = createEm(text.slice(index3, text.indexOf('</italic>', index3) + 9), setTextError, index2);

            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = text.indexOf('</italic>', index3) + 9;
                index3 = text.indexOf('<', index1);
            }
        }
        else if (text.indexOf('<bold') === index3 && index3 > -1) {
            textArray.push(text.slice(index1, index3));
            result = createStrong(text.slice(index3, text.indexOf('</bold>', index3) + 7), setTextError, index2);

            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = text.indexOf('</bold>', index3) + 7;
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
    const indexHref: number = s.indexOf('(');
    const indexHrefEnd: number = s.indexOf(')');
    const indexTextEnd: number = s.indexOf('</anchor', 1);
    const emIndex: number = s.indexOf('<italic');
    const strongIndex: number = s.indexOf('<bold');
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
        if (text.indexOf('<italic') === index3 && index3 > -1) {

            textArray.push(text.slice(index1, index3));
            result = createEm(text.slice(index3, text.indexOf('</italic>', index3) + 9), setTextError, index2);
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = text.indexOf('</italic', index3) + 9;
                index3 = text.indexOf('<', index1);
            }

        }
        else if (text.indexOf('<bold') === index3 && index3 > -1) {
            textArray.push(text.slice(index1, index3));
            result = createStrong(text.slice(index3, text.indexOf('</bold>', index3) + 7), setTextError, index2);
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = text.indexOf('</bold>', index3) + 7;
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
    const indexTextEnd = s.indexOf('</bold', 1);
    const index = s.indexOf('<', 1);
    const emIndex = s.indexOf('<italic');
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
        if (text.indexOf('<italic') === index3 && index3 > -1) {

            textArray.push(text.slice(index1, index3));
            result = createEmText(text.slice(index3, text.indexOf('</italic>', index3) + 9), setTextError, index2);
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = text.indexOf('</italic>', index3) + 9;
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
    const indexTextEnd = s.indexOf('</bold', 1);
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
    const indexTextEnd = s.indexOf('</italic');
    const index = s.indexOf('<', 1);
    const strongIndex = s.indexOf('<bold');

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
        if (text.indexOf('<bold') === index3 && index3 > -1) {
            textArray.push(text.slice(index1, index3));
            result = createStrongText(text.slice(index3, text.indexOf('</bold>', index3) + 7), setTextError, index2);

            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = text.indexOf('</bold>', index3) + 7;
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
    const indexTextEnd = s.indexOf('</italic');
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


/************************************************************************************************
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */


const createImg = (s: string, setTextError: Dispatch<SetStateAction<string>>) => {
    const index1: number = s.indexOf('(');
    const index2: number = s.indexOf(')');
    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);

    if (BeginOfText.length !== 12 || EndOfText.length !== 3) {
        setTextError('Error');
        return <></>;
    }

    return <Image src={s.slice(index1 + 1, index2)} alt='edfeff' key={uuid()} className='w-[550px] block mb-10' width={600} height={337.5}/>
}

const createVideo = (s: string, setTextError: Dispatch<SetStateAction<string>>) => {
    const index1 = s.indexOf('(');
    const index2 = s.indexOf(')');

    //<Video url=()>
    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);
    if (BeginOfText.length !== 12 || EndOfText.length === 2) {
        setTextError('Error');
        return <></>;
    }

    return (
        <div className=' mt-10 max-w-[500px]'>
            <video controls width={`100%`} height={`100%`} key={uuid()}>
                <source src={s.slice(index1 + 1, index2)} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>

    )
}

const createYoutube = (s: string, setTextError: Dispatch<SetStateAction<string>>) => {
    const index1 = s.indexOf('(');
    const index2 = s.indexOf(')');
    //<Youtube url=()>
    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);
    if (BeginOfText.length !== 14 || EndOfText.length === 2) {
        setTextError('Error');
        return <></>;
    }

    return (
        <div className=' mt-10 max-w-[500px]'>
            <YouTubeEmbed url={s.slice(index1 + 1, index2)} width={`100%`} height={`100%`} />
        </div>
    )
}


const createX = (s: string, setTextError: Dispatch<SetStateAction<string>>) => {
    const index1 = s.indexOf('(');
    const index2 = s.indexOf(')');
    //<X id=()>
    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);
    if (BeginOfText.length !== 7 || EndOfText.length === 2) {
        setTextError('Error');
        return <></>;
    }

    return (
        <div >
            <Tweet id={s.slice(index1 +1 , index2)} />
        </div>
    )
}

const createInstagram = (s: string, setTextError: Dispatch<SetStateAction<string>>) => {
    const index1 = s.indexOf('(');
    const index2 = s.indexOf(')');
    //<Instagram url=()>
    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);
    if (BeginOfText.length !== 16 || EndOfText.length === 2) {
        setTextError('Error');
        return <></>;
    }

    return (
        <div className='max-w-[328px]'>
            <InstagramEmbed url={s.slice(index1 + 1, index2)} width={`100%`} captioned />
        </div>
    )
}

const createFacebook = (s: string, setTextError: Dispatch<SetStateAction<string>>) => {
    const index1 = s.indexOf('(');
    const index2 = s.indexOf(')');
    //Facebook url=()>
    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);
    if (BeginOfText.length !== 15 || EndOfText.length !== 3) {
        setTextError('Error');
        return <></>;
    }

    return (
        <div className='max-w-[550px]'>
            <FacebookEmbed url={s.slice(index1 + 1, index2)} width={'100%'} />
        </div>
    )
}

const createTiktok = (s: string, setTextError: Dispatch<SetStateAction<string>>) => {
    const index1 = s.indexOf('(');
    const index2 = s.indexOf(')');
    //<Tiktok url=()>
    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);
    if (BeginOfText.length !== 13 || EndOfText.length === 2) {
        setTextError('Error');
        return <></>;
    }

    return (
        <Tiktok url={s.slice(index1 + 1, index2)} />
    )

}

const createPinterest = (s: string, setTextError: Dispatch<SetStateAction<string>>) => {
    const index1 = s.indexOf('(');
    const index2 = s.indexOf(')');
    //<Pinterest url=()>
    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);
    if (BeginOfText.length !== 16 || EndOfText.length === 2) {
        setTextError('Error');
        return <></>;
    }

    return (
        <div className=' mt-10 max-w-[328px]'>
            <PinterestEmbed url={s.slice(index1 + 1, index2)}
                width={`100%`}
                height={`100%`}
            />
        </div>
    )
}

const createLinkedin = (s: string, setTextError: Dispatch<SetStateAction<string>>) => {
    const index1 = s.indexOf('(');
    const index2 = s.indexOf(')');
    //<Linkedin url=()>
    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);
    if (BeginOfText.length !== 15 || EndOfText.length === 2) {
        setTextError('Error');
        return <></>;
    }

    return (
        <div className='mt-10 max-w-[500px]'>
            <LinkedInEmbed url={s.slice(index1 + 1, index2)}
                width={`100%`} />
        </div>
    )
}


const createAudio = (s: string, setTextError: Dispatch<SetStateAction<string>>) => {
    const index1 = s.indexOf('(');
    const index2 = s.indexOf(')');
    //<Audio url=()>
    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);
    if (BeginOfText.length !== 12 || EndOfText.length === 2) {
        setTextError('Error');
        return <></>;
    }

    return <AudioElement />
}


const createList =  (s: string, setTextError: Dispatch<SetStateAction<string>>) => {
    const index1 = s.indexOf('<ul>');
    const index2 = s.indexOf('</ul>');
    if (index1 !== 0 || index2 === -1 || s.length !== index2+5) {
        setTextError('Error');
        return <></>;
    }

    const List = s.slice(index1 + 4, index2);
    return (
        <ul key={uuid()} className="mb-10">
            {List.split('<list>').map((listItem: string) => <li key={uuid()} 
            className="before:w-[8px] before:inline-block before:h-[8px] before:bg-green-700 before:dark:bg-green-500 before:rounded-[50%] before:relative before:-left-3 mb-3"> {jsxInText(listItem, setTextError)}</li>)}
        </ul>
    )
}

const createTitlte = (s: string, setTextError: Dispatch<SetStateAction<string>>) => {
    const index1 = s.indexOf('<title>');
    const index2 = s.indexOf('</title>');

    if (index1 !== 0 || index2 === -1 || s.length !== index2+8) {
        setTextError('Error');
        return <></>;
    }

    const title = s.slice(7, index2);

    return(
        <h2 className="mb-10 text-3xl font-bold">{title}</h2>
    )
}

const createHighlight = (s: string, setTextError: Dispatch<SetStateAction<string>>) =>{
    const index1 = s.indexOf('<highlight>');
    const index2 = s.indexOf('</highlight>');

    if (index1 !== 0 || index2 === -1 || s.length !== index2+12) {
        setTextError('Error');
        return <></>;
    }

    const text = s.slice(11, index2);

    return(
        <p className="mb-10 font-bold pl-4 border-l-4 dark:border-slate-50 border-zinc-800"><span className="bg-zinc-800 text-white dark:bg-slate-50 dark:text-black inline-block p-1 font-bold">{text}</span></p>
    )
}

