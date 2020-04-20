import React from 'react';
import tw from 'twin.macro';
import { Switch, Route } from 'react-router-dom';
import 'styled-components/macro';

import Navbar from './components/Navbar';
import Player from './components/Player';
import SearchResultPage from './pages/SearchResultPage';

const Container = tw.div`
  bg-gray-900
  text-gray-200
  flex flex-col
  p-4
  max-w-screen-md m-auto
  h-full
`;

const App: React.FC<{}> = () => (
  <Container>
    <Navbar />
    <div tw="flex-1 mb-32 mt-12">
      <Switch>
        <Route exact path={['/', '/search/:term']}>
          <SearchResultPage />
        </Route>
        <Route path="*">NOT FOUND</Route>
      </Switch>
    </div>
    <Player />
  </Container>
);

export default App;
