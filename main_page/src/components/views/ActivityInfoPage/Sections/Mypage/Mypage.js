import React from 'react'
import './Mypage.scss'
import hockey_world_1400 from '../imgs/hockey_world_1400.png'
import Sidemenu from '../../../SideMenu/Sidemenu';
import Log_in_out from './Log_in_out/Log_in_out';
import Cardbox from '../Mypage/Cardbox/Cardbox'
import TopBar from './TopBar/TopBar'
import { useAuth } from '../../../../../contexts/AuthContext'

const Mypage = () => {
    const {currentUser} = useAuth();

    return (
        <div>
            <Sidemenu />
            {/* <Log_in_out isSignedIn={true} id="image" name="KIMMINSEOK" /> */}
            <TopBar userName={currentUser && currentUser.email} />
            {/* <div className="maintext"> */}
            <div >
                <Cardbox className="maintext1" userName={currentUser && currentUser.email} /> 
            </div>
        </div>
    )
}
export default Mypage;

