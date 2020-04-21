import React, { useContext, useState, useCallback, useEffect } from 'react';
import { Howl } from 'howler';

interface PlayerContextValue {
  load: (src: string) => void;
  pause: () => void;
  play: () => void;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
}

const PlayerContext = React.createContext<PlayerContextValue>({
  duration: 0,
  pause: () => {},
  play: () => {},
  isPlaying: false,
  currentTime: 0,
  load: () => {},
});

export const usePlayerContext = () => useContext(PlayerContext);

const cache: Map<string, Howl> = new Map();

const PlayerProvider: React.FC<{}> = ({ children }) => {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [currentTrack, setCurrentTrack] = useState<Howl>();

  const load = (src: string): void => {
    currentTrack?.stop();
    if (!cache.has(src)) {
      const sound = new Howl({
        src: [src],
        html5: true,
        format: ['mp3'],
        autoplay: true,
        preload: true,
        onplay: () => {
          setPlaying(true);
        },
      });
      sound.load();
      sound.play();
      setCurrentTrack(sound);
      cache.set(src, sound);
    } else {
      const sound = cache.get(src);
      setCurrentTrack(sound);
      sound?.play();
    }
  };

  useEffect(() => {
    let timeout: number;
    if (playing) {
      timeout = setInterval(() => {
        setCurrentTime(currentTrack?.seek() as number);
      }, 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [playing]);

  const ctx: PlayerContextValue = {
    load,
    duration: currentTrack?.duration() || 0,
    currentTime,
    isPlaying: currentTrack?.playing() || false,
    pause: () => {
      currentTrack?.pause();
    },
    play: () => {
      currentTrack?.play();
    },
  };

  return (
    <PlayerContext.Provider value={ctx}>{children}</PlayerContext.Provider>
  );
};

export default PlayerProvider;
