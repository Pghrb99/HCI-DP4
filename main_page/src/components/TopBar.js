import React from 'react'
import './TopBar.scss'

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
            <span className="menu">Sign in</span>
            <span className="menu">Sign out</span>
        </div>
    )

}

export default TopBar
