'use client'
import { useEffect, useState, useRef, ChangeEvent } from 'react';
import Link from 'next/link';
import { useAudio } from './audioprovider';
import { getAudioById } from '@/actions/getaudiourl';


const AudioElement = (props: { Id: string }) => {
    const { Title, SetTitle, setAudioSource, setShowAudio, showAudio, src, isPlaying, togglePlay, analyser, volumeHandleClick, audioTime, currentTime, muted, handleRangeChange, volume, setVolume, setDisplay } = useAudio();
    const displayAudiRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [url, setUrl] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [date, setDate] = useState<string>('');

    useEffect(() => {
        getAudioById({id: props.Id})
        .then((res) => {
            if(res.success){
                setUrl(res.success.url);
                setTitle(res.success.title);
                console.log(res.success)
                setDate(res.success.date);
            }
        })
    },[])


    useEffect(() => {
        
        if (isPlaying) {
            if (!analyser || !canvasRef.current) return;

            
            const canvas = canvasRef.current;
            const canvasCtx = canvas.getContext('2d');
            if (!canvasCtx) return;
            
            const bufferLength = analyser.frequencyBinCount 
            const dataArray = new Uint8Array(bufferLength); 
            
            const draw = () => {
                analyser.getByteFrequencyData(dataArray); 
                
                canvasCtx.clearRect(0, 0, canvas.width, canvas.height); 
                canvasCtx.fillStyle = 'rgba(0,0,0,0)'; 
                canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

                const barWidth = (canvas.width / bufferLength) * 2.5; 
                let barHeight;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i] / 2; 

                    
                    const red = (barHeight / 4) % 255;
                    const green = 80;
                    const blue = (barHeight + 100) % 255;

                    canvasCtx.fillStyle = `rgb(${red},${green},${blue})`;
                    canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

                    x += barWidth + 1; 

                }

                requestAnimationFrame(draw); 
            };

            draw();
        }

    }, [analyser, isPlaying]);



    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!showAudio) {
            setShowAudio(true);
            setTimeout(() => {
                if (src !== url) {
                    setAudioSource(url);
                    SetTitle(title);
                }
                togglePlay();
            }, 10)
        }
        else {
            if (src !== url) {
                setAudioSource(url);
                SetTitle(title)
            }
            togglePlay();
        }
    }

    const handleClick = () => {
        setAudioSource('');
        SetTitle('');
        setShowAudio(false);
    }


    useEffect(() => {
        const handleScroll = () => {
            if (displayAudiRef.current) {
                if((displayAudiRef.current?.getBoundingClientRect().top > window.innerHeight || displayAudiRef.current?.getBoundingClientRect().bottom < 0) ){
                    setDisplay(true);
                }
                else setDisplay(false);
            }
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll',handleScroll);
        }

        return () => {
            if(typeof window !== 'undefined'){
                window.removeEventListener('scroll', handleScroll);
                setDisplay(true);
            }
        }
    }, [])


    return (
        <>

            <div className='w-[100%]  bg-slate-500 mt-10 p-4 pr-6 pt-6 rounded-xl' ref={displayAudiRef}>
                <div className='flex before:h-[2px] before:w-[calc(100%-32px-160px)] before:bg-slate-950  before:block items-center pl-8 before:mr-8 mb-6'>
                    <Link href='/category/podcast' className=' bg-white text-gray-900 font-bold p-2 block  rounded text-center  w-40'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 inline">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                        </svg>
                        <span className='ml-1'>PODCAST</span>
                    </Link>
                </div>

                <div className='flex justify-around text-white gap-2 flex-col sm:flex-row'>

                    <div className=' mb-2 w-full flex flex-col justify-between gap-2'>

                        <h3 >{title}</h3>
                        <div>{date}</div>
                        <div>
                            <canvas ref={canvasRef} className='w-full h-20 hidden sm:block'></canvas>
                            {(src !== url) && <input type="range" name='time' min={0} max={audioTime} value={0} readOnly className='h-1 w-[100%] block' />}
                            {(src === url) &&
                                <input type="range" name='time' min={0} max={audioTime} value={currentTime} onChange={handleRangeChange} className='h-1 w-[100%] block' />
                            }
                        </div>
                    </div>

                    <div className='flex flex-col justify-between'>
                        {(src !== url) &&
                            <div className='flex justify-between'>
                                <span className='text-sm'> 00:00:00</span>
                                <span className='text-sm'>00:00:00</span>
                            </div>
                        }

                        {( src === url) &&
                            <div className='flex justify-between'>
                                <span className='text-sm'>
                                    {`${parseInt(`${Number(currentTime) / 3600}`, 10)}`.padStart(2, '0')}
                                    :{`${parseInt(`${Number(currentTime) / 60 % 60}`, 10)}`.padStart(2, '0')}
                                    :{`${parseInt(`${Number(currentTime) % 60}`, 10)}`.padStart(2, '0')}
                                </span>
                                <span className='text-sm'>
                                    {`${parseInt(`${Number(audioTime) / 3600}`, 10)}`.padStart(2, '0')}
                                    :{`${parseInt(`${Number(audioTime) / 60 % 60}`, 10)}`.padStart(2, '0')}
                                    :{`${parseInt(`${Number(audioTime) % 60}`, 10)}`.padStart(2, '0')}
                                </span>
                            </div>
                        }

                        <label className="swap mb-3 sm:mt-0">
                            <input type="checkbox" checked={isPlaying} onChange={handleChange} />

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="sm:size-20 size-12 swap-off">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                <path strokeLinecap="round" fill='white' strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="swap-on sm:size-20 size-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                        </label>

                        <div className='flex items-center gap-2'>
                            <label className="swap">
                                <input type="checkbox" checked={muted} onChange={volumeHandleClick} />

                                <svg
                                    className="swap-off fill-current size-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="48"
                                    height="48"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                                </svg>

                                <svg
                                    className="swap-on fill-current size-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="48"
                                    height="48"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z" />
                                </svg>
                            </label>
                            <input type="range" name="volume" min={0} max={1} step={0.02} className='h-1' value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
                        </div>
                    </div>
                </div>
                { src === url && <button onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-12 mt-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>}
            </div>
        </>
    )
}

export default AudioElement