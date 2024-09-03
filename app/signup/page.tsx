'use client'
import { SyntheticEvent, useEffect, useRef, useState, KeyboardEvent } from 'react';
import { handleClickEmailLabelText, handleClickNameLabelText, handleClickNextButtonEmail, handleClickNextButtonName, handleClickNextButtonPassword, handleClickPasswordLabelText } from './functionscontainer';

interface Input {
  name: string,
  email: string,
  password: string,
  privacy: boolean
}


const Page = () => {
  const [inputValue, setInputValue] = useState<Input>({ name: '', email: '', password: '', privacy: false });
  const [nameClass, setNameClass] = useState<string>('');
  const [nameTextClass, setNameTextClass] = useState<string>('top-8 invisible');
  const [emailClass, setEmailClass] = useState<string>('hidden');
  const [emailTextClass, setEmailTextClass] = useState<string>('hidden');
  const [passwordTextClass, setPasswordTextClass] = useState<string>('hidden');
  const [privacyClass, setPrivacyClass] = useState<string>('hidden');
  const [passwordClass, setPasswordClass] = useState<string>('hidden');
  const [passwordCheckboxClass, setPasswordCheckboxClass] = useState<string>('hidden');
  const [showPassword, setShowPassword] = useState<string>('password');
  const [activeInputElement, setActiveInputElement] = useState<string>('name');
  const [NextButtonClass, setNextButtonClass] = useState<string>('');
  const [nameLabelText, setNameLabelText] = useState<string>('Fill your name')
  const [emailLabelText, setEmailLabelText] = useState<string>('Fill your email')
  const [passwordLabelText, setPasswordLabelText] = useState<string>('Fill your password')
  const nameRef = useRef<null | HTMLLabelElement>(null);
  const emailRef = useRef<null | HTMLLabelElement>(null);
  const [emailLeft, setEmailLeft] = useState<number>(0);
  const [passLeft, setPassLeft] = useState<number>(0);
  const [titleChecked, setTitleChecked] = useState<boolean>(false);
  const timeOutRefName1 = useRef<null | ReturnType<typeof setTimeout>>(null);
  const timeOutRefName2 = useRef<null | ReturnType<typeof setTimeout>>(null);
  const timeOutRefName3 = useRef<null | ReturnType<typeof setTimeout>>(null);
  const timeOutRefName4 = useRef<null | ReturnType<typeof setTimeout>>(null);
  const timeOutRefEmail1 = useRef<null | ReturnType<typeof setTimeout>>(null);
  const timeOutRefEmail2 = useRef<null | ReturnType<typeof setTimeout>>(null);
  const timeOutRefEmail3 = useRef<null | ReturnType<typeof setTimeout>>(null);
  const timeOutRefEmail4 = useRef<null | ReturnType<typeof setTimeout>>(null);
  const timeOutRefPassword1 = useRef<null | ReturnType<typeof setTimeout>>(null);
  const timeOutRefPassword2 = useRef<null | ReturnType<typeof setTimeout>>(null);
  const timeOutRefPassword3 = useRef<null | ReturnType<typeof setTimeout>>(null);
  const timeOutRefPassword4 = useRef<null | ReturnType<typeof setTimeout>>(null);


  useEffect(() => {
    return () => {
      if (timeOutRefName1.current) clearTimeout(timeOutRefName1.current);
      if (timeOutRefName2.current) clearTimeout(timeOutRefName2.current);
      if (timeOutRefName3.current) clearTimeout(timeOutRefName3.current);
      if (timeOutRefName4.current) clearTimeout(timeOutRefName4.current);
      if (timeOutRefEmail1.current) clearTimeout(timeOutRefEmail1.current);
      if (timeOutRefEmail2.current) clearTimeout(timeOutRefEmail2.current);
      if (timeOutRefEmail3.current) clearTimeout(timeOutRefEmail3.current);
      if (timeOutRefEmail4.current) clearTimeout(timeOutRefEmail4.current);
      if (timeOutRefPassword1.current) clearTimeout(timeOutRefPassword1.current);
      if (timeOutRefPassword2.current) clearTimeout(timeOutRefPassword2.current);
      if (timeOutRefPassword3.current) clearTimeout(timeOutRefPassword3.current);
      if (timeOutRefPassword4.current) clearTimeout(timeOutRefPassword4.current);
    }
  }, [])

  const handleClick = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (inputValue.name !== '' && activeInputElement === 'name') {
      if (inputValue.name !== nameLabelText) {
        let NameText: string = '';
        for (let i: number = 0; i < inputValue.name.length; i++) {
          timeOutRefName1.current = setTimeout(() => {
            NameText += inputValue.name[i]
            setNameLabelText(NameText);
          }, 49 * i)
        }

        timeOutRefName2.current = setTimeout(() => {
          handleClickNextButtonName({ setNameClass, setActiveInputElement, setEmailTextClass, setEmailLeft, setEmailClass, inputValue, nameRef });
        }, 50 * inputValue.name.length);
      }
      else handleClickNextButtonName({ setNameClass, setActiveInputElement, setEmailTextClass, setEmailLeft, setEmailClass, inputValue, nameRef });
    }

    if (inputValue.email !== '' && activeInputElement === 'email' && emailRegex.test(inputValue.email)) {
      if (inputValue.email !== emailLabelText) {
        let EmailText: string = '';
        for (let i: number = 0; i < inputValue.email.length; i++) {
          timeOutRefEmail1.current = setTimeout(() => {
            EmailText += inputValue.email[i]
            setEmailLabelText(EmailText);
          }, 49 * i)
        }

        timeOutRefEmail2.current = setTimeout(() => {
          handleClickNextButtonEmail({ setPasswordClass, setActiveInputElement, setPasswordTextClass, setPasswordLeft: setPassLeft, setEmailClass, setPasswordCheckboxClass, inputValue, emailRef, nameRef });
        }, inputValue.email.length * 50)
      }
      else handleClickNextButtonEmail({ setPasswordClass, setActiveInputElement, setPasswordTextClass, setPasswordLeft: setPassLeft, setEmailClass, setPasswordCheckboxClass, inputValue, emailRef, nameRef });
    }

    if (inputValue.password !== '' && activeInputElement === 'password') {
      if (inputValue.password.length !== passwordLabelText.length) {
        let PasswordText: string = '';
        for (let i: number = 0; i < inputValue.password.length; i++) {
          timeOutRefPassword1.current = setTimeout(() => {
            PasswordText += '*';
            setPasswordLabelText(PasswordText);
          }, 49 * i)
        }

        timeOutRefPassword2.current = setTimeout(() => {
          handleClickNextButtonPassword({ setPasswordClass, setActiveInputElement, setPrivacyClass, setPasswordCheckboxClass,  setNextButtonClass });
        }, inputValue.password.length * 50);
      }
      else handleClickNextButtonPassword({ setPasswordClass, setActiveInputElement, setPrivacyClass, setPasswordCheckboxClass,  setNextButtonClass });
    }
  };


  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };


  const handlePassword = () => {
    if (showPassword === 'password') setShowPassword('text');
    else setShowPassword('password');
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (name === 'privacy') {
      setInputValue({ ...inputValue, [name]: checked });
    }
    else {
      setInputValue({ ...inputValue, [name]: value });
    }

    switch (name) {
      case 'name':
        setNameTextClass('-top-8 visible bg-slate-600 cursor-pointer mr-2 text-white mb-2 text-xs block sm:inline')
        break;
      case 'email':
        setEmailTextClass('-top-8 visible bg-slate-600 cursor-pointer left-0 mr-2  pb-1 text-white mb-2 text-xs block sm:inline');
        setEmailLeft(0);
        break;
      case 'password':
        setPasswordTextClass('-top-8 visible bg-slate-600 cursor-pointer left-0 mr-2  pb-1 text-white mb-2 text-xs block sm:inline');
        setPassLeft(0);
        break;
    }
  }


  const handleClickName = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (inputValue.email === '' && emailLabelText === 'Fill your email') {
      handleClickNameLabelText({ inputValue, setNameClass, setNameLabelText, setNextButtonClass, setEmailClass, setPasswordCheckboxClass, setPasswordClass, setPrivacyClass, setEmailTextClass, setPasswordTextClass, setActiveInputElement });
    }
    if ((inputValue.email !== '' || emailLabelText !== 'Fill your email') && emailRegex.test(inputValue.email)) {
      if (inputValue.email !== emailLabelText) {
        let EmailText: string = '';
        for (let i: number = 0; i < inputValue.email.length; i++) {
          timeOutRefEmail3.current = setTimeout(() => {
            EmailText += inputValue.email[i]
            setEmailLabelText(EmailText);
          }, 49 * i)
        }
      }
      if (inputValue.password !== '') {
        if (inputValue.password.length !== passwordLabelText.length) {
          let PasswordText: string = '';
          for (let i: number = 0; i < inputValue.password.length; i++) {
            timeOutRefPassword3.current = setTimeout(() => {
              PasswordText += '*'
              setPasswordLabelText(PasswordText);
            }, 49 * i)
          }
        }
        handleClickNameLabelText({ inputValue, setNameClass, setNameLabelText, setNextButtonClass, setEmailClass, setPasswordCheckboxClass, setPasswordClass, setPrivacyClass, setEmailTextClass, setPasswordTextClass, setActiveInputElement });
      }
      else if (passwordLabelText === 'Fill your password') handleClickNameLabelText({ inputValue, setNameClass, setNameLabelText, setNextButtonClass, setEmailClass, setPasswordCheckboxClass, setPasswordClass, setPrivacyClass, setEmailTextClass, setPasswordTextClass, setActiveInputElement });
    }
  }



  const handleClickEmail = () => {
    if (inputValue.name !== '') {
      if (inputValue.name !== nameLabelText) {
        let NameText: string = '';
        for (let i: number = 0; i < inputValue.name.length; i++) {
          timeOutRefName3.current = setTimeout(() => {
            NameText += inputValue.name[i]
            setNameLabelText(NameText);
          }, 49 * i);
        }
      }

      if (inputValue.password !== '') {
        if (inputValue.password.length !== passwordLabelText.length) {
          let PasswordText: string = '';
          for (let i: number = 0; i < inputValue.password.length; i++) {
            timeOutRefPassword4.current = setTimeout(() => {
              PasswordText += '*'
              setPasswordLabelText(PasswordText);
            }, 49 * i)
          }
        }
        handleClickEmailLabelText({ inputValue, setNameClass, setNextButtonClass, setEmailClass, setPasswordCheckboxClass, setPasswordClass, setPrivacyClass, setPasswordTextClass, setActiveInputElement });
      }
      else if (passwordLabelText === 'Fill your password') handleClickEmailLabelText({ inputValue, setNameClass, setNextButtonClass, setEmailClass, setPasswordCheckboxClass, setPasswordClass, setPrivacyClass, setPasswordTextClass, setActiveInputElement });
    }
  }



  const handleClickPassword = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputValue.email !== '' && inputValue.name !== '' && emailRegex.test(inputValue.email)) {
      if (inputValue.email !== emailLabelText) {
        let EmailText: string = '';
        for (let i: number = 0; i < inputValue.email.length; i++) {
          timeOutRefEmail4.current = setTimeout(() => {
            EmailText += inputValue.email[i]
            setEmailLabelText(EmailText);
          }, 49 * i)
        }
      }
      if (inputValue.name !== nameLabelText) {
        let NameText: string = '';
        for (let i: number = 0; i < inputValue.name.length; i++) {
          timeOutRefName4.current = setTimeout(() => {
            NameText += inputValue.name[i]
            setNameLabelText(NameText);
          }, 49 * i)
        }
      }
      handleClickPasswordLabelText({ setNameClass, setNextButtonClass, setEmailClass, setPasswordCheckboxClass, setPasswordClass, setPrivacyClass, setActiveInputElement })
    }
  }

  const handleKeyboardTitle = (e: KeyboardEvent<SVGRectElement>) => {
    if (e.code === 'Space' || e.code === 'Enter') setTitleChecked(!titleChecked);
  }


  return (
    <div className='flex justify-center h-[90vh] pt-[20vh]'>
      <form action="" onSubmit={handleSubmit} className='w-[90%] max-w-[800px] relative'>
        <h2 className='mb-20 text-4xl'>Create a new account</h2>

        <label ref={nameRef} className={`relative ${nameTextClass}   pl-10 bg-user bg-no-repeat  duration-500 pr-2 pt-1 pb-1 content-center`} htmlFor='name' onClick={handleClickName} > <button>{nameLabelText}</button> </label>
        <label ref={emailRef} style={{ left: `${emailLeft}px` }} className={`relative bg-email bg-no-repeat  ${emailTextClass} pl-10 duration-500 pr-2 pt-1 `} htmlFor='email' onClick={handleClickEmail} > <button>{emailLabelText}</button> </label>
        <label className={`relative pl-10 ${passwordTextClass}  duration-500 pr-2 pt-1 bg-password bg-no-repeat `} style={{ left: `${passLeft}px` }} htmlFor='password' onClick={handleClickPassword} > <button> {passwordLabelText}</button> </label>

        <input type="text" id='name' placeholder='Fill your name' className={`bg-transparent bg-user bg-no-repeat bg-[length:28px] bg-[left_top_7px]  border-b-2 border-base-content block w-[100%] pl-10 p-2 pb-3 imageClass ${nameClass}  focus-visible:outline-none`} name='name' value={inputValue.name} onChange={handleInputChange} required tabIndex={0} />
        <input type="email" id='email' placeholder='Fill your email' required name='email' className={`bg-transparent bg-email bg-[length:24px] bg-[left_top_7px] bg-no-repeat  border-b-2 border-base-content pl-10 block w-[100%] imageClass p-2 ${emailClass} focus-visible:outline-none`} value={inputValue.email} onChange={handleInputChange} tabIndex={0} />
        <input type={showPassword} placeholder='Fill your password' required name='password' minLength={10} maxLength={16} className={`${passwordClass} bg-transparent bg-password bg-[length:24px] bg-[left_top_7px] pl-10 bg-no-repeat border-b-2 border-base-content block w-[100%] p-2 imageClass focus-visible:outline-none`} id='password' value={inputValue.password} onChange={handleInputChange} tabIndex={0} />

        <div className={`${privacyClass} bg-transparent border-b-2 border-base-content block w-[100%] p-2`}>
          <div className="checkbox-wrapper-62 " >
            <input type="checkbox" className="check" id="check1-62" checked={titleChecked} />
            <label htmlFor="check1-62" className="label1 flex gap-2 items-center cursor-pointer" onClick={() => setTitleChecked(!titleChecked)}>
              <svg width="30" height="30" viewBox="0 0 90 90">
                <rect x="30" y="20" width="50" height="50" stroke="currentColor" fill="none" className='focus:outline  outline-base-content' tabIndex={0} onKeyDown={handleKeyboardTitle} />
                <g transform="translate(0,-952.36218)">
                  <path d="m 13,983 c 33,6 40,26 55,48 " stroke="currentColor" stroke-width="3" className="path1" fill="none" />
                  <path d="M 75,970 C 51,981 34,1014 25,1031 " stroke="currentColor" stroke-width="3" className="path1" fill="none" />
                </g>
              </svg>
              <span>By creating an account, you agree to privacy notice.</span>
            </label>
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <label className={`${passwordCheckboxClass} swap swap-rotate order-2 mr-5 -top-14`}>
            <input type="checkbox" name="showPassword" onChange={handlePassword} />

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 swap-on">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 swap-off">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </label>

          <div className='mr-5'>
            <button onClick={handleClick} className={` button-30 mt-6 ${NextButtonClass} mr-3`} >Next</button>
            <input type="submit" value="Sign up" className='button-30 mt-6' />
          </div>
        </div>

      </form>
    </div>

  )
}


export default Page