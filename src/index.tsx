import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

import App from './App';
import * as serviceWorker from './serviceWorker';

import './styles/index.css';

const GlobalStyle = createGlobalStyle`
  body {
    ${tw`bg-gray-900`};
  }
`;

const Main = () => (
  <>
    <GlobalStyle />
    <App />
  </>
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
