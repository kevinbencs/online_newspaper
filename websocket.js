import { writeFileSync, existsSync, mkdirSync } from 'fs';

const content = `
import {createServer} from 'http';
import {parse } from 'url';
import next from'next';
import { Server }  from "socket.io";

import  Admin from './modelforserver/Admin'
import  Token from './modelforserver/Token'
import  jwt from "jsonwebtoken"

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const clients = [];

function parseCookies(cookieString) {
  const cookies = {};
  if (!cookieString) return cookies;

  cookieString.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    const name = parts[0].trim();
    const value = parts[1] ? parts[1].trim() : '';
    cookies[name] = decodeURIComponent(value);
  });
  return cookies;
}

async function validate(token) {
  try {
    const token2 = await Token.findOne({ token: token })
    if (!token2) {

      return "PLease log in";
    }

    const decoded = jwt.verify(token, process.env.SECRET_CODE);
    if (!decoded) {

      return "PLease log in";
    }

    const account = await Admin.findById(decoded.id);
    if (!account) {

      return "PLease log in";
    }

    return 'success';
  }
  catch (err) {
    console.log(err)
    return 'Server error';
  }
}



app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A client connected');

    socket.on('lastMainPage', (data) => {
      io.emit('lastMainPageNews', data)
    })

    socket.on('authenticate', async () => {
      const index = clients[socket.id]
      if (index > -1) {
        clients.splice(index, 1)
      }
      else {
        const cookie = parseCookies(socket.handshake.headers.cookie);
        if (cookie) {
          const res = await validate(cookie['admin-log'])
          if (res === 'success') {
            clients.push(socket.id)
          }
        }
      }
    })

    socket.on('writeArticle', (data) => {
      for (let id of clients) {
        io.to(id).emit('numberOfLockedArticle', data)
      }
    })

    socket.on('unLockArticle', (data) => {
      for (let id of clients) {
        io.to(id).emit('numberOfLockedArticle', data)
      }
    })

    socket.on('addTask', (data) => {
      for (let id of clients) {
        io.to(id).emit('task', data)
      }
    })

    socket.on('deleteTask', (data) => {
      for (let id of clients) {
        io.to(id).emit('task', data)
      }
    })

    socket.on('setNameForTask', (data) => {
      for (let id of clients) {
        io.to(id).emit('task', data)
      }
    })



    socket.on('disconnect', () => {
      console.log('A client disconnected');
      const index = clients[socket.id]
      if (index > -1) {
        clients.splice(index, 1)
      }

    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('Ready on http://localhost:3000');
  });
});
`;

const packag = `{
  "name": "newspaperpaper",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "cross-env NODE_ENV=production node server.js",
    "websocket": "node websocket.js",
    "api": "node api.js",
    "comment": "node comment.js",
    "lint": "next lint"
  },
  "type": "module",
  "dependencies": {
    "@sendgrid/mail": "^8.1.4",
    "@supabase/ssr": "^0.5.1",
    "@supabase/supabase-js": "^2.45.4",
    "bcrypt": "^5.1.1",
    "chart.js": "^4.4.7",
    "flatpickr": "^4.6.13",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.9.0",
    "mongoose": "^8.8.3",
    "next": "14.2.4",
    "next-themes": "^0.3.0",
    "qrcode": "^1.5.4",
    "react": "^18",
    "react-chartjs-2": "^5.3.0",
    "react-dom": "^18",
    "react-icons": "^5.3.0",
    "react-social-media-embed": "^2.5.13",
    "react-tweet": "^3.2.1",
    "rss": "^1.2.2",
    "sharp": "^0.33.5",
    "socket.io": "^4.8.1",
    "socket.io-client": "^4.8.1",
    "speakeasy": "^2.0.0",
    "srw": "^0.0.4",
    "uuid": "^10.0.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/jsonwebtoken": "^9.0.7",
    "@types/node": "^20",
    "@types/qrcode": "^1.5.5",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "@types/rss": "^0.0.32",
    "@types/speakeasy": "^2.0.10",
    "@types/uuid": "^10.0.0",
    "cross-env": "^7.0.3",
    "daisyui": "^4.12.10",
    "eslint": "^8",
    "eslint-config-next": "14.2.4",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
`;


const socketProv = `'use client'
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

    useEffect(() => {
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

    },[auth])

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
`

