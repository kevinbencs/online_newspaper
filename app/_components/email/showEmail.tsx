'use client'

import Image from 'next/image';
import { v4 as uuid } from "uuid";
import {Dispatch, SetStateAction} from 'react';
import React from 'react'

export function chooseTypeOfTextItem (s: string, setTextError: Dispatch<SetStateAction<string>>) {
    let TextArray: (string | JSX.Element) ='';
    if (s.indexOf('<Image') === 0) { TextArray = createImg(s, setTextError) }
    else if (s.indexOf('<highlight>') === 0) { TextArray = createHighlight(s, setTextError) }
    else { TextArray = createParagh(s, setTextError);}

    return TextArray;
}

const createParagh = (s: string, setTextError: Dispatch<SetStateAction<string>>) => {
    return (
        <p key={uuid()} className="mb-10 pl-2">
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

        if (s.indexOf('<anchor_link', index1) === index2 && index2 > -1) {
            textArray.push(s.slice(index1, index2));
            result = createAnchor(s.slice(index2, s.indexOf('</anchor_link>', index2) + 14), setTextError, index2);
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = s.indexOf('</anchor_link>', index2) + 14;
                index2 = s.indexOf('<', index1);
            }

        }
        else if (s.indexOf('<bold>', index1) === index2 && index2 > -1) {
            textArray.push(s.slice(index1, index2));
            result = createStrong(s.slice(index2, s.indexOf('</bold>', index2) + 7), setTextError, index2);
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = s.indexOf('</bold>', index2) + 7;
                index2 = s.indexOf('<', index1);
            }

        }
        else if (s.indexOf('<italic>', index1) === index2 && index2 > -1) {
            textArray.push(s.slice(index1, index2));
            result = createEm(s.slice(index2, s.indexOf('</italic>', index2) + 9), setTextError, index2);
            if (typeof (result) !== 'number') {
                textArray.push(result);
                index1 = s.indexOf('</italic>', index2) + 9;
                index2 = s.indexOf('<', index1);
            }

        }
        else {
            error = 'error';
            setTextError(`Text error ${s}`);
            index2 = -1;
        }
        if (typeof (result) === 'number') {
            error = 'error';
            setTextError(`Text error ${s}`);
            index2 = -1;
        }
    }

    if (error === '') textArray.push(s.slice(index1, s.length));

    return textArray;
}


const createAnchor = (s: string, setTextError: Dispatch<SetStateAction<string>>, index2: number) => {
    const indexHref: number = s.indexOf('(');
    const indexHrefEnd: number = s.indexOf(')');
    const indexTextEnd: number = s.indexOf('</anchor', 1);
    const emIndex: number = s.indexOf('<italic');
    const strongIndex: number = s.indexOf('<bold');
    const index: number = s.indexOf('<', 1);
    if (indexHref === -1 || indexHrefEnd === -1 || indexTextEnd === -1 || (index !== emIndex && index !== strongIndex && index !== indexTextEnd)) {
        setTextError(`Anchor error: ${s}`);
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
            setTextError(`Anchor error: ${s}`);
            return -1;
        }
        if (typeof (result) === 'number') {
            setTextError(`Anchor error: ${s}`);
            return -1;
        }
    }
    textArray.push(text.slice(index1, text.length))

    return (
        <a target='_blank' href={s.slice(indexHref + 1, indexHrefEnd)} key={uuid()} className='link hover:text-black dark:hover:text-black'>{textArray}</a>
    )
}


const createStrong = (s: string, setTextError: Dispatch<SetStateAction<string>>, index2: number) => {
    const indexHrefEnd = s.indexOf('>');
    const indexTextEnd = s.indexOf('</bold', 1);
    const index = s.indexOf('<', 1);
    const emIndex = s.indexOf('<italic');
    if (indexHrefEnd === -1 || indexTextEnd === -1 || (index !== indexTextEnd && index !== emIndex)) {
        setTextError(`Bold error: ${s}`);
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
            setTextError(`Bold error: ${s}`);
            return -1;
        }
        if (typeof (result) === 'number') {
            setTextError(`Bold error: ${s}`);
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
        setTextError(`Bold error: ${s}`);
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
        setTextError(`Italic error: ${s}`);
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
            setTextError(`Italic error: ${s}`);
            return -1;
        }
        if (typeof (result) === 'number') {
            setTextError(`Italic error: ${s}`);
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
        setTextError(`Italic text error: ${s}`);
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
        setTextError(`Image error: ${s}`);
        return <div key={uuid()}></div>;;
    }

    return <div><Image src={s.slice(index1 + 1, index2)} alt='edfeff' key={uuid()} className='w-[550px] block mb-10 mx-auto' width={600} height={337.5}/></div>
}





const createHighlight = (s: string, setTextError: Dispatch<SetStateAction<string>>) =>{
    const index1 = s.indexOf('<highlight>');
    const index2 = s.indexOf('</highlight>');

    if (index1 !== 0 || index2 === -1 || s.length !== index2+12) {
        setTextError(`Highlight error: ${s}`);
        return <div key={uuid()}></div>;
    }

    const text = s.slice(11, index2);

    return(
        <p className="mb-10 pl-4 border-l-4  border-zinc-800" key={uuid()}><span className="bg-zinc-800 text-white inline-block p-1 font-bold">{text}</span></p>
    )
}