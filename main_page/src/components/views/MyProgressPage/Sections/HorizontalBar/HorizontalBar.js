import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
// import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import './HorizontalBar.scss'

const HorizontalBar = () => {

    function clickM1() {
        document.getElementById('MMP-percentage').scrollIntoView({behavior: "smooth"});
    }

    function clickM2() {
        document.getElementById('MMP-selectedachiev').scrollIntoView({behavior: "smooth"});
    }

    function clickM3() {
        document.getElementById('MMP-reviews').scrollIntoView({behavior: "smooth"});
    }

    return (
        <nav id="MMP-hori-bar">
            <a onClick={clickM1}>Progress Percentage</a>
            <a onClick={clickM2}>Selected Achievements</a>
            <a onClick={clickM3}>Reviews</a>
        </nav>

    )
}

export default HorizontalBar;