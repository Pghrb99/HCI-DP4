import React from 'react'
import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import logo from '../imgs/logo.svg'
import './TopBar.scss'
import { Link } from "react-router-dom";
import { useAuth } from '../../../../../contexts/AuthContext'

const TopBar = ({isSignedIn, userName}) => {

    const { logOut } = useAuth();
    async function handleLogout() {
        await logOut();
    }
    return (
        <div id="nav-container">
            <div className="align-self-end">
                {isSignedIn ?
                <Nav className="mt-3">
                    <Nav.Link  className="mr-4"><Link to={"/mypage"}><span className="nav-text" id="nav-userName">{userName}</span></Link></Nav.Link>
                    <Nav.Link  className="mr-5" ><span className="nav-text" id="nav-signOut" onClick={handleLogout}>Sign Out</span></Nav.Link>
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
