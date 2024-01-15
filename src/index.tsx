import React, * as AllReact from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom';
import * as AllReactDOM from 'react-dom';
import App from './App';
import { initApolloClient } from './graphql';

// @ts-nocheck
window.React = AllReact;
// window.React.default = AllReact;
window.ReactDOM = AllReactDOM;
// window.ReactDOM.default = AllReactDOM;
window.global ||= window;
// @ts-nocheck
const rootElement = document.querySelector('#root');

ReactDOM.render(
  <ApolloProvider client={initApolloClient as any}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  rootElement as Element,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
