'use client'

import { isLogged } from "@/actions/islogged";
import { useState, createContext, ReactNode, useEffect, useContext } from "react"

type LoggedContent = {
    IsLogged: boolean,
    setLogged: (val: boolean) => void
}

const LogContext = createContext<LoggedContent | undefined>(undefined);

export const IsLoggedProvider = ({ children }: { children: ReactNode }) => {
    const [IsLogged, setLogged] = useState<boolean>(false);

    useEffect(() => {
        isLogged()
            .then(data => {
                setLogged(data)
            })
    }, [])

    return (
        <LogContext.Provider value={{ IsLogged, setLogged }}>
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