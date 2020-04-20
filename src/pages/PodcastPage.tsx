import React from 'react';
import tw from 'twin.macro';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import 'styled-components/macro';

import { ITunesResult } from '../types/itunesResult';
import Episode from '../types/Podcast';

const Wrapper = tw.div`flex flex-col`;

const EpisodeCard = tw.div`
  cursor-pointer
  flex
  my-2 
  p-2
  bg-gray-800 
  rounded-md
  shadow-sm
  transform
  hover:scale-105
  transition-all
  duration-100
  ease-in-out
`;

const fetchPodcast = async (_key: string, { id }: { id: string }) => {
  const lookupResponse = await fetch(
    `https://cors-anywhere.herokuapp.com/http://itunes.apple.com/lookup?id=${id}`,
  );
  const lookupData: ITunesResult = await lookupResponse.json();
  console.log(lookupData);
  const response = await fetch(
    `/.netlify/functions/getPodcast?feedUrl=${lookupData?.results?.[0]?.feedUrl}`,
  );
  const data: { data: Episode[] } = await response.json();

  return data.data;
};

const PodcastPage: React.FC<{}> = () => {
  const { id } = useParams<{ id: string }>();
  const { data, status } = useQuery(['podcast', { id }], fetchPodcast);
  if (status === 'loading') {
    return <div> Loading ... </div>;
  }
  return (
    <Wrapper>
      {data?.map(episode => (
        <EpisodeCard key={episode.id}>
          <h2 tw="flex-1 truncate">{episode.title}</h2>
          <p tw="ml-12 font-light"> {episode.duration} </p>
        </EpisodeCard>
      ))}
    </Wrapper>
  );
};

export default PodcastPage;
