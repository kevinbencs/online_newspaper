'use client'

import { isLogged } from "@/actions/islogged";
import { useState, createContext, ReactNode, useEffect, useContext } from "react"

type LoggedContent = {
    WhoLogged: string,
    setLogged: (val: string) => void,
    RoleLogged: string,
    setRole: (val:string) => void,
}

const LogContext = createContext<LoggedContent | undefined>(undefined);

export const IsLoggedProvider = ({ children }: { children: ReactNode }) => {
    const [WhoLogged, setLogged] = useState<string>('');
    const [RoleLogged, setRole] = useState<string>('');

    useEffect(() => {
        isLogged()
            .then((data) => {
                console.log(data);
                setLogged(data.name);
                setRole(data.role);
            })
    }, [])

    return (
        <LogContext.Provider value={{ WhoLogged, setLogged, RoleLogged, setRole }}>
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