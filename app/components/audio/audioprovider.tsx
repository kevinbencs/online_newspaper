import { createContext, useState, useContext, useRef, useEffect, ReactNode } from 'react';

type AudioContextType = {
  isPlaying: boolean;
  src: string;
  audioContext: AudioContext | null;
  analyser: AnalyserNode | null;
  togglePlay: () => void;
  setAudioSource: (source: string) => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [src, setSrc] = useState<string>('');
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioContext && audioRef.current) {
      const context = new window.AudioContext();
      const source = context.createMediaElementSource(audioRef.current);
      const analyserNode = context.createAnalyser();
      source.connect(analyserNode);
      analyserNode.connect(context.destination);
      setAudioContext(context);
      setAnalyser(analyserNode);
    }
  }, [audioContext]);

  const togglePlay = () => {
    if (audioRef.current) {
      setIsPlaying((prev) => {
        if (prev) {
          audioRef.current?.pause();
        } else {
          audioRef.current?.play();
        }
        return !prev;
      });
    }
  };

  const setAudioSource = (source: string) => {
    setSrc(source);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, src, audioContext, analyser, togglePlay, setAudioSource }}>
      <audio ref={audioRef} src={src} />
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