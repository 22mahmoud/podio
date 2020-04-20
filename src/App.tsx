import React from 'react';
import tw from 'twin.macro';
import Navbar from './components/Navbar';
import Player from './components/Player';
import Podcasts from './components/Podcasts';

const Container = tw.div`
  bg-gray-900
  text-gray-200
  flex flex-col
  p-4
  max-w-screen-md m-auto
`;

const App: React.FC<{}> = () => (
  <Container>
    <Navbar />
    <Podcasts term="Syntax" />
    <Player />
  </Container>
);

export default App;
