'use client'
import React, { SetStateAction, Dispatch, KeyboardEvent, useRef, useState, useEffect, MutableRefObject, ChangeEvent } from 'react'

type Dispatcher<T> = Dispatch<SetStateAction<T>>;

interface audUrl {
    url: string,
    title: string,
    _id: string
}

const AudioItem = (props: { ulRef: MutableRefObject<HTMLUListElement | null>, setAudioId: Dispatcher<string>, optClass: string, setOptClass: Dispatcher<string>, item: audUrl, setOptInput: Dispatcher<string>, optRef: MutableRefObject<HTMLInputElement | null> }) => {
    const liRef = useRef<null | HTMLLIElement>(null);
    const [liTop, setLiTop] = useState<number>(0);
    const [liLeft, setLiLeft] = useState<number>(0);
    const [audioUrl, setAudioUrl] = useState<string>('');
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [audioTitle, setAudioTitle] = useState<string>('');
    const [showAudio, setShowAudio] = useState<boolean>(false);
    const [audioTime, setAudioTime] = useState<number>(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const liDivRef = useRef<null | HTMLDivElement>(null)

    const audioRef = useRef<null | HTMLVideoElement>(null);
    const sourceRef = useRef<null | HTMLSourceElement>(null);


    useEffect(() => {
        if (liRef.current) {
            setLiLeft(liRef.current?.getBoundingClientRect().right)
            setLiTop(liRef.current?.getBoundingClientRect().top)
        }

    }, [liRef.current?.getBoundingClientRect().top, liRef.current?.getBoundingClientRect().right])

    const handleMouseEnter = async (url: string,) => {
        setShowAudio(true);
        setAudioUrl(url)
        setAudioTitle(props.item.title);

        setTimeout(() => {
            if (url && audioRef.current) {

                audioRef.current.src = url;
                audioRef.current.load();
                play();
            }
        }, 10)

    }

    const handleClick = (s: string) => {
        props.setOptInput(s);
        props.setAudioId(props.item._id)
        handleMouseLeave();
        const id1 = setTimeout(() => {
            props.ulRef.current?.blur();
            liDivRef.current?.blur();
            liRef.current?.blur();
            props.optRef.current?.blur();
        }, 0);


    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, s: string) => {
        if (e.code === 'Enter' || e.code === 'Space') handleClick(s);
        if (e.key === 'Tab' && e.shiftKey) { props.setOptClass(`h-0`); handleMouseLeave()}
    }

    const handleMouseLeave = () => {
        play();
        if(props.optClass === 'h-52') props.optRef.current?.focus();
        setAudioUrl('');
        setShowAudio(false);
    }

    const play = () => {
        const audCurr = audioRef.current;
        if (audCurr) {
            if (isPlaying) { audCurr.pause(); setIsPlaying(false); }
            else {
                audCurr.play()
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch(error => {
                        console.error('Play failed:', error);
                    });
            }
        }
    }


    const audioTimeHandler = () => {
        const audio = audioRef.current;
        if (audio !== null) {
            setCurrentTime(Number(audio.currentTime));
        }
    };
    const audioTimeLength = () => {
        const audio = audioRef.current;
        if (audio !== null) {
            setAudioTime(Number(audio.duration));
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio?.addEventListener('loadedmetadata', audioTimeLength);
        audio?.addEventListener('timeupdate', audioTimeHandler);

        return () => {
            audio?.removeEventListener('timeupdate', audioTimeHandler);
            audio?.removeEventListener('timeupdate', audioTimeHandler);
        }
    }, [audioUrl]);

    const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        setCurrentTime(value);
        if (audioRef.current) {
            audioRef.current.currentTime = value;
        }
    };


    const volumeKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Tab' && !e.shiftKey) {
            handleMouseLeave();
            props.setOptClass(`h-0`);

        }
    }

    const liOnFocus = (url: string,) => {
        if (!showAudio) {
            props.setOptClass(`h-52`);
            setShowAudio(true);
            setAudioUrl(url)
            setAudioTitle(props.item.title);

            setTimeout(() => {
                if (url && audioRef.current) {
                    audioRef.current.src = url;
                    audioRef.current.load();
                    play()
                }
            }, 10)
        }
    }




    return (
        <li ref={liRef} onMouseEnter={() => handleMouseEnter(props.item.url)} onMouseLeave={handleMouseLeave} className='cursor-pointer hover:bg-slate-400 input-bordered border-b-2 p-1 pl-2'>
            <div ref={liDivRef} tabIndex={0} onFocus={() => { liOnFocus(props.item.url) }} onClick={() => handleClick(props.item.title)} onKeyDown={(e) => handleKeyDown(e, props.item.title)} >
                {props.item.title}
            </div>
            {showAudio &&
                <div className=' bg-black p-2 fixed z-50 block w-[600px] pb-6 rounded cursor-default' style={{ top: liTop, left: liLeft - 600 }}>
                    <audio controls ref={audioRef} autoPlay={false} muted={false} preload="auto" className={`hidden`} >
                        <source ref={sourceRef} type='audio/mp3' />
                        Your browser does not support the audio tag.
                    </audio>

                    <div onFocus={() => props.setOptClass(`h-52`)} tabIndex={0}>
                        <div className='flex items-center mb-4 gap-5'>
                            <label className="swap " >
                                <input type="checkbox" onChange={play} checked={isPlaying} />

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="sm:size-20 size-12 swap-off">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    <path strokeLinecap="round" fill='white' strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="swap-on sm:size-20 size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                            </label>
                            <div className='w-full text-white'>{audioTitle}</div>
                        </div>
                        <div className='w-[100%] cursor-default'>
                            {!audioUrl &&
                                <input type="range" name='time2' min={0} max={0} readOnly value={0} onChange={handleRangeChange} className='h-1 w-full block mb-4' />
                            }
                            {audioUrl &&
                                <input type="range" name='time2' min={0} max={audioTime} value={currentTime} onChange={handleRangeChange} className='h-1 w-full block mb-4 cursor-pointer' />
                            }

                            <input type="range" name="volume2" min={0} max={1} step={0.02} className='h-1 block cursor-pointer' defaultValue={1} onChange={e => { if (audioRef.current) audioRef.current.volume = Number(e.target.value) }} onKeyDown={(e) => volumeKeyDown(e)} />
                        </div>
                    </div>
                </div>
            }

        </li>
    )
}


export default AudioItem