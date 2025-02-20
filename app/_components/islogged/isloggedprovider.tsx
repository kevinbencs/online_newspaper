'use client'

import { useState, createContext, ReactNode, useEffect, useContext,use } from "react"
import useSWR from 'swr'
import { preload,preconnect } from "react-dom";

interface Art{
    url: string,
    title: string
}

type LoggedContent = {
    WhoLogged: string,
    setLogged: (val: string) => void,
    RoleLogged: string,
    setRole: (val:string) => void,
    subscribe: boolean,
    setSubscribe: (val: boolean) => void,
    saveArtUrls: Art[],
    setSaveArtUrls: (val: Art[]) => void,
    email:string,
    setEmail: (val: string) => void
}

const LogContext = createContext<LoggedContent | undefined>(undefined);

const fetcher = async (url: string): Promise<{role: string, name: string, email: string, subscribe: boolean, saveArt: Art[] }> => {
    const res = await fetch(url);

  if(!res.ok){
    const error = new Error();
    error.cause = res.json().then((data: {error: string}) => data.error)
    console.error(error.cause);
    throw error;
  }

  return res.json()
}

preload('api/islogged',{ as: 'fetch' })
preconnect('api/islogged', { crossOrigin: "anonymous"})




export const IsLoggedProvider = ({ children }: { children: ReactNode }) => {
    const [WhoLogged, setLogged] = useState<string>('');
    const [RoleLogged, setRole] = useState<string>('');
    const [subscribe, setSubscribe] = useState<boolean>(false)
    const [saveArtUrls, setSaveArtUrls] = useState<Art[]>([])
    const [email, setEmail] = useState<string>('')

    const {data, error} = useSWR<{role: string, name: string, email: string, subscribe: boolean, saveArt: Art[]}, Error>('/api/islogged', fetcher);

    useEffect(() => {
        if(data){
            setLogged(data.name);
            setRole(data.role);
            setEmail(data.email);
            setSubscribe(data.subscribe);
            setSaveArtUrls(data.saveArt)
        }
    }, [data])

    return (
        <LogContext.Provider value={{ WhoLogged, setLogged, RoleLogged, setRole, subscribe, setSubscribe, saveArtUrls, setSaveArtUrls, email,  setEmail, }}>
            {children}
        </LogContext.Provider>
    )
}


export const useLogged = () => {
    const context = useContext(LogContext);
    if (context === undefined)
        throw new Error('useLogged must be use in isLoggedProvider.')

    return context
}