import React from 'react'
import {Col} from 'react-bootstrap'
import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import logo from '../imgs/logo.svg'
import Tags from '../../../TagSearchPage/Sections/Tags/Tags'
import './TopBar.scss'

const TopBar = ({tags, isSignedIn, name}) => {
    return (
        <div id="nav-container">
            <div className="align-self-end">
                {isSignedIn ?
                <Nav className="mt-3">
                    <Nav.Link  className="me-4"><span className="nav-text" id="nav-userName">{name}</span></Nav.Link>
                    <Nav.Link  className="me-5"><span className="nav-text" id="nav-signOut">Sign Out</span></Nav.Link>
                </Nav>
                :
                <Nav className="mt-3">
                    <Nav.Link  className="me-4"><span className="nav-text"id="nav-signIn" >Sign In</span></Nav.Link>
                    <Button 
                        variant="outline-dark"
                        className="me-5"
                    > <span className="nav-text" id="nav-signUp">Sign Up</span>
                    </Button>
                </Nav>
                }
            </div>
            <div className="align-self-center" id="search-result">
                Search result
            </div>
            <div className="align-self-start" id="tags">   
                <span>Tags applied : </span><Tags tags={tags}/>
            </div>
        </div>
    )
}

export default TopBar