const Latest = `"use client";

import { useState, MouseEvent, useRef, useEffect, TouchEvent } from "react";
import LatestNewsLink from "./latestnewslink";
import { useSocket } from '../socketProvider'


interface DataMainPage {
  id: string,
  title: string,
  date: string,
  time: string,
  category: string,
  paywall: boolean
}



const LatestNews = (props: {
  res: {
    error: string;
    data?: undefined;
  } | {
    data: DataMainPage[];
    error?: undefined;
  }
}) => {
  const [isDown, setIsDown] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [isDragging, setDragging] = useState<boolean>(false);
  const [data, setData] = useState<DataMainPage[] | undefined>(props.res.data)
  const [error, setError] = useState<string | undefined>(props.res.error);
  const { mainMessage } = useSocket();




  useEffect(() => {
    if(mainMessage.data){
      setData(mainMessage.data);
      setError('');
    }
  },[mainMessage])


  const handleMouseDown = (e: MouseEvent<HTMLElement>) => {
    setIsDown(true);
    setDragging(false);
    setStartX(e.pageX - scrollContainerRef.current!.offsetLeft);
    setScrollLeft(scrollContainerRef.current!.scrollLeft);
    scrollContainerRef.current!.style.cursor = 'grabbing';
  }
  const handleMouseUp = () => {
    setIsDown(false);
    const timeOut = setTimeout(() => {
      setDragging(false);
    }, 10);
    clearTimeout(timeOut);
    scrollContainerRef.current!.style.cursor = 'grab';

  }

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!isDown) return;
    setDragging(true);
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 1;
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
  }
  const handleMouseLeave = () => {
    setIsDown(false);
    setDragging(false);
    scrollContainerRef.current!.style.cursor = 'grab';
  }



  const handleTouchStart = (e: TouchEvent<HTMLElement>) => {
    setIsDown(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current!.offsetLeft);
    setScrollLeft(scrollContainerRef.current!.scrollLeft);
    scrollContainerRef.current!.style.cursor = 'grabbing';
  }
  const handleTouchEnd = (e: TouchEvent<HTMLElement>) => {
    setIsDown(false);
    scrollContainerRef.current!.style.cursor = 'grab';
  }

  const handleTouchMove = (e: TouchEvent<HTMLElement>) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 1;
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
  }


  return (
    <div>

      {(error !== '' && error !== undefined)&&
        <div>{error}</div>
      }

      <div className=" overflow-x-hidden overflow-y-hidden cursor-pointer mb-5 ml-5 sm:ml-0"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        ref={scrollContainerRef}>
        <section className="flex gap-8  mb-5 flex-nowrap  no-scrollbar">
         {data && data?.map(item => <LatestNewsLink Article={{ header: item.title, paywall: item.paywall, date: item.date, link: '/'+item.category.toLowerCase().replaceAll(' ', '').replace('&', '_')+'/'+item.date.slice(0, 4)+'/'+item.date.slice(5, 7)+'/'+item.date.slice(8, 10)+'/'+item.title.replaceAll(' ', '_').replace('?','nb20') }} key={item.id} isDragging={isDragging} />)}
        </section>
      </div>
    </div>
  )
}

export default LatestNews
`

const TaskPage = `import { GetTask } from '@/actions/gettasks';
import Client from './client';


interface TaskType {
    _id: string,
    name: string,
    task: string
}

const Page = async () => {
    const res = await GetTask();

    return (
        <>
            <Client tasks={res.tasks} error={res.error} />
        </>
    )
}

export default Page`


const TaskClient = `'use client'

import TaskItem from '@/app/_components/taskitem';
import { SyntheticEvent, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';
import { useSocket } from '@/app/_components/socketProvider';


interface TaskType {
    _id: string,
    name: string,
    task: string
}



const Client = (props:{tasks: TaskType[] | undefined, error: string | undefined}) => {
    const [tasks, setTasks] = useState<TaskType[] | undefined>(props.tasks);
    const [firstLoad,setFirstLoad] = useState<boolean>(true);
    const [inputValue, setINputValue] = useState<string>('');
    const [Error, setError] = useState<string | undefined>(props.error);
    const {task} = useSocket();


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('/api/task',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({task: inputValue})
            });

            const resJSON = await res.json() as {error: string | undefined, success: string | undefined};

            if(res.status === 200){
                setINputValue('');
            }
            else{
                setError(resJSON.error)
            }

        } catch (error) {
            console.log(error)
            setError('Error, please try again')
        }
    }



    useEffect(() => {
        if(firstLoad){
            setFirstLoad(false);
        }
        else{
            setTasks(task)
        }
    },[task])

    return (
        <div className='flex justify-center w-full'>
            <div className='lg:w-[680px] w-full'>
                <h1 className='text-center mb-10 text-3xl'>Tasks</h1>
                {Error &&
                    <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 rounded-lg mb-5 text-center  p-2'>
                        {Error}
                    </div>
                }
                    
                <form onSubmit={handleSubmit}>
                    <label htmlFor="task" className='pl-2 mb-2 block text-sm'> Add new task</label>
                    <div className='flex justify-end items-center'>
                        <input type="text" name="task" id='task' className='w-full dark:bg-[#121212] h-10 pl-2 p-1 rounded-lg border border-gray-700' value={inputValue} onChange={(e) => setINputValue(e.target.value)} />
                        <button className='absolute mr-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                            </svg>
                        </button>
                    </div>
                </form>
                <div className='mt-10'>
                    {tasks && tasks.map((item: TaskType) => <TaskItem name={item.name} task={item.task} id={item._id}  key={uuid()} setError={setError} />)}
                </div>
            </div>
        </div>
    )
}

export default Client
`


