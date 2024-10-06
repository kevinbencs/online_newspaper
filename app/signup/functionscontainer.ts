import { Dispatch, SetStateAction, RefObject } from "react";
import { ZodIssue } from "zod";

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
    props.setEmailClass('block ');
    const nameLabelLength = props.nameRef.current!.offsetWidth;
    if (props.inputValue.email === '') {
        props.setEmailTextClass(`top-8 invisible`);
        props.setEmailLeft(window.matchMedia("(min-width: 640px)").matches ? -nameLabelLength - 8 : 0);
    }
}


export function handleClickNameLabelText(props: {
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


export function handleClickEmailLabelText(props: {
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


export function handleClickPasswordLabelText(props: {
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
        props.setPasswordTextClass(`top-8 invisible`);
        props.setPasswordLeft(window.matchMedia("(min-width: 640px)").matches ? -nameLabelLength - 16 - emailLabelLength : 0);
    }
}



export function handleClickNextButtonPassword(props: {
    setPasswordClass: Dispatcher<string>,
    setActiveInputElement: Dispatcher<string>,
    setPrivacyClass: Dispatcher<string>,
    setPasswordCheckboxClass: Dispatcher<string>,
    setNextButtonClass: Dispatcher<string>,
}) {
    props.setActiveInputElement('privacy');
    props.setPasswordClass('hidden');
    props.setPasswordCheckboxClass('hidden');
    props.setPrivacyClass('block');
    props.setNextButtonClass('disabledButton')
}


export function resetForm(props: {
    setInputValue: Dispatch<Input>,
    setNameClass: Dispatch<string>,
    setNameTextClass: Dispatch<string>,
    setEmailClass: Dispatch<string>,
    setEmailTextClass: Dispatch<string>,
    setPasswordTextClass: Dispatch<string>,
    setPrivacyClass: Dispatch<string>,
    setPasswordClass: Dispatch<string>,
    setPasswordCheckboxClass: Dispatch<string>,
    setShowPassword: Dispatch<string>,
    setActiveInputElement: Dispatch<string>,
    setNextButtonClass: Dispatch<string>,
    setNameLabelText: Dispatch<string>,
    setEmailLabelText: Dispatch<string>,
    setPasswordLabelText: Dispatch<string>,
    setSubmitButtonClass: Dispatch<string>,
    setEmailLeft: Dispatch<number>,
    setRequiredFields: Dispatch<string[]>,
    setPassLeft: Dispatch<number>,
    setPrivacyChecked: Dispatch<boolean>,
    setError: Dispatch<undefined | ZodIssue[]>,
}) {
    props.setInputValue({ name: '', email: '', password: '', privacy: false});
    props.setNameClass('');
    props.setNextButtonClass('');
    props.setNameTextClass('top-8 invisible');
    props.setEmailClass('hidden');
    props.setEmailTextClass('hidden');
    props.setPasswordTextClass('hidden');
    props.setPrivacyClass('hidden');
    props.setPasswordClass('hidden');
    props.setPasswordCheckboxClass('hidden');
    props.setShowPassword('password');
    props.setActiveInputElement('name');
    props.setNameLabelText('Fill your name');
    props.setEmailLabelText('Fill your email');
    props.setPasswordLabelText('Fill your password');
    props.setSubmitButtonClass('disabledButton');

    props.setEmailLeft(0);
    props.setRequiredFields([]);
    props.setPassLeft(0);
    props.setPrivacyChecked(false);
    props.setError([]);
}