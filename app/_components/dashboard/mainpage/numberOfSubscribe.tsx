'use client'

import React, { useEffect, useState } from 'react'

const NumberOfSubscribers = (props: { number: number }) => {
    const [number, setNumber] = useState<number>(0)

    useEffect(() => {
        for(let i = 0; i <= props.number; i++){
            setTimeout(() => {
                setNumber(i)
            },i*2)
        }
    },[])

    return (
        <div className='text-center'>
            Number of subscribers to the newsletter:
            <div>{number}</div>
        </div>
    )
}

export default NumberOfSubscribers