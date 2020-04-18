import React from 'react';
import tw from 'twin.macro';
import Navbar from './components/Navbar';

const Container = tw.div`
  w-screen h-screen
  bg-gray-900
  text-gray-200
  flex flex-col
  p-4
  max-w-screen-md m-auto
`;

const App: React.FC<{}> = () => (
  <Container>
    <Navbar />
    {/*
    <TracksList />
  <Player /> */}
  </Container>
  );

export default App;
