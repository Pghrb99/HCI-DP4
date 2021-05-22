import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
// import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import './HorizontalBar.scss'

const HorizontalBar = () => {
    return (
        <nav id="hori-bar">
            <a href="#AIP-numerics">Numerics</a>
            <a href="#AIP-images">Images</a>
            <a href="#AIP-videos">Videos</a>
            <a href="#AIP-description">Description</a>
            <a href="#AIP-requirments">Requirements</a>
            <a href="#AIP-achievements">Achievements</a>
            <a href="#AIP-reviews">Reviews</a>
            <a href="#AIP-communities">Communities</a>
        </nav>

    )
}

export default HorizontalBar;