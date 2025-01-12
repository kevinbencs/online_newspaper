
import { v4 as uuid } from "uuid";
import Link from 'next/link';
import Tiktok from "../tiktokembedded/tiktok";
import Pinterest from "./embedded/pinterest";
import Facebook from "./embedded/facebook";
import Instagram from "./embedded/instagram";
import Youtube from "./embedded/youtube";
import Linkedin from "./embedded/linkedin";
import Twitter from "./embedded/twitter";
import AudioElement2 from "../audio/audioForArticle";
import Vid from "./vid";
import Img from "./img";



export default function ChooseTypeOfTextItem(props: { s: string }) {
    let TextArray: (string | any) = '';
    if (props.s.indexOf('<Image') === 0) { TextArray = createImg(props.s) }
    else if (props.s.indexOf('<ul>') === 0) { TextArray = createList(props.s) }
    else if (props.s.indexOf('<video') === 0) { TextArray = createVideo(props.s) }
    else if (props.s.indexOf('<youtube') === 0) { TextArray = createYoutube(props.s) }
    else if (props.s.indexOf('<X') === 0) { TextArray = createX(props.s) }
    else if (props.s.indexOf('<facebook') === 0) { TextArray = createFacebook(props.s) }
    else if (props.s.indexOf('<instagram') === 0) { TextArray = createInstagram(props.s) }
    else if (props.s.indexOf('<linkedin') === 0) { TextArray = createLinkedin(props.s) }
    else if (props.s.indexOf('<tiktok') === 0) { TextArray = createTiktok(props.s) }
    else if (props.s.indexOf('<pinterest') === 0) { TextArray = createPinterest(props.s) }
    else if (props.s.indexOf('<title>') === 0) { TextArray = createTitlte(props.s) }
    else if (props.s.indexOf('<highlight>') === 0) { TextArray = createHighlight(props.s) }
    else if (props.s.indexOf('<audio') === 0) { TextArray = createAudio(props.s) }
    else { TextArray = createParagh(props.s); }
    return (
        <>{TextArray} </>
    )
}


const createParagh = (s: string) => {
    return (
        <p key={uuid()} className="mb-10">
            {jsxInText(s)}
        </p>
    )
}



const jsxInText = (s: string) => {
    const textArray: (string | JSX.Element)[] = [];
    let index1: number = 0
    let index2: number | JSX.Element = s.indexOf('<')
    let error: string = '';
    let result: number | JSX.Element = <></>;


    while (index2 > -1) {

        if (s.indexOf('<Link', index1) === index2 && index2 > -1) {
            textArray.push(s.slice(index1, index2));
            result = createLink(s.slice(index2, s.indexOf('</Link>', index2) + 7));

            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = s.indexOf('</Link>', index2) + 7;
                index2 = s.indexOf('<', index1);
            }
        }
        else if (s.indexOf('<anchor', index1) === index2 && index2 > -1) {
            textArray.push(s.slice(index1, index2));
            result = createAnchor(s.slice(index2, s.indexOf('</anchor_link>', index2) + 14));
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = s.indexOf('</anchor_link>', index2) + 14;
                index2 = s.indexOf('<', index1);
            }

        }
        else if (s.indexOf('<bold', index1) === index2 && index2 > -1) {
            textArray.push(s.slice(index1, index2));
            result = createStrong(s.slice(index2, s.indexOf('</bold>', index2) + 7), false);
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = s.indexOf('</bold>', index2) + 7;
                index2 = s.indexOf('<', index1);
            }

        }
        else if (s.indexOf('<italic', index1) === index2 && index2 > -1) {
            textArray.push(s.slice(index1, index2));
            result = createEm(s.slice(index2, s.indexOf('</italic', index2) + 9), false);
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = s.indexOf('</italic', index2) + 9;
                index2 = s.indexOf('<', index1);
            }

        }
        else {
            error = 'error';
            index2 = -1;
        }
        if (typeof (result) === 'number') {
            error = 'error';
            index2 = -1;
        }
    }

    if (error === '') textArray.push(s.slice(index1, s.length));
    return textArray;
}

