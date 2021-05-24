import React from 'react'
import {Col} from 'react-bootstrap'
import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import logo from '../imgs/logo.svg'
import Tags from '../Tags/Tags'
import './TopBar.scss'
import { Link } from "react-router-dom";
import { useAuth } from '../../../../../contexts/AuthContext'

const TopBar = ({tags, category, isSignedIn, userName}) => {
    const { logOut } = useAuth();
    async function handleLogout() {
        await logOut();
    }
    return (
        <div id="TSRP-nav-container">
            <div className="align-self-end">
                {isSignedIn ?
                <Nav className="mt-3">
                    <Nav.Link  className="mr-4"><Link to={"/mypage"}><span className="nav-text" id="nav-userName">{userName}</span></Link></Nav.Link>
                    <Nav.Link  className="mr-5" ><Link to={"/login"} onClick={handleLogout}><span className="nav-text" id="nav-signOut">Sign Out</span></Link></Nav.Link>
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
                {typeof category == 'undefined' ? "Search result" : "Category: "+category}
            </div>
            {
                typeof tags != 'undefined' &&
            <div className="align-self-start" id="tags">   
                <span>Tags applied :</span><Tags tags={tags}/>
            </div>
            }
        </div>
    )
}

export default TopBar
