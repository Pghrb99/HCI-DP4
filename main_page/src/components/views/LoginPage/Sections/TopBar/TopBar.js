import React from 'react'
import '../TopBar/TopBar.scss'
import { Link } from "react-router-dom";

const TopBar = ({isSignedIn, userName}) => {
    if (isSignedIn) {
        return (
            <div className="TopBar">
                <span className="userName">{userName}</span>
                <span className="menu">Sign Out</span>
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
