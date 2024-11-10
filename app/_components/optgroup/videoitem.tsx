'use client'
import React, { SetStateAction, Dispatch, KeyboardEvent, useRef, useState, useEffect, MutableRefObject, ChangeEvent } from 'react'

type Dispatcher<T> = Dispatch<SetStateAction<T>>;

interface vidUrl {
    url: string,
    title: string,
    _id: string
}

const VideoItem = (props: { ulRef: MutableRefObject<HTMLUListElement | null>, setVideoId: Dispatcher<string>, optClass: string, setOptClass: Dispatcher<string>, item: vidUrl, setOptInput: Dispatcher<string>, optRef: MutableRefObject<HTMLInputElement | null> }) => {
    const liRef = useRef<null | HTMLLIElement>(null);
    const [liTop, setLiTop] = useState<number>(0);
    const [liLeft, setLiLeft] = useState<number>(0);
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [videoTitle, setVideoTitle] = useState<string>('');
    const [showVideo, setShowVideo] = useState<boolean>(false);
    const [videoTime, setVideoTime] = useState<number>(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const liDivRef = useRef<null | HTMLDivElement>(null)

    const videoRef = useRef<null | HTMLVideoElement>(null);
    const sourceRef = useRef<null | HTMLSourceElement>(null);


    useEffect(() => {
        if (liRef.current) {
            setLiLeft(liRef.current?.getBoundingClientRect().right)
            setLiTop(liRef.current?.getBoundingClientRect().top)
        }

    }, [liRef.current?.getBoundingClientRect().top, liRef.current?.getBoundingClientRect().right])

    const handleMouseEnter = async (url: string,) => {
        setShowVideo(true);
        setVideoUrl(url)
        setVideoTitle(props.item.title);

        setTimeout(() => {
            if (url && videoRef.current) {

                videoRef.current.src = url;
                videoRef.current.load();
                play();
            }
        }, 10)

    }

    const handleClick = (s: string) => {
        props.setOptInput(s);
        props.setVideoId(props.item._id)
        handleMouseLeave()
        const id1 = setTimeout(() => {
            props.ulRef.current?.blur();
            liDivRef.current?.blur();
            liRef.current?.blur();
            props.optRef.current?.blur();
        }, 0);


    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, s: string) => {
        if (e.code === 'Enter' || e.code === 'Space') handleClick(s);
        if (e.key === 'Tab' && e.shiftKey) { props.setOptClass(`h-0`); handleMouseLeave() }
    }

    const handleMouseLeave = () => {
        play();
        setVideoUrl('');
        setShowVideo(false);
        if(props.optClass === 'h-52') props.optRef.current?.focus();
    }

    const play = () => {
        const audCurr = videoRef.current;
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


    const videoTimeHandler = () => {
        const video = videoRef.current;
        if (video !== null) {
            setCurrentTime(Number(video.currentTime));
        }
    };
    const videoTimeLength = () => {
        const video = videoRef.current;
        if (video !== null) {
            setVideoTime(Number(video.duration));
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        video?.addEventListener('loadedmetadata', videoTimeLength);
        video?.addEventListener('timeupdate', videoTimeHandler);

        return () => {
            video?.removeEventListener('timeupdate', videoTimeHandler);
            video?.removeEventListener('timeupdate', videoTimeHandler);
        }
    }, [videoUrl]);

    const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        setCurrentTime(value);
        if (videoRef.current) {
            videoRef.current.currentTime = value;
        }
    };


    const volumeKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Tab' && !e.shiftKey) {
            handleMouseLeave();
            props.setOptClass(`h-0`);

        }
    }

    const liOnFocus = (url: string,) => {
        if (!showVideo) {
            props.setOptClass(`h-52`);
            setShowVideo(true);
            setVideoUrl(url)
            setVideoTitle(props.item.title);

            setTimeout(() => {
                if (url && videoRef.current) {
                    videoRef.current.src = url;
                    videoRef.current.load();
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
            {showVideo &&
                <div className=' bg-black p-2 fixed z-50 block w-[600px] pb-6 rounded cursor-default' style={{ top: liTop, left: liLeft - 600 }}>
                    <video autoPlay={false} muted={false} ref={videoRef} preload="auto" width={600} height={337.5}>
                        <source ref={sourceRef} type='video/mp4' />
                        Your browser does not support the video tag.
                    </video>


                    <div onFocus={() => props.setOptClass(`h-52`)} tabIndex={0}>
                        <div className='flex  mb-4 gap-5 items-center'>
                            <label className="swap " >
                                <input type="checkbox" onChange={play} checked={isPlaying} />

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className=" size-8 swap-off">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    <path strokeLinecap="round" fill='white' strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="swap-on size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                            </label>
                            {!videoUrl &&
                                <input type="range" name='time2' min={0} max={0} readOnly value={0} onChange={handleRangeChange} className='h-1 w-full block ' />
                            }
                            {videoUrl &&
                                <input type="range" name='time2' min={0} max={videoTime} value={currentTime} onChange={handleRangeChange} className='h-1 w-full block  cursor-pointer' />
                            }

                            <input type="range" name="volume2" min={0} max={1} step={0.02} className='h-1 block cursor-pointer' defaultValue={1} onChange={e => { if (videoRef.current) videoRef.current.volume = Number(e.target.value) }} onKeyDown={(e) => volumeKeyDown(e)} />
                            
                        </div>
                        <div className='w-full text-white'>{videoTitle}</div>
                        
                    </div>
                </div>
            }

        </li>
    )
}


export default VideoItem