'use client'
import {  KeyboardEvent, useRef, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { useAudio } from './audioprovider';

const Miniaudio = () => {

    const animationRef = useRef<HTMLDivElement | null>(null);
    const animationContainerRef = useRef<HTMLDivElement | null>(null);

    const {
        togglePlay, setShowAudio, isPlaying, setAudioSource,
        Title, muted, volumeHandleClick, currentTime, audioTime, volume,
        handleRangeChange, setVolume
    } = useAudio();

    const handleKeydown = (e: KeyboardEvent<SVGElement>) => {
        if (e.code === 'Enter' || e.code === 'Space') {
            setShowAudio(false);
            setAudioSource('');
        }
    }

    const handleClick = () => {
        setShowAudio(false);
        setAudioSource('');
    }


    useEffect(() => {
        const containerWidth = animationContainerRef.current?.offsetWidth;
        const elementWidth = animationRef.current?.offsetWidth;
        let position: number | undefined = containerWidth;
        let animationId: number;
        const step = () => {
            if (typeof (position) === 'number' && elementWidth && containerWidth) {
                position -= 2;
                if (position < - elementWidth) position = containerWidth;
                if (animationRef.current && animationRef.current.style) animationRef.current.style.left = String(position) + "px";
            }

            animationId = requestAnimationFrame(step);
        }

        animationId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationId);

    }, [])


    return (
        <div className='fixed sm:bottom-4 bottom-0 sm:left-4 bg-slate-500 rounded-lg p-2 w-full left-0 sm:w-[230px]  text-white z-[11]'>
            <div className='flex justify-end pr-2 ' >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    className="size-9 p-1 focus-within::outline cursor-pointer"
                    onClick={handleClick} tabIndex={0}
                    onKeyDown={handleKeydown}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>

            </div>
            <div className='mb-2'>
                <div className='text-center'>

                    <label className="swap ">
                        <input type="checkbox" checked={isPlaying} onChange={() => togglePlay()} />

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="sm:size-20 size-12 swap-off">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            <path strokeLinecap="round" fill='white' strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="swap-on sm:size-20 size-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </label>
                </div>
            </div>
            <div className='overflow-hidden h-6 w-full mb-2 mt-2 flex justify-center relative' ref={animationContainerRef}>
                <div className='absolute flex  h-6 left-[100%]' ref={animationRef}>{Title.split(' ').map(c => <span className='mr-2' key={uuid()}>{c}</span>)} </div>


            </div>

            <div className='flex justify-between mb-4'>
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

            <input type="range" name='time2' min={0} max={audioTime} value={currentTime}
                onChange={handleRangeChange} className='h-1 w-[100%] block mb-4'
            />
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
                <input type="range" name="volume2" min={0} max={1} step={0.02} className='h-1' value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
            </div>
        </div>
    )
}

export default Miniaudio