const sideBar = `'use client'

import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSocket } from "../socketProvider";

type Dispatcher<T> = Dispatch<SetStateAction<T>>

const fetcher = async (url: string) => {
    try {
        const res = await fetch(url)
        const resJson = await res.json() as { number: number | undefined, error: string | undefined }
        if (res.status === 200) return resJson.number
        else {
            return resJson.error
        }
    } catch (error) {
        console.error(error)
        return 'Error in get request'
    }

}



const LockedArticle = (props: { setCheckboxValue: Dispatcher<boolean> }) => {
    const [number, setNumber] = useState<number>(0);
    const [Error, setError] = useState<string | undefined>('')
    const { sidebarNotification } = useSocket();


    useEffect(() => {
        (async () => {
            const res = await fetcher('/api/lockedarticlenumber')
            if (typeof res === 'number') setNumber(res)
            else setError(res)
        })()

    }, [])

    useEffect(() => {
        if(typeof sidebarNotification === 'number') setNumber(sidebarNotification)
    },[sidebarNotification])


    const checked = () => {
        props.setCheckboxValue(false);
    }
    return (
        <li><Link onClick={checked} href='/lockedarticle/allarticles' className='pt-1 pb-1 bg-neutral text-neutral-content mt-2 ml-2 mr-2 md:text-xl text-base  rounded-[4px] hover:bg-slate-100 hover:text-black flex justify-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            Locked article ({number})
            {Error &&
                <div>
                    {Error}
                </div>
            }
        </Link></li>
    )
}

export default LockedArticle`


const ApiTask = `import Task from "@/model/Task"
import { idSchema, taskSchema } from "@/schema";
import SocketService from "@/service/socketService";
import { NextRequest, NextResponse } from "next/server";
import { Eligibility } from "@/utils/mongo/eligibility";



interface TaskType {
    _id: string,
    name: string,
    task: string
}




export async function POST(req: NextRequest) {
    try {
        const cookie = req.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in' }, { status: 401 });

        const coll = await Eligibility(cookie.value)

        if (coll.role === '') return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const body = await req.json()
        const value = taskSchema.parse(body)
        const validatedFields = taskSchema.safeParse(value);
        if (validatedFields.error) return NextResponse.json({ failed: validatedFields.error.errors }, { status: 400 })

        const inputValue = value.task;

        const task = new Task({ task: inputValue });

        await task.save();

        const tasks = await Task.find() as TaskType[];

        const socketService = SocketService.getInstance();
        socketService.emit('addTask', { tasks: JSON.parse(JSON.stringify(tasks)) })


        return NextResponse.json({ success: 'Success' }, { status: 200 });
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}



export async function DELETE(req: NextRequest) {

    try {
        const cookie = req.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in' }, { status: 401 });

        const coll = await Eligibility(cookie.value)

        if (coll.role === '') return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const body = await req.json()
        const value = idSchema.parse(body);
        const validatedFields = idSchema.safeParse(value)
        if (validatedFields.error) return NextResponse.json({ failed: validatedFields.error.errors }, { status: 400 });

        const id = value.id

        await Task.findByIdAndDelete(id)

        const tasks = await Task.find() as TaskType[];

        const socketService = SocketService.getInstance();
        socketService.emit('deleteTask', { tasks: JSON.parse(JSON.stringify(tasks)) })


        return NextResponse.json({ success: 'Success' }, { status: 200 });
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}`


const ApiTaskId = `import Task from "@/model/Task"
import SocketService from "@/service/socketService";
import { NextRequest, NextResponse } from "next/server";
import { Eligibility } from "@/utils/mongo/eligibility";


interface TaskType {
    _id: string,
    name: string,
    task: string
}



export async function DELETE(req: NextRequest) {
    try {
        const cookie = req.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in' }, { status: 401 });

        const coll = await Eligibility(cookie.value)

        if (coll.role === '') return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const id = req.nextUrl.pathname.slice(10, req.nextUrl.pathname.length)

        await Task.findByIdAndDelete(id)

        const tasks = await Task.find() as TaskType[];

        const socketService = SocketService.getInstance();
        socketService.emit('deleteTask', { tasks: JSON.parse(JSON.stringify(tasks)) })


        return NextResponse.json({ success: 'Success' }, { status: 200 });
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const cookie = req.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in' }, { status: 401 });

        const coll = await Eligibility(cookie.value)

        if (coll.role === '') return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });


        const id = req.nextUrl.pathname.slice(10, req.nextUrl.pathname.length)

        const task = await Task.findById(id);
        if (!task) return NextResponse.json({ error: 'Server errors' }, { status: 500 });

        if (!task.name) {
            const NewTask = await Task.findByIdAndUpdate(id, { name: coll.name })
            if (!NewTask) return NextResponse.json({ error: 'Task deleted' }, { status: 500 })
        }
        else {
            if (task.name === coll.name) await Task.findByIdAndUpdate(id, { name: null })
        }

        const tasks = await Task.find() as TaskType[];

        const socketService = SocketService.getInstance();
        socketService.emit('setNameForTask', { tasks: JSON.parse(JSON.stringify(tasks)) })

        return NextResponse.json({ success: 'Success' }, { status: 200 })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}`




