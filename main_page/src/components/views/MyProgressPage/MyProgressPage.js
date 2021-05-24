import React from 'react'
import './MyProgressPage.scss'
import Sidemenu from '../TagSearchPage/Sections/SideMenu/Sidemenu';
import TopBar from './Sections/TopBar/TopBar';
import ProgressDocument from './Sections/ProgressDocument/ProgressDocument'
import HorizontalBar from './Sections/HorizontalBar/HorizontalBar';
import GoTop from '../GoTop/GoTop';

const MyProgressPage = ({achievlist, setAchievlist, tags, setTags, reviewlist, addReview, removeReview, submit, setSubmit, ongoing, setOngoing, complete, setComplete}) => {
    
    return (
        <div id="MyProgressPage">
            <Sidemenu/>
            <TopBar tags={tags} setTags={setTags} isSignedIn={false} name={"Changhae"} removeReview={removeReview} submit={submit} setSubmit={setSubmit} ongoing={ongoing} setOngoing={setOngoing} complete={complete} setComplete={setComplete}/>
            <div id="AIP-hori-div">
                <HorizontalBar/>
                <ProgressDocument achievlist={achievlist} setAchievlist={setAchievlist} reviewlist={reviewlist} addReview={addReview} removeReview={removeReview} submit={submit} setSubmit={setSubmit} complete={complete} setComplete={setComplete}/>
            </div>
            <GoTop/>
        </div>
    )
}

export default MyProgressPage;