import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { Provider } from 'react-redux';
import reducers from '../reducers/index';
//include Dependencies
import React from "react"
import ReactDOM from "react-dom"
import '../style/style.scss'
import "babel-polyfill";
import Routes from "./config/ReactRoutes"
//import 'react-dates/lib/css/_datepicker.css';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);





ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Routes />
  </Provider>,
  document.getElementById('app'));
