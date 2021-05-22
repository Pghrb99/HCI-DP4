import React from 'react'
import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import logo from '../imgs/logo.svg'
import './TopBar.scss'

const TopBar = ({isSignedIn, name}) => {
    return (
        <div id="nav-container">
            <div className="align-self-end">
                {isSignedIn ?
                <Nav className="mt-3">
                    <Nav.Link  className="mr-4"><span className="nav-text" id="nav-userName">{name}</span></Nav.Link>
                    <Nav.Link  className="mr-5"><span className="nav-text" id="nav-signOut">Sign Out</span></Nav.Link>
                </Nav>
                :
                <Nav className="mt-3">
                    <Nav.Link  className="mr-4"><span className="nav-text"id="nav-signIn" >Sign In</span></Nav.Link>
                    <Button 
                        variant="outline-dark"
                        className="mr-5"
                    > <span className="nav-text" id="nav-signUp">Sign Up</span>
                    </Button>
                </Nav>
                }
            </div>
            <div className="align-self-center" id="search-result">
                Categories
            </div>
        </div>
    )
}

export default TopBar
