import React from 'react';
import { useQuery } from 'react-query';
import tw from 'twin.macro';
import styled from 'styled-components';
import { FiHeadphones } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import 'styled-components/macro';

import { ITunesResult } from '../types/itunesResult';

const Wrapper = styled.div`
  ${tw`h-full flex flex-col`};
`;

const PodcastCard = tw.article`
  relative
  cursor-pointer
  flex
  my-3 
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

const Center = tw.div`m-auto`;

const fetchPodcasts = async (_key: string, { term }: { term: string }) => {
  const res = await fetch(
    `https://itunes.apple.com/search?term=${term}.&media=podcast`,
  );

  const data: ITunesResult = await res.json();
  return data;
};

interface PodcastsPorops {
  term: string;
}

const Podcasts: React.FC<PodcastsPorops> = ({ term }) => {
  const history = useHistory();
  const { status, data } = useQuery(['podcasts', { term }], fetchPodcasts);

  if (status === 'loading') {
    return <Center> Loading ... </Center>;
  }

  return (
    <Wrapper>
      {!data?.results.length ? (
        <Center>Not found</Center>
      ) : (
        data?.results.map(podcast => (
          <PodcastCard
            onClick={() => {
              history.push(`/podcast/${podcast.collectionId}`);
            }}
            key={podcast.collectionId}
          >
            <Image src={podcast.artworkUrl100} alt={podcast.trackName} />
            <Content>
              <h2 tw="text-xl">{podcast.collectionName}</h2>
              <div tw="pt-2 flex items-center">
                <FiHeadphones tw="mr-1" />
                <p> {podcast.trackCount} </p>
              </div>
            </Content>
          </PodcastCard>
        ))
      )}
    </Wrapper>
  );
};

export default Podcasts;
