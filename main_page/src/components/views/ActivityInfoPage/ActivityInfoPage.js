import React, {useState, useEffect} from 'react'
import './ActivityInfoPage.scss'
import Sidemenu from '../SideMenu/Sidemenu';
import TopBar from './Sections/TopBar/TopBar';
import HorizontalBar from './Sections/HorizontalBar/HorizontalBar'
import InfoDocument from './Sections/InfoDocument/InfoDocument';
import GoTop from '../GoTop/GoTop';
import { useLocation } from 'react-router'


const ActivityInfoPage = ({achievlist, setAchievlist, setTags, reviewlist, addReview, removeReview, submit, setSubmit, ongoing, setOngoing, complete, setComplete}) => {
    const location = useLocation();
    const name1 = location.state;
    const data = location.state.chartData;
    const name = location.state.name;
    const docId = location.state.docId;
    const tags = [];
    for(let i=0; i<location.state.tags.length; i++) tags.push(location.state.tags[i])

    return (
        <div id="ActivityInfoPage">
            <Sidemenu />
            <TopBar activityname={name} tags={tags} setTags={setTags} isSignedIn={false} name={"Changhae"} removeReview={removeReview} submit={submit} setSubmit={setSubmit} ongoing={ongoing} setOngoing={setOngoing} complete={complete} setComplete={setComplete}/>
            <div id="AIP-hori-div">
                <HorizontalBar/>
                <InfoDocument docId={docId} activityname={name} achievlist={achievlist} setAchievlist={setAchievlist} data={data} reviewlist={reviewlist} addReview={addReview} removeReview={removeReview} submit={submit} setSubmit={setSubmit} ongoing={ongoing} setOngoing={setOngoing} complete={complete} setComplete={setComplete}/>
            </div>
            <GoTop/>
        </div>
    )
}

export default ActivityInfoPage;