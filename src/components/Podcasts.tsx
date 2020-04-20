import React from 'react';
import { useQuery } from 'react-query';
import tw from 'twin.macro';
import styled from 'styled-components';
import 'styled-components/macro';

import { ITunesResult } from '../types/itunesResult';
import { FiHeadphones } from 'react-icons/fi';

const Wrapper = styled.div`
  ${tw`flex flex-col mb-32 mt-12`};
`;

const PodcastCard = tw.article`
  relative
  cursor-pointer
  flex
  m-3 
  p-4
  bg-gray-800 
  rounded-md
  shadow-sm
  transform
  hover:scale-105
  transition-all
  duration-100
  ease-in-out
`;

const Image = tw.img`
  absolute left-0 top-0 
  rounded-l-md
  w-24
  h-full 
  object-cover
`;

const Content = tw.div`pl-20 ml-3`;

const fetchPodcasts = async (_key: string, { term }: { term: string }) => {
  const res = await fetch(
    `https://itunes.apple.com/search?term=${term}.&media=podcast`,
  );

  const data: ITunesResult = await res.json();
  console.log(data);
  return data;
};

interface TracksListProps {
  term: string;
}

const Podcasts: React.FC<TracksListProps> = ({ term }) => {
  const { status, data } = useQuery(['podcasts', { term }], fetchPodcasts);

  if (status === 'loading') {
    return <Wrapper> Loading ... </Wrapper>;
  }

  return (
    <Wrapper>
      {data?.results.map(podcast => (
        <PodcastCard key={podcast.collectionId}>
          <Image src={podcast.artworkUrl100} alt={podcast.trackName} />
          <Content>
            <h2 tw="text-xl">{podcast.collectionName}</h2>
            <div tw="pt-2 flex items-center">
              <FiHeadphones tw="mr-1" />
              <p> {podcast.trackCount} </p>
            </div>
          </Content>
        </PodcastCard>
      ))}
    </Wrapper>
  );
};

export default Podcasts;
