import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import tw from 'twin.macro';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/dist/base.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

import PlayerProvider from './providers/PlayerProvider';

const GlobalStyle = createGlobalStyle`
  body {
    ${tw`h-screen bg-gray-900`};

    #root {
      ${tw`h-full w-full`};
    }
  }
`;

const Main = () => (
  <Router>
    <GlobalStyle />
    <PlayerProvider>
      <App />
    </PlayerProvider>
  </Router>
);

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
