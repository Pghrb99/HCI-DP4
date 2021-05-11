import logo from './logo.svg';
import './App.css';
import React from 'react';

import Header from './components/Header';
import SideMenu from './components/SideMenu';


class App extends React.Component {
  render() {
    return (
      <div class="App">
        <SideMenu />
        <Header />
      </div>
    );
  }
}

export default App;
