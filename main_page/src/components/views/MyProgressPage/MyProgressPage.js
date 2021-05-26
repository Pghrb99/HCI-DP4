import React, { useState, useEffect } from 'react'
import './MyProgressPage.scss'
import Sidemenu from '../SideMenu/Sidemenu';
import TopBar from './Sections/TopBar/TopBar';
import ProgressDocument from './Sections/ProgressDocument/ProgressDocument'
import HorizontalBar from './Sections/HorizontalBar/HorizontalBar';
import GoTop from '../GoTop/GoTop';
import { useLocation } from 'react-router';
import { useAuth } from 'contexts/AuthContext';
import { db } from 'firebase.js';

const MyProgressPage = ({achievlist, setAchievlist, setTags, removeReview, submit, setSubmit, complete, setComplete}) => {
    const location = useLocation();
    const docId = location.state.docId;
    const {currentUser} = useAuth();
    const [ongoing, setOngoing] = useState(false);
    const username = currentUser && currentUser.email;

    useEffect(() => {
        if (username) {
            db.collection('UserInfo').doc(username).collection('Activities').doc(docId).get().then(doc => {
                if(doc.exists) setOngoing(true);
            });
        }
    })

    return (
        <div id="MyProgressPage">
            <Sidemenu/>
            <TopBar userName={username}
            isSignedIn={currentUser} docId={docId} removeReview={removeReview} submit={submit} setSubmit={setSubmit} ongoing={ongoing} setOngoing={setOngoing} complete={complete}/>
            <div id="AIP-hori-div">
                <HorizontalBar/>
                <ProgressDocument userName={username} docId={docId} achievlist={achievlist} setAchievlist={setAchievlist} submit={submit} setSubmit={setSubmit} setComplete={setComplete}/>
            </div>
            <GoTop/>
        </div>
    )
}

export default MyProgressPage;