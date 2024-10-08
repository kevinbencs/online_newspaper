'use client'

import { createContext, useState, useContext, useRef, useEffect, ReactNode, ChangeEvent } from 'react';
import Miniaudio from './miniaudio';

type AudioContextType = {
  isPlaying: boolean;
  src: string;
  volume: number;
  lastVolume: number;
  currentTime: number;
  audioTime: number;
  muted: boolean;
  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
  togglePlay: () => void;
  setAudioSource: (source: string) => void;
  setVolume: (vol: number) => void;
  volumeHandleClick: () => void;
  handleRangeChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setShowAudio: (show: boolean) => void;
  showAudio: boolean;
  display: boolean;
  setDisplay: (disp: boolean) => void
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(1);
  const [lastVolume, setLastVolume] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [audioTime, setAudioTime] = useState<number>(0);
  const [showAudio, setShowAudio] = useState<boolean>(false);
  const [display, setDisplay] = useState<boolean>(false);

  const [muted, setMuted] = useState<boolean>(false);
  const [src, setSrc] = useState<string>('');
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sourceRef = useRef<HTMLSourceElement | null>(null);
  const mediaElementSourceRef = useRef<MediaElementAudioSourceNode | null>(null); // Ref a MediaElementSource-hoz


  useEffect(() => {
    if (!audioContext && audioRef.current) {
      const context = new window.AudioContext();

      // Ellenőrizzük, hogy már van-e MediaElementSourceNode
      if (!mediaElementSourceRef.current) {
        const source = context.createMediaElementSource(audioRef.current);
        const analyserNode = context.createAnalyser();

        source.connect(analyserNode);
        analyserNode.connect(context.destination);

        mediaElementSourceRef.current = source; // Tároljuk a source node-ot
        setAudioContext(context);
        setAnalyser(analyserNode);
      }
    }
  }, [audioContext, showAudio]);

  const togglePlay = () => {
    if (audioRef.current) {
      setIsPlaying((prev) => {
        if (prev) {
          audioRef.current?.pause();
        } else {
          audioRef.current?.play().catch(error => {
            console.error('Play failed:', error);
          });;
        }
        return !prev;
      });
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;

      if (volume === 0) setMuted(true);
      else setMuted(false);
    }
  }, [volume])


  const volumeHandleClick = () => {
    if (audioRef.current !== null && volume !== 0) {
      setLastVolume(volume);
      setVolume(0);
      setMuted(true);
    }
    else if (audioRef.current !== null) { setVolume(lastVolume); setMuted(false); }
  }


  const setAudioSource = (source: string) => {
    setSrc(source);
    if (sourceRef.current && audioRef.current) {
      sourceRef.current.src = source;
      audioRef.current.load();
    }
  };

  const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setCurrentTime(value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };



  useEffect(() => {
    const audio = audioRef.current;
    const audioTimeHandler = () => {
      if (audio !== null) {
        setCurrentTime(Number(audio.currentTime));
      }
    };
    const audioTimeLength = () => {
      if (audio !== null) {
        setAudioTime(Number(audio.duration));
      }
    };

    audio?.addEventListener('loadedmetadata', audioTimeLength);
    audio?.addEventListener('timeupdate', audioTimeHandler);

    return () => {
      audio?.removeEventListener('timeupdate', audioTimeHandler);
      audio?.removeEventListener('loadedmetadata', audioTimeLength);
    }
  }, [src]);

  return (
    <AudioContext.Provider value={{ isPlaying, src, volume, muted, lastVolume, currentTime, audioTime, audioContext, analyser, togglePlay, setAudioSource, setVolume, volumeHandleClick, handleRangeChange, setShowAudio, showAudio, display, setDisplay }}>
      {showAudio &&
        <div>
          <audio ref={audioRef} controls preload="auto" className='hidden'>
            <source ref={sourceRef} type='audio/mp3' />
          </audio>
          {display &&
            <Miniaudio currentTime={currentTime} audioTime={audioTime} muted={muted}
              volume={volume} volumeHandleClick={volumeHandleClick} handleRangeChange={handleRangeChange} setVolume={setVolume} />
          }

        </div>
      }
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};