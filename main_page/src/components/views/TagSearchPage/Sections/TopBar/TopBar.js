import React from 'react'
import '../TopBar/TopBar.scss'

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
            <a className="menu" href="/login">Sign In</a>
            <span className="menu">Sign Up</span>
        </div>
    )

}

export default TopBar
