import React from 'react'
import './ActivityInfoPage.scss'
import Sidemenu from '../TagSearchPage/Sections/SideMenu/Sidemenu';
import TopBar from './Sections/TopBar/TopBar';
import HorizontalBar from './Sections/HorizontalBar/HorizontalBar'
import InfoDocument from './Sections/InfoDocument/InfoDocument';

const ActivityInfoPage = (props) => {
    return (
        <div class="ActivityInfoPage">
            <Sidemenu />
            <TopBar tags={[{name: "Hi", isInclude: true},{name: "Bye", isInclude: false}]} isSignedIn={false} name={"Changhae"}/>
            <HorizontalBar/>
            <InfoDocument data={[1,2,3,4,5]}/>
        </div>
    )
}

export default ActivityInfoPage;