const lockedArtApi = `import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/article";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { EditArticleSchema } from "@/schema";
import { getImageById } from "@/actions/getimageurl";
import { getVideoById } from "@/actions/getvideourl";
import SocketService from "@/service/socketService";
import { chooseTypeOfTextItem, editImageIdToData, isValidYoutubeUrl, searchAudio, searchVideo } from "@/lib/checkArt";
import { Eligibility } from "@/utils/mongo/eligibility";
import { chooseTypeOfTextItemSearch } from "@/lib/makeSearchArt";



interface DataMainPage {
    id: string,
    title: string,
    date: string,
    time: string,
    category: string,
    paywall: boolean
}


export async function POST(req: NextRequest) {


    try {
        const cookie = req.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in' }, { status: 401 });

        const coll = await Eligibility(cookie.value)

        if (coll.role !== 'Editor' && coll.role !== 'Admin') return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const body = await req.json();
        const value = EditArticleSchema.parse(body);
        const validatedFields = EditArticleSchema.safeParse(value);
        if (validatedFields.error) return NextResponse.json({ failed: validatedFields.error.errors }, { status: 400 });

        let res: string = 'ok';
        const textArra: string[] = value.text.split('$');
        const paywallTextArr: string[] = value.paywall_text.split('$');

        for (let i = 0; i < textArra.length && res === 'ok'; i++) {
            res = chooseTypeOfTextItem(textArra[i]);
            if (res !== 'ok') return NextResponse.json({ error: res }, { status: 400 })
            if (textArra[i].indexOf('<video') === 0) {
                const res = await searchVideo(textArra[i]);

                if (res.success) {
                    textArra[i] = '<video id=('+res.success.url+';'+res.success._id+';'+res.success.title+')></video>'
                }
                else return NextResponse.json({ error: 'Video id is not in database' }, { status: 404 })
            }

            if (textArra[i].indexOf('<audio') === 0) {
                const res = await searchAudio(textArra[i]);

                if (res.success) {
                    textArra[i] = '<audio id=('+res.success.url+';'+res.success._id+';'+res.success.title+';'+res.success.date+')></<audio>'
                }
                else return NextResponse.json({ error: 'Video id is not in database' }, { status: 404 })
            }

            if (textArra[i].indexOf('<Image') === 0) {

                const res = await editImageIdToData(textArra[i]);

                if (res.success) {
                    textArra[i] = '<Image id=('+res.success.url+';'+res.success._id+';'+res.success.detail+')></<Image>'
                }
                else return NextResponse.json({ error: 'Image id is not in database' }, { status: 404 })
            }
        }


        for (let i = 0; i < paywallTextArr.length && res === 'ok'; i++) {
            res = chooseTypeOfTextItem(paywallTextArr[i]);
            if (res !== 'ok') return NextResponse.json({ error: res }, { status: 400 })
            if (paywallTextArr[i].indexOf('<video') === 0) {
                const res = await searchVideo(paywallTextArr[i]);

                if (res.success) {
                    paywallTextArr[i] = '<video id=('+res.success.url+';'+res.success._id+';'+res.success.title+')></video>'
                }
                else return NextResponse.json({ error: 'Video id is not in database' }, { status: 400 })
            }

            if (paywallTextArr[i].indexOf('<audio') === 0) {
                const res = await searchAudio(paywallTextArr[i]);

                if (res.success) {
                    paywallTextArr[i] = '<audio id=('+res.success.url+';'+res.success._id+';'+res.success.title+';'+res.success.date+')></<audio>'
                }
                else return NextResponse.json({ error: 'Video id is not in database' }, { status: 400 })
            }

            if (paywallTextArr[i].indexOf('<Image') === 0) {
                const res = await editImageIdToData(paywallTextArr[i]);

                if (res.success) {
                    paywallTextArr[i] = '<Image id=('+res.success.url+';'+res.success._id+';'+res.success.detail+')></<Image>'
                }
                else return NextResponse.json({ error: 'Image id is not in database' }, { status: 400 })
            }
        }


        const resImg = await getImageById({ id: value.cover_img_id })

        if (resImg.error) return NextResponse.json({ error: 'Cover image id is not in database' }, { status: 400 });
        const cover_img_id = resImg.success.url + ';' + resImg.success._id + ';' + resImg.success.detail;

        let resFirstElement;
        let firstElementUrl: string;

        if (value.first_element === 'Image') {
            resFirstElement = await getImageById({ id: value.first_element_url });

            if (resFirstElement?.error || resFirstElement.success === null) return NextResponse.json({ error: 'First element image id is not in database' }, { status: 400 })
            else { firstElementUrl = resFirstElement?.success.url + ';' + resFirstElement?.success.id + ';' + resFirstElement?.success.detail }
        }
        else if (value.first_element === 'Video') {
            resFirstElement = await getVideoById({ id: value.first_element_url });

            if (resFirstElement?.error || resFirstElement.success === null) return NextResponse.json({ error: 'First element video id is not in database' }, { status: 400 });
            else { firstElementUrl = resFirstElement?.success.url + ';' + resFirstElement?.success._id + ';' + resFirstElement?.success.title }
        }
        else if (value.first_element === 'Youtube') {
            resFirstElement = isValidYoutubeUrl(value.first_element_url)

            if (!resFirstElement) return NextResponse.json({ error: 'First element youtube url is not correct' }, { status: 400 });
            else { firstElementUrl = value.first_element_url; }
        }
        else {
            firstElementUrl = value.first_element_url;
        }



        if (value.important === 'Second most important') {
            const Arts = await supabase.from('article').select().eq('important', 'Second most important').eq('locked', false);
            if (Arts.data?.length === 2) {
                const Update = await supabase.from('article').update({ 'important': 'Important' }).eq('important', 'Second most important').order('id').eq('locked', false).limit(1)
                console.log(Update.error)
            }
        }

        if (value.important === 'Most important') {
            const Arts = await supabase.from('article').select().eq('important', 'Second most important').eq('locked', false);
            if (Arts.data?.length === 2) {
                const Update = await supabase.from('article').update({ 'important': 'Important' }).eq('important', 'Second most important').eq('locked', false).order('id').limit(1)
                console.log(Update.error)
            }

            const Art2 = await supabase.from('article').update({ 'important': 'Second most important' }).eq('important', 'Most important').eq('locked', false);
            console.log(Art2.error)
        }

        const currentDate: string = new Date().toISOString().slice(0, 10).replaceAll('-', '. ') + '.';
        const currentTime: string = new Date().toISOString().slice(11, 19);

        const searchArt = [];

        for (let i = 0; i < textArra.length; i++) {
            searchArt.push(chooseTypeOfTextItemSearch(textArra[i]))
        }

        const { error } = await supabase.from('article').update({
            date: currentDate,
            time: currentTime,
            text: textArra.join('$'),
            title: value.title,
            first_element: value.first_element,
            first_element_url: firstElementUrl,
            category: value.category,
            important: value.important,
            paywall: value.paywall,
            paywall_text: paywallTextArr.join('$'),
            sidebar: value.sidebar,
            cover_img_id,
            keyword: value.keyword,
            detail: value.detail,
            locked: false,
            search_art:searchArt.join(' ')
        }).eq('title', value.lastTitle)

        if (error) {
            console.log(error);
            return NextResponse.json({ error: 'Server error' }, { status: 500 });
        }


       

        for (let i = 0; i < value.keyword.length; i++) {
            const res = await supabase.rpc('settheme', { p_theme: value.keyword[i] });
            if (res.error) console.log(res.error)
        }

        const Title: string[] = value.title.split(' ');

        for (let i = 0; i < Title.length; i++) {
            const res = await supabase.rpc('settitle', { p_title: Title[i].toLowerCase() })
            if (res.error) console.log(res.error)
        }

        const socketService = SocketService.getInstance();
        const article: PostgrestSingleResponse<DataMainPage[]> = await supabase.from('article').select('title, category, date, time, id, paywall').limit(6).eq('locked', false).order('id', { ascending: false })
        if (!article.error) {
            article.data.map(val => {
                val.date = val.date.replaceAll(' ', '').replaceAll('.', '-');
                if (val.time.length === 8) val.date = val.date.slice(0, -1) + 'T' + val.time + 'Z'
                else val.date = val.date.slice(0, -1) + 'T0' + val.time + 'Z'
            })

            socketService.emit('lastMainPage', { data: article.data })
        }


        const lockeddArticle: PostgrestSingleResponse<{ id: string }[]> = await supabase.from('article').select('id', { count: 'exact' }).eq('locked', true)
        if (!lockeddArticle.data || lockeddArticle.data.length === 0) {

            socketService.emit('unLockArticle', { data: 0 })
        }
        else {
            socketService.emit('unLockArticle', { data: lockeddArticle.count })
        }



        return NextResponse.json({ success: 'Success', date: currentDate }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

}
`


