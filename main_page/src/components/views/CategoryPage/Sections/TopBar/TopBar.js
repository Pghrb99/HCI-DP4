import React from 'react'
import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import logo from '../imgs/logo.svg'
import './TopBar.scss'
import { Link } from "react-router-dom";

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
                    <Nav.Link  className="mr-4"><Link to={"/login"}><span className="nav-text"id="nav-signIn" >Sign In</span></Link></Nav.Link>
                    <Link to={"/register"}><Button 
                        variant="outline-dark"
                        className="mr-5"
                    > <span className="nav-text" id="nav-signUp">Sign Up</span>
                    </Button></Link>
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
