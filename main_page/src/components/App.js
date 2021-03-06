import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import TagSearchPage from './views/TagSearchPage/TagSearchPage';
import TagSearchResultPage from './views/TagSearchResultPage/TagSearchResultPage'
import ActivityInfoPage from './views/ActivityInfoPage/ActivityInfoPage'
import LoginPage from './views/LoginPage/LoginPage'
import RegisterPage from './views/RegisterPage/RegisterPage'
import MyProgressPage from './views/MyProgressPage/MyProgressPage';
import Mypage from './views/ActivityInfoPage/Sections/Mypage/Mypage'
import CategoryPage from './views/CategoryPage/CategoryPage';
import HotActivityPage from './views/HotActivityPage/HotActivityPage'
import NameSearchPage from './views/NameSearchPage/NameSearchPage'
import { AuthProvider } from '../contexts/AuthContext'
import PrivateRoute from "./PrivateRoute"
import NonuserRoute from "./NonuserRoute"


import './App.css';

function App() {

    return (
        <AuthProvider>
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
                    
                        <PrivateRoute exact path="/mypage" component={Mypage} />
                        <PrivateRoute exact path="/myprogress" component={MyProgressPage} />
                        
                        
                        <Route exact path="/" component={TagSearchPage} />
                        <Route exact path="/result" component={TagSearchResultPage} />
                        <Route exact path="/info" component={ActivityInfoPage}/>
                        
                        <Route exact path="/category" component={CategoryPage} />
                        <NonuserRoute exact path="/login" component={LoginPage} />
                        <NonuserRoute exact path="/register" component={RegisterPage} />
                        <Route exact path="/hotactivity" component={HotActivityPage} />
                        <Route exact path="/namesearch" component={NameSearchPage} />
                    </Switch>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;