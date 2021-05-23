import React, {useState} from 'react'
import './ActivityInfoPage.scss'
import Sidemenu from '../TagSearchPage/Sections/SideMenu/Sidemenu';
import TopBar from './Sections/TopBar/TopBar';
import HorizontalBar from './Sections/HorizontalBar/HorizontalBar'
import InfoDocument from './Sections/InfoDocument/InfoDocument';
import GoTop from '../GoTop/GoTop';

const ActivityInfoPage = ({reviewlist, addReview, removeReview, submit, setSubmit, ongoing, setOngoing}) => {

    return (
        <div id="ActivityInfoPage">
            <Sidemenu />
            <TopBar tags={[{name: "Hi", isInclude: true},{name: "Bye", isInclude: false}]} isSignedIn={false} name={"Changhae"} removeReview={removeReview} submit={submit} setSubmit={setSubmit} ongoing={ongoing} setOngoing={setOngoing}/>
            <div id="AIP-hori-div">
                <HorizontalBar/>
                <InfoDocument data={[1,2,3,4,5]} reviewlist={reviewlist} addReview={addReview} removeReview={removeReview} submit={submit} setSubmit={setSubmit} ongoing={ongoing} setOngoing={setOngoing}/>
            </div>
            <GoTop/>
        </div>
    )
}

export default ActivityInfoPage;