const writeArt = `import { supabase } from "@/utils/supabase/article";
import { NewArticleSchema } from "@/schema";
import { getImageById } from "@/actions/getimageurl";
import { getVideoById } from "@/actions/getvideourl";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import SocketService from "@/service/socketService";
import { NextRequest, NextResponse } from "next/server";
import { chooseTypeOfTextItem, editImageIdToData, isValidYoutubeUrl, searchAudio, searchVideo } from "@/lib/checkArt";
import { Eligibility } from "@/utils/mongo/eligibility";
import { chooseTypeOfTextItemSearch } from "@/lib/makeSearchArt";


export async function POST(req: NextRequest) {


    try {
        const cookie = req.cookies.get('admin-log');
        if (!cookie) return NextResponse.json({ error: 'Please log in' }, { status: 401 });

        const coll = await Eligibility(cookie.value)

        if (coll.role === '') return NextResponse.json({ error: 'Please log in as admin' }, { status: 401 });

        const body = await req.json();
        const value = NewArticleSchema.parse(body);
        const validatedFields = NewArticleSchema.safeParse(value);
        if (validatedFields.error) return NextResponse.json({ failed: validatedFields.error.errors }, { status: 400 });

        let res: string = 'ok';
        const textArra: string[] = value.text.split('$');
        const paywallTextArr: string[] = value.paywall_text.split('$');

        for (let i = 0; i < textArra.length && res === 'ok'; i++) {
            res = chooseTypeOfTextItem(textArra[i]);
            if (res !== 'ok') return NextResponse.json({ error: res }, { status: 400 })
            if (textArra[i].indexOf('<video') === 0) {
                const res = await searchVideo(textArra[i]);

                if (res.success) {
                    textArra[i] = '<video id=('+res.success.url+';'+res.success._id+';'+res.success.title+')></video>'
                }
                else return NextResponse.json({ error: 'Video id is not in database' }, { status: 400 })
            }

            if (textArra[i].indexOf('<audio') === 0) {
                const res = await searchAudio(textArra[i]);

                if (res.success) {
                    textArra[i] = '<audio id=('+res.success.url+';'+res.success._id+';'+res.success.title+';'+res.success.date+')></<audio>'
                }
                else return NextResponse.json({ error: 'Video id is not in database' }, { status: 400 })
            }

            if (textArra[i].indexOf('<Image') === 0) {

                const res = await editImageIdToData(textArra[i]);

                if (res.success) {
                    textArra[i] = '<Image id=('+res.success.url+';'+res.success._id+';'+res.success.detail+')></<Image>'
                }
                else return NextResponse.json({ error: 'Image id is not in database' }, { status: 400 })
            }
        }


        for (let i = 0; i < paywallTextArr.length && res === 'ok'; i++) {
            res = chooseTypeOfTextItem(paywallTextArr[i]);
            if (res !== 'ok') return NextResponse.json({ error: res }, { status: 400 })
            if (paywallTextArr[i].indexOf('<video') === 0) {
                const res = await searchVideo(paywallTextArr[i]);

                if (res.success) {
                    paywallTextArr[i] = '<video id=('+res.success.url+';'+res.success._id+';'+res.success.title+')></video>'
                }
                else return NextResponse.json({ error: 'Video id is not in database' }, { status: 400 })
            }

            if (paywallTextArr[i].indexOf('<audio') === 0) {
                const res = await searchAudio(paywallTextArr[i]);

                if (res.success) {
                    paywallTextArr[i] = '<audio id=('+res.success.url+';'+res.success._id+';'+res.success.title+';'+res.success.date+')></<audio>'
                }
                else return NextResponse.json({ error: 'Video id is not in database' }, { status: 400 })
            }

            if (paywallTextArr[i].indexOf('<Image') === 0) {
                const res = await editImageIdToData(paywallTextArr[i]);

                if (res.success) {
                    paywallTextArr[i] = '<Image id=('+res.success.url+';'+res.success._id+';'+res.success.detail+')></<Image>'
                }
                else return NextResponse.json({ error: 'Image id is not in database' }, { status: 400 })
            }
        }


        const resImg = await getImageById({ id: value.cover_img_id })

        if (resImg.error) return NextResponse.json({ error: 'Cover image id is not in database' }, { status: 400 })
        const cover_img_id = resImg.success.url + ';' + resImg.success._id + ';' + resImg.success.detail;

        let resFirstElement;
        let firstElementUrl: string;

        if (value.first_element === 'Image') {
            resFirstElement = await getImageById({ id: value.first_element_url });

            if (resFirstElement?.error || resFirstElement.success === null) return NextResponse.json({ error: 'First element image id is not in database' }, { status: 400 })
            else { firstElementUrl = resFirstElement?.success.url + ';' + resFirstElement?.success.id + ';' + resFirstElement?.success.detail }
        }
        else if (value.first_element === 'Video') {
            resFirstElement = await getVideoById({ id: value.first_element_url });

            if (resFirstElement?.error || resFirstElement.success === null) return NextResponse.json({ error: 'First element video id is not in database' }, { status: 400 })
            else { firstElementUrl = resFirstElement?.success.url + ';' + resFirstElement?.success._id + ';' + resFirstElement?.success.title }
        }
        else if (value.first_element === 'Youtube') {
            resFirstElement = isValidYoutubeUrl(value.first_element_url)

            if (!resFirstElement) return NextResponse.json({ error: 'First element youtube url is not correct' }, { status: 400 })
            else { firstElementUrl = value.first_element_url; }
        }
        else {
            firstElementUrl = value.first_element_url;
        }

        const currentDate: string = new Date().toISOString().slice(0, 10).replaceAll('-', '. ') + '.';
        const currentTime: string = new Date().toISOString().slice(11, 19);

        const searchArt = [];

        for (let i = 0; i < textArra.length; i++) {
            searchArt.push(chooseTypeOfTextItemSearch(textArra[i]))
        }


         const { data, error } = await supabase.from('article').insert({
             date: currentDate,
             time: currentTime,
             text: textArra.join('$'),
             title: value.title,
             first_element: value.first_element,
             first_element_url: firstElementUrl,
             author: coll.name,
             category: value.category,
             important: value.important,
             paywall: value.paywall,
             paywall_text: paywallTextArr.join('$'),
             sidebar: value.sidebar,
             cover_img_id,
             keyword: value.keyword,
             detail: value.detail,
             search_art:searchArt.join(' ')
         })
 
         if (error) {
             console.log(error);
             return NextResponse.json({ error: 'Server error' }, { status: 500 });
         }
 
         const socketService = SocketService.getInstance();
 
         const lockeddArticle: PostgrestSingleResponse<{ id: string }[]> = await supabase.from('article').select('id', { count: 'exact' }).eq('locked', true)
         if (!lockeddArticle.data || lockeddArticle.data.length === 0) {
             socketService.emit('writeArticle', { data: 0 })
         }
         else {
             socketService.emit('writeArticle', { data: lockeddArticle.count })
         }


        return NextResponse.json({ success: 'Success' }, { status: 200 })
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
}`

