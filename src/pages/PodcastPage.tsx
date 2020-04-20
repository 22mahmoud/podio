import React from 'react';
import tw from 'twin.macro';
import { useQuery } from 'react-query';

const Wrapper = tw.div``;

const fetchHello = async () => {
  const response = await fetch('/.netlify/functions/hello');
  const data = await response.json();
  return data;
};

const PodcastPage: React.FC<{}> = () => {
  const { data } = useQuery('hello', fetchHello);
  console.log(data);
  return <Wrapper>{data?.data?.value}</Wrapper>;
};

export default PodcastPage;
