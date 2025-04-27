'use client'
import { createContext, useContext, ReactNode } from 'react';
import useSWR from 'swr';
import { preload } from 'react-dom';


preload('/api/category', { as: 'fetch', crossOrigin: 'anonymous' })

interface Cat {
    name: string,
    _id: string
}


const fetcher = async (url: string): Promise<{ success: Cat[] }> => {
    try {
        const res = await fetch(url, { next: { tags: ['categoryTags']} })

        if (!res.ok) {
            const error = new Error()
            error.cause = res.json().then((data: { error: string }) => data.error)
            console.log(error.cause)

            throw error;
        }

        return res.json()
    } catch (error) {
        console.error(error)
        throw new Error('Api error');
    }

}

type CategoryContextType = {
    categoryData: Cat[] | undefined,
    categoryError: Error | undefined,
    categoryIsLoading: boolean
}

const categoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {

    const { data, error, isLoading } = useSWR<{success: Cat[]}, Error>('/api/category', fetcher, { revalidateOnFocus: false });
    return (
        <categoryContext.Provider value={{ categoryData: data?.success, categoryError: error, categoryIsLoading: isLoading }}>
            {children}
        </categoryContext.Provider>
    )
}

export const useCategory = () => {
    const context = useContext(categoryContext);
    if (context === undefined) {
        throw new Error('useCategory must be used within the CategoryProvider');
    }
    return context;
}

