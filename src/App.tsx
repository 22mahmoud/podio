import React from 'react';
import tw from 'twin.macro';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
  <Router>
    <Container>
      <Navbar />
      <Switch>
        <Route exact path={['/', '/search/:term']}>
          <Podcasts />
        </Route>
        <Route path="*">NOT FOUND</Route>
      </Switch>
      <Player />
    </Container>
  </Router>
);

export default App;
