import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import 'styled-components/macro';
import { FiPlay, FiSkipForward, FiSkipBack } from 'react-icons/fi';

const Wrapper = tw.div`
    bg-gray-700 
    fixed bottom-0 left-0 right-0
    px-8 lg:px-16 py-6
    flex items-center flex-col lg:flex-row
`;

const Progress = styled.div<{ progress: number }>`
  ${tw`
    h-1
    w-full
    bg-gray-600
    relative
  `};

  &::after {
    content: '';
    width: ${props => `${props.progress}%`};
    ${tw`
      absolute left-0 bottom-0 top-0 
      bg-teal-300
    `};
  }
`;

const PlayButton = styled(FiPlay)`
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
  return (
    <>
      <Wrapper>
        <div tw="flex">
          <PrevTrackButton />
          <PlayButton />
          <NextTrackButton />
        </div>
        <Progress progress={30} />
      </Wrapper>
    </>
  );
};

export default Player;
