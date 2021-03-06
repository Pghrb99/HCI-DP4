import React, {useState, useEffect} from 'react'
import './ActivityInfoPage.scss'
import Sidemenu from '../SideMenu/Sidemenu';
import TopBar from './Sections/TopBar/TopBar';
import HorizontalBar from './Sections/HorizontalBar/HorizontalBar'
import InfoDocument from './Sections/InfoDocument/InfoDocument';
import GoTop from '../GoTop/GoTop';
import { useLocation } from 'react-router'
import { useAuth } from 'contexts/AuthContext';
import { db } from 'firebase.js';

const ActivityInfoPage = () => {
    const location = useLocation();
    const docId = location.state.docId;
    const {currentUser} = useAuth();

    return (
        <div id="ActivityInfoPage">
            <Sidemenu />
            <TopBar
                currentUser = {currentUser}
                docId={docId}
                />
            <div id="AIP-hori-div">
                <HorizontalBar/>
                <InfoDocument
                    currentUser = {currentUser}
                    docId={docId}
                />
            </div>
            <GoTop/>
        </div>
    )
}

export default ActivityInfoPage;