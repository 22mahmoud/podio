export interface LoadOptions {
  src: string | string[];
  format: string | string[];
  autoPlay?: boolean;
}

export enum Status {
  IDLE = 'idle',
  LOADING = 'loading',
  PLAYING = 'playing',
  STOPPED = 'stopped',
  ENDED = 'ended',
  READY = 'ready',
  ERROR = 'error',
}

export const noop = () => {};

export type AudioPlayer = {
  status: Status;
  error: Error | undefined | null;
  duration: number;
  currentTime: number;
  load: (options: LoadOptions) => void;
  togglePlayPause: () => void;
  play: Howl['play'] | typeof noop;
  pause: Howl['pause'] | typeof noop;
  stop: Howl['stop'] | typeof noop;
  mute: Howl['mute'] | typeof noop;
  seek: Howl['seek'] | typeof noop;
  volume: Howl['volume'] | typeof noop;
};
