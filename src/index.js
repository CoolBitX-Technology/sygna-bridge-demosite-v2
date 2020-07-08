import React from 'react';
import ReactDOM from 'react-dom';
import Header from './partials/Header'
import Content from './partials/Content';
import './styles/content.scss';
// import {Header2} from './RegistrationForm'
//import Header1 from  './RegistrationForm'
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Content />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
