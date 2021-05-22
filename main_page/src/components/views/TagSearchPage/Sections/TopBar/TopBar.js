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
            <a className="menu" href="/register">Sign Up</a>
        </div>
    )

}

export default TopBar
