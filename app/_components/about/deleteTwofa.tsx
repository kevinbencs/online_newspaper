'use client'

import { TurnOffTwoFA } from '@/actions/twofa';
import { useState, useTransition, KeyboardEvent, SyntheticEvent } from 'react'

const DeleteTwofa = () => {
    const [deleteTwoFA, setDeleteTwoFA] = useState<boolean>(false);
    const [error, setError] = useState<string>('')
    const [isPending, startTransition] = useTransition()

    const handleKeyboard = (e: KeyboardEvent<SVGRectElement>) => {
        if (e.code === 'Space' || e.code === 'Enter') { setDeleteTwoFA(!deleteTwoFA); }
    }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        if (deleteTwoFA) {
            startTransition(() => {
                TurnOffTwoFA()
                    .then(res => {
                        if (res.error) setError(res.error)
                    })
                    .catch(error =>{
                        console.log(error);
                        setError('Something went wrong, please try again')
                    })
            })
        }
    }

    return (
        <form action="#" onSubmit={handleSubmit}>
            <div className='text-red-700 mb-8 mt-8'>{error}</div>
            <div className="checkbox-wrapper-62 mb-4" >
                <input type="checkbox" className='check' id="check1-62" checked={deleteTwoFA} readOnly disabled={isPending} name='privacy' />
                <label htmlFor="check1-62" className="label1 flex gap-2 items-center cursor-pointer" onClick={() => setDeleteTwoFA(!deleteTwoFA)}>
                    <svg width="30" height="30" viewBox="0 0 90 90">
                        <rect x="30" y="20" width="50" height="50" stroke="currentColor" fill="none" className='focus:outline  outline-base-content' tabIndex={0} onKeyDown={handleKeyboard} />
                        <g transform="translate(0,-952.36218)">
                            <path d="m 13,983 c 33,6 40,26 55,48 " stroke="currentColor" strokeWidth="3" className="path1" fill="none" />
                            <path d="M 75,970 C 51,981 34,1014 25,1031 " stroke="currentColor" strokeWidth="3" className="path1" fill="none" />
                        </g>
                    </svg>
                    <span>Turn off 2FA.</span>
                </label>
            </div>
            <input type="submit" value="Turn off" className='  text-white hover:bg-slate-500  bg-slate-700 rounded p-2 block cursor-pointer' />
        </form>
    )
}

export default DeleteTwofa