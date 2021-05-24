import React from 'react'
import '../TopBar/TopBar.scss'
import { Link, useHistory } from "react-router-dom";
import { useAuth } from '../../../../../contexts/AuthContext'

const TopBar = ({isSignedIn, userName}) => {
    
    const { logOut } = useAuth();
    const history = useHistory();
    async function handleLogout() {
        await logOut();
        history.push('/login');
    }
    if (isSignedIn) {
        return (
            <div className="TopBar">
                <span className="userName">{userName}</span>
                <span className="menu" onClick={handleLogout}>Sign Out</span>
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
