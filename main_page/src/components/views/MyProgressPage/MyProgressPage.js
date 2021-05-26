import React from 'react'
import './MyProgressPage.scss'
import Sidemenu from '../SideMenu/Sidemenu';
import TopBar from './Sections/TopBar/TopBar';
import ProgressDocument from './Sections/ProgressDocument/ProgressDocument'
import HorizontalBar from './Sections/HorizontalBar/HorizontalBar';
import GoTop from '../GoTop/GoTop';
import { useLocation } from 'react-router';
import { useAuth } from 'contexts/AuthContext';

const MyProgressPage = ({achievlist, setAchievlist, setTags, removeReview, submit, setSubmit, ongoing, setOngoing, complete, setComplete}) => {
    const location = useLocation();
    const docId = location.state.docId;
    const {currentUser} = useAuth();

    return (
        <div id="MyProgressPage">
            <Sidemenu/>
            <TopBar userName={currentUser && currentUser.email}
            isSignedIn={currentUser} docId={docId} removeReview={removeReview} submit={submit} setSubmit={setSubmit} ongoing={ongoing} setOngoing={setOngoing} complete={complete}/>
            <div id="AIP-hori-div">
                <HorizontalBar/>
                <ProgressDocument docId={docId} achievlist={achievlist} setAchievlist={setAchievlist} submit={submit} setSubmit={setSubmit} setComplete={setComplete}/>
            </div>
            <GoTop/>
        </div>
    )
}

export default MyProgressPage;