const createLink = (s: string, ) => {
    const indexHref: number = s.indexOf('(');
    const indexHrefEnd: number = s.indexOf(')');
    const indexTextEnd: number = s.indexOf('</Link', 1);
    const emIndex: number = s.indexOf('<italic');
    const strongIndex: number = s.indexOf('<bold');
    const index: number = s.indexOf('<', 1);
    if (indexHref !== 10 || indexHrefEnd === -1 || indexTextEnd === -1 || (index !== emIndex && index !== strongIndex && index !== indexTextEnd)) {

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
            result = createEm(text.slice(index3, text.indexOf('</italic>', index3) + 9), true);

            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = text.indexOf('</italic>', index3) + 9;
                index3 = text.indexOf('<', index1);
            }
        }
        else if (text.indexOf('<bold') === index3 && index3 > -1) {
            textArray.push(text.slice(index1, index3));
            result = createStrong(text.slice(index3, text.indexOf('</bold>', index3) + 7), true);

            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = text.indexOf('</bold>', index3) + 7;
                index3 = text.indexOf('<', index1);
            }
        }
        else {
            return -1;
        }
        if (typeof (result) === 'number') {
            return -1;
        }
    }
    textArray.push(text.slice(index1, text.length))
    return (
        <Link className={`font-bold dark:text-gray-200`} href={s.slice(indexHref + 1, indexHrefEnd)} key={uuid()}>{textArray}</Link>
    )
}


const createAnchor = (s: string) => {
    const indexHref: number = s.indexOf('(');
    const indexHrefEnd: number = s.indexOf(')');
    const indexTextEnd: number = s.indexOf('</anchor', 1);
    const emIndex: number = s.indexOf('<italic');
    const strongIndex: number = s.indexOf('<bold');
    const index: number = s.indexOf('<', 1);
    if (indexHref !== 17 || indexHrefEnd === -1 || indexTextEnd === -1 || (index !== emIndex && index !== strongIndex && index !== indexTextEnd)) {
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
            result = createEm(text.slice(index3, text.indexOf('</italic>', index3) + 9), true);
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = text.indexOf('</italic', index3) + 9;
                index3 = text.indexOf('<', index1);
            }

        }
        else if (text.indexOf('<bold') === index3 && index3 > -1) {
            textArray.push(text.slice(index1, index3));
            result = createStrong(text.slice(index3, text.indexOf('</bold>', index3) + 7), true);
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = text.indexOf('</bold>', index3) + 7;
                index3 = text.indexOf('<', index1);
            }

        }
        else {
            return -1;
        }
        if (typeof (result) === 'number') {
            return -1;
        }
    }
    textArray.push(text.slice(index1, text.length))

    return (
        <a target='_blank' className={`font-bold dark:text-gray-200`} href={s.slice(indexHref + 1, indexHrefEnd)} key={uuid()}>{textArray}</a>
    )
}


const createStrong = (s: string, isLink: boolean) => {
    const indexHrefEnd = s.indexOf('>');
    const indexTextEnd = s.indexOf('</bold', 1);
    const index = s.indexOf('<', 1);
    const emIndex = s.indexOf('<italic');
    if (indexHrefEnd !== 5 || indexTextEnd === -1 || (index !== indexTextEnd && index !== emIndex)) {
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
            result = createEmText(text.slice(index3, text.indexOf('</italic>', index3) + 9));
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = text.indexOf('</italic>', index3) + 9;
                index3 = text.indexOf('<', index1);
            }
        }
        else {
            return -1;
        }
        if (typeof (result) === 'number') {
            return -1;
        }
    }
    textArray.push(text.slice(index1, text.length))

    return (
        <strong className={isLink === true ? '' : 'dark:text-gray-200'} key={uuid()}>{textArray}</strong>
    )
}

