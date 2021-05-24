import React from 'react'
import '../TopBar/TopBar.scss'
import { Link, useHistory } from "react-router-dom";
import { useAuth } from '../../../../../contexts/AuthContext'

const TopBar = ({isSignedIn, userName}) => {
    
    const { logOut } = useAuth();
    const history = useHistory();
    async function handleLogout() {
        await logOut();
    }
    if (isSignedIn) {
        return (
            <div className="TopBar">
                <Link to={"/mypage"} className="userName">{userName}</Link>
                <Link to={"/login"} className="menu" onClick={handleLogout}>Sign Out</Link>
            </div>
        )
    }
    return (
        <div className="TopBar">
            <Link to={"/login"} className="menu">Sign In</Link>
            <Link to={"/register"} className="menu">Sign Up</Link>
        </div>
    )

}

export default TopBar
