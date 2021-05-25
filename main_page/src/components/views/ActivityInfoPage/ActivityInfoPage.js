import React, {useState, useEffect} from 'react'
import './ActivityInfoPage.scss'
import Sidemenu from '../SideMenu/Sidemenu';
import TopBar from './Sections/TopBar/TopBar';
import HorizontalBar from './Sections/HorizontalBar/HorizontalBar'
import InfoDocument from './Sections/InfoDocument/InfoDocument';
import GoTop from '../GoTop/GoTop';
import { useLocation } from 'react-router'
import { useAuth } from 'contexts/AuthContext'


const ActivityInfoPage = ({achievlist, setAchievlist, reviewlist, addReview, removeReview, submit, setSubmit, ongoing, setOngoing, complete, setComplete}) => {
    const location = useLocation();
    const docId = location.state.docId;
    const {currentUser} = useAuth();


    return (
        <div id="ActivityInfoPage">
            <Sidemenu />
            <TopBar
            userName={currentUser && currentUser.email}
            isSignedIn={currentUser}
            docId={docId}
            removeReview={removeReview}
            submit={submit}
            setSubmit={setSubmit}
            ongoing={ongoing}
            setOngoing={setOngoing}
            complete={complete}
            setComplete={setComplete}/>

            <div id="AIP-hori-div">
                <HorizontalBar/>
                <InfoDocument
                docId={docId}
                achievlist={achievlist}
                setAchievlist={setAchievlist} 
                reviewlist={reviewlist} 
                addReview={addReview} 
                removeReview={removeReview} 
                submit={submit} 
                setSubmit={setSubmit} 
                ongoing={ongoing} 
                setOngoing={setOngoing} 
                complete={complete} 
                setComplete={setComplete}/>

            </div>
            <GoTop/>
        </div>
    )
}

export default ActivityInfoPage;