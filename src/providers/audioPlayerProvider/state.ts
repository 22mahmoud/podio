import { AudioPlayer, Status } from './types';

export enum Actions {
  START_LOAD,
  ON_LOAD,
  ON_PLAY,
  ON_END,
  ON_PAUSE,
  ON_STOP,
  ON_PLAY_ERROR,
  ON_LOAD_ERROR,
}

interface BaseAction {
  type: Actions;
}

interface ErrorAction extends BaseAction {
  error: Error;
}

interface LoadAction extends BaseAction {
  duration: number;
}

type Action = BaseAction | ErrorAction | LoadAction;

type AudioPlayerState = Pick<AudioPlayer, 'duration' | 'status' | 'error'>;

export const intialAudioPlayerState: AudioPlayerState = {
  duration: 0,
  error: null,
  status: Status.IDLE,
};

export const AudioPlayerReducer = (
  state: AudioPlayerState,
  action: Action,
): AudioPlayerState => {
  switch (action.type) {
    case Actions.START_LOAD: {
      return {
        ...state,
        status: Status.LOADING,
        error: null,
        duration: 0,
      };
    }

    case Actions.ON_LOAD:
      return {
        ...state,
        status: Status.READY,
        duration: (action as LoadAction).duration,
      };
    case Actions.ON_PLAY:
      return {
        ...state,
        status: Status.PLAYING,
      };
    case Actions.ON_STOP:
      return {
        ...state,
        status: Status.STOPPED,
      };
    case Actions.ON_END:
      return {
        ...state,
        status: Status.ENDED,
      };
    case Actions.ON_PAUSE:
      return {
        ...state,
        status: Status.STOPPED,
      };
    case Actions.ON_PLAY_ERROR:
      return {
        ...state,
        status: Status.ERROR,
        error: (action as ErrorAction).error,
      };
    case Actions.ON_LOAD_ERROR:
      return {
        ...state,
        status: Status.ERROR,
        error: (action as ErrorAction).error,
      };
    default:
      return state;
  }
};
