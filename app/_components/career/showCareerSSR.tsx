
import { v4 as uuid } from "uuid";

export default function ChooseTypeOfTextItem(props: { s: string }) {
    let TextArray: (string | JSX.Element) = '';
    if (props.s.indexOf('<ul>') === 0) { TextArray = createList(props.s) }
    else if (props.s.indexOf('<title>') === 0) { TextArray = createTitlte(props.s) }
    else if (props.s.indexOf('<highlight>') === 0) { TextArray = createHighlight(props.s) }
    else { TextArray = createParagh(props.s); }

    return (
        <>{TextArray}</>
    );
}

const createParagh = (s: string) => {
    return (
        <p key={uuid()} className="mt-10">
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

        if (s.indexOf('<bold', index1) === index2 && index2 > -1) {
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



const createStrong = (s: string, isLink: boolean) => {
    const indexHrefEnd = s.indexOf('>');
    const indexTextEnd = s.indexOf('</bold>', 1);
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


const createList = (s: string) => {
    const index1 = s.indexOf('<ul>');
    const index2 = s.indexOf('</ul>');
    if (index1 !== 0 || index2 === -1 || s.length !== index2 + 5) {
        return <div key={uuid()}></div>;;
    }

    const List = s.slice(index1 + 4, index2);
    return (
        <ul key={uuid()}>
            {List.split('<list>').map((listItem: string) => <li key={uuid()}
                className="flex gap-3">
                <div className="w-[8px] h-[24px]">
                    <div className="w-[8px] h-[2px] bg-current mt-3"></div>
                </div>
                {jsxInText(listItem)}
            </li>)}
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

    if (title.includes('<') || title.includes('>')) {
        return <div key={uuid()}></div>;
    }

    return (
        <h2 className="mt-10 text-xl font-bold" key={uuid()}>{title}</h2>
    )
}

const createHighlight = (s: string) => {
    const index1 = s.indexOf('<highlight>');
    const index2 = s.indexOf('</highlight>');

    if (index1 !== 0 || index2 === -1 || s.length !== index2 + 12) {
        return <div key={uuid()}></div>;
    }

    const text = s.slice(11, index2);

    if (text.includes('<') || text.includes('>')) {
        return <div key={uuid()}></div>;
    }

    return (
        <p className="mt-10 font-bold pl-4 border-l-4 dark:border-slate-50 border-zinc-800" key={uuid()}><span className="bg-zinc-800 text-white dark:bg-slate-50 dark:text-black inline-block p-1 font-bold">{text}</span></p>
    )
}