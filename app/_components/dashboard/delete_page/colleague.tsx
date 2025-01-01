'use client'
import { SyntheticEvent, useState } from 'react'
import useSWR from 'swr'
import { ZodIssue } from 'zod'
import { v4 as uuid } from 'uuid'
import ColleagueItem from './colleagueItem'


interface Colleague {
    _id: string,
    name: string,
    email: string,
}

const fetcher = async (url: string): Promise<{ Col: Colleague[] }> => {
    const res = await fetch(url);

    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.')
        error.cause = res.json().then(data => data.error)
        console.error(error.cause)

        throw error
    }

    return res.json()
}

const DeleteColleague = () => {
    const { data, error, mutate, isLoading } = useSWR('/api/colleague', fetcher)
    const [filter, setFilter] = useState<string>('');
    const [deleteIds, setDeleteIds] = useState<string[]>([])
    const [Error, setError] = useState<string | undefined>('')
    const [failed, setFailed] = useState<undefined | ZodIssue[]>([])

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (data?.Col) {
            try {

            } catch (error) {
                console.error(error);

            }
            mutate({ Col: mutateFilter(data.Col, deleteIds) }, false)
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

    const handleFilter = (e: Colleague) => {
        return (e.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 || e.email.indexOf(filter.toLowerCase()) > -1)
    }

    return (
        <section className='w-full mb-20'>
            <h3 className='text-3xl mb-12 pl-2 pb-2 border-b dark:border-white border-black font-bold'>Colleague</h3>
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
                    {(data && data.Col) && data.Col.filter(handleFilter).map(item => <ColleagueItem key={item._id} email={item.email} name={item.name} id={item._id} setDeleteIds={setDeleteIds} deleteIds={deleteIds} />)}
                </ul>
                <input type="submit" value="Delete" className='cursor-pointer bg-slate-600 hover:bg-slate-400 p-2 pt-1 pb-1 rounded text-white' />
            </form>
        </section>
    )
}

export default DeleteColleague

const mutateFilter = (mainArray: Colleague[], ids: string[]) => {
    let res: Colleague[] = mainArray

    for (let i of ids) {
        res = res.filter(item => item._id !== i);
    }

    return res;
}