const socketService = `import { io } from 'socket.io-client';

class SocketService {
  private static instance: SocketService;
  private socket: any;

  private constructor() {
    this.socket = io(process.env.URL, {
      
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public emit(event: string, data: any) {
    this.socket.emit(event, data);
  }
}

export default SocketService;`


const mainHeaderContainer = `'use client';

import { ReactNode, useEffect, useRef, useState } from "react";
import Header from "./header/header";

import { AudioProvider } from "./audio/audioprovider";
import { IsLoggedProvider } from "./islogged/isloggedprovider";
import { SocketProvider } from "./socketProvider";

const Main_header_container = (props: { Children: ReactNode }) => {
    const [mainPos, setMainPos] = useState<number>(10);
    const mainRef = useRef<HTMLElement>(null);



    useEffect(() => {
        const handleScroll = () => {
            if (mainRef.current) {
                setMainPos(mainRef.current?.getBoundingClientRect().top);
            }
        }

        if (typeof window !== 'undefined') {
            window.addEventListener("scroll", handleScroll, { passive: true });
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener("scroll", handleScroll);
            }
        };

    }, [])
    return (
        <>
            <IsLoggedProvider>
                    <SocketProvider>
                        <Header mainPos={mainPos} />
                        <main ref={mainRef} className="mt-10 desktop:pl-[calc(50%-600px)] desktop:pr-[calc(50%-600px)] pl-1 pr-1">
                            <AudioProvider>
                                {props.Children}
                            </AudioProvider>
                        </main>
                    </SocketProvider>
            </IsLoggedProvider>
        </>
    )
}

export default Main_header_container;`


