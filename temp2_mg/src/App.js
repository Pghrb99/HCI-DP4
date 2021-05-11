import logo from './logo.svg';
import './App.css';
import React from 'react';

import Header from './components/Header';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="App">
        <Header />
      </div>
    );
  }
}

export default App;
