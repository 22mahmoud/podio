import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { Howl } from 'howler';

import { AudioPlayerContext } from './context';
import { AudioPlayer, LoadOptions, Status, noop } from './types';
import { AudioPlayerReducer, intialAudioPlayerState, Actions } from './state';

export const AudioPlayerProvider: React.FC<{}> = ({ children }) => {
  const [player, setPlayer] = useState<Howl | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [state, dispatch] = useReducer(
    AudioPlayerReducer,
    intialAudioPlayerState,
  );

  const { status, duration, error } = state;

  useEffect(() => {
    const node: HTMLAudioElement = (player as any)?._sounds[0]?._node;
    const handleOnTimeUpdate = () => void setCurrentTime(node.currentTime);

    node?.addEventListener('timeupdate', handleOnTimeUpdate);

    return () => {
      node?.removeEventListener('timeupdate', handleOnTimeUpdate);
    };
  }, [player]);

  const load = useCallback(
    (options: LoadOptions) => {
      // @ts-ignore _src is a prop on howl object
      if (player?._src === options.src) return;

      if (player) {
        player?.stop();
      }

      dispatch({ type: Actions.START_LOAD });

      const sound = new Howl({
        ...options,
        html5: true,
        preload: true,
      });
      sound.on('load', () => {
        dispatch({ type: Actions.ON_LOAD, duration: sound.duration() });
      });
      sound.on('play', () => {
        dispatch({ type: Actions.ON_PLAY });
      });
      sound.on('end', () => {
        dispatch({ type: Actions.ON_LOAD });
      });
      sound.on('pause', () => {
        dispatch({ type: Actions.ON_PAUSE });
      });
      sound.on('stop', () => {
        dispatch({ type: Actions.ON_STOP });
      });
      sound.on('playerror', (_id, err) => {
        dispatch({
          type: Actions.ON_PLAY_ERROR,
          error: new Error(`[Play Error] ${err}`),
        });
      });
      sound.on('loaderror', (_id, err) => {
        dispatch({
          type: Actions.ON_LOAD_ERROR,
          error: new Error(`[Play Error] ${err}`),
        });
      });
      sound.play();

      setPlayer(sound);
    },
    [player],
  );

  const togglePlayPause = useCallback(() => {
    if (status === Status.PLAYING) {
      player?.pause();
    } else {
      player?.play();
    }
  }, [player, status]);

  const ctx: AudioPlayer = {
    load,
    togglePlayPause,
    status,
    error,
    currentTime,
    duration,
    stop: player ? player.stop.bind(player) : noop,
    seek: player ? player.seek.bind(player) : noop,
    play: player ? player.play.bind(player) : noop,
    pause: player ? player.pause.bind(player) : noop,
    mute: player ? player.mute.bind(player) : noop,
    volume: player ? player.volume.bind(player) : noop,
  };

  return (
    <AudioPlayerContext.Provider value={ctx}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
