import { useContext } from 'react';

import { AudioPlayerContext } from './context';

export const useAudioPlayer = () => useContext(AudioPlayerContext);
