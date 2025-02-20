'use client'
import { SyntheticEvent, useState, Dispatch, SetStateAction, } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import Link from 'next/link';

interface Cat {
    name: string,
    _id: string
}

interface Author {
    _id: string,
    name: string,
}

interface Title {
    id: string,
    title: string,
    number: number
}

interface Theme {
    id: string,
    theme: string,
    number: number
}

interface Res {
    res: {
        category: Cat[],
        author: Author[],
        title: Title[],
        theme: Theme[]
    }
}

const fetcher = async (url: string): Promise<Res> => {
    const res = await fetch(url)

    if (!res.ok) {
        const error = new Error()
        error.cause = res.json().then((data: { error: string }) => data.error)
        console.log(error.cause)

        throw error;
    }

    return await res.json()
}

const SearchContext = () => {

    const { data, error, isLoading } = useSWR<Res, Error>('/api/search', fetcher, { refreshInterval: 60000 });
    return (
        <div>SearchContext</div>
    )
}

export default SearchContext