import React from 'react';
import { useParams } from 'react-router-dom';
import tw from 'twin.macro';
import 'styled-components/macro';

import Podcasts from '../components/Podcasts';

const Wrapper = tw.div`
  flex
  flex-col
  h-full
`;

const SearchResultPage: React.FC<{}> = () => {
  const params = useParams<{ term?: string }>();
  const term = params.term || 'Syntax';
  return (
    <Wrapper>
      <div tw="mb-4">
        <h2 tw="font-light">Search Result for:</h2>
        <p tw="block text-2xl"> {term} </p>
      </div>
      <Podcasts term={term} />
    </Wrapper>
  );
};

export default SearchResultPage;
