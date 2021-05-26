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
    const username = currentUser && currentUser.email;
    const [completebool, setcompletebool] = useState(false);

    useEffect(() => {

        db.collection('UserInfo').doc(username).collection('Activities').doc(docId).get().then((doc) => {setcompletebool(doc.get("isComplete"))})
        if (username) {
            db.collection('UserInfo').doc(username).collection('Activities').doc(docId).get().then(doc => {
                if(doc.exists) setOngoing(true);
            });
        }
    })

    return (
        <div id="ActivityInfoPage">
            <Sidemenu />
            <TopBar
                userName={username}
                isSignedIn={currentUser}
                docId={docId}
                submit={submit}
                setSubmit={setSubmit}
                ongoing={ongoing}
                setOngoing={setOngoing}
                complete={completebool}
            />

            <div id="AIP-hori-div">
                <HorizontalBar/>
                <InfoDocument
                    userName={username}
                    isSignedIn={currentUser}
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