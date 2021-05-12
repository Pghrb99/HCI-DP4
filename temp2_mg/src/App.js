import logo from './logo.svg';
import './App.css';
import React from 'react';

import Header from './components/Header';
import SideMenu from './components/SideMenu';
import HorizontalBar from './components/HorizontalBar';
import InfoDocument from './components/InfoDocument';

class App extends React.Component {
  render() {
    return (
      <div class="App">
        <SideMenu />
        <Header />
        <HorizontalBar />
        <InfoDocument/>
      </div>
    );
  }
}

export default App;
