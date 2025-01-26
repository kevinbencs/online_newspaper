'use client'

import React, { useEffect, useState } from 'react'

const NumberOfUser = (props: { number: number }) => {
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
            Number of user:
            <div>{number}</div>
        </div>
    )
}

export default NumberOfUser