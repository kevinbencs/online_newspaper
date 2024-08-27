import { Dispatch, SetStateAction, RefObject, MutableRefObject } from "react";

type Dispatcher<T> = Dispatch<SetStateAction<T>>;

interface Input {
    name: string,
    email: string,
    password: string,
    privacy: boolean
}

export function handleClickNextButtonName(props: {
    setNameClass: Dispatcher<string>,
    setActiveInputElement: Dispatcher<string>,
    setEmailTextClass: Dispatcher<string>,
    setEmailLeft: Dispatcher<number>,
    setEmailClass: Dispatcher<string>,
    inputValue: Input,
    nameRef: RefObject<null | HTMLLabelElement>
}) {
    props.setNameClass('hidden');
    props.setActiveInputElement('email')
    props.setEmailClass('block');
    const nameLabelLength = props.nameRef.current!.offsetWidth;
    if (props.inputValue.email === '') {
        props.setEmailTextClass(`top-8`);
        props.setEmailLeft(window.matchMedia("(min-width: 640px)").matches ? -nameLabelLength - 8 : 0);
    }
}


export function handleClickNameLabelText(props:{
    inputValue: Input,
    setNameClass: Dispatcher<string>,
    setNameLabelText: Dispatcher<string>,
    setNextButtonClass: Dispatcher<string>,
    setEmailClass: Dispatcher<string>,
    setPasswordCheckboxClass: Dispatcher<string>,
    setPasswordClass: Dispatcher<string>,
    setPrivacyClass: Dispatcher<string>,
    setEmailTextClass: Dispatcher<string>,
    setPasswordTextClass: Dispatcher<string>,
    setActiveInputElement: Dispatcher<string>
}) {
    props.setNameClass('block');
    props.setNextButtonClass('');
    props.setEmailClass('hidden');
    props.setPasswordCheckboxClass('hidden');
    props.setPasswordClass('hidden');
    props.setPrivacyClass('hidden');
    if (props.inputValue.email === '') props.setEmailTextClass('hidden');
    if (props.inputValue.password === '') props.setPasswordTextClass('hidden');
    props.setActiveInputElement('name');
}


export function handleClickEmailLabelText(props:{
    inputValue: Input,
    setNameClass: Dispatcher<string>,
    setNextButtonClass: Dispatcher<string>,
    setEmailClass: Dispatcher<string>,
    setPasswordCheckboxClass: Dispatcher<string>,
    setPasswordClass: Dispatcher<string>,
    setPrivacyClass: Dispatcher<string>,
    setPasswordTextClass: Dispatcher<string>,
    setActiveInputElement: Dispatcher<string>
}) {
    props.setNameClass('hidden');
    props.setEmailClass('block');
    props.setNextButtonClass('');
    props.setPasswordCheckboxClass('hidden');
    props.setPasswordClass('hidden');
    props.setPrivacyClass('hidden');
    if (props.inputValue.password === '') props.setPasswordTextClass('hidden');
    props.setActiveInputElement('email');
}


export function handleClickPasswordLabelText(props:{
    setNameClass: Dispatcher<string>,
    setNextButtonClass: Dispatcher<string>,
    setEmailClass: Dispatcher<string>,
    setPasswordCheckboxClass: Dispatcher<string>,
    setPasswordClass: Dispatcher<string>,
    setPrivacyClass: Dispatcher<string>,
    setActiveInputElement: Dispatcher<string>
}) {
    props.setNameClass('hidden');
    props.setEmailClass('hidden');
    props.setNextButtonClass('');
    props.setPasswordCheckboxClass('inline-grid');
    props.setPasswordClass('block');
    props.setPrivacyClass('hidden');
    props.setActiveInputElement('password');
}



export function handleClickNextButtonEmail(props: {
    setPasswordClass: Dispatcher<string>,
    setActiveInputElement: Dispatcher<string>,
    setPasswordTextClass: Dispatcher<string>,
    setPasswordLeft: Dispatcher<number>,
    setEmailClass: Dispatcher<string>,
    setPasswordCheckboxClass: Dispatcher<string>,
    inputValue: Input,
    emailRef: RefObject<null | HTMLLabelElement>,
    nameRef: RefObject<null | HTMLLabelElement>
}) {
    props.setEmailClass('hidden');
    props.setActiveInputElement('password')
    props.setPasswordClass('block');
    props.setPasswordCheckboxClass('inline-grid');
    const emailLabelLength = props.emailRef.current!.offsetWidth;
    const nameLabelLength = props.nameRef.current!.offsetWidth;
    if (props.inputValue.password === '') {
        props.setPasswordTextClass(`top-8`);
        props.setPasswordLeft(window.matchMedia("(min-width: 640px)").matches ? -nameLabelLength - 16 - emailLabelLength : 0);
    }
}






export function handleClickNextButtonPassword(props: {
    setPasswordClass: Dispatcher<string>,
    setActiveInputElement: Dispatcher<string>,
    setPrivacyClass: Dispatcher<string>,
    setPasswordCheckboxClass: Dispatcher<string>,
    setPrivacyTextClass: Dispatcher<string>,
    setNextButtonClass: Dispatcher<string>,
}) {
    props.setActiveInputElement('privacy');
    props.setPasswordClass('hidden');
    props.setPasswordCheckboxClass('hidden');
    props.setPrivacyClass('block');
    props.setPrivacyTextClass('inline');
    props.setNextButtonClass('disabled')
}