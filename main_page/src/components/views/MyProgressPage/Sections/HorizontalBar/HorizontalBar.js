import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
// import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import './HorizontalBar.scss'

const HorizontalBar = () => {
    return (
        <nav id="MMP-hori-bar">
            <a href="#MMP-percentage">Progress Percentage</a>
            <a href="#MMP-selectedachiev">Selected Achievements</a>
            <a href="#MMP-reviews">Reviews</a>
        </nav>

    )
}

export default HorizontalBar;