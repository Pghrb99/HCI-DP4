import React from 'react'
import './MyProgressPage.scss'
import Sidemenu from '../SideMenu/Sidemenu';
import TopBar from './Sections/TopBar/TopBar';
import ProgressDocument from './Sections/ProgressDocument/ProgressDocument'
import HorizontalBar from './Sections/HorizontalBar/HorizontalBar';
import GoTop from '../GoTop/GoTop';
import { useLocation } from 'react-router';

const MyProgressPage = ({achievlist, setAchievlist, setTags, reviewlist, addReview, removeReview, submit, setSubmit, ongoing, setOngoing, complete, setComplete}) => {
    const location = useLocation();
    const name1 = location.state;
    const name = location.state.name;
    const docId = location.state.docId;
    const tags = [];
    for(let i=0; i<location.state.tags.length; i++) tags.push(location.state.tags[i]);

    return (
        <div id="MyProgressPage">
            <Sidemenu/>
            <TopBar activityname={name} tags={tags} setTags={setTags} isSignedIn={false} name={"Changhae"} removeReview={removeReview} submit={submit} setSubmit={setSubmit} ongoing={ongoing} setOngoing={setOngoing} complete={complete} setComplete={setComplete}/>
            <div id="AIP-hori-div">
                <HorizontalBar/>
                <ProgressDocument docId={docId} activityname={name} achievlist={achievlist} setAchievlist={setAchievlist} submit={submit} setSubmit={setSubmit} complete={complete} setComplete={setComplete}/>
            </div>
            <GoTop/>
        </div>
    )
}

export default MyProgressPage;