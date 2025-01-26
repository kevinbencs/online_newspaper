'use client'

import React from 'react'

interface col{
    _id: string,
    name: string,
    role: string
}

const Colleague = (props:{Coll: col[]}) => {
  return (
    <section className='mb-20'>
        <h2 className='text-center text-xl'>Colleagues</h2>
        <ul className='max-h-20 overflow-x-auto'>
            {props.Coll && props.Coll.map(item => <li className='flex justify-between' key={item._id}>
                <div>{item.name}</div>
                <div>{item.role}</div>
            </li>)}
        </ul>
    </section>
  )
}

export default Colleague