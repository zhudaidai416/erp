import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/scss/index.scss';
import { Provider } from 'react-redux';
import { HashRouter } from "react-router-dom";
import store from '@/store';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

reportWebVitals();
