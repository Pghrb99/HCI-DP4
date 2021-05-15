import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
// import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import './HorizontalBar.scss'

const HorizontalBar = () => {
    return (
        <div id="horidiv">
            <nav id="hori-bar">
                <a href="#numerics">Numerics</a>
                <a href="#images">Images</a>
                <a href="#videos">Videos</a>
                <a href="#description">Description</a>
                <a href="#communities">Communities</a>
                <a href="#requierments">Requierements</a>
                <a href="#achievements">Achievements</a>
                <a href="#reviews">Reviews</a>
            </nav>
        </div>

    )
}

export default HorizontalBar;