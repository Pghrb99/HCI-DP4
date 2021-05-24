import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
// import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import './HorizontalBar.scss'

const HorizontalBar = () => {

    const clickI1 = () => {
        document.getElementById('AIP-numerics').scrollIntoView({behavior: "smooth"});
    }

    const clickI2 = () => {
        document.getElementById('AIP-images').scrollIntoView({behavior: "smooth"});
    }

    const clickI3 = () => {
        document.getElementById('AIP-videos').scrollIntoView({behavior: "smooth"});
    }

    const clickI4 = () => {
        document.getElementById('AIP-description').scrollIntoView({behavior: "smooth"});
    }

    const clickI5 = () => {
        document.getElementById('AIP-requirments').scrollIntoView({behavior: "smooth"});
    }

    const clickI6 = () => {
        document.getElementById('AIP-achievements').scrollIntoView({behavior: "smooth"});
    }

    const clickI7 = () => {
        document.getElementById('AIP-reviews').scrollIntoView({behavior: "smooth"});
    }

    const clickI8 = () => {
        document.getElementById('AIP-communities').scrollIntoView({behavior: "smooth"});
    }

    return (
        <nav id="hori-bar">
            <a onClick={clickI1}>Numerics</a>
            <a onClick={clickI2}>Images</a>
            <a onClick={clickI3}>Videos</a>
            <a onClick={clickI4}>Description</a>
            <a onClick={clickI5}>Requirements</a>
            <a onClick={clickI6}>Achievements</a>
            <a onClick={clickI7}>Reviews</a>
            <a onClick={clickI8}>Communities</a>
        </nav>

    )
}

export default HorizontalBar;