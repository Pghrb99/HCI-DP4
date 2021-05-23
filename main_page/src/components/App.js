import React, {useState} from 'react'
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
import RegisterPage from './views/RegisterPage/RegisterPage'
import MyProgressPage from './views/MyProgressPage/MyProgressPage';
import Mypage from './views/ActivityInfoPage/Sections/Mypage/Mypage'
import CategoryPage from './views/CategoryPage/CategoryPage';
import HotActivityPage from './views/HotActivityPage/HotActivityPage'
import NameSearchPage from './views/NameSearchPage/NameSearchPage'
import { AuthProvider } from '../contexts/AuthContext'
import './App.css';

function App() {
    const [submit, setSubmit] = useState(false);
    const [ongoing, setOngoing] = useState(false);
    const [reviewlist, setReviewList] = useState([
        {
            isPositive: true,
            isMe: false,
            name: "Harry Potter",
            years: 6,
            achiev: 20,
            content: "You'll find it super fun. I promise.",
            data: [2, 4, 6, 8, 10],
            like: 31
        },
        {
            isPositive: false,
            isMe: false,
            name: "Hermione Granger",
            years: 1,
            achiev: 2,
            content: "It's soooo dangerous. I've broken my leg :(",
            data: [3, 2, 4, 1, 2],
            like: 17
        },
        {
            isPositive: true,
            isMe: false,
            name: "Ronald Weasley",
            years: 2,
            achiev: 6,
            content: "The best sport in the world!",
            data: [7, 3, 6, 2, 9],
            like: 20
        },
    ]);

    function addReview(review) {
        const temp = reviewlist;
        temp.unshift(review)
        setReviewList(temp);
    }

    function removeReview() {
        const temp = reviewlist;
        temp.shift();
        setReviewList(temp);
    }

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
                        <Route exact path="/" component={TagSearchPage} />
                        <Route exact path="/result" component={TagSearchResultPage} />
                        <Route exact path="/info" render={() => <ActivityInfoPage reviewlist={reviewlist} addReview={addReview} removeReview={removeReview} submit={submit} setSubmit={setSubmit} ongoing={ongoing} setOngoing={setOngoing} />} />
                        <Route exact path="/myprogress" render={() => <MyProgressPage reviewlist={reviewlist} addReview={addReview} removeReview={removeReview} submit={submit} setSubmit={setSubmit} ongoing={ongoing} setOngoing={setOngoing} />} />
                        <Route exact path="/category" component={CategoryPage} />
                        <Route exact path="/login" component={LoginPage} />
                        <Route exact path="/register" component={RegisterPage} />
                        <Route exact path="/mypage" component={Mypage} />
                        <Route exact path="/hotactivity" component={HotActivityPage} />
                        <Route exact path="/namesearch" component={NameSearchPage} />
                    </Switch>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;