import React from 'react';
import tw from 'twin.macro';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import 'styled-components/macro';

import { ITunesResult } from '../types/itunesResult';
import Episode from '../types/Podcast';
import Card from '../components/Card';
import { useAudioPlayer } from '../providers/audioPlayerProvider';

const Wrapper = tw.div`flex flex-col`;

const EpisodeCard = styled(Card)``;

const fetchPodcast = async (_key: string, { id }: { id: string }) => {
  const lookupResponse = await fetch(
    `https://cors-anywhere.herokuapp.com/http://itunes.apple.com/lookup?id=${id}`,
  );
  const lookupData: ITunesResult = await lookupResponse.json();
  const response = await fetch(
    `/.netlify/functions/getPodcast?feedUrl=${lookupData?.results?.[0]?.feedUrl}`,
  );
  const data: { data: Episode[] } = await response.json();

  return data.data;
};

const PodcastPage: React.FC<{}> = () => {
  const { id } = useParams<{ id: string }>();
  const { load } = useAudioPlayer()!;
  const { data, status } = useQuery(['podcast', { id }], fetchPodcast, {
    refetchOnWindowFocus: false,
  });

  const handleEpisodeClick = (episode: Episode) => (): void => {
    load({ src: episode.stream as string, format: 'mp3', autoPlay: true });
  };

  if (status === 'loading') {
    return <div> Loading ... </div>;
  }

  return (
    <>
      <Wrapper>
        {data?.map(episode => (
          <EpisodeCard onClick={handleEpisodeClick(episode)} key={episode.id}>
            <h2 tw="flex-1 truncate">{episode.title}</h2>
            <p tw="ml-12 font-light"> {episode.duration} </p>
          </EpisodeCard>
        ))}
      </Wrapper>
    </>
  );
};

export default PodcastPage;
