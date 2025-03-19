'use client'
import { createContext, useContext, ReactNode } from 'react';
import useSWR from 'swr';
import { preload } from 'react-dom';

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

preload('/api/search', {as: 'fetch', crossOrigin: 'anonymous'})

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

type SearchContextType = {
    data: Res | undefined,
    error: Error | undefined,
    isLoading: boolean
}

const searchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {

    const { data, error, isLoading } = useSWR<Res, Error>('/api/search', fetcher, { refreshInterval: 60000 });
    return (
        <searchContext.Provider value={{data, error, isLoading}}>
            {children}
        </searchContext.Provider>
    )
}

export const useSearch = () => {
    const context = useContext(searchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within an SearchProvider');
  }
  return context;
}

