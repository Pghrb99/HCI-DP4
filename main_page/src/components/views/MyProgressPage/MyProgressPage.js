import React from 'react'
import './MyProgressPage.scss'
import Sidemenu from '../TagSearchPage/Sections/SideMenu/Sidemenu';
import TopBar from './Sections/TopBar/TopBar';
import ProgressDocument from './Sections/ProgressDocument/ProgressDocument'
import HorizontalBar from './Sections/HorizontalBar/HorizontalBar';
import GoTop from '../GoTop/GoTop';

const MyProgressPage = () => {
    return (
        <div id="MyProgressPage">
            <Sidemenu/>
            <TopBar tags={[{name: "Hi", isInclude: true},{name: "Bye", isInclude: false}]} isSignedIn={false} name={"Changhae"}/>
            <div id="AIP-hori-div">
                <HorizontalBar/>
                <ProgressDocument c={0} t={7}/>
            </div>
            <GoTop/>
        </div>
    )
}

export default MyProgressPage;