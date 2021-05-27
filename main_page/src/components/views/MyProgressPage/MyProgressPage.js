import React from 'react'
import './MyProgressPage.scss'
import Sidemenu from '../SideMenu/Sidemenu';
import TopBar from './Sections/TopBar/TopBar';
import ProgressDocument from './Sections/ProgressDocument/ProgressDocument'
import HorizontalBar from './Sections/HorizontalBar/HorizontalBar';
import GoTop from '../GoTop/GoTop';
import { useLocation } from 'react-router';
import { useAuth } from 'contexts/AuthContext';

const MyProgressPage = () => {
    const location = useLocation();
    const docId = location.state.docId;
    const {currentUser} = useAuth();

    return (
        <div id="MyProgressPage">
            <Sidemenu/>
            <TopBar currentUser={currentUser} docId={docId}/>
            <div id="AIP-hori-div">
                <HorizontalBar/>
                <ProgressDocument currentUser={currentUser} docId={docId}/>
            </div>
            <GoTop/>
        </div>
    )
}

export default MyProgressPage;