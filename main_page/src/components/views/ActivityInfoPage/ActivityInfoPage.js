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

const ActivityInfoPage = ({achievlist, submit, setSubmit, complete}) => {
    const location = useLocation();
    const docId = location.state.docId;
    const {currentUser} = useAuth();
    const [ongoing, setOngoing] = useState(false);

    useEffect(() => {
        if (currentUser) {
            db.collection('UserInfo').doc(currentUser.email).collection('Activities').doc(docId).get().then(doc => {
                if(doc.exists) setOngoing(true);
            });
        }
    })

    return (
        <div id="ActivityInfoPage">
            <Sidemenu />
            <TopBar
                currentUser = {currentUser}
                docId={docId}
                submit={submit}
                setSubmit={setSubmit}
                ongoing={ongoing}
                setOngoing={setOngoing}
                />
            <div id="AIP-hori-div">
                <HorizontalBar/>
                <InfoDocument
                    currentUser = {currentUser}
                    docId={docId}
                    achievlist={achievlist}
                    submit={submit} 
                    setSubmit={setSubmit} 
                    ongoing={ongoing} 
                />
            </div>
            <GoTop/>
        </div>
    )
}

export default ActivityInfoPage;