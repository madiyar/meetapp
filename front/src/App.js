import React from 'react';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import Main from './app/Main';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;