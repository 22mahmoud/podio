import React, { useRef } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import { FiPlay, FiSkipForward, FiSkipBack, FiPause } from 'react-icons/fi';
import { useAudioPlayer } from '../providers/audioPlayerProvider';

const Wrapper = tw.div`
    bg-gray-700 
    fixed bottom-0 left-0 right-0
    px-8 lg:px-16 py-6
    flex items-center flex-col lg:flex-row
`;

const Progress = styled.div<{ position: number }>`
  ${tw`
    h-5
    cursor-pointer
    w-full
    bg-gray-600
    relative
  `};

  &::after {
    content: '';
    width: ${props => `${props.position || 0}%`};
    ${tw`transition-all duration-200 ease-in absolute left-0 bottom-0 top-0 bg-teal-300`}
  }
`;

const PlayButton = styled(FiPlay)`
  ${tw`cursor-pointer mb-6 lg:mb-0 mx-4 text-2xl`};
`;

const PauseButton = styled(FiPause)`
  ${tw`cursor-pointer mb-6 lg:mb-0 mx-4 text-2xl`};
`;

const NextTrackButton = styled(FiSkipForward)`
  ${tw`cursor-pointer mb-6 lg:mb-0 mx-4 text-2xl`};
`;

const PrevTrackButton = styled(FiSkipBack)`
  ${tw`cursor-pointer mb-6 lg:mb-0 mx-4 text-2xl`};
`;

interface PlayerProps {
  src?: string;
}

const Player: React.FC<PlayerProps> = () => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const {
    status,
    duration,
    togglePlayPause,
    currentTime,
    seek,
  } = useAudioPlayer()!;
  const playing = status === 'playing';
  const position = (currentTime / duration) * 100 || 0;

  return (
    <>
      <Wrapper>
        <div tw="flex">
          <PrevTrackButton />
          {playing ? (
            <PauseButton onClick={togglePlayPause} />
          ) : (
            <PlayButton onClick={togglePlayPause} />
          )}
          <NextTrackButton />
        </div>
        <Progress
          {...{ position }}
          ref={progressBarRef}
          onClick={event => {
            if (progressBarRef.current) {
              const x = event.pageX - progressBarRef.current?.offsetLeft;
              const percentage = (x / progressBarRef.current.clientWidth) * 100;
              seek((percentage / 100) * duration);
            }
          }}
        />
      </Wrapper>
    </>
  );
};

export default Player;
