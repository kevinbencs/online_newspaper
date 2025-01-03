'use client'
import { SyntheticEvent, useState } from 'react'
import useSWR, { preload } from 'swr'
import { ZodIssue } from 'zod'
import { v4 as uuid } from 'uuid'
import CarrierItem from './carrierItem'


interface Carrier {
    _id: string,
    title: string,
}

const fetcher = async (url: string): Promise<{ Car: Carrier[] }> => {
    const res = await fetch(url);

    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.')
        error.cause = res.json().then(data => data.error)
        console.error(error.cause)

        throw error
    }

    return res.json()
}

preload('/api/carrier', fetcher)

const DeleteCarrier = () => {
    const { data, error, mutate, isLoading } = useSWR('/api/carrier', fetcher)
    const [filter, setFilter] = useState<string>('');
    const [deleteIds, setDeleteIds] = useState<string[]>([])
    const [Error, setError] = useState<string | undefined>('')
    const [failed, setFailed] = useState<undefined | ZodIssue[]>([])

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (data?.Car) {
            try {

            } catch (error) {
                console.error(error);

            }
            mutate({ Car: mutateFilter(data.Car, deleteIds) }, false)
            const res = await fetch('/api/article', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: deleteIds })
            })

            const resJson = await res.json() as { success: string | undefined, error: string | undefined, failed: ZodIssue[] | undefined };

            if (res.status === 400) {
                setFailed(resJson.failed)
            }
            if (res.status === 401 || res.status === 500) {
                setError(resJson.error)
            }
            mutate();
        }
    }

    const handleFilter = (e: Carrier) => {
        return e.title.toLowerCase().indexOf(filter.toLowerCase()) > -1 
    }

    return (
        <section className='w-full mb-20'>
            <h3 className='text-3xl mb-12 pl-2 pb-2 border-b dark:border-white border-black font-bold'>Carrier</h3>
            {error && <div className='text-red-700 font-bold dark:bg-red-400/15  dark:text-red-500 bg-red-700/25 rounded-lg mb-5  p-2'>{error.message}</div>}
            {Error && <div className='text-red-700 font-bold dark:bg-red-400/15  dark:text-red-500 bg-red-700/25 rounded-lg mb-5  p-2'>{Error}</div>}
            {(failed && failed.length > 0) &&
                <div className='text-red-700 font-bold dark:bg-red-400/15  dark:text-red-500 bg-red-700/25 rounded-lg mb-5  p-2'>
                    {failed.map(e => <p key={uuid()}>{e.message}</p>)}
                </div>
            }
            <form action="#" onSubmit={handleSubmit}>
                <input type="text" name="art_filter" value={filter} onChange={e => setFilter(e.target.value)} placeholder='Filter' className='dark:text-white focus-within:outline-none input-bordered border-b-2 block w-full bg-transparent pl-2 mb-3 pb-2' />
                <ul className='mb-5 h-60 overflow-y-scroll  sidebar   w-[100%] dark:bg-neutral bg-base-200  '>
                    {isLoading && <div>Loading...</div>}
                    {(data && data.Car) && data.Car.filter(handleFilter).map(item => <CarrierItem key={item._id}  title={item.title} id={item._id} setDeleteIds={setDeleteIds} deleteIds={deleteIds} />)}
                </ul>
                <input type="submit" value="Delete" className='cursor-pointer bg-slate-600 hover:bg-slate-400 p-2 pt-1 pb-1 rounded text-white' />
            </form>
        </section>
    )
}

export default DeleteCarrier

const mutateFilter = (mainArray: Carrier[], ids: string[]) => {
    let res: Carrier[] = mainArray

    for (let i of ids) {
        res = res.filter(item => item._id !== i);
    }

    return res;
}