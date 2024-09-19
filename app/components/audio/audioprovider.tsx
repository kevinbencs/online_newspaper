import { createContext, useState, useContext, ReactNode } from 'react';

type AudioContextType = {
    isPlaying: boolean;
    src: string;
    togglePlay: () => void;
    setAudioSource: (source: string) => void;
  };
  
  const AudioContext = createContext<AudioContextType | undefined>(undefined);
  
  export const AudioProvider = ({ children }: { children: ReactNode }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [src, setSrc] = useState<string>('');  // Az audio forrása
  
    const togglePlay = () => {
      setIsPlaying((prev) => !prev);
    };
  
    const setAudioSource = (source: string) => {
      setSrc(source);
    };
  
    return (
      <AudioContext.Provider value={{ isPlaying, src, togglePlay, setAudioSource }}>
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