'use client'
import { io } from "socket.io-client";
import { createContext, useState, useContext, useEffect, ReactNode, } from 'react';

const socket = io(process.env.URL);

interface DataMainPage {
    id: string,
    title: string,
    date: string,
    time: string,
    category: string,
    paywall: boolean
}

interface TaskType {
    _id: string,
    name: string,
    task: string
}

type socketContext = {
    mainMessage: {data: DataMainPage[] | undefined},
    sidebarNotification: string | number,
    auth: boolean,
    setAuth: (auth: boolean) => void,
    task: TaskType[] | undefined
}

export const SocketContext = createContext<socketContext | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [mainMessage, setMainMessage] = useState({data: undefined});
    const [sidebarNotification, setSidebarNotification] = useState<string | number>("");
    const [auth, setAuth] = useState<boolean>(false);
    const [task, setTask] = useState<TaskType[] | undefined>([])

    /*useEffect(() => {
        socket.on('lastMainPageNews', setMainMessage);
        socket.on("numberOfLockedArticle",(data) => {setSidebarNotification(data.data);});
        socket.on('task', (data) => {
            setTask(data.tasks)
        })

        return () => {
            socket.off("sidebar_notification");
            socket.off('numberOfLockedArticle')
            socket.off('task')
        };
    }, []);

    useEffect(() => {

        socket.emit('authenticate',)

    },[auth])*/

    return (
        <SocketContext.Provider value={{ mainMessage, sidebarNotification, auth, setAuth, task}}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket  must be used within a SocketContext');
  }
  return context;
};