const adminLogin = `'use client'

import { useState, useTransition, SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { adminLogin } from '@/actions/adminlogin'
import { useLogged } from '../_components/islogged/isloggedprovider'
import { useSocket } from '../_components/socketProvider'

const Client = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { push } = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('')
    const { setLogged, setRole } = useLogged();
    const {auth, setAuth} = useSocket()

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        startTransition(() => {
            adminLogin({ email, password })
                .then(res => {
                    setError(res.error);
                    if (res.name) {
                        setLogged(res.name);
                        setRole(res.role)
                        setAuth(!auth);
                        push('/');
                    }
                })
                .catch(error =>{
                    console.log(error);
                    setError('Something went wrong, please try again')
                })
        })
    }

    return (
        <div className='flex items-center flex-col min-h-[90vh] pt-[10vh]'>
            <div className='w-80'>
                <h1 className='text-center mb-5 text-3xl'>Sign in to Word Times</h1>
                <form action="#" className='dark:bg-neutral bg-gray-200 border-gray-800 rounded-lg p-[5%] pt-6 pb-6 mb-10 border dark:border-slate-400' onSubmit={handleSubmit}>

                    {error &&
                        <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 rounded-lg mb-5 text-center p-2'>{error}</div>
                    }
                    {success &&
                        <div className='text-green-600 bg-green-600/15 p-2 text-center rounded-lg mb-5 font-bold'>{success}</div>
                    }

                    <label className='text-sm'>
                        Email address
                        <input type="email" name="email" disabled={isPending} className='block w-[100%] pl-2 rounded-md mt-1 pt-1 pb-1 focus-within:outline-none' required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <div className='relative mt-6 mb-6'>
                        <Link href='/forgotpassword' className='absolute right-0 text-xs dark:text-slate-400 text-slate-800'>Forgot password?</Link>
                        <label className='text-sm'>
                            Password
                            <input type="password" disabled={isPending} name='password' minLength={8} maxLength={16} required className='block w-[100%] focus-within:outline-none pl-2 mt-1 rounded-md pt-1 pb-1' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </div>
                    <input type="submit" value="Sign in" disabled={isPending} className='block w-[100%] rounded-lg   p-2 cursor-pointer  dark:bg-base-300 bg-slate-400 hover:bg-slate-100  dark:hover:bg-base-100' />
                </form>
            </div>
            <h2 className='text-center text-2xl mb-4 mt-4'>Among the permissions, only sending emails is available</h2>
            <section className='max-w-[600px] mt-20 mb-32 flex flex-col items-start gap-5'>
                <ul>
                    <li>
                        Email: admin@admin.com
                    </li>
                    <li>
                        Password: Admin1234*
                    </li>
                    <li>
                        Can do: create new articles, admins, editors, authors, tasks, edit articles, delete articles, tasks, editors, authors, admins and write newsletters.
                    </li>
                </ul>
                <ul>
                    <li>
                        Email: editor@editor.hu
                    </li>
                    <li>
                        Password: Admin1234*
                    </li>
                    <li>
                        Can do: create, edit, delete articles, tasks and write newsletters.
                    </li>
                </ul>
                <ul>
                    <li>
                        Email: author@author.hu
                    </li>
                    <li>
                        Password: Admin1234*
                    </li>
                    <li>
                        Can do: create articles, tasks, edit, delete own articles,, delete tasks and write newsletters.
                    </li>
                </ul>
            </section>

        </div>
    )
}

export default Client`


