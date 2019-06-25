import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
import './App.css';

import moviesApp from './reducers/reducers';
import MainView from './components/main-view/main-view';

const store = createStore(moviesApp);

class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <MainView/>
      </Provider>
    )
  }
}

export default App;