const createStrongText = (s: string, isLink: boolean) => {
    const indexHrefEnd = s.indexOf('>');
    const indexTextEnd = s.indexOf('</bold', 1);
    const index = s.indexOf('<', 1);
    if (indexHrefEnd !== 5 || indexTextEnd === -1 || index !== indexTextEnd) {
        return -1;
    }

    const text = s.slice(indexHrefEnd + 1, indexTextEnd);

    return (
        <strong className={isLink === true ? '' : 'dark:text-gray-200'} key={uuid()}>{text}</strong>
    )
}



const createEm = (s: string, isLink: boolean) => {
    const indexHrefEnd = s.indexOf('>');
    const indexTextEnd = s.indexOf('</italic');
    const index = s.indexOf('<', 1);
    const strongIndex = s.indexOf('<bold');

    if (indexHrefEnd !== 7 || indexTextEnd === -1 || (index !== indexTextEnd && index !== strongIndex)) {
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
            result = createStrongText(text.slice(index3, text.indexOf('</bold>', index3) + 7), isLink);

            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = text.indexOf('</bold>', index3) + 7;
                index3 = text.indexOf('<', index1);
            }
        }
        else {
            return -1;
        }
        if (typeof (result) === 'number') {
            return -1;
        }
    }
    textArray.push(text.slice(index1, text.length))
    return (
        <em key={uuid()}>{textArray}</em>
    )
}


const createEmText = (s: string) => {
    const indexHrefEnd = s.indexOf('>');
    const indexTextEnd = s.indexOf('</italic');
    const index = s.indexOf('<', 1);

    if (indexHrefEnd !== 7 || indexTextEnd === -1 || index !== indexTextEnd) {
        return -1;
    }
    const text = s.slice(indexHrefEnd + 1, indexTextEnd);
    return (
        <em key={uuid()}>{text}</em>
    )
}


const createImg = (s: string) => {
    const index1: number = s.indexOf('(');
    const index2: number = s.indexOf(')');
    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);

    if (BeginOfText.length !== 11 || EndOfText.length !== 3) {

        return <div key={uuid()}></div>;;
    }

    const id = s.slice(index1 + 1, index2);

    return (
        <div className='w-[550px] block mb-10' key={uuid()}>
            <Img id={id} />
        </div>
    )
}

const createVideo = (s: string) => {
    const index1 = s.indexOf('(');
    const index2 = s.indexOf(')');

    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);
    if (BeginOfText.length !== 11 || EndOfText.length === 10) {

        return <div key={uuid()}></div>;;
    }

    const id = s.slice(index1 + 1, index2);

    return (
        <div className=' mt-10 max-w-[500px]' key={uuid()}>
            <Vid id={id} />
        </div>
    )
}

const createYoutube = (s: string) => {
    const index1 = s.indexOf('(');
    const index2 = s.indexOf(')');

    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);
    if (BeginOfText.length !== 14 || EndOfText.length === 3) {

        return <div key={uuid()}></div>;;
    }

    return (
        <div className=' mt-10 max-w-[500px]' key={uuid()}>
            <Youtube url={s.slice(index1 + 1, index2)} />
        </div>
    )
}


const createX = (s: string) => {
    const index1 = s.indexOf('(');
    const index2 = s.indexOf(')');

    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);
    if (BeginOfText.length !== 7 || EndOfText.length !== 3) {
        
        return <div key={uuid()}></div>;;
    }

    return (
        <div key={uuid()}>
            <Twitter id={s.slice(index1 + 1, index2)} />
        </div>
    )
}

const createInstagram = (s: string) => {
    const index1 = s.indexOf('(');
    const index2 = s.indexOf(')');

    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);
    if (BeginOfText.length !== 16 || EndOfText.length === 3) {

        return <div key={uuid()}></div>;;
    }

    return (
        <div className='max-w-[328px]' key={uuid()}>
            <Instagram url={s.slice(index1 + 1, index2)} />
        </div>
    )
}

const createFacebook = (s: string) => {
    const index1 = s.indexOf('(');
    const index2 = s.indexOf(')');

    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);
    if (BeginOfText.length !== 15 || EndOfText.length !== 3) {

        return <div key={uuid()}></div>;;
    }

    return (
        <div className='max-w-[550px]' key={uuid()}>
            <Facebook url={s.slice(index1 + 1, index2)} />
        </div>
    )
}

const createTiktok = (s: string) => {
    const index1 = s.indexOf('(');
    const index2 = s.indexOf(')');

    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);
    if (BeginOfText.length !== 13 || EndOfText.length === 3) {

        return <div key={uuid()}></div>;;
    }

    return (
        <Tiktok url={s.slice(index1 + 1, index2)} key={uuid()} />
    )

}

const createPinterest = (s: string) => {
    const index1 = s.indexOf('(');
    const index2 = s.indexOf(')');

    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);
    if (BeginOfText.length !== 16 || EndOfText.length === 3) {

        return <div key={uuid()}></div>;;
    }

    return (
        <div className=' mt-10 max-w-[328px]' key={uuid()}>
            <Pinterest url={s.slice(index1 + 1, index2)} />
        </div>
    )
}

const createLinkedin = (s: string) => {
    const index1 = s.indexOf('(');
    const index2 = s.indexOf(')');

    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);
    if (BeginOfText.length !== 15 || EndOfText.length === 3) {
        return <div key={uuid()}></div>;;
    }

    return (
        <div className='mt-10 max-w-[500px]' key={uuid()}>
            <Linkedin url={s.slice(index1 + 1, index2)} />
        </div>
    )
}


const createAudio = (s: string) => {
    const index1 = s.indexOf('(');
    const index2 = s.indexOf(')');

    const BeginOfText = s.slice(0, index1 + 1);
    const EndOfText = s.slice(index2, s.length);
    if (BeginOfText.length !== 11 || EndOfText.length === 10) {
        return <div key={uuid()}></div>;;
    }

    const id = s.slice(index1 + 1, index2);

    return <AudioElement2 Id={id} key={uuid()} />
}


const createList = (s: string) => {
    const index1 = s.indexOf('<ul>');
    const index2 = s.indexOf('</ul>');
    if (index1 !== 0 || index2 === -1 || s.length !== index2 + 5) {

        return <div key={uuid()}></div>;;
    }

    const List = s.slice(index1 + 4, index2);
    return (
        <ul key={uuid()} className="mb-10 ml-3">
            {List.split('<list>').map((listItem: string) => <li key={uuid()}
                className="before:w-[8px] before:inline-block before:h-[8px] before:bg-green-700 before:dark:bg-green-500 before:rounded-[50%] before:relative before:-left-3 mb-3"> {jsxInText(listItem)}</li>)}
        </ul>
    )
}

const createTitlte = (s: string) => {
    const index1 = s.indexOf('<title>');
    const index2 = s.indexOf('</title>');

    if (index1 !== 0 || index2 === -1 || s.length !== index2 + 8) {

        return <div key={uuid()}></div>;;
    }

    const title = s.slice(7, index2);

    return (
        <h2 className="mb-10 text-3xl font-bold" key={uuid()}>{title}</h2>
    )
}

const createHighlight = (s: string) => {
    const index1 = s.indexOf('<highlight>');
    const index2 = s.indexOf('</highlight>');

    if (index1 !== 0 || index2 === -1 || s.length !== index2 + 12) {

        return <div key={uuid()}></div>;
    }

    const text = s.slice(11, index2);

    return (
        <p className="mb-10 font-bold pl-4 border-l-4 dark:border-slate-50 border-zinc-800" key={uuid()}><span className="bg-zinc-800 text-white dark:bg-slate-50 dark:text-black inline-block p-1 font-bold">{text}</span></p>
    )
}