const adminLogout = `'use client'

import { adminLogOut } from "@/actions/adminlogout"
import { useLogged } from "../_components/islogged/isloggedprovider"
import { useRouter } from "next/navigation"
import { SyntheticEvent } from "react"
import { useSocket } from "./socketProvider"

export default function AdminLogout() {
    const { setLogged, setRole } = useLogged();
    const { push } = useRouter();
    const {setAuth} = useSocket()

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setAuth(false);
        adminLogOut()
            .then(val => {
                if (val) {
                    setLogged('');
                    setRole('');
                    setAuth(false)
                    push('/')
                }
            })
    }
    return (
        <form onSubmit={handleSubmit}>
            <button className='border-zinc-500 border hover:dark:bg-slate-500 hover:text-white hover:dark:text-white hover:bg-gray-700 text-center inline-block p-2 lg:min-w-64 min-w-full'>Log out</button>
        </form>
    )

}`


const admin = `import  mongoose from "mongoose";

const { Schema } = mongoose;

const AdminSchema = new Schema({
    email: {
        type: String,
        require: "Email is require",
        unique: true,
        lowercase: true,
        trim: true,
    },
    name: {
        type: String,
        require: "Name is require",
        max: 25,
    },
    password: {
        type: String,
        required: "Your password is required",
    },
    role: {
        type: String,
        require: "Role is required",
    },
    image: {
        type: String,
        require: 'Image url is required'
    },
    importance: {
        type: Number,
        require: 'Importance is required'
    },
    hired: {
        type: Boolean,
        require: 'Hired is require',
        default: false
    }

}, {timestamps: true})

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);`

const Token = `import  Schema from "mongoose";

const TokenSchema = new Schema({
    token:{
        type: String,
        require: true,
        ref: "User",
    }
},{timestamps: true});

export default mongoose.models.Token || mongoose.model("Token", TokenSchema);`

try {
    writeFileSync('./server.js', content);
    writeFileSync('./package.json', packag);
    if (!existsSync('./service')) mkdirSync('./service')
    if (!existsSync('./modelforserver')) mkdirSync('./modelforserver')
    if (existsSync('./modelforserver')) writeFileSync('./modelforserver/Admin.js', admin)
    if (existsSync('./modelforserver')) writeFileSync('./modelforserver/Token.js', Token)

    writeFileSync('./app/_components/socketProvider.tsx', socketProv);
    writeFileSync('./app/_components/home/latestnews.tsx', Latest)
    writeFileSync('./app/(protected)/(admin)/dashboard/task/page.tsx', TaskPage)
    writeFileSync('./app/(protected)/(admin)/dashboard/task/client.tsx', TaskClient)
    writeFileSync('./app/_components/sidebar/lockedArticle.tsx', sideBar)
    writeFileSync('./app/api/task/route.ts', ApiTask)
    writeFileSync('./app/api/task/[id]/route.ts', ApiTaskId)
    writeFileSync('./app/api/unlockarticle/route.ts', lockedArtApi)
    writeFileSync('./app/api/writearticle/route.ts', writeArt)
    writeFileSync('./service/socketService.ts', socketService)
    writeFileSync('./app/_components/main_header_container.tsx', mainHeaderContainer);
    writeFileSync('./app/_components/adminlogout.tsx', adminLogout);
    writeFileSync('./app/dhdhdhsefgsgerhtrherwgerhagfws/Client.tsx', adminLogin)
} catch (error) {
    console.log(error)
}













