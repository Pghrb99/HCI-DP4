import React from 'react'
import './TopBar.scss'

const TopBar = ({isSignedIn, userName}) => {
    if (isSignedIn) {
        return (
            <div className="TopBar">
                <span class="userName">{userName}</span>
                <span class="menu">Sign Out</span>
            </div>
        )
    }
    return (
        <div className="TopBar">
            <span class="menu">Sign in</span>
            <span class="menu">Sign out</span>
        </div>
    )

}

export default TopBar
