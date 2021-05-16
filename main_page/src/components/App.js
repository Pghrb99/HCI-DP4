import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import TagSearchPage from './views/TagSearchPage/TagSearchPage';
import TagSearchResultPage from './views/TagSearchResultPage/TagSearchResultPage'
import ActivityInfoPage from './views/ActivityInfoPage/ActivityInfoPage'
import LoginPage from './views/LoginPage/LoginPage'
//import RegisterPage from './views/RegisterPage/RegisterPage'

import './App.css';

function App() {
  return (
    <Router>
      <div>
        
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/" component={TagSearchPage} />
          <Route exact path="/result" component={TagSearchResultPage} />
          <Route exact path="/info" component={ActivityInfoPage} />
          <Route exact path="/login" component={LoginPage} />
          {/*<Route exact path="/register" component={RegisterPage} />*/}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
