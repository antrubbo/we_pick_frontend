import React from 'react';
import {BrowserRouter} from "react-router-dom"
import ReactDOM from 'react-dom';
import './components/stylesheets/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);


reportWebVitals();