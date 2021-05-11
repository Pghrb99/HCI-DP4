import logo from './logo.svg';
import './App.css';
import thi from './Tennis_head_image.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id="head">
          <div class="head_image"><img src={thi} alt="-"/></div>
          <div class="head_title"><p>Tennis</p></div>
          <div id="head_bottom">
            <div id="head_tags">
              Related Tags:
            </div>
            <button id="start_button">Start</button>
            <button id="progress_button">Progress</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
