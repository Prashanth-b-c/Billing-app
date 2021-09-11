import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import './index.css';
import App from './App';

const store = configureStore()

store.subscribe(() => {
  console.log('State updated', store.getState())
})

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
,
  document.getElementById('